import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, Heart, CloudRain, KeyRound, ChevronLeft, RotateCcw } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import sceneBg from "@/assets/scene-huatang.jpg";

export const Route = createFileRoute("/ending")({
  component: EndingPage,
  head: () => ({
    meta: [
      { title: "结局 · 入梦画堂" },
      { name: "description", content: "基于你的选择，AI 为你生成的三种结局。" },
    ],
  }),
});

type Ending = {
  kind: "perfect" | "regret" | "hidden";
  label: string;
  title: string;
  body: string;
  affinity: string;
  icon: typeof Heart;
  accent: string;
};

const ENDINGS: Ending[] = [
  {
    kind: "perfect",
    label: "圆满结局",
    title: "采桑宫的春天",
    body: "温棠封妃，裴琰健康成长，瑜儿终认生母，采桑宫成为后宫净土。雪夜承宠的那盏灯，从此再未熄灭。",
    affinity: "皇上 +85 · 三皇子 +92 · 二皇子 +60",
    icon: Heart,
    accent: "from-rose-200/30 to-amber-200/20 border-rose-200/40",
  },
  {
    kind: "regret",
    label: "遗憾结局",
    title: "枣花糕凉了",
    body: "你曾走得太近，又退得太远。裴琰被送去藩地，瑜儿一生未唤你一声母亲。多年后再下雪，你想起那句没说出口的话。",
    affinity: "皇上 +40 · 三皇子 +55 · 二皇子 +28",
    icon: CloudRain,
    accent: "from-slate-300/20 to-indigo-300/10 border-slate-200/30",
  },
  {
    kind: "hidden",
    label: "隐藏结局",
    title: "画堂春雪",
    body: "你识破了仇公公背后的局，与裴琰联手扳倒了真正的幕后之人。深宫旧账一夜翻篇，而你选择脱簪出宫，雪中只留一行小字：「我自有我的春天。」",
    affinity: "解锁条件：「采桑宫温居」+ 关键选择「不应允」",
    icon: KeyRound,
    accent: "from-amber-300/30 to-rose-300/20 border-amber-200/50",
  },
];

function Ending() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden bg-neutral-950 text-white">
      <img src={sceneBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950" />

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

      <div className="relative z-10 h-[calc(100%-72px)] overflow-y-auto px-4 pb-10">
        {/* intro */}
        <div className="mx-auto mt-2 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center backdrop-blur-sm">
          <div className="mb-1.5 flex items-center justify-center gap-1.5">
            <Sparkles size={11} className="text-amber-200" />
            <span className="text-[9px] tracking-[0.35em] text-amber-200/90">A I · 推 演</span>
            <Sparkles size={11} className="text-amber-200" />
          </div>
          <p className="text-[12px] leading-relaxed text-white/75">
            基于你的选择路径、亲密度数据与互动行为，AI 为你推演了三种可能的结局。
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-md space-y-4">
          {ENDINGS.map((e) => {
            const Icon = e.icon;
            return (
              <div
                key={e.kind}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${e.accent} px-5 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md animate-fade-up`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40">
                    <Icon size={13} className="text-amber-100" />
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-amber-100/90">【{e.label}】</span>
                </div>
                <div className="font-brush text-[20px] tracking-[0.15em] text-white drop-shadow">
                  {e.title}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-white/90">{e.body}</p>
                <div className="mt-3 border-t border-white/10 pt-2 text-[10px] tracking-wider text-white/55">
                  {e.affinity}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-2">
          <button
            onClick={() => navigate({ to: "/lobby" })}
            className="flex items-center justify-center gap-2 rounded-full bg-[#7a2a2a] py-3 text-[13px] font-medium text-white shadow-[0_2px_12px_rgba(0,0,0,0.4)] active:scale-[0.99]"
          >
            <RotateCcw size={14} />
            重启一段戏
          </button>
          <button
            onClick={() => navigate({ to: "/scene" })}
            className="rounded-full border border-white/15 bg-white/5 py-3 text-[12px] text-white/80 backdrop-blur active:scale-[0.99]"
          >
            返回画堂
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
