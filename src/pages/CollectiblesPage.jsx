import { useState, useEffect } from "react";
import { Search, ShoppingBag, Tag, Sparkles, ChevronDown, ChevronUp, User, MapPin } from "lucide-react";
import { collectibles, blades, elementColors } from "@/data/mockData";

const CollectibleCard = ({ collectible, onBladeClick }) => {
  const [expanded, setExpanded] = useState(false);

  // 反向关联：根据 relatedBladeNames 查找异刃对象
  const relatedBlades = collectible.relatedBladeNames
    .map((name) => blades.find((b) => b.name === name))
    .filter(Boolean);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all">
      {/* 头部 */}
      <button
        className="w-full text-left p-3.5 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-200">
          <ShoppingBag className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-800 text-sm">{collectible.name}</span>
            {collectible.category && (
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                {collectible.category}
              </span>
            )}
          </div>
          <div className="mt-0.5 text-xs text-slate-500 line-clamp-1">{collectible.effect}</div>
        </div>
        <div className="flex-shrink-0 text-slate-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* 展开内容 */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 px-3.5 py-3 space-y-3">
          {/* 效果 */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              效果
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{collectible.effect}</p>
          </div>

          {/* 种类 */}
          {collectible.category && (
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                种类
              </div>
              <span className="text-sm text-slate-700">{collectible.category}</span>
            </div>
          )}

          {/* 位置 */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              位置
            </div>
            {collectible.locations.length === 0 ? (
              <span className="text-xs text-slate-400">暂无位置信息</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {collectible.locations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 leading-relaxed"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 喜欢此物的异刃 */}
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
              <User className="w-3 h-3" />
              喜欢此物的异刃
            </div>
            {relatedBlades.length === 0 ? (
              <span className="text-xs text-slate-400">暂无关联异刃</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {relatedBlades.map((b) => {
                  const elColor = elementColors[b.element] || elementColors["火"];
                  return (
                    <button
                      key={b.id}
                      onClick={() => onBladeClick(b.name)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition hover:opacity-80 ${elColor.bg} ${elColor.text} ${elColor.border}`}
                    >
                      {b.name}（{b.element}）→
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CollectiblesPage = ({ jumpTo, onBladeClick }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (jumpTo?.name) setQuery(jumpTo.name);
  }, [jumpTo?.key]);

  const filtered = query.trim()
    ? collectibles.filter(
        (c) =>
          c.name.includes(query) ||
          (c.category && c.category.includes(query)) ||
          c.effect.includes(query) ||
          c.relatedBladeNames.some((n) => n.includes(query)) ||
          c.locations.some((loc) => loc.includes(query))
      )
    : collectibles;

  return (
    <div className="flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-3 bg-white border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            placeholder="搜索收纳品名称、种类、效果、位置、相关异刃…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            没有找到匹配的收纳品
          </div>
        ) : (
          filtered.map((c) => (
            <CollectibleCard
              key={c.id}
              collectible={c}
              onBladeClick={onBladeClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CollectiblesPage;
