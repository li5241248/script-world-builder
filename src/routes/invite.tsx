import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Link2, QrCode, MessageCircle, Check } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { CHARACTERS } from "@/lib/characters";

export const Route = createFileRoute("/invite")({
  component: InvitePage,
  head: () => ({
    meta: [
      { title: "邀请队友 · 画堂春" },
      { name: "description", content: "邀请 3-6 位玩家，一起入梦画堂春。" },
    ],
  }),
});

type Slot =
  | { kind: "host"; charId: string }
  | { kind: "filled"; charId: string; ready: boolean }
  | { kind: "empty"; index: number };

function Invite() {
  const navigate = useNavigate();

  // Demo: host = wentang (you), one friend joined as peiyan
  const [slots] = useState<Slot[]>([
    { kind: "host", charId: "wentang" },
    { kind: "filled", charId: "peiyan", ready: true },
    { kind: "empty", index: 3 },
    { kind: "empty", index: 4 },
    { kind: "empty", index: 5 },
    { kind: "empty", index: 6 },
  ]);

  const filledCount = slots.filter((s) => s.kind !== "empty").length;

  return (
    <div className="relative h-full overflow-y-auto bg-white pb-28 no-scrollbar">
      <div className="px-5 pt-12">
        <h1 className="font-brush text-[28px] text-neutral-900">邀请队友</h1>
        <p className="mt-1 text-[12px] text-neutral-500">
          邀请 3-6 位玩家一起游戏 · 已就位 {filledCount}/6
        </p>

        {/* Player slots — hexagon-ish rounded cards */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {slots.map((s, i) => (
            <SlotCard key={i} slot={s} />
          ))}
        </div>

        {/* Invite methods */}
        <div className="mt-8">
          <div className="text-[13px] font-medium text-neutral-900">邀请方式</div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <InviteMethod icon={<MessageCircle className="h-5 w-5 text-emerald-600" />} label="微信邀请" />
            <InviteMethod icon={<Link2 className="h-5 w-5 text-neutral-700" />} label="复制链接" />
            <InviteMethod icon={<QrCode className="h-5 w-5 text-neutral-700" />} label="二维码邀请" />
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute inset-x-0 bottom-0 flex gap-3 border-t border-black/5 bg-white/95 px-5 py-4 backdrop-blur">
        <button
          onClick={() => navigate({ to: "/lobby" })}
          className="h-12 flex-1 rounded-full border border-black/15 bg-white text-[13px] text-neutral-700 transition active:scale-[0.98]"
        >
          上一步
        </button>
        <button
          onClick={() => navigate({ to: "/confirm" })}
          className="h-12 flex-1 rounded-full text-white shadow-[var(--shadow-card)] transition active:scale-[0.98]"
          style={{ background: "var(--gradient-rouge)" }}
        >
          <span className="font-brush text-base tracking-wider">下一步</span>
        </button>
      </div>
    </div>
  );
}

function SlotCard({ slot }: { slot: Slot }) {
  if (slot.kind === "empty") {
    return (
      <div className="relative flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-neutral-50/40">
        <div className="absolute top-3 text-[10px] text-neutral-400">{slot.index}号位</div>
        <Plus className="h-6 w-6 text-neutral-400" />
        <div className="mt-1 text-[11px] text-neutral-500">邀请</div>
      </div>
    );
  }

  const c = CHARACTERS.find((x) => x.id === slot.charId)!;
  const isHost = slot.kind === "host";

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-black/10">
      <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-2.5 py-2">
        <div className="flex items-center gap-1">
          <span className="font-brush text-[15px] text-white">{isHost ? "你" : c.name}</span>
          {isHost && (
            <span className="rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] text-neutral-700">
              剧本总策划
            </span>
          )}
        </div>
        {!isHost && (
          <div className="mt-0.5 inline-flex items-center gap-0.5 text-[9px] text-emerald-300">
            <Check className="h-2.5 w-2.5" /> 已准备
          </div>
        )}
        {isHost && <div className="mt-0.5 text-[9px] text-white/70">{c.name}</div>}
      </div>
    </div>
  );
}

function InviteMethod({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-white py-3 transition active:scale-95">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-50">{icon}</span>
      <span className="text-[11px] text-neutral-600">{label}</span>
    </button>
  );
}

function InvitePage() {
  return (
    <PhoneMockup>
      <Invite />
    </PhoneMockup>
  );
}
