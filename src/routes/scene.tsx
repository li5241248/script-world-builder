import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, MoreHorizontal, Send, Sparkles, Mic, BookOpen, Feather, Lightbulb, Volume2, Asterisk } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import sceneBg from "@/assets/scene-huatang.jpg";
import { CHARACTERS, getCharacter } from "@/lib/characters";

export const Route = createFileRoute("/scene")({
  component: ScenePage,
  head: () => ({
    meta: [
      { title: "第一幕 · 画堂春" },
      { name: "description", content: "入梦画堂，开启你的角色对话。" },
    ],
  }),
});

type Msg =
  | { kind: "narration"; text: string }
  | { kind: "dialog"; charId: string; text: string }
  | { kind: "action"; charId: string; text: string }
  | { kind: "prompt"; text: string }
  | { kind: "me"; text: string; mode: "say" | "do" };

const INITIAL: Msg[] = [
  {
    kind: "narration",
    text: "入宫十年，温棠早已习惯了被遗忘的滋味。今夜，窗外雪落无声，采桑宫偏殿里，她独自坐着，手边摆着一碟枣花糕——这是她唯一拿得出手的东西。",
  },
  { kind: "dialog", charId: "mama", text: "贵人，仇公公来了，说……说陛下今夜要翻您的牌子。" },
  { kind: "dialog", charId: "peirong", text: "朕问你，想不想抚育三皇子琰儿？" },
  { kind: "prompt", text: "听到这个消息，你心里……" },
];

function Scene() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [pickedPromptIdx, setPickedPromptIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Detect action mode from `（…）` wrapping
  const detectMode = (raw: string): { mode: "say" | "do"; text: string } => {
    const t = raw.trim();
    const m = t.match(/^（([\s\S]+)）$/);
    if (m) return { mode: "do", text: m[1].trim() };
    return { mode: "say", text: t };
  };

  const insertActionMarkers = () => {
    const el = inputRef.current;
    if (!el) return;
    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;
    const before = input.slice(0, start);
    const selected = input.slice(start, end);
    const after = input.slice(end);
    const next = `${before}（${selected}）${after}`;
    setInput(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = before.length + 1 + selected.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const send = () => {
    const { mode, text } = detectMode(input);
    if (!text) return;
    setMessages((m) => [...m, { kind: "me", text, mode }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { kind: "dialog", charId: "peirong", text: "嗯……你倒是比朕想的更沉得住气。" },
      ]);
    }, 900);
  };

  const pickHint = (_promptIndex: number, text: string) => {
    const wrapped = `（${text}）`;
    setInput(wrapped);
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(wrapped.length, wrapped.length);
    });
  };



  return (
    <div className="relative h-full overflow-hidden bg-neutral-900 text-white">
      {/* full-bleed scene background */}
      <img src={sceneBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* soft top + bottom vignette only — keep image clear */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,24,0.55) 0%, rgba(20,16,24,0) 18%, rgba(20,16,24,0) 60%, rgba(20,16,24,0.7) 100%)",
        }}
      />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-3">
        <button
          onClick={() => navigate({ to: "/lobby" })}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          <div className="text-[11px] tracking-[0.3em] text-white/80">第一幕</div>
          <div className="font-brush text-[18px] tracking-[0.2em]">雪 夜 承 宠</div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur active:scale-95">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* progress */}
      <div className="relative z-10 mx-4 mb-2 flex items-center gap-2 text-[10px] text-white/80 drop-shadow">
        <BookOpen size={12} />
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-[18%] bg-gradient-to-r from-amber-200 to-rose-200" />
        </div>
        <span>1 / 6</span>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 pb-32"
        style={{ height: "calc(100% - 200px)" }}
      >
        <div className="space-y-6 py-2">
          {messages.map((m, i) => (
            <Bubble key={i} m={m} onPickHint={(text) => pickHint(i, text)} />
          ))}

        </div>
      </div>

      {/* quick suggestions */}
      <div className="absolute bottom-[88px] left-0 right-0 z-10 flex gap-2 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden">
        {["向皇上行礼", "提及画堂旧事", "沉默不语", "询问皇上召见缘由"].map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="flex-shrink-0 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[11px] text-white backdrop-blur-md active:scale-95"
          >
            <Sparkles size={10} className="mr-1 inline opacity-80" />
            {s}
          </button>
        ))}
      </div>

      {/* input bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/55 px-3 pb-6 pt-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          {/* voice input button (replaces 说/动作 toggle) */}
          <button
            aria-label="语音输入"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white/85 active:scale-95"
          >
            <Mic size={17} />
          </button>

          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/15 px-3 py-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="以温棠的身份开口，或点（）输入动作"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/50"
            />
            <button
              onClick={insertActionMarkers}
              aria-label="输入动作"
              title="输入动作（包在（）之间）"
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white/70 hover:text-white active:scale-95"
            >
              <Asterisk size={15} />
            </button>
          </div>
          <button
            onClick={send}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-300 text-neutral-900 active:scale-95"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* shared cream bubble used by both characters and the player */
const CREAM_BUBBLE =
  "relative rounded-2xl bg-white/80 px-4 py-2.5 text-[14px] leading-relaxed text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-sm";

function Bubble({ m, onPickHint }: { m: Msg; onPickHint?: (text: string) => void }) {
  if (m.kind === "narration") {
    return (
      <div className="mx-auto max-w-[88%] text-center">
        <div className="mx-auto mb-2 h-px w-10 bg-white/40" />
        <p className="font-brush text-[13px] leading-relaxed tracking-wider text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {m.text}
        </p>
        <div className="mx-auto mt-2 h-px w-10 bg-white/40" />
      </div>
    );
  }

  if (m.kind === "me") {
    const me = getCharacter("wentang")!;
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-[78%]">
          {m.mode === "do" ? (
            <div className="rounded-2xl rounded-tr-md bg-white/65 px-4 py-2.5 text-[13px] italic text-neutral-500 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              （{m.text}）
            </div>
          ) : (
            <div className={`${CREAM_BUBBLE} rounded-tr-md`}>{m.text}</div>
          )}
        </div>
        <img
          src={me.img}
          alt={me.name}
          className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
        />
      </div>
    );
  }

  if (m.kind === "prompt") {
    const [open, setOpen] = useState(false);
    const hints = ["惊喜，连忙整理仪容", "惊慌，不知所措", "平静，这只是意外"];
    return (
      <div className="-mx-4 my-5 animate-fade-up">
        <div className="relative w-full overflow-hidden bg-black/55 backdrop-blur-md">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

          <div className="relative z-10 flex items-center gap-3 px-5 py-7">
            <div className="flex-1">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Feather size={10} className="text-amber-200/90" />
                <span className="text-[9px] tracking-[0.35em] text-amber-200/80">剧 情 提 示</span>
              </div>
              <p className="text-[14px] font-medium leading-snug text-white">
                {m.text}
              </p>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="灵感提示"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition active:scale-95"
            >
              <Lightbulb size={15} />
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-3 space-y-2 px-4 animate-fade-up">
            {hints.map((title) => (
              <button
                key={title}
                onClick={() => onPickHint?.(title)}
                className="block w-full rounded-lg bg-white/80 px-4 py-2.5 text-left text-[14px] font-medium text-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-sm transition active:scale-[0.99]"
              >
                {title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }


  const c = getCharacter(m.charId) ?? CHARACTERS[0];
  if (m.kind === "action") {
    return (
      <div className="flex gap-2">
        <img src={c.img} alt={c.name} className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
        <div className="max-w-[78%]">
          <div className="rounded-2xl rounded-tl-md border border-white/40 bg-white/15 px-4 py-2.5 text-[13px] italic text-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] backdrop-blur-md drop-shadow">
            （{m.text}）
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <img src={c.img} alt={c.name} className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
      <div className="max-w-[80%]">
        <div className={`${CREAM_BUBBLE} rounded-tl-md pr-9`}>
          {m.text}
          <button
            aria-label="播放语音"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800/80 text-white active:scale-95"
          >
            <Volume2 size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ScenePage() {
  return (
    <PhoneMockup>
      <Scene />
    </PhoneMockup>
  );
}
