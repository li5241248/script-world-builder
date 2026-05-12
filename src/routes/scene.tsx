import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, MoreHorizontal, Send, Sparkles, Mic, BookOpen, Feather, Lightbulb, Volume2, ChevronRight } from "lucide-react";
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
  const [mode, setMode] = useState<"say" | "do">("say");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sceneBg = getCharacter("wentang")!.img;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { kind: "me", text: t, mode }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { kind: "dialog", charId: "peirong", text: "嗯……你倒是比朕想的更沉得住气。" },
      ]);
    }, 900);
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
        <div className="space-y-3 py-2">
          {messages.map((m, i) => (
            <Bubble key={i} m={m} />
          ))}

          {/* AI 玩法 pill */}
          <div className="flex justify-center pt-1">
            <button className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] text-white/90 backdrop-blur-md active:scale-95">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-200/90 text-[9px] text-neutral-900">
                ☺
              </span>
              更多 AI 玩法，限时体验～
              <ChevronRight size={12} className="opacity-70" />
            </button>
          </div>
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
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/15 px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={mode === "say" ? "以温棠的身份开口…" : "描述一个动作，如：低头敛眸"}
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/50"
            />
            <Mic size={16} className="text-white/60" />
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
  "relative rounded-2xl bg-[#efe6d6]/92 px-4 py-2.5 text-[14px] leading-relaxed text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-sm";

function Bubble({ m }: { m: Msg }) {
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
            <div className="rounded-2xl rounded-tr-md border border-amber-200/60 bg-amber-100/85 px-4 py-2.5 text-[13px] italic text-amber-900 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              *{m.text}*
            </div>
          ) : (
            <div className={`${CREAM_BUBBLE} rounded-tr-md`}>{m.text}</div>
          )}
        </div>
        <img
          src={me.img}
          alt={me.name}
          className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-white/70 shadow"
        />
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
      <div className="-mx-4 my-3 animate-fade-up">
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
                "linear-gradient(90deg, rgba(20,16,24,0.7) 0%, rgba(20,16,24,0.3) 55%, rgba(20,16,24,0) 100%)",
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
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/90 backdrop-blur-md transition active:scale-95"
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
                className={`${CREAM_BUBBLE} block w-full text-left`}
              >
                <div className="text-[14px] font-medium leading-tight text-neutral-900">{h.title}</div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-600">
                  <Lightbulb size={11} className="text-amber-500" />
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
        <img src={c.img} alt={c.name} className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-white/70 shadow" />
        <div className="max-w-[78%]">
          <div className="rounded-2xl rounded-tl-md border border-white/40 bg-white/15 px-4 py-2.5 text-[13px] italic text-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] backdrop-blur-md drop-shadow">
            *{m.text}*
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <img src={c.img} alt={c.name} className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-white/70 shadow" />
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
