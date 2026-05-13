import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, Share2, RotateCcw, ChevronLeft } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import sceneBg from "@/assets/ending-bg.jpg";
import { getCharacter } from "@/lib/characters";

export const Route = createFileRoute("/ending")({
  component: EndingPage,
  head: () => ({
    meta: [
      { title: "圆满结局 · 后宫净土" },
      { name: "description", content: "采桑宫成为后宫净土，圆满结局。" },
    ],
  }),
});

const CAST: { id: string; displayName: string; tag: string }[] = [
  { id: "wentang", displayName: "温棠", tag: "封妃" },
  { id: "peiyan", displayName: "裴琰", tag: "健康成长" },
  { id: "peiyu", displayName: "瑜儿", tag: "认母成功" },
  { id: "mama", displayName: "采桑", tag: "安居乐业" },
  { id: "empress", displayName: "皇后", tag: "母仪天下" },
  { id: "peirong", displayName: "皇帝", tag: "勤政爱民" },
];

const STATS: { label: string; value: string; suffix?: string }[] = [
  { label: "亲密度", value: "95", suffix: "%" },
  { label: "线索", value: "28", suffix: "/30" },
  { label: "正确率", value: "100", suffix: "%" },
];

function Ending() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden">
      {/* background */}
      <img
        src={sceneBg}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
      />

      {/* back */}
      <button
        onClick={() => navigate({ to: "/scene" })}
        className="absolute left-4 top-12 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur active:scale-95"
      >
        <ChevronLeft size={18} />
      </button>

      {/* main scroll */}
      <div className="relative z-10 h-full overflow-y-auto px-4 pt-32 pb-8">
        {/* paper card */}
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] bg-[#fbf5ec] px-6 pt-9 pb-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]">
          {/* subtle inner border */}
          <div className="pointer-events-none absolute inset-2 rounded-[22px] ring-1 ring-[#7a2a2a]/5" />

          {/* title */}
          <h1 className="text-center font-brush text-[26px] leading-tight tracking-wide text-[#2b1a14]">
            <span className="text-[#7a2a2a]">【圆满结局】</span>后宫净土
          </h1>

          {/* divider */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-[#7a2a2a]/30" />
            <span className="text-[10px] text-[#7a2a2a]/70">❀</span>
            <span className="h-px w-12 bg-[#7a2a2a]/30" />
          </div>

          {/* body */}
          <p className="mt-5 text-center text-[14px] leading-[2] text-[#3a2a22]">
            温棠封妃，裴琰健康成长，<br />
            瑜儿终认生母，<br />
            采桑宫成为后宫净土。
          </p>

          {/* hairline */}
          <div className="mx-auto mt-6 h-px w-full bg-[#7a2a2a]/10" />

          {/* cast */}
          <div className="mt-5 grid grid-cols-6 gap-1.5">
            {CAST.map((c) => {
              const ch = getCharacter(c.id);
              return (
                <div key={c.id} className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-[#d4a373] to-[#7a2a2a]/60" />
                    <img
                      src={ch?.img}
                      alt={c.displayName}
                      className="relative h-11 w-11 rounded-full object-cover"
                    />
                  </div>
                  <div className="mt-1.5 text-[11px] text-[#2b1a14]">{c.displayName}</div>
                  <div className="mt-1 rounded-full bg-[#f1e6d4] px-1.5 py-[2px] text-[9px] leading-none text-[#7a2a2a]">
                    {c.tag}
                  </div>
                </div>
              );
            })}
          </div>

          {/* stats */}
          <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl bg-[#f3e8d4]/70">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center py-3 ${i < STATS.length - 1 ? "border-r border-[#7a2a2a]/10" : ""}`}
              >
                <div className="text-[11px] text-[#3a2a22]/70">{s.label}</div>
                <div className="mt-1 font-brush text-[20px] leading-none text-[#7a2a2a]">
                  {s.value}
                  <span className="text-[12px]">{s.suffix}</span>
                </div>
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className="mt-5 flex items-center gap-2">
            <button className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[#7a2a2a]/40 bg-white py-2.5 text-[12px] text-[#7a2a2a] active:scale-[0.99]">
              <Download size={13} />
              保存结局
            </button>
            <button className="flex flex-[1.2] items-center justify-center gap-1.5 rounded-full bg-[#7a2a2a] py-2.5 text-[13px] font-medium text-white shadow-[0_6px_16px_-6px_rgba(122,42,42,0.6)] active:scale-[0.99]">
              <Share2 size={14} />
              分享
            </button>
            <button
              onClick={() => navigate({ to: "/lobby" })}
              className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[#7a2a2a]/40 bg-white py-2.5 text-[12px] text-[#7a2a2a] active:scale-[0.99]"
            >
              <RotateCcw size={13} />
              再玩一次
            </button>
          </div>
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
