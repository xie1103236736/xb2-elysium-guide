import rawData from "./xb2_compact.json";
import { MONSTER_SUBAREAS } from './xb2_subareas';
import { COLLECTIBLE_LOCATIONS } from './xb2_collectible_locations';

export const fetchRings=async()=>{const r=await fetch('https://s3plus.meituan.net/mcopilot-pub/nocode-task/xieyunpeng/xk2328gnbokolq99cmt16zeg1fb5t6/xb2_rings_compact.json');const d=await r.json();return Object.fromEntries(Object.entries(d).map(([id,rings])=>[id,rings.map(r=>({name:r.n,phases:r.ph.map(p=>({phase:p.p,effect:p.e,unlock:p.u}))}))]));};

// ===== 元素颜色映射 =====
export const elementColors = {
  火: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
  水: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  冰: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-400" },
  地: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-400" },
  暗: { bg: "bg-gray-800", text: "text-gray-100", border: "border-gray-600" },
  光: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  风: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" },
  雷: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-300" },
};

// ===== 异刃数据适配 =====
// 原始字段: n=名称, e=属性, w=武器, r=战斗角色, c=喜好类别, i=喜好物品(顿号分隔两件), h=获取方式
export const blades = rawData.b.map((b) => ({
  id: b.id,
  name: b.n,
  element: b.e,
  weapon: b.w,
  role: b.r,
  favoriteCategory: b.c,
  // 喜好物品：顿号分隔 -> 数组，用于匹配 pouchItems 的 name
  favoriteItemNames: b.i ? b.i.split("、").map((s) => s.trim()) : [],
  obtainMethod: b.h,
  rings: Array.isArray(b.rings) ? b.rings : [],
}));

// ===== 精英怪数据适配 =====
// 原始字段: n=名称, l=等级, r=地区, img=地图图片URL
export const eliteMonsters = rawData.m.map((m) => ({
  id: m.id,
  name: m.n,
  level: m.l,
  region: m.r,
  area: m.a || MONSTER_SUBAREAS[m.n] || null,
  mapImg: m.img || null,
}));

// ===== 普通怪数据适配 =====
// 原始字段: n=名称, l=等级, r=地区, img=地图图片URL
export const normalMonsters = rawData.nm.map((m) => ({
  id: m.id,
  name: m.n,
  level: m.l,
  region: m.r,
  area: m.a || MONSTER_SUBAREAS[m.n] || null,
  mapImg: m.img || null,
}));

// ===== 收纳品数据适配 =====
// 原始字段: n=名称, c=种类, e=效果, b=喜欢此道具的异刃列表(名字数组)
export const collectibles = rawData.p.map((p) => ({
  id: p.id,
  name: p.n,
  category: p.c,
  effect: p.e,
  // b 字段直接是异刃名字列表，用于反向关联
  relatedBladeNames: Array.isArray(p.b) ? p.b : [],
  // 可获取位置：区域・地点・商店 原始信息数组，来源于 xenoblade2.cn 商店数据整理，无匹配时为空数组
  locations: COLLECTIBLE_LOCATIONS[p.n] || [],
}));
