import wentang from "@/assets/char-wentang.jpg";
import peirong from "@/assets/char-peirong.jpg";
import peiyan from "@/assets/char-peiyan.jpg";
import peiyu from "@/assets/char-peiyu.jpg";
import mama from "@/assets/char-mama.jpg";
import empress from "@/assets/char-empress.jpg";

export type Relation = { id: string; label: string };

export type Character = {
  id: string;
  name: string;
  role: string;
  gender: "女" | "男";
  age: number;
  tag: string;
  img: string;
  desc: string;
  played: number;
  motto?: string;
  identity: string;
  personality: string;
  skill: string;
  secret: string;
  story: string;
  relations: Relation[];
};

export const CHARACTERS: Character[] = [
  {
    id: "peiyan", name: "裴琰", role: "皇子", gender: "男", age: 12, tag: "皇子", img: peiyan, played: 9821,
    desc: "母族倾覆后隐忍多年，剑藏鞘中，谋定后动。与温棠之间，是宿命，也是劫数。",
    motto: "「为政之要，在于得人。」",
    identity: "大梁三皇子，母族获罪后被冷落",
    personality: "少年老成，沉静寡言，心思深沉",
    skill: "骑射、棋道、过目不忘",
    secret: "暗中收集二十年前画堂旧案的证据",
    story: "母族倾覆那年，他刚记事。被迁往冷殿后，无人问津，唯有温棠每岁春日送一盒画堂酥。年岁渐长，他握住的不是太子的剑，而是一段没人敢提的旧案。",
    relations: [
      { id: "wentang", label: "知己" },
      { id: "peirong", label: "父子" },
      { id: "peiyu", label: "兄弟" },
      { id: "empress", label: "嫡母" },
    ],
  },
  {
    id: "wentang", name: "温棠", role: "女主 · 妃子", gender: "女", age: 21, tag: "贵妃", img: wentang, played: 12483,
    desc: "出身画堂世家，入宫为妃。表面温婉，心中藏着一段不能告人的旧情与一桩待雪的冤案。",
    motto: "「世间安得两全法，不负如来不负卿。」",
    identity: "画堂主人之女，大梁贵妃",
    personality: "温婉沉静，心思缜密",
    skill: "丹青、琴音",
    secret: "知晓二十年前画堂血案的真相",
    story: "自幼生长在画堂之中，琴棋书画样样精通。看似无忧无虑，实则背负着家族的秘密与责任。那一夜，她目睹了血色真相，从此命运的齿轮开始转动。",
    relations: [
      { id: "peiyan", label: "知己" },
      { id: "peirong", label: "君妃" },
      { id: "empress", label: "宫规" },
      { id: "mama", label: "心腹" },
    ],
  },
  {
    id: "peirong", name: "裴容", role: "皇上", gender: "男", age: 45, tag: "九五至尊", img: peirong, played: 4216,
    desc: "在位二十载，多疑而念旧。爱江山，亦爱画堂。一念之间，便是生死。",
    motto: "「孤家寡人，方得天下。」",
    identity: "大梁当朝天子",
    personality: "多疑念旧，喜怒难测",
    skill: "权术、书法",
    secret: "二十年前那桩旧案，他并非全然不知",
    story: "登基二十载，平叛、修堤、定边，朝野皆称明君。可只有他自己知道，每一次握紧龙椅扶手的瞬间，那位画堂故人的影子仍在眼前。",
    relations: [
      { id: "wentang", label: "君妃" },
      { id: "empress", label: "夫妻" },
      { id: "peiyan", label: "父子" },
      { id: "peiyu", label: "父子" },
    ],
  },
  {
    id: "peiyu", name: "裴瑜", role: "二皇子", gender: "男", age: 24, tag: "贤王", img: peiyu, played: 3580,
    desc: "温润如玉的世家公子，朝堂上以礼相待，私下却握着最锋利的那把刀。",
    motto: "「君子藏器于身，待时而动。」",
    identity: "大梁二皇子，封贤王",
    personality: "温润有礼，城府极深",
    skill: "辩才、布局",
    secret: "暗中扶植朝中势力，觊觎东宫之位",
    story: "出身嫡正，自幼被寄予厚望。十九岁开府建衙，门下名士云集。世人只见他温润如玉，却看不见他袖中藏着的那把刀。",
    relations: [
      { id: "peirong", label: "父子" },
      { id: "empress", label: "母子" },
      { id: "peiyan", label: "兄弟" },
      { id: "wentang", label: "敌友" },
    ],
  },
  {
    id: "empress", name: "皇后", role: "中宫之主", gender: "女", age: 38, tag: "凤仪", img: empress, played: 2914,
    desc: "六宫之首，端坐凤位十余年。她从不动声色，却让每一位新妃都活在她的影子里。",
    motto: "「凤位之上，不动如山。」",
    identity: "大梁中宫皇后，二皇子生母",
    personality: "端庄沉稳，手腕老练",
    skill: "管家、识人",
    secret: "曾在画堂旧案中默许了某些事",
    story: "出身世家大族，十六岁入宫，十七岁封后。十余年来，无论后宫风浪如何翻涌，她始终端坐凤位，连呼吸都不曾乱过。",
    relations: [
      { id: "peirong", label: "夫妻" },
      { id: "peiyu", label: "母子" },
      { id: "wentang", label: "宫规" },
      { id: "peiyan", label: "嫡母" },
    ],
  },
  {
    id: "mama", name: "陈嬷嬷", role: "温棠的嬷嬷", gender: "女", age: 56, tag: "心腹", img: mama, played: 1207,
    desc: "自温棠幼时便在身侧，知她所有秘密。在这深宫之中，是她唯一可信之人。",
    motto: "「老奴的命，是姑娘给的。」",
    identity: "温棠贴身嬷嬷，画堂旧仆",
    personality: "忠厚谨慎，沉默寡言",
    skill: "察言观色、宫中关系",
    secret: "亲眼见过画堂血案的现场",
    story: "二十年前，她还是画堂里一个洒扫的小丫鬟。一夜血光，她抱着襁褓中的温棠从后门逃出。从此，她的命就与这位姑娘绑在了一起。",
    relations: [
      { id: "wentang", label: "心腹" },
      { id: "empress", label: "敬畏" },
    ],
  },
];

export const getCharacter = (id: string) => CHARACTERS.find((c) => c.id === id);
