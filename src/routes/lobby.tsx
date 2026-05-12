import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Share2, Copy, Sparkles, Bot, Plus, Check, Users } from "lucide-react";
import heroImg from "@/assets/hero-huatangchun.jpg";
import { CHARACTERS } from "@/lib/characters";
import { PhoneMockup } from "@/components/PhoneMockup";

export const Route = createFileRoute("/lobby")({
  component: LobbyPage,
  head: () => ({
    meta: [
      { title: "组队入梦 · 画堂春" },
      { name: "description", content: "邀请好友，共入画堂一梦。每个角色都将由真人或 AI 演绎。" },
    ],
  }),
});

type SlotState = {
  charId: string;
  player: { kind: "you" } | { kind: "friend"; name: string; avatar?: string } | { kind: "ai" } | { kind: "empty" };
};

const INITIAL_SLOTS: SlotState[] = [
  { charId: "wentang", player: { kind: "you" } },
  { charId: "peiyan", player: { kind: "friend", name: "阿瑜" } },
  { charId: "peirong", player: { kind: "ai" } },
  { charId: "peiyu", player: { kind: "empty" } },
  { charId: "empress", player: { kind: "empty" } },
  { charId: "mama", player: { kind: "ai" } },
];

function Lobby() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<SlotState[]>(INITIAL_SLOTS);
  const [copied, setCopied] = useState(false);
  const roomCode = "HTC-2026";

  const fillWithAI = (i: number) => {
    setSlots((s) => s.map((v, idx) => (idx === i ? { ...v, player: { kind: "ai" } } : v)));
  };

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(roomCode); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const filled = slots.filter((s) => s.player.kind !== "empty").length;

  return (
    <div className="relative h-full bg-white">
      <div className="relative h-full overflow-y-auto pb-32 text-foreground no-scrollbar">
        {/* HEADER */}
        <section className="relative h-[34vh] min-h-[260px] w-full overflow-hidden">
          <img src={heroImg} alt="画堂春" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 75%, #ffffff 100%)" }} />

          <div className="relative z-10 flex items-center justify-between px-5 pt-12">
            <button
              onClick={() => navigate({ to: "/" })}
              className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md">
              <Share2 className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="relative z-10 mt-4 px-6">
            <h1 className="font-brush text-[44px] leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              组队入梦
            </h1>
            <p className="mt-2 text-[12px] text-white/85">邀请好友共赴一场《画堂春》</p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/85">
              <Users className="h-3 w-3" />
              <span>{filled} / {slots.length} 人已就位</span>
            </div>
          </div>
        </section>

        {/* ROOM CODE */}
        <section className="-mt-6 px-5">
          <div className="relative z-10 flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-[var(--shadow-card)]">
            <div>
              <div className="text-[10px] tracking-widest text-neutral-400">房间号</div>
              <div className="mt-0.5 font-display text-[18px] tracking-[0.18em] text-neutral-900">{roomCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 rounded-full bg-black/[0.06] px-3 py-2 text-[12px] text-neutral-700 transition active:scale-95"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
        </section>

        {/* SLOTS */}
        <section className="mt-6 px-5">
          <div className="flex items-center gap-2">
            <span className="font-brush" style={{ color: "var(--rouge)" }}>❀</span>
            <h2 className="font-brush text-xl text-neutral-900">角色就位</h2>
          </div>

          <div className="mt-4 space-y-2.5">
            {slots.map((slot, i) => {
              const c = CHARACTERS.find((x) => x.id === slot.charId)!;
              const p = slot.player;
              return (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-2.5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-brush text-lg text-neutral-900">{c.name}</span>
                      <span className="text-[10px] text-neutral-400">{c.gender} · {c.age}岁</span>
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-neutral-500">
                      {p.kind === "you" && <span style={{ color: "var(--rouge)" }}>● 你饰演</span>}
                      {p.kind === "friend" && <span className="text-neutral-700">● {p.name}（好友）</span>}
                      {p.kind === "ai" && <span className="text-neutral-500"><Bot className="mr-1 inline h-3 w-3" />AI 演绎</span>}
                      {p.kind === "empty" && <span className="text-neutral-400">等待加入…</span>}
                    </div>
                  </div>
                  {p.kind === "empty" ? (
                    <button
                      onClick={() => fillWithAI(i)}
                      className="rounded-full bg-black/[0.06] px-3 py-1.5 text-[11px] text-neutral-700 transition active:scale-95"
                    >
                      <Bot className="mr-1 inline h-3 w-3" />AI 顶替
                    </button>
                  ) : p.kind === "you" ? (
                    <span className="rounded-full px-3 py-1.5 text-[11px] text-white" style={{ background: "var(--gradient-rouge)" }}>
                      我
                    </span>
                  ) : (
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.06] text-neutral-500">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-black/15 bg-white py-3 text-[12px] text-neutral-500 transition active:scale-[0.98]">
            <Plus className="h-3.5 w-3.5" />
            邀请好友入梦
          </button>
        </section>

        {/* AI tip */}
        <section className="mt-6 px-5">
          <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--rouge)" }} />
              <span className="text-[12px] font-medium text-neutral-900">AI 群像演绎</span>
            </div>
            <p className="mt-2 text-[12px] leading-6 text-neutral-600">
              空缺的席位将由 AI 实时演绎，每个角色都拥有独立的性格与记忆，与真人玩家自然交织出独一无二的剧情。
            </p>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="absolute inset-x-5 bottom-6 z-30">
        <button
          className="flex h-14 w-full items-center justify-center rounded-full text-white shadow-[var(--shadow-card)] transition active:scale-[0.98]"
          style={{ background: "var(--gradient-rouge)" }}
        >
          <span className="font-brush text-lg tracking-wider">入梦启幕</span>
        </button>
      </div>
    </div>
  );
}

function LobbyPage() {
  return (
    <PhoneMockup>
      <Lobby />
    </PhoneMockup>
  );
}
