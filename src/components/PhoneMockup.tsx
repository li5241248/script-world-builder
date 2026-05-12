import type { ReactNode } from "react";

export function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% 10%, oklch(0.92 0.04 30 / 0.7), transparent 60%), radial-gradient(900px 600px at 90% 90%, oklch(0.88 0.06 20 / 0.6), transparent 60%), oklch(0.18 0.02 30)",
      }}
    >
      <div className="relative" style={{ width: 390, height: 844 }}>
        <div
          className="absolute inset-0 rounded-[56px] bg-neutral-900"
          style={{
            boxShadow:
              "0 50px 120px -20px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.06) inset, 0 0 0 12px #0a0a0a",
          }}
        />
        <div className="absolute inset-[12px] overflow-hidden rounded-[46px] bg-white">
          <div className="pointer-events-none absolute left-1/2 top-2 z-50 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-7 pt-3 text-[12px] font-semibold text-white mix-blend-difference">
            <span>9:41</span>
            <span className="opacity-0">·</span>
            <span>􀋙 􀛨 􀛪</span>
          </div>
          {children}
        </div>
        <div className="absolute -left-[3px] top-[120px] h-[32px] w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -left-[3px] top-[180px] h-[60px] w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -left-[3px] top-[260px] h-[60px] w-[3px] rounded-l bg-neutral-800" />
        <div className="absolute -right-[3px] top-[200px] h-[100px] w-[3px] rounded-r bg-neutral-800" />
      </div>
    </div>
  );
}
