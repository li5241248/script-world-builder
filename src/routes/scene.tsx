import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, MoreHorizontal, Send, Sparkles, Mic, BookOpen, Feather, Lightbulb } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import bg from "@/assets/matching-bg.png";
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
  const [mode, setMode] = useState<"say" | "do">("say");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { kind: "me", text: t, mode }]);
    setInput("");
    // simulated reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          kind: "dialog",
          charId: "peirong",
          text: "嗯……你倒是比朕想的更沉得住气。",
        },
      ]);
    }, 900);
  };

  return (
    <div className="relative h-full overflow-hidden bg-neutral-900 text-white">
      {/* atmospheric background */}
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,24,0.85) 0%, rgba(20,16,24,0.55) 30%, rgba(20,16,24,0.92) 100%)",
        }}
      />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-3">
        <button
          onClick={() => navigate({ to: "/lobby" })}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <div className="text-[11px] tracking-[0.3em] text-white/60">第一幕</div>
          <div className="font-brush text-[18px] tracking-[0.2em]">雪 夜 承 宠</div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur active:scale-95">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* progress */}
      <div className="relative z-10 mx-4 mb-2 flex items-center gap-2 text-[10px] text-white/50">
        <BookOpen size={12} />
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[18%] bg-gradient-to-r from-amber-300 to-rose-300" />
        </div>
        <span>1 / 6</span>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 pb-32"
        style={{ height: "calc(100% - 200px)" }}
      >
        <div className="space-y-4 py-2">
          {messages.map((m, i) => (
            <Bubble key={i} m={m} />
          ))}
        </div>
      </div>

      {/* quick suggestions */}
      <div className="absolute bottom-[88px] left-0 right-0 z-10 flex gap-2 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden">
        {[
          "向皇上行礼",
          "提及画堂旧事",
          "沉默不语",
          "询问皇上召见缘由",
        ].map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="flex-shrink-0 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur active:scale-95"
          >
            <Sparkles size={10} className="mr-1 inline opacity-70" />
            {s}
          </button>
        ))}
      </div>

      {/* input bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/60 px-3 pb-6 pt-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-white/10 p-0.5 text-[11px]">
            <button
              onClick={() => setMode("say")}
              className={`rounded-full px-2.5 py-1 transition ${mode === "say" ? "bg-white text-neutral-900" : "text-white/70"}`}
            >
              说
            </button>
            <button
              onClick={() => setMode("do")}
              className={`rounded-full px-2.5 py-1 transition ${mode === "do" ? "bg-white text-neutral-900" : "text-white/70"}`}
            >
              动作
            </button>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={mode === "say" ? "以温棠的身份开口…" : "描述一个动作，如：低头敛眸"}
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/40"
            />
            <Mic size={16} className="text-white/50" />
          </div>
          <button
            onClick={send}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-neutral-900 active:scale-95"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  if (m.kind === "narration") {
    return (
      <div className="mx-auto max-w-[88%] text-center">
        <div className="mx-auto mb-2 h-px w-10 bg-white/20" />
        <p className="font-brush text-[13px] leading-relaxed tracking-wider text-white/70">
          {m.text}
        </p>
        <div className="mx-auto mt-2 h-px w-10 bg-white/20" />
      </div>
    );
  }

  if (m.kind === "me") {
    const me = getCharacter("wentang")!;
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-[78%]">
          <div className="mb-1 text-right text-[10px] text-white/50">温棠（我）</div>
          {m.mode === "do" ? (
            <div className="rounded-2xl rounded-tr-sm border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-[13px] italic text-amber-100">
              *{m.text}*
            </div>
          ) : (
            <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-amber-200 to-rose-300 px-3 py-2 text-[13px] text-neutral-900">
              {m.text}
            </div>
          )}
        </div>
        <img src={me.img} alt={me.name} className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-white/30" />
      </div>
    );
  }

  if (m.kind === "prompt") {
    const me = getCharacter("wentang")!;
    const [open, setOpen] = useState(false);
    const hints = [
      { title: "惊喜，连忙整理仪容", hint: "皇帝注意到你的慌乱与真诚" },
      { title: "惊慌，不知所措", hint: "皇帝感受到了你的紧张" },
      { title: "平静，这只是意外", hint: "皇帝对你的淡然有些意外" },
    ];
    return (
      <div className="-mx-4 my-4 animate-fade-up">
        <div className="relative h-[110px] w-full overflow-hidden">
          <img
            src={me.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,16,24,0.75) 0%, rgba(20,16,24,0.35) 55%, rgba(20,16,24,0) 100%)",
            }}
          />
          <div className="relative z-10 flex h-full items-center px-5">
            <div className="flex-1">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Feather size={10} className="text-amber-200/90" />
                <span className="text-[9px] tracking-[0.35em] text-amber-200/80">剧 情 提 示</span>
              </div>
              <p className="max-w-[78%] text-[14px] font-medium leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {m.text}
              </p>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="灵感提示"
              className={`relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 backdrop-blur-md transition active:scale-95 ${
                open ? "text-white" : ""
              }`}
            >
              <Lightbulb size={15} />
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-3 space-y-2 px-4 animate-fade-up">
            {hints.map((h, i) => (
              <button
                key={i}
                className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left backdrop-blur transition hover:border-amber-200/40 hover:bg-white/[0.07] active:scale-[0.99]"
              >
                <div className="text-[14px] font-medium leading-tight text-white">{h.title}</div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/55">
                  <Lightbulb size={11} className="text-amber-300/90" />
                  <span>{h.hint}</span>
                </div>
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
        <img src={c.img} alt={c.name} className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-white/20" />
        <div className="max-w-[78%]">
          <div className="mb-1 text-[10px] text-white/50">{c.name}</div>
          <div className="rounded-2xl rounded-tl-sm border border-white/15 bg-white/5 px-3 py-2 text-[13px] italic text-white/70">
            *{m.text}*
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <img src={c.img} alt={c.name} className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-white/20" />
      <div className="max-w-[78%]">
        <div className="mb-1 text-[10px] text-white/50">
          {c.name} <span className="text-white/30">· {c.role}</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-[13px] leading-relaxed text-white/95 backdrop-blur">
          {m.text}
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
