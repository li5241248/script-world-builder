import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, ChevronLeft, Share2, Star, Heart } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import sceneBg from "@/assets/scene-huatang.jpg";
import { getCharacter } from "@/lib/characters";

export const Route = createFileRoute("/ending")({
  component: EndingPage,
  head: () => ({
    meta: [
      { title: "圆满结局 · 入梦画堂" },
      { name: "description", content: "采桑宫的春天，你的圆满结局。" },
    ],
  }),
});

const SUMMARY: { time: string; text: string }[] = [
  { time: "第一幕", text: "雪夜承宠，温棠应允抚育三皇子裴琰，于采桑宫初露锋芒。" },
  { time: "第二幕", text: "中秋宫宴，挡下皇后暗中下毒，得皇上托付凤印一角。" },
  { time: "第三幕", text: "二皇子瑜儿落水，温棠雪中相救，母子嫌隙渐解。" },
  { time: "第四幕", text: "仇公公旧账败露，温棠以智计护住采桑宫上下。" },
  { time: "终　幕", text: "册封贵妃，瑜儿当众认母，采桑宫从此成为后宫净土。" },
];

const FINAL_GRAPH: { id: string; relation: string; affinity: number; tone: string }[] = [
  { id: "peirong", relation: "君恩深重 · 红颜知己", affinity: 92, tone: "from-rose-300/30 to-amber-200/20" },
  { id: "peiyan", relation: "亲如生母 · 守护一生", affinity: 98, tone: "from-amber-200/30 to-rose-200/20" },
  { id: "peiyu", relation: "终认生母 · 母子和解", affinity: 80, tone: "from-indigo-200/25 to-rose-200/15" },
  { id: "empress", relation: "化敌为友 · 共理后宫", affinity: 65, tone: "from-violet-200/20 to-amber-200/10" },
  { id: "mama", relation: "生死相随 · 老仆忠仆", affinity: 95, tone: "from-emerald-200/20 to-amber-200/10" },
];

function Ending() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden bg-neutral-950 text-white">
      <img src={sceneBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/85 via-neutral-950/80 to-neutral-950" />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-3">
        <button
          onClick={() => navigate({ to: "/scene" })}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          <div className="text-[11px] tracking-[0.3em] text-white/80">终 章</div>
          <div className="font-brush text-[18px] tracking-[0.2em]">画 堂 落 幕</div>
        </div>
        <div className="h-9 w-9" />
      </div>

      <div className="relative z-10 h-[calc(100%-72px)] overflow-y-auto px-4 pb-28">
        {/* hero — 圆满结局 */}
        <div className="relative mx-auto mt-2 max-w-md overflow-hidden rounded-3xl border border-rose-200/30 bg-gradient-to-br from-rose-300/15 via-amber-200/10 to-rose-200/5 px-6 py-7 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md animate-fade-up">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-200/10 to-transparent" />
          <div className="relative">
            <div className="mb-2 flex items-center justify-center gap-1.5">
              <Sparkles size={11} className="text-amber-200" />
              <span className="text-[9px] tracking-[0.4em] text-amber-200/90">A I · 推 演</span>
              <Sparkles size={11} className="text-amber-200" />
            </div>
            <div className="text-[10px] tracking-[0.4em] text-rose-200/90">【 圆 满 结 局 】</div>
            <h1 className="mt-3 font-brush text-[28px] leading-tight tracking-[0.18em] text-white drop-shadow">
              采 桑 宫 的 春 天
            </h1>
            <div className="mx-auto mt-3 h-px w-12 bg-amber-200/40" />
            <p className="mt-4 text-[13.5px] leading-[1.9] text-white/90">
              温棠封妃，裴琰健康成长，瑜儿终认生母，采桑宫成为后宫净土。
            </p>
          </div>
        </div>

        {/* 剧情摘要 */}
        <section className="mx-auto mt-8 max-w-md">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-white/15" />
            <span className="text-[10px] tracking-[0.35em] text-amber-200/80">剧 情 摘 要</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>
          <ol className="relative space-y-3 border-l border-amber-200/20 pl-5">
            {SUMMARY.map((s) => (
              <li key={s.time} className="relative">
                <span className="absolute -left-[22px] top-1.5 h-2 w-2 rounded-full bg-amber-200/80 shadow-[0_0_8px_rgba(252,211,77,0.6)]" />
                <div className="text-[10px] tracking-[0.3em] text-amber-200/70">{s.time}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-white/85">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 角色最终图谱 */}
        <section className="mx-auto mt-8 max-w-md">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-white/15" />
            <span className="text-[10px] tracking-[0.35em] text-amber-200/80">角 色 最 终 图 谱</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>

          {/* 中心 — 温棠 */}
          <div className="mb-4 flex flex-col items-center">
            {(() => {
              const me = getCharacter("wentang");
              return (
                <>
                  <div className="relative">
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-amber-200/40 to-rose-300/30 blur-md" />
                    <img
                      src={me?.img}
                      alt={me?.name}
                      className="relative h-16 w-16 rounded-full object-cover ring-2 ring-amber-200/60"
                    />
                  </div>
                  <div className="mt-2 font-brush text-[16px] tracking-[0.2em]">{me?.name}</div>
                  <div className="text-[10px] tracking-[0.3em] text-amber-200/80">贵 妃 · 你</div>
                </>
              );
            })()}
          </div>

          <div className="space-y-2.5">
            {FINAL_GRAPH.map((g) => {
              const ch = getCharacter(g.id);
              if (!ch) return null;
              return (
                <div
                  key={g.id}
                  className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r ${g.tone} px-3 py-2.5 backdrop-blur-sm`}
                >
                  <img src={ch.img} alt={ch.name} className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-1 ring-white/20" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium text-white">{ch.name}</span>
                      <span className="text-[9px] tracking-widest text-white/50">{ch.role}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/75">{g.relation}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-[11px] text-rose-200">
                      <Heart size={10} className="fill-rose-200" />
                      <span className="font-mono tabular-nums">{g.affinity}</span>
                    </div>
                    <div className="mt-1 h-1 w-14 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-amber-200 to-rose-300"
                        style={{ width: `${g.affinity}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 底部按钮 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/55 px-4 pb-6 pt-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center gap-2.5">
          <button
            onClick={() => navigate({ to: "/scene" })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-amber-200/40 bg-white/5 py-3 text-[13px] font-medium text-amber-100 backdrop-blur active:scale-[0.99]"
          >
            <Star size={14} />
            高光时刻
          </button>
          <button
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#7a2a2a] py-3 text-[13px] font-medium text-white shadow-[0_2px_12px_rgba(0,0,0,0.4)] active:scale-[0.99]"
          >
            <Share2 size={14} />
            分享体验
          </button>
        </div>
      </div>
    </div>
  );
}

function EndingPage() {
  return (
    <PhoneMockup>
      <Ending />
    </PhoneMockup>
  );
}
