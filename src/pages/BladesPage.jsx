import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, Sword, Package, Sparkles, BookOpen, Star, Lock } from "lucide-react";
import { blades, collectibles, elementColors, fetchRings } from "@/data/mockData";

const roleColors = {
  攻击: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  防御: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  回复: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
};

const BladeCard = ({ blade, onItemClick, ringsData }) => {
  const bladeRings = ringsData[blade.id] || blade.rings || [];
  const [expanded, setExpanded] = useState(false);
  const elColor = elementColors[blade.element] || elementColors["火"];
  const roleColor = roleColors[blade.role] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };

  // 按名字匹配收纳品
  const favoriteCollectibles = collectibles.filter((c) =>
    blade.favoriteItemNames.includes(c.name)
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all">
      {/* 头部：基本信息 */}
      <button
        className="w-full text-left p-3.5 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${elColor.bg} border ${elColor.border}`}
        >
          <Sword className={`w-5 h-5 ${elColor.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-800 text-sm">{blade.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium border ${elColor.bg} ${elColor.text} ${elColor.border}`}>
              {blade.element}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {blade.weapon}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded-md border font-medium ${roleColor.bg} ${roleColor.text} ${roleColor.border}`}>
              {blade.role}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Package className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              喜欢：{blade.favoriteItemNames.join("、")}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 text-slate-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* 展开内容 */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 px-3.5 py-3 space-y-3">
          {/* 喜好类别 + 获取方式 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                喜好类别
              </div>
              <span className="text-sm text-slate-700">{blade.favoriteCategory}</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                获取方式
              </div>
              <span className="text-sm text-slate-700">{blade.obtainMethod}</span>
            </div>
          </div>

          {/* 喜欢的收纳品 */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
              <Package className="w-3 h-3" />
              喜欢的收纳品
            </div>
            {favoriteCollectibles.length === 0 ? (
              <span className="text-xs text-slate-400">暂无关联收纳品</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {favoriteCollectibles.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onItemClick(c.name)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 transition font-medium"
                  >
                    {c.name} →
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 牵绊圆环 */}
          {bladeRings.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                <Star className="w-3 h-3" />
                牵绊圆环
              </div>
              <div>
                {bladeRings.map((ring, idx) => (
                  <div key={idx} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{idx+1}</div>
                      <span className="text-sm font-semibold text-slate-800">{ring.name}</span>
                    </div>
                    <div className="ml-7 space-y-1">
                      {(ring.phases||[]).map((ph,pi)=>(
                        <div key={pi} className="text-xs">
                          <span className="text-slate-400 mr-1">Lv{ph.phase}</span>
                          <span className="text-slate-700">{ph.effect}</span>
                          {ph.unlock&&ph.unlock!=='初始习得'&&(
                            <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                              <Lock className="w-3 h-3 flex-shrink-0"/>
                              <span>{ph.unlock}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BladesPage = ({ onNavigateToCollectible, jumpTo }) => {
  const [query, setQuery] = useState("");
  const [ringsData, setRingsData] = useState({});
  useEffect(() => {
    fetchRings().then(setRingsData).catch(console.error);
  }, []);

  // 跳转过来时自动填入搜索框
  useEffect(() => {
    if (jumpTo?.name) setQuery(jumpTo.name);
  }, [jumpTo?.key]);

  const filtered = query.trim()
    ? blades.filter(
        (b) =>
          b.name.includes(query) ||
          b.element.includes(query) ||
          b.weapon.includes(query) ||
          b.role.includes(query) ||
          b.favoriteCategory.includes(query) ||
          b.obtainMethod.includes(query)
      )
    : blades;

  return (
    <div className="flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-3 bg-white border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition"
            placeholder="搜索异刃名称、属性、武器、角色、获取方式…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            没有找到匹配的异刃
          </div>
        ) : (
          filtered.map((b) => (
            <BladeCard
              key={b.id}
              blade={b}
              onItemClick={onNavigateToCollectible}
              ringsData={ringsData}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BladesPage;
