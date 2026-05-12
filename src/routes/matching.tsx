import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneMockup } from "@/components/PhoneMockup";
import bg from "@/assets/matching-bg.png";
import seal from "@/assets/huatangchun-seal.png";

export const Route = createFileRoute("/matching")({
  component: MatchingPage,
  head: () => ({
    meta: [
      { title: "匹配中 · 画堂春" },
      { name: "description", content: "正在为你寻找入梦的旅人…" },
    ],
  }),
});

function Matching() {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const i = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 450);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      {/* background image */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* dark vignette for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* close */}
      <button
        onClick={() => navigate({ to: "/lobby" })}
        className="absolute right-5 top-12 z-20 text-[12px] text-white/80 transition active:scale-95"
      >
        取消
      </button>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
        {/* Red seal */}
        <img
          src={seal}
          alt="画堂春"
          className="h-[220px] w-[220px] object-contain"
          style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
        />

        {/* status */}
        <div className="mt-14 flex flex-col items-center">
          <div className="font-brush text-[32px] tracking-[0.15em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            匹配中<span className="inline-block w-6 text-left">{dots}</span>
          </div>
          <div className="mt-2 text-[12px] tracking-[0.3em] text-white/80">
            正在寻找玩家
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchingPage() {
  return (
    <PhoneMockup>
      <Matching />
    </PhoneMockup>
  );
}
