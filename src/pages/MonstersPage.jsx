import { useState } from "react";
import { Search, MapPin, Swords, Shield, ChevronDown, ChevronUp, Map } from "lucide-react";
import { eliteMonsters, normalMonsters } from "@/data/mockData";

const MonsterCard = ({ monster, isElite }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border bg-white/90 shadow-sm overflow-hidden transition-shadow hover:shadow-md ${
        isElite ? "border-orange-200" : "border-slate-200"
      }`}
    >
      {/* 头部行，可点击展开 */}
      <button
        className="w-full text-left p-3.5 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
            isElite ? "bg-orange-100" : "bg-slate-100"
          }`}
        >
          {isElite ? (
            <Shield className="w-4 h-4 text-orange-600" />
          ) : (
            <Swords className="w-4 h-4 text-slate-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-800 text-sm">{monster.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                isElite ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
              }`}
            >
              {monster.level >= 999 ? "Lv.???" : `Lv.${monster.level}`}
            </span>
            {isElite && (
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 font-medium border border-red-200">
                精英
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{monster.region}{monster.area ? ('・' + monster.area) : ''}</span>
            {monster.mapImg && (
              <span className="ml-1 text-slate-400">· 点击查看地图</span>
            )}
          </div>
        </div>
        {monster.mapImg && (
          <div className="flex-shrink-0 text-slate-400">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </button>

      {/* 展开：地图图片 */}
      {expanded && monster.mapImg && (
        <div className="border-t border-slate-100 bg-slate-50 p-3">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mb-2">
            <Map className="w-3 h-3" />
            地图位置
          </div>
          <img
            src={monster.mapImg}
            alt={`${monster.name} 地图位置`}
            className="w-full rounded-lg border border-slate-200 object-cover"
            style={{ maxHeight: 260 }}
          />
        </div>
      )}
    </div>
  );
};

const MonstersPage = () => {
  const [tab, setTab] = useState("elite");
  const [query, setQuery] = useState("");

  const list = tab === "elite" ? eliteMonsters : normalMonsters;
  const filtered = query.trim()
    ? list.filter(
        (m) =>
          m.name.includes(query) ||
          m.region.includes(query)
      )
    : list;

  return (
    <div className="flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-3 bg-white border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-blue-200 bg-blue-50 text-sm outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
            placeholder="搜索怪物名称、地区…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex bg-white border-b border-slate-100 px-3">
        <button
          onClick={() => setTab("elite")}
          className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "elite"
              ? "border-red-600 text-red-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          精英怪 ({eliteMonsters.length})
        </button>
        <button
          onClick={() => setTab("normal")}
          className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === "normal"
              ? "border-red-600 text-red-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          普通怪 ({normalMonsters.length})
        </button>
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            没有找到匹配的怪物
          </div>
        ) : (
          filtered.map((m) => (
            <MonsterCard key={m.id} monster={m} isElite={tab === "elite"} />
          ))
        )}
      </div>
    </div>
  );
};

export default MonstersPage;
