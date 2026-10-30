import { useState } from "react";
import { Search, MapPin, Leaf, ChevronDown, ChevronUp, User, Map } from "lucide-react";
import { COLLECT_REGIONS, SKILL_TO_BLADES, COLLECT_DATA, searchItems, getPointsByRegion, getMapImageUrls } from "@/data/collectData";

const skillColors = {
  农学:   { bg: "bg-lime-100",    text: "text-lime-700",    border: "border-lime-300" },
  森林学: { bg: "bg-green-100",   text: "text-green-700",   border: "border-green-300" },
  昆虫学: { bg: "bg-yellow-100",  text: "text-yellow-700",  border: "border-yellow-300" },
  植物学: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
  矿物学: { bg: "bg-slate-100",   text: "text-slate-700",   border: "border-slate-400" },
  鱼类学: { bg: "bg-cyan-100",    text: "text-cyan-700",    border: "border-cyan-300" },
};

const CollectCard = ({ point, onBladeClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAllMaps, setShowAllMaps] = useState(false);

  const sc = skillColors[point.skillName] || { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" };
  const relatedBlades = SKILL_TO_BLADES[point.skillName] || [];
  const mapItems = getMapImageUrls(point.maps); // [{ url, needsMarker }]

  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 shadow-sm overflow-hidden">
      <button
        className="w-full text-left p-3.5 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${sc.bg} ${sc.border}`}>
          <Leaf className={`w-5 h-5 ${sc.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {point.skillName && (
              <span className={`text-xs px-1.5 py-0.5 rounded-md border font-medium ${sc.bg} ${sc.text} ${sc.border}`}>
                {point.skillName}
              </span>
            )}
            {point.skillLevel > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                Lv.{point.skillLevel}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{point.region}</span>
          </div>
          <div className="mt-0.5 text-xs text-slate-500 truncate">
            {point.items.slice(0, 3).join("、")}{point.items.length > 3 ? "…" : ""}
          </div>
        </div>
        <div className="flex-shrink-0 text-slate-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 px-3.5 py-3 space-y-3">
          {/* 采集物品 */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              采集物品
            </div>
            <div className="flex flex-wrap gap-1.5">
              {point.items.map((item, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* 可使用此技能的异刃 */}
          {relatedBlades.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                <User className="w-3 h-3" />
                有场景加成异刃
              </div>
              <div className="flex flex-wrap gap-1.5">
                {relatedBlades.map((name) => (
                  <button
                    key={name}
                    onClick={() => onBladeClick(name)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition hover:opacity-80 ${sc.bg} ${sc.text} ${sc.border}`}
                  >
                    {name} →
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 采集点地图 */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
              <Map className="w-3 h-3" />
              地图位置
            </div>
            {mapItems.length === 0 ? (
              <p className="text-xs text-slate-400">暂无地图数据</p>
            ) : (
              <div className="space-y-2">
                {(showAllMaps ? mapItems : mapItems.slice(0, 1)).map(({ url }, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`采集点地图 ${i + 1}`}
                    className="w-full rounded-lg border border-slate-200"
                    style={{ maxHeight: 280, objectFit: "cover" }}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ))}
                {mapItems.length > 1 && (
                  <button
                    onClick={() => setShowAllMaps((v) => !v)}
                    className="text-xs text-emerald-600 hover:text-emerald-800 font-medium transition"
                  >
                    {showAllMaps ? "收起地图" : `查看全部 ${mapItems.length} 张地图 ▾`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CollectPage = ({ onBladeClick }) => {
  const [keyword, setKeyword] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState(""); // 已提交的搜索词
  const [selectedRegion, setSelectedRegion] = useState(null);

  // 计算最终展示数据
  const finalPoints = (() => {
    if (!searchedKeyword && !selectedRegion) return [];
    if (!searchedKeyword && selectedRegion) return getPointsByRegion(selectedRegion);
    if (searchedKeyword && !selectedRegion) return searchItems(searchedKeyword);
    // 有搜索词且有地区：在搜索结果内再按地区筛选
    return searchItems(searchedKeyword).filter((p) => p.region === selectedRegion);
  })();

  const idle = !searchedKeyword && !selectedRegion;

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setSearchedKeyword(keyword.trim());
    // 搜索时不重置地区，保留当前地区筛选
  };

  const handleRegionClick = (region) => {
    // 点同一个地区取消选中；切换地区时卡片 key 会变化，自动重置展开状态
    setSelectedRegion((prev) => (prev === region ? null : region));
  };

  return (
    <div className="flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-3 bg-white border-b border-slate-100 space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-sm outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition"
              placeholder="搜索采集物品名称…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition flex-shrink-0"
          >
            搜索
          </button>
        </div>
        {/* 地区快选 */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {COLLECT_REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => handleRegionClick(r)}
              className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border transition font-medium ${
                selectedRegion === r
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        {/* 当前筛选状态提示 */}
        {(searchedKeyword || selectedRegion) && (
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
            {searchedKeyword && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700">
                搜索：{searchedKeyword}
                <button onClick={() => setSearchedKeyword("")} className="ml-1 text-emerald-400 hover:text-emerald-700">×</button>
              </span>
            )}
            {selectedRegion && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700">
                地区：{selectedRegion}
                <button onClick={() => setSelectedRegion(null)} className="ml-1 text-blue-400 hover:text-blue-700">×</button>
              </span>
            )}
            <span className="text-slate-400">{finalPoints.length} 条结果</span>
          </div>
        )}
      </div>

      {/* 列表区 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
        {idle && (
          <div className="text-center py-12 text-slate-400 text-sm">
            选择地区或搜索物品名称
          </div>
        )}
        {!idle && finalPoints.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            没有找到匹配的采集点
          </div>
        )}
        {!idle && finalPoints.map((pt, i) => (
          <CollectCard
            key={`${selectedRegion ?? ""}-${searchedKeyword}-${i}`}
            point={pt}
            onBladeClick={onBladeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectPage;
