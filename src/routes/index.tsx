import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Share2, Bookmark, ChevronDown, Sparkles, Users, Clock, X } from "lucide-react";
import heroImg from "@/assets/hero-huatangchun.jpg";
import { CHARACTERS } from "@/lib/characters";
import { PhoneMockup } from "@/components/PhoneMockup";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "画堂春 · 知乎剧本杀文游" },
      { name: "description", content: "盐选长篇小说《画堂春》互动剧本杀，自由代入任意角色，AI 实时改编剧情。" },
    ],
  }),
});

const STORY_CHAPTERS = [
  { title: "大梁年间，风雨飘摇", body: "大梁朝堂内外暗流涌动。江南画堂名动京城，一起离奇命案打破了画堂的平静，众人各怀心思，真相却扑朔迷离……" },
  { title: "画堂之中，暗藏玄机", body: "一幅未完成的春景图，竟牵出二十年前的旧案。每一笔颜料，都浸着不能言说的过往。" },
  { title: "血色之夜，真相难寻", body: "中秋夜宴，宫灯次第熄灭。当烛火重燃时，一个人倒在了温棠的脚边。" },
];

function HuatangChun() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [openChapter, setOpenChapter] = useState(0);
  const [showWorld, setShowWorld] = useState(false);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const centerCard = (i: number, smooth = true) => {
    const track = trackRef.current;
    const card = cardRefs.current[i];
    if (!track || !card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    centerCard(active, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync active card with scroll position (debounced — only after the user stops swiping)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let min = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const c = card.offsetLeft + card.clientWidth / 2;
          const d = Math.abs(c - center);
          if (d < min) { min = d; nearest = i; }
        });
        setActive((prev) => (prev === nearest ? prev : nearest));
      }, 140);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const setActiveSafe = (i: number) => {
    const idx = Math.max(0, Math.min(CHARACTERS.length - 1, i));
    setActive(idx);
    centerCard(idx);
  };

  return (
    <div className="relative h-full bg-white">
    <div className="relative h-full overflow-y-auto pb-32 text-foreground no-scrollbar">
      {/* HERO */}
      <section className="relative h-[68vh] min-h-[600px] w-full overflow-hidden">
        <img src={heroImg} alt="画堂春世界" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 88%, #ffffff 100%)" }} />

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

        {/* Title block — horizontal */}
        <div className="relative z-10 mt-6 px-6">
          <h1 className="font-brush text-[72px] leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] tracking-[0.05em]">
            画堂春
          </h1>

          <div className="mt-4 space-y-1 text-[13px] leading-relaxed text-white/85">
            <p>一卷画堂春，半阙血色词。</p>
          </div>

          <div className="mt-4 flex items-center gap-3 text-[11px] text-white/80">
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />34,221 人入梦</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />约 90 分钟</span>
            <span className="h-3 w-px bg-white/30" />
            <span>知乎盐选 · 改编</span>
          </div>
        </div>

        {/* World view chip */}
        <button
          onClick={() => setShowWorld(true)}
          className="absolute right-5 top-28 z-10 flex flex-col items-center gap-1 rounded-full bg-white/15 px-3 py-3 backdrop-blur-md transition active:scale-95"
        >
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-[10px] tracking-widest text-white">世界观</span>
        </button>
      </section>

      {/* CHARACTER CAROUSEL */}
      <section className="relative -mt-[260px] z-20">
        <div className="px-5 pb-2 text-center">
          <h2 className="font-brush text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">人物角色</h2>
        </div>

        <div ref={trackRef} className="no-scrollbar mt-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[22%] pb-6 pt-4">
          {CHARACTERS.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => {
                  navigate({ to: "/character/$id", params: { id: c.id } });
                }}
                className={`relative shrink-0 snap-center overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isActive
                    ? "h-[330px] w-[200px] -translate-y-2 border-white/30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)]"
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
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>

      </section>

      {/* STORY BACKGROUND */}
      <section className="mt-10 px-6">
        <div className="flex items-center gap-2">
          <span className="font-brush" style={{ color: "var(--rouge)" }}>❀</span>
          <h2 className="font-brush text-xl text-neutral-900">故事背景</h2>
        </div>

        <div className="mt-4 space-y-3">
          {STORY_CHAPTERS.map((ch, i) => {
            const open = i === openChapter;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] transition-all"
              >
                <button
                  onClick={() => setOpenChapter(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[11px] tracking-widest text-neutral-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[15px] text-neutral-900">{ch.title}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="animate-fade-up px-4 pb-4">
                    <p className="text-[13px] leading-7 text-neutral-600">{ch.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* AI feature strip */}
      <section className="mt-8 px-6">
        <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: "var(--rouge)" }} />
            <span className="text-[12px] font-medium text-neutral-900">AI 动态剧情</span>
          </div>
          <p className="mt-2 text-[12px] leading-6 text-neutral-600">
            你的每一个选择，都将由 AI 实时改写，与他人的故事彼此交错——同一卷《画堂春》，没有两场相同的结局。
          </p>
        </div>
      </section>

    </div>

      {/* CTA — fixed to phone screen */}
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

function HomePage() {
  return (
    <PhoneMockup>
      <HuatangChun />
    </PhoneMockup>
  );
}
