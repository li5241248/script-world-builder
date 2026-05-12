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
        <div className="relative h-[300px] w-[300px]">
          <img
            src={goldRing}
            alt="画堂春"
            className="absolute inset-0 h-full w-full object-contain"
          />
          {/* center title */}
          <div className="absolute inset-0 flex items-center justify-center">
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
