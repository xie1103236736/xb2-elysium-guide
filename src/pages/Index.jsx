import { useState } from "react";
import { Swords, Sparkles, Package, BookOpen, Leaf } from "lucide-react";
import MonstersPage from "./MonstersPage";
import BladesPage from "./BladesPage";
import CollectiblesPage from "./CollectiblesPage";
import CollectPage from "./CollectPage";

const tabs = [
  { id: "monsters", label: "查怪物", icon: Swords, color: "text-red-600", activeColor: "border-red-600 text-red-600" },
  { id: "blades", label: "查异刃", icon: Sparkles, color: "text-blue-600", activeColor: "border-blue-600 text-blue-600" },
  { id: "collectibles", label: "查收纳品", icon: Package, color: "text-amber-600", activeColor: "border-amber-600 text-amber-600" },
  { id: "collect", label: "查采集", icon: Leaf, color: "text-emerald-600", activeColor: "border-emerald-500 text-emerald-600" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("monsters");
  // 跨模块跳转：{ name, key } —— key 变化触发子页面搜索更新
  const [jumpToBlade, setJumpToBlade] = useState({ name: "", key: 0 });
  const [jumpToCollectible, setJumpToCollectible] = useState({ name: "", key: 0 });

  const handleNavigateToBladeFromCollectible = (bladeName) => {
    setJumpToBlade((prev) => ({ name: bladeName, key: prev.key + 1 }));
    setActiveTab("blades");
  };

  const handleNavigateToCollectibleFromBlade = (collectibleName) => {
    setJumpToCollectible((prev) => ({ name: collectibleName, key: prev.key + 1 }));
    setActiveTab("collectibles");
  };

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* 顶部 Header */}
      <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white px-4 py-3.5 flex items-center gap-2.5 shadow-lg">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-base font-bold leading-tight">异度之刃 2 助手</h1>
      </header>

      {/* 主内容区（使用 flex 撑满剩余高度） */}
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto" style={{ minHeight: 0 }}>
        {/* Tab 导航栏 */}
        <nav className="bg-blue-950 border-b border-blue-800 flex shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium border-b-2 transition ${
                  isActive
                    ? tab.activeColor
                    : "border-transparent text-blue-300 hover:text-blue-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 页面内容 */}
        <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
          {activeTab === "monsters" && <MonstersPage />}
          {activeTab === "blades" && (
            <BladesPage
              jumpTo={jumpToBlade}
              onNavigateToCollectible={handleNavigateToCollectibleFromBlade}
            />
          )}
          {activeTab === "collectibles" && (
            <CollectiblesPage
              jumpTo={jumpToCollectible}
              onBladeClick={handleNavigateToBladeFromCollectible}
            />
          )}
          {activeTab === "collect" && (
            <CollectPage
              onBladeClick={(bladeName) => {
                setJumpToBlade((prev) => ({ name: bladeName, key: prev.key + 1 }));
                setActiveTab("blades");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
