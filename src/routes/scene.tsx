import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, MoreHorizontal, Send, Sparkles, Mic, BookOpen } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { CHARACTERS, getCharacter } from "@/lib/characters";
import sceneBg from "@/assets/scene-bg.jpg";

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
  | { kind: "me"; text: string; mode: "say" | "do" };

const INITIAL: Msg[] = [
  {
    kind: "narration",
    text: "大梁·泰和二十年。春雨初霁，画堂深处的海棠落了一地。你是温棠，今夜，皇上召你入御书房。",
  },
  { kind: "action", charId: "mama", text: "替温棠披上一件石青色的披风，低声叮嘱。" },
  { kind: "dialog", charId: "mama", text: "姑娘，今夜万事小心。皇上召见，怕是为了二十年前那桩旧事。" },
  { kind: "dialog", charId: "peirong", text: "温棠，你来了。坐吧——朕有话问你。" },
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
    <div className="relative h-full overflow-hidden text-neutral-800">
      {/* scene background image */}
      <img
        src={sceneBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* cream wash to keep a light, readable feel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(247,241,232,0.78) 0%, rgba(243,236,225,0.85) 45%, rgba(237,227,212,0.92) 100%)",
        }}
      />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-3">
        <button
          onClick={() => navigate({ to: "/lobby" })}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-sm ring-1 ring-black/5 backdrop-blur active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <div className="text-[11px] tracking-[0.3em] text-neutral-500">第一幕</div>
          <div className="font-brush text-[18px] tracking-[0.2em] text-neutral-800">
            御 书 房 夜 召
          </div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-sm ring-1 ring-black/5 backdrop-blur active:scale-95">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* progress */}
      <div className="relative z-10 mx-4 mb-2 flex items-center gap-2 text-[10px] text-neutral-500">
        <BookOpen size={12} />
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-black/10">
          <div className="h-full w-[18%] bg-gradient-to-r from-amber-500 to-rose-400" />
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
        {["向皇上行礼", "提及画堂旧事", "沉默不语", "询问皇上召见缘由"].map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="flex-shrink-0 rounded-full border border-amber-700/20 bg-white/80 px-3 py-1.5 text-[11px] text-neutral-700 shadow-sm backdrop-blur active:scale-95"
          >
            <Sparkles size={10} className="mr-1 inline text-amber-600" />
            {s}
          </button>
        ))}
      </div>

      {/* input bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-black/5 bg-white/80 px-3 pb-6 pt-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-neutral-200/70 p-0.5 text-[11px]">
            <button
              onClick={() => setMode("say")}
              className={`rounded-full px-2.5 py-1 transition ${
                mode === "say" ? "bg-neutral-900 text-white" : "text-neutral-500"
              }`}
            >
              说
            </button>
            <button
              onClick={() => setMode("do")}
              className={`rounded-full px-2.5 py-1 transition ${
                mode === "do" ? "bg-neutral-900 text-white" : "text-neutral-500"
              }`}
            >
              动作
            </button>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-neutral-100 px-3 py-2 ring-1 ring-black/5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={mode === "say" ? "以温棠的身份开口…" : "描述一个动作，如：低头敛眸"}
              className="flex-1 bg-transparent text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400"
            />
            <Mic size={16} className="text-neutral-400" />
          </div>
          <button
            onClick={send}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-md active:scale-95"
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
        <div className="mx-auto mb-2 h-px w-10 bg-amber-700/30" />
        <p className="font-brush text-[13px] leading-relaxed tracking-wider text-neutral-600">
          {m.text}
        </p>
        <div className="mx-auto mt-2 h-px w-10 bg-amber-700/30" />
      </div>
    );
  }

  if (m.kind === "me") {
    const me = getCharacter("wentang")!;
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-[78%]">
          <div className="mb-1 text-right text-[10px] text-neutral-500">温棠（我）</div>
          {m.mode === "do" ? (
            <div className="rounded-2xl rounded-tr-sm border border-amber-500/40 bg-amber-50 px-3 py-2 text-[13px] italic text-amber-900">
              *{m.text}*
            </div>
          ) : (
            <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-amber-400 to-rose-400 px-3 py-2 text-[13px] text-white shadow-sm">
              {m.text}
            </div>
          )}
        </div>
        <img
          src={me.img}
          alt={me.name}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-black/10"
        />
      </div>
    );
  }

  const c = getCharacter(m.charId) ?? CHARACTERS[0];
  if (m.kind === "action") {
    return (
      <div className="flex gap-2">
        <img
          src={c.img}
          alt={c.name}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-black/10"
        />
        <div className="max-w-[78%]">
          <div className="mb-1 text-[10px] text-neutral-500">{c.name}</div>
          <div className="rounded-2xl rounded-tl-sm border border-neutral-300/70 bg-white/60 px-3 py-2 text-[13px] italic text-neutral-600">
            *{m.text}*
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <img
        src={c.img}
        alt={c.name}
        className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-black/10"
      />
      <div className="max-w-[78%]">
        <div className="mb-1 text-[10px] text-neutral-500">
          {c.name} <span className="text-neutral-400">· {c.role}</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[13px] leading-relaxed text-neutral-800 shadow-sm ring-1 ring-black/5">
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
