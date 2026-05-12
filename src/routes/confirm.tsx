import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Users, Clock, Landmark } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { CHARACTERS } from "@/lib/characters";
import heroImg from "@/assets/hero-huatangchun.jpg";

export const Route = createFileRoute("/confirm")({
  component: ConfirmPage,
  head: () => ({
    meta: [
      { title: "确认信息 · 画堂春" },
      { name: "description", content: "确认剧本与玩家信息，准备开始游戏。" },
    ],
  }),
});

const PLAYERS = [
  { charId: "wentang", label: "你", host: true },
  { charId: "peiyan", label: "玩家A" },
  { charId: "peirong", label: "玩家B" },
  { charId: "peiyu", label: "玩家C" },
  { charId: "empress", label: "玩家D" },
  { charId: "mama", label: "玩家E" },
];

function Confirm() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-y-auto bg-white pb-28 no-scrollbar">
      <div className="px-5 pt-12">
        <h1 className="font-brush text-[28px] text-neutral-900">确认信息</h1>
        <p className="mt-1 text-[12px] text-neutral-500">请确认以下信息，准备开始游戏</p>

        {/* Script card */}
        <div className="mt-5 flex gap-3 rounded-2xl border border-black/10 bg-neutral-50/60 p-3">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
            <img src={heroImg} alt="画堂春" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-brush text-[18px] text-neutral-900">画堂春</span>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] text-white"
                style={{ background: "var(--gradient-rouge)" }}
              >
                经典剧本
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-neutral-600">
              大梁年间，画堂之中突发命案，众人各怀心思，谁是凶手？
            </p>
            <div className="mt-1.5 flex items-center gap-3 text-[10px] text-neutral-500">
              <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />6人本</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />中等时长</span>
              <span className="inline-flex items-center gap-1"><Landmark className="h-3 w-3" />古风</span>
            </div>
          </div>
        </div>

        {/* Player list */}
        <div className="mt-6">
          <div className="mb-2 text-[13px] font-medium text-neutral-900">
            玩家列表 <span className="text-neutral-400">({PLAYERS.length}/6)</span>
          </div>
          <div className="divide-y divide-black/5 rounded-2xl border border-black/10 bg-white">
            {PLAYERS.map((p) => {
              const c = CHARACTERS.find((x) => x.id === p.charId)!;
              return (
                <div key={p.charId} className="flex items-center gap-3 px-3 py-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-brush text-[15px] text-neutral-900">{p.label}</span>
                      {p.host && (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] text-white"
                          style={{ background: "var(--gradient-rouge)" }}
                        >
                          房主
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-500">{c.name}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600">
                    已准备
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex gap-3 border-t border-black/5 bg-white/95 px-5 py-4 backdrop-blur">
        <button
          onClick={() => navigate({ to: "/invite" })}
          className="h-12 flex-1 rounded-full border border-black/15 bg-white text-[13px] text-neutral-700 transition active:scale-[0.98]"
        >
          上一步
        </button>
        <button
          onClick={() => navigate({ to: "/matching" })}
          className="h-12 flex-1 rounded-full text-white shadow-[var(--shadow-card)] transition active:scale-[0.98]"
          style={{ background: "var(--gradient-rouge)" }}
        >
          <span className="font-brush text-base tracking-wider">开始游戏</span>
        </button>
      </div>
    </div>
  );
}

function ConfirmPage() {
  return (
    <PhoneMockup>
      <Confirm />
    </PhoneMockup>
  );
}
