import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneMockup } from "@/components/PhoneMockup";
import goldRing from "@/assets/gold-ring.png";

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
    <div className="relative h-full overflow-hidden bg-[#f6f1e7]">
      {/* subtle paper texture vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, rgba(255,255,255,0.85), rgba(246,241,231,0) 60%), radial-gradient(80% 60% at 50% 110%, rgba(0,0,0,0.05), transparent 60%)",
        }}
      />

      {/* close */}
      <button
        onClick={() => navigate({ to: "/lobby" })}
        className="absolute right-5 top-12 z-20 text-[12px] text-neutral-500 transition active:scale-95"
      >
        取消
      </button>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
        {/* Golden ring */}
        <div className="relative h-[260px] w-[260px]">
          {/* outer ink splash */}
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(212,175,90,0.45), rgba(212,175,90,0.05) 60%, transparent 70%)",
            }}
          />
          {/* rotating gold ring */}
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #f7e3a2, #b8862f, #f7e3a2, #8a5d1c, #f7e3a2)",
              animation: "spin-slow 6s linear infinite",
              padding: "10px",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))",
            }}
          />
          {/* sparkle highlights */}
          <div
            className="absolute inset-3 rounded-full opacity-80"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), transparent 18%), radial-gradient(circle at 78% 70%, rgba(255,255,255,0.7), transparent 12%), radial-gradient(circle at 20% 75%, rgba(255,255,255,0.6), transparent 10%)",
              animation: "pulse-soft 2.4s ease-in-out infinite",
            }}
          />

          {/* inner paper disc with title */}
          <div className="absolute inset-[42px] flex items-center justify-center rounded-full bg-[#f6efe1] shadow-[inset_0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center">
              <span className="font-brush text-[44px] leading-[1.05] text-neutral-900">
                画堂春
              </span>
              <span
                className="mt-1 inline-block rounded-[3px] px-1.5 text-[9px] font-medium tracking-[0.2em] text-white"
                style={{ background: "var(--rouge)" }}
              >
                印
              </span>
            </div>
          </div>
        </div>

        {/* status */}
        <div className="mt-16 flex flex-col items-center">
          <div className="font-brush text-[32px] tracking-[0.15em] text-neutral-800">
            匹配中<span className="inline-block w-6 text-left">{dots}</span>
          </div>
          <div className="mt-2 text-[12px] tracking-[0.3em] text-neutral-400">
            正在寻找玩家
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
      `}</style>
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
