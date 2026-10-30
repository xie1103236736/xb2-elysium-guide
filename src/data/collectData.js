// 大体积采集点数据不再打进 JS 包，改为运行时按需加载（public/data/xb2_collect_data.json）
// 首屏 JS 体积从 ~6MB 降至 ~100KB 级，采集数据仅在进入「查采集」页后下载并缓存
let collectDataPromise = null;

export const loadCollectData = () => {
  if (!collectDataPromise) {
    collectDataPromise = fetch(import.meta.env.BASE_URL + "data/xb2_collect_data.json").then(
      (r) => {
        if (!r.ok) throw new Error(`采集数据加载失败 (${r.status})`);
        return r.json();
      }
    );
  }
  return collectDataPromise;
};

export const COLLECT_REGIONS = [
  "阿伐利缇亚商会",
  "古拉",
  "英维迪亚烈王国",
  "斯佩比亚帝国",
  "利贝拉里塔斯岛屿群",
  "阿卡狄亚教廷",
  "檀佩兰提亚",
  "洛修利亚王国",
  "艾尔皮斯灵洞",
  "莫尔斯断崖",
  "莫尔斯之地",
  "世界树",
  "第一低轨道站",
];

export const SKILL_TO_BLADES = {
  植物学: ["白虎", "蓟", "萤", "大锤"],
  农学:   ["花JK", "重音", "火花", "义经"],
  森林学: ["花JD", "尼娅", "结", "月", "神八"],
  矿物学: ["迦具土", "玛瑙", "罗候"],
  鱼类学: ["彩歌", "七冰", "宇迦", "菲奥伦", "神威"],
  昆虫学: ["伊吹", "花巴斯塔", "斩铁"],
};


// 采集点索引 -> 地图文件名片段数组
// 图片完整URL: https://xenoblade2.cn/特殊:重定向/file/Colle_{fragment}-map.jpg
export const COLLECT_MAPS = {0:["ma02a_c001"],1:["ma02a_c002"],2:["ma02a_c003"],3:["ma02a_c004"],4:["ma05a_f001","ma05a_f167","ma05a_f174","ma05a_f004","ma05a_f019","ma05a_f039","ma05a_f041","ma05a_f083","ma05a_f076","ma05a_f131","ma05a_f007","ma05a_f189","ma05a_f149","ma05a_f196"],5:["ma05a_f173","ma05a_f011","ma05a_f061","ma05a_f082","ma05a_f112","ma05a_f129","ma05a_f132"],6:["ma05a_f170","ma05a_f172","ma05a_f175","ma05a_f008","ma05a_f096","ma05a_f116","ma05a_f159","ma05a_f161","ma05a_f151"],7:["ma05a_f095","ma05a_f107","ma05a_f185","ma05a_f199","ma05a_f190"],8:["ma05a_f160","ma05a_f009","ma05a_f117"],9:["ma05a_f135","ma05a_f136","ma05a_f192"],10:["ma05a_f166","ma05a_f179","ma05a_f030","ma05a_f032","ma05a_f043","ma05a_f059","ma05a_f065","ma05a_f070","ma05a_f124","ma05a_f125","ma05a_f176","ma05a_f178","ma05a_f182","ma05a_f183","ma05a_f184","ma05a_f186","ma05a_f191"],11:["ma05a_f033","ma05a_f047","ma05a_f055","ma05a_f056","ma05a_f069","ma05a_f077","ma05a_f100","ma05a_f115","ma05a_f118"],12:["ma05a_f194"],13:["ma05a_f029","ma05a_f052"],14:["ma05a_f005","ma05a_f010","ma05a_f012","ma05a_f016","ma05a_f023","ma05a_f037","ma05a_f045","ma05a_f064","ma05a_f089","ma05a_f098","ma05a_f119","ma05a_f120","ma05a_d001"],15:["ma05a_f002","ma05a_f022","ma05a_f198","ma05a_f201","ma05a_f121","ma05a_d002"],16:["ma05a_f157"],17:["ma05a_f058","ma05a_f138","ma05a_f202","ma05a_f203"],18:["ma05a_f171","ma05a_f006","ma05a_f048","ma05a_f051","ma05a_f067","ma05a_f071","ma05a_f073","ma05a_f087","ma05a_f090","ma05a_f102","ma05a_f104","ma05a_f111","ma05a_f142","ma05a_f177","ma05a_f145","ma05a_f150"],19:["ma05a_f168","ma05a_f018","ma05a_f063","ma05a_f081","ma05a_f092","ma05a_f097","ma05a_f113","ma05a_f127","ma05a_f139"],20:["ma05a_f078","ma05a_f085","ma05a_f162"],21:["ma05a_f015","ma05a_f024","ma05a_f027","ma05a_f028","ma05a_f038","ma05a_f072","ma05a_f079","ma05a_f088","ma05a_f109","ma05a_f114","ma05a_f128","ma05a_f130","ma05a_f133","ma05a_f134","ma05a_f180","ma05a_f193","ma05a_f148","ma05a_f153","ma05a_f154","ma05a_f195"],22:["ma05a_f163","ma05a_f020","ma05a_f062","ma05a_f094","ma05a_f110"],23:["ma05a_f014","ma05a_f152"],24:["ma05a_f143","ma05a_f144","ma05a_f013","ma05a_f122"],25:["ma05a_f147"],26:["ma05a_f086"],27:["ma05a_f169","ma05a_f017","ma05a_f035","ma05a_f040","ma05a_f044","ma05a_f060","ma05a_f066","ma05a_f093","ma05a_f091","ma05a_f101","ma05a_f140","ma05a_f181","ma05a_f187","ma05a_f188","ma05a_f146","ma05a_f155"],28:["ma05a_f164","ma05a_f021","ma05a_f026","ma05a_f034","ma05a_f036","ma05a_f106","ma05a_f123"],29:["ma05a_f200","ma05a_f137","ma05a_f156","ma05a_f099","ma05a_f197"],80:["ma08a_f042","ma08a_f054"],83:["ma08a_f040","ma08a_f078","ma08a_f082"],84:["ma08a_f008","ma08a_f053","ma08a_f065","ma08a_f090","ma08a_f091","ma09a_d008"],85:["ma08a_f058","ma08a_f063"],86:["ma08a_f066"],87:["ma08a_f092"],88:["ma08a_f076","ma08a_f067","ma08a_f068","ma08a_f070","ma08a_f073","ma09a_d004","ma09a_d016","ma09a_d017","ma09a_d018","ma09a_d019","ma09a_d020","ma09a_d023","ma09a_d024","ma09a_d030","ma09a_d036"],91:["ma09a_d035"],92:["ma09a_d007","ma09a_d027"],93:["ma09a_d034"],94:["ma09a_d001"],95:["ma15a_c001"],97:["ma15a_c003"],98:["ma15a_f006","ma15a_f038","ma15a_f039","ma15a_f049"],99:["ma15a_f007","ma15a_f012","ma15a_f061","ma15a_f037"],100:["ma15a_f009","ma15a_f036"],101:["ma15a_f026","ma15a_f063"],102:["ma15a_f004","ma15a_f031","ma15a_f062"],103:["ma15a_f003","ma15a_f030"],104:["ma15a_f002","ma15a_f022","ma15a_f055"],106:["ma15a_f028"],107:["ma15a_f001","ma15a_f013","ma15a_f066","ma15a_f033","ma15a_f056"],108:["ma15a_f041","ma15a_f057"],109:["ma15a_f058"],110:["ma15a_f011","ma15a_f067"],111:["ma15a_f034"],112:["ma15a_f029","ma15a_f060"],113:["ma15a_f010","ma15a_f018","ma15a_f040","ma15a_f043","ma15a_f047","ma15a_f053","ma15a_f005"],114:["ma15a_f042","ma15a_f044","ma15a_f059","ma15a_f032"],115:["ma15a_f008"],116:["ma15a_f035"],117:["ma15a_f052"],118:["ma15a_f024","ma15a_f051","ma15a_f054"],119:["ma15a_f027","ma15a_f050","ma15a_f048"],120:["ma15a_f019","ma15a_f020","ma15a_f025"],121:["ma15a_f023","ma15a_f021"],122:["ma15a_f014","ma15a_f046","ma15a_f064"],123:["ma15a_f065"],126:["ma10a_027","ma10a_053","ma10a_070","ma10a_077","ma10a_090","ma10a_110","ma10a_130","ma10a_157","ma10a_154","ma10a_164"],127:["ma10a_006","ma10a_021","ma10a_041","ma10a_064","ma10a_078","ma10a_098","ma10a_113","ma10a_131","ma10a_102"],128:["ma10a_061","ma10a_086","ma10a_136","ma10a_145"],129:["ma10a_031","ma10a_009","ma10a_056","ma10a_071","ma10a_080","ma10a_083","ma10a_084","ma10a_097","ma10a_107","ma10a_112","ma10a_133","ma10a_153","ma10a_024"],130:["ma10a_001","ma10a_007","ma10a_038","ma10a_096","ma10a_106","ma10a_160"],131:["ma10a_034","ma10a_036","ma10a_048","ma10a_049","ma10a_055","ma10a_082","ma10a_088","ma10a_094","ma10a_095","ma10a_115","ma10a_116","ma10a_123","ma10a_165"],132:["ma10a_008","ma10a_081","ma10a_089","ma10a_117","ma10a_141","ma10a_144"],133:["ma10a_028","ma10a_029","ma10a_030","ma10a_063","ma10a_072","ma10a_076","ma10a_111","ma10a_132","ma10a_149","ma10a_171"],134:["ma10a_022","ma10a_065","ma10a_067","ma10a_069","ma10a_075","ma10a_085","ma10a_091","ma10a_161","ma10a_162"],135:["ma10a_017","ma10a_025","ma10a_137","ma10a_173"],136:["ma10a_032","ma10a_002","ma10a_016","ma10a_050","ma10a_052","ma10a_058","ma10a_079","ma10a_092","ma10a_120","ma10a_128","ma10a_167","ma10a_139"],137:["ma10a_044","ma10a_103","ma10a_121","ma10a_166","ma10a_138"],138:["ma10a_033","ma10a_037","ma10a_054","ma10a_087","ma10a_099","ma10a_101","ma10a_109","ma10a_114","ma10a_156","ma10a_168","ma10a_169","ma10a_127","ma10a_148"],139:["ma10a_010","ma10a_039","ma10a_042","ma10a_051","ma10a_093","ma10a_122","ma10a_129","ma10a_142","ma10a_146"],140:["ma10a_040","ma10a_018","ma10a_046","ma10a_125","ma10a_134","ma10a_135","ma10a_170"],141:["ma10a_014","ma10a_019","ma10a_118","ma10a_143","ma10a_159"],142:["ma10a_012","ma10a_013","ma10a_020","ma10a_047"],143:["ma10a_003","ma10a_004","ma10a_005"],144:["ma13a_c001","ma13a_f091","ma13a_f092","ma13a_f110","ma13a_f115","ma13a_f122","ma13a_f124","ma13a_f003","ma13a_f013","ma13a_f017","ma13a_f023","ma13a_f026","ma13a_f029","ma13a_f044","ma13a_f046","ma13a_f060","ma13a_f073","ma13a_f086","ma13a_f164","ma13a_f175","ma13a_f177"],145:["ma13a_f090","ma13a_f096","ma13a_f101","ma13a_f153","ma13a_f006","ma13a_f012","ma13a_f025","ma13a_f030","ma13a_f032","ma13a_f037","ma13a_f045","ma13a_f049","ma13a_f053","ma13a_f070","ma13a_f074","ma13a_f075","ma13a_f077","ma13a_f082","ma13a_f169","ma13a_f176"],146:["ma13a_f005","ma13a_f063","ma13a_f174","ma13a_f181","ma13a_f179"],147:["ma13a_f113","ma13a_f051","ma13a_f059","ma13a_f055"],148:["ma13a_f097","ma13a_f111","ma13a_f144","ma13a_f038","ma13a_f050","ma13a_f052","ma13a_f057","ma13a_f058","ma13a_f072","ma13a_f079","ma13a_f137","ma13a_f156","ma13a_f182","ma13a_f183"],149:["ma13a_f105","ma13a_f106","ma13a_f114","ma13a_f008","ma13a_f010","ma13a_f015","ma13a_f024","ma13a_f034","ma13a_f039","ma13a_f064","ma13a_f080"],150:["ma13a_f112","ma13a_f136","ma13a_f138","ma13a_f014","ma13a_f016","ma13a_f019","ma13a_f188"],151:["ma13a_f099","ma13a_f103","ma13a_f107","ma13a_f011","ma13a_f040","ma13a_f084","ma13a_f162","ma13a_f170"],152:["ma13a_f102","ma13a_f104","ma13a_f041","ma13a_f042","ma13a_f071","ma13a_f085","ma13a_f163","ma13a_f165","ma13a_f168"],153:["ma13a_f109","ma13a_f036","ma13a_f043","ma13a_f081"],154:["ma13a_f047","ma13a_f078","ma13a_f087"],155:["ma13a_f141","ma13a_f161"],156:["ma13a_f031","ma13a_f061","ma13a_f062","ma13a_f069","ma13a_f083","ma13a_f159","ma13a_f180"],157:["ma13a_f094","ma13a_f001","ma13a_f007","ma13a_f022","ma13a_f184","ma13a_f185"],158:["ma13a_f186","ma13a_f196"],159:["ma13a_f093","ma13a_f095","ma13a_f100","ma13a_f108","ma13a_f118","ma13a_f131","ma13a_f021","ma13a_f033","ma13a_f065","ma13a_f068","ma13a_f088","ma13a_f089","ma13a_f143","ma13a_f160"],160:["ma13a_f098","ma13a_f119","ma13a_f120","ma13a_f009","ma13a_f018"],161:["ma13a_f145","ma13a_f054"],162:["ma13a_f142","ma13a_f178","ma13a_f187","ma13a_f195"],163:["ma13a_f020","ma13a_f027","ma13a_f190","ma13a_f191","ma13a_f194"],164:["ma13a_f028","ma13a_f189","ma13a_f192","ma13a_f193"],165:["ma13a_f116","ma13a_f117","ma13a_f121","ma13a_f123","ma13a_f125","ma13a_f127","ma13a_f130","ma13a_f133","ma13a_f134","ma13a_f135","ma13a_f147","ma13a_f150","ma13a_f151","ma13a_f154"],166:["ma13a_f128","ma13a_f132","ma13a_f148","ma13a_f152","ma13a_f158"],167:["ma13a_f126","ma13a_f129","ma13a_f140","ma13a_f149"],168:["ma16a_d002","ma16a_d029","ma16a_d007","ma16a_d028","ma16a_d063","ma16a_d076","ma16a_d083","ma16a_d084","ma16a_d086"],169:["ma16a_d003","ma16a_d032","ma16a_d014","ma16a_d055","ma16a_d061","ma16a_d087"],170:["ma16a_d041","ma16a_d042","ma16a_d008","ma16a_d016","ma16a_d060","ma16a_d065","ma16a_d069","ma16a_d082"],171:["ma16a_d031","ma16a_d066","ma16a_d085"],172:["ma16a_d006","ma16a_d045","ma16a_d067"],173:["ma16a_d033","ma16a_d034","ma16a_d012","ma16a_d015","ma16a_d017","ma16a_d025","ma16a_d081"],174:["ma16a_d035","ma16a_d013","ma16a_d088"],175:["ma16a_d027","ma16a_d071","ma16a_d073","ma16a_d074","ma16a_d077"],176:["ma16a_d075","ma16a_d078","ma16a_d080"],177:["ma16a_d026","ma16a_d079"],178:["ma16a_d009","ma16a_d024","ma16a_d049","ma16a_d052","ma16a_d053","ma16a_d059"],179:["ma16a_d047","ma16a_d056","ma16a_d058"],180:["ma16a_d021","ma16a_d023","ma16a_d037","ma16a_d048"],181:["ma16a_d022","ma16a_d051"],182:["ma16a_d004","ma16a_d030","ma16a_d039"],183:["ma16a_d036","ma16a_d046"],184:["ma16a_d038","ma16a_d020"],185:["ma16a_d018","ma16a_d019"],186:["ma17a_f010","ma17a_f014","ma17a_f017"],187:["ma17a_f011","ma17a_f028","ma17a_f018"],188:["ma17a_f001","ma17a_f013"],189:["ma17a_f003","ma17a_f008"],190:["ma17a_f002","ma17a_f021","ma17a_f022","ma17a_f027"],191:["ma17a_f029","ma17a_f016","ma17a_f019"],192:["ma17a_f024","ma17a_f026"],193:["ma17a_f023"],194:["ma17a_f004","ma17a_f012"],195:["ma17a_f005","ma17a_f006","ma17a_f007"],196:["ma17a_f020","ma17a_f025","ma17a_f015"],197:["ma17a_f009"],198:["ma18a_f001","ma18a_f003","ma18a_f004","ma18a_f007","ma18a_f027","ma18a_f028","ma18a_f031"],199:["ma18a_f008","ma18a_f015","ma18a_f025","ma18a_f029"],200:["ma18a_f002","ma18a_f009","ma18a_f011"],201:["ma18a_f010","ma18a_f012"],202:["ma18a_f005","ma18a_f013","ma18a_f014","ma18a_f030"],203:["ma18a_f006","ma18a_f016"],204:["ma18a_f026"],205:["ma18a_f017","ma18a_f024"],206:["ma18a_f023"],207:["ma18a_f033"],208:["ma18a_f034"],209:["ma18a_f018","ma18a_f020","ma18a_f032"],210:["ma18a_f021","ma18a_f022"],211:["ma18a_f019"],212:["ma20a_d001","ma20a_d004","ma20a_d005","ma20a_d016","ma20a_d023","ma20a_d052","ma20a_d027","ma20a_d043","ma20a_d045","ma20a_d055","ma20a_d047"],213:["ma20a_d002","ma20a_d010","ma20a_d015","ma20a_d022","ma20a_d026","ma20a_d042"],214:["ma20a_d017","ma20a_d039","ma20a_d041","ma20a_d048"],215:["ma20a_d003","ma20a_d011","ma20a_d019","ma20a_d056"],216:["ma20a_d007","ma20a_d018","ma20a_d024","ma20a_d059"],217:["ma20a_d009","ma20a_d014","ma20a_d021","ma20a_d057"],218:["ma20a_d012","ma20a_d025","ma20a_d034","ma20a_d046"],219:["ma20a_d008","ma20a_d020","ma20a_d033","ma20a_d058"],220:["ma20a_d013","ma20a_d031","ma20a_d040","ma20a_d044"],221:["ma20a_d006","ma20a_d049","ma20a_d051"],222:["ma20a_d050","ma20a_d053"],223:["ma20a_d054"],224:["ma20a_d028","ma20a_d038"],225:["ma20a_d035"],226:["ma20a_d032","ma20a_d037"],227:["ma20a_d030"],228:["ma20a_d029","ma20a_d036"],229:["ma20a_d060"],230:["ma21a_f001","ma21a_f003","ma21a_f008"],231:["ma21a_f002","ma21a_f004"],232:["ma21a_f005","ma21a_f007"],233:["ma21a_f006","ma21a_f009"]};

// 根据文件名片段生成地图图片信息
// 返回 { proxyUrl, originalUrl } 对象数组
export const getMapUrls = (index) => {
  const fragments = COLLECT_MAPS[index];
  if (!fragments) return [];
  return fragments.map((f) => {
    const originalUrl = `https://xenoblade2.cn/特殊:重定向/file/Colle_${f}-map.jpg`;
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl.replace('https://', ''))}`;
    return { proxyUrl, originalUrl };
  });
};

/**
 * 根据 point.maps 数组生成地图图片信息对象数组
 * 支持三种格式：
 *   - data:image/...  → base64 内联图片，直接使用
 *   - https://...     → 完整URL，直接使用
 *   - 其他（如 screenshot:xxx）→ 跳过
 * @param {string[]} maps
 * @returns {{ url: string, needsMarker: boolean }[]}
 */
export const getMapImageUrls = (maps) => {
  if (!Array.isArray(maps) || maps.length === 0) return [];
  return maps
    .filter((item) => typeof item === "string" && (item.startsWith("data:") || item.startsWith("http")))
    .map((item) => {
      // base64 图片直接用，不做替换
      if (item.startsWith("data:")) return { url: item, needsMarker: false };
      // 完整 URL，替换为 852px 缩略图
      const url = item.replace("/426px-", "/852px-");
      const needsMarker = url.includes("_map_0.png");
      return { url, needsMarker };
    });
};
