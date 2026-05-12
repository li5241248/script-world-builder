import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Share2, Bookmark, ChevronDown, Sparkles, Users, Clock } from "lucide-react";
import heroImg from "@/assets/hero-huatangchun.jpg";
import wentang from "@/assets/char-wentang.jpg";
import peirong from "@/assets/char-peirong.jpg";
import peiyan from "@/assets/char-peiyan.jpg";
import peiyu from "@/assets/char-peiyu.jpg";
import mama from "@/assets/char-mama.jpg";
import empress from "@/assets/char-empress.jpg";

export const Route = createFileRoute("/")({
  component: PhoneMockup,
  head: () => ({
    meta: [
      { title: "画堂春 · 知乎剧本杀文游" },
      { name: "description", content: "盐选长篇小说《画堂春》互动剧本杀，自由代入任意角色，AI 实时改编剧情。" },
    ],
  }),
});

type Character = {
  id: string;
  name: string;
  role: string;
  gender: "女" | "男";
  age: number;
  tag: string;
  img: string;
  desc: string;
  played: number;
};

const CHARACTERS: Character[] = [
  { id: "wentang", name: "温棠", role: "女主 · 妃子", gender: "女", age: 21, tag: "贵妃", img: wentang, played: 12483,
    desc: "出身画堂世家，入宫为妃。表面温婉，心中藏着一段不能告人的旧情与一桩待雪的冤案。" },
  { id: "peiyan", name: "裴琰", role: "男主 · 三皇子", gender: "男", age: 26, tag: "摄政王", img: peiyan, played: 9821,
    desc: "母族倾覆后隐忍多年，剑藏鞘中，谋定后动。与温棠之间，是宿命，也是劫数。" },
  { id: "peirong", name: "裴容", role: "皇上", gender: "男", age: 45, tag: "九五至尊", img: peirong, played: 4216,
    desc: "在位二十载，多疑而念旧。爱江山，亦爱画堂。一念之间，便是生死。" },
  { id: "peiyu", name: "裴瑜", role: "二皇子", gender: "男", age: 24, tag: "贤王", img: peiyu, played: 3580,
    desc: "温润如玉的世家公子，朝堂上以礼相待，私下却握着最锋利的那把刀。" },
  { id: "empress", name: "皇后", role: "中宫之主", gender: "女", age: 38, tag: "凤仪", img: empress, played: 2914,
    desc: "六宫之首，端坐凤位十余年。她从不动声色，却让每一位新妃都活在她的影子里。" },
  { id: "mama", name: "陈嬷嬷", role: "温棠的嬷嬷", gender: "女", age: 56, tag: "心腹", img: mama, played: 1207,
    desc: "自温棠幼时便在身侧，知她所有秘密。在这深宫之中，是她唯一可信之人。" },
];

const STORY_CHAPTERS = [
  { title: "大梁年间，风雨飘摇", body: "大梁朝堂内外暗流涌动。江南画堂名动京城，一起离奇命案打破了画堂的平静，众人各怀心思，真相却扑朔迷离……" },
  { title: "画堂之中，暗藏玄机", body: "一幅未完成的春景图，竟牵出二十年前的旧案。每一笔颜料，都浸着不能言说的过往。" },
  { title: "血色之夜，真相难寻", body: "中秋夜宴，宫灯次第熄灭。当烛火重燃时，一个人倒在了温棠的脚边。" },
];

function HuatangChun() {
  const [active, setActive] = useState(1); // 裴琰 default center? Actually 温棠 is index 0; let's center wentang
  const [openChapter, setOpenChapter] = useState(0);

  const setActiveSafe = (i: number) => setActive(Math.max(0, Math.min(CHARACTERS.length - 1, i)));

  return (
    <div className="relative h-full overflow-y-auto bg-background pb-32 text-foreground no-scrollbar">
      {/* HERO */}
      <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        <img src={heroImg} alt="画堂春世界" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md">
              <Bookmark className="h-4 w-4 text-white" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md">
              <Share2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Title block */}
        <div className="relative z-10 mt-8 px-6">
          <div className="flex items-start gap-3">
            <div className="font-brush text-7xl leading-[0.9] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              画堂<br/>春
            </div>
            <div className="mt-2 flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.3em] text-white/85" style={{ writingMode: "vertical-rl" }}>
                剧 本 杀 · 文 游
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-sm" style={{ background: "var(--gradient-rouge)" }}>
                <span className="font-brush text-[11px] text-white">堂</span>
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-1 text-[13px] leading-relaxed text-white/85">
            <p>一卷画堂春，</p>
            <p>半阙血色词。</p>
          </div>

          <div className="mt-5 flex items-center gap-3 text-[11px] text-white/80">
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />34,221 人入梦</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />约 90 分钟</span>
            <span className="h-3 w-px bg-white/30" />
            <span>知乎盐选 · 改编</span>
          </div>
        </div>

        {/* World view chip */}
        <button className="absolute right-5 top-28 z-10 flex flex-col items-center gap-1 rounded-full bg-white/15 px-3 py-3 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-[10px] tracking-widest text-white">世界观</span>
        </button>
      </section>

      {/* CHARACTER CAROUSEL */}
      <section className="relative -mt-40 z-20">
        <div className="px-5 pb-2 text-center">
          <p className="font-display text-[11px] tracking-[0.4em] text-white/70">SELECT · YOUR · ROLE</p>
          <h2 className="mt-1 font-brush text-2xl text-white drop-shadow">入 局 · 择 一 角</h2>
        </div>

        <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[22%] pb-6 pt-8">
          {CHARACTERS.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.id}
                onClick={() => setActiveSafe(i)}
                className={`relative shrink-0 snap-center overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isActive
                    ? "h-[330px] w-[200px] -translate-y-2 border-white/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
                    : "h-[270px] w-[140px] border-white/10 opacity-70"
                }`}
              >
                <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                  <div className={`font-brush text-white ${isActive ? "text-3xl" : "text-2xl"}`}>{c.name}</div>
                  <div className="mt-1 text-[10px] text-white/80">{c.gender} · {c.age} 岁</div>
                  {isActive && (
                    <span className="mt-2 inline-block rounded-sm bg-white/15 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                      {c.tag}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5">
          {CHARACTERS.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-foreground" : "w-1.5 bg-foreground/25"}`} />
          ))}
        </div>

        {/* Active character detail */}
        <div key={CHARACTERS[active].id} className="animate-fade-up mt-6 px-6">
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[11px] tracking-widest text-muted-foreground">{CHARACTERS[active].role}</p>
                <h3 className="mt-1 font-brush text-2xl text-foreground">{CHARACTERS[active].name}</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">{CHARACTERS[active].played.toLocaleString()} 人演绎</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft" style={{ color: "var(--ink-soft)" }}>
              {CHARACTERS[active].desc}
            </p>
            <button className="mt-4 w-full rounded-xl border border-foreground/15 py-2.5 text-[13px] font-medium text-foreground transition active:scale-[0.98]">
              查看角色档案
            </button>
          </div>
        </div>
      </section>

      {/* STORY BACKGROUND */}
      <section className="mt-10 px-6">
        <div className="flex items-center gap-2">
          <span className="font-brush text-rose-900" style={{ color: "var(--rouge)" }}>❀</span>
          <h2 className="font-brush text-xl text-foreground">故事背景</h2>
        </div>

        <div className="mt-4 space-y-3">
          {STORY_CHAPTERS.map((ch, i) => {
            const open = i === openChapter;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card transition-all"
              >
                <button
                  onClick={() => setOpenChapter(open ? -1 : i)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left"
                >
                  <span className="font-display text-[15px] text-foreground">{ch.title}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="animate-fade-up px-4 pb-4">
                    <p className="text-[13px] leading-7 text-muted-foreground">{ch.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* AI feature strip */}
      <section className="mt-8 px-6">
        <div className="rounded-2xl border border-border/60 p-4" style={{ background: "var(--paper-warm)" }}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: "var(--rouge)" }} />
            <span className="text-[12px] font-medium text-foreground">AI 动态剧情</span>
          </div>
          <p className="mt-2 text-[12px] leading-6 text-muted-foreground">
            你的每一个选择，都将由 AI 实时改写，与他人的故事彼此交错——同一卷《画堂春》，没有两场相同的结局。
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="absolute bottom-6 right-5 z-30">
        <button
          className="grid h-20 w-20 place-items-center rounded-full text-white shadow-[var(--shadow-card)] transition active:scale-95"
          style={{ background: "var(--gradient-rouge)" }}
        >
          <span className="font-brush text-base leading-tight text-center">
            开始<br/>游戏
          </span>
        </button>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% 10%, oklch(0.92 0.04 30 / 0.7), transparent 60%), radial-gradient(900px 600px at 90% 90%, oklch(0.88 0.06 20 / 0.6), transparent 60%), oklch(0.18 0.02 30)",
      }}
    >
      <div className="relative" style={{ width: 390, height: 844 }}>
        {/* Phone frame */}
        <div
          className="absolute inset-0 rounded-[56px] bg-neutral-900"
          style={{
            boxShadow:
              "0 50px 120px -20px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.06) inset, 0 0 0 12px #0a0a0a",
          }}
        />
        {/* Screen */}
        <div className="absolute inset-[12px] overflow-hidden rounded-[46px] bg-background">
          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-50 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
          {/* Status bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-7 pt-3 text-[12px] font-semibold text-white mix-blend-difference">
            <span>9:41</span>
            <span className="opacity-0">·</span>
            <span>􀋙 􀛨 􀛪</span>
          </div>
          <HuatangChun />
        </div>
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[120px] h-[32px] w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -left-[3px] top-[180px] h-[60px] w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -left-[3px] top-[260px] h-[60px] w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -right-[3px] top-[200px] h-[100px] w-[3px] rounded-r bg-neutral-800" />
      </div>
    </div>
  );
}
