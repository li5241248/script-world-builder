import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Share2, MoreHorizontal, Calendar, User, Heart, Sparkles, Lock } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { CHARACTERS, getCharacter } from "@/lib/characters";

export const Route = createFileRoute("/character/$id")({
  loader: ({ params }) => {
    const c = getCharacter(params.id);
    if (!c) throw notFound();
    return c;
  },
  component: () => (
    <PhoneMockup>
      <CharacterDetail />
    </PhoneMockup>
  ),
  notFoundComponent: () => (
    <PhoneMockup>
      <div className="grid h-full place-items-center">
        <div className="text-center">
          <p className="text-sm text-neutral-500">未找到该人物</p>
          <Link to="/" className="mt-3 inline-block text-rose-700 underline">返回首页</Link>
        </div>
      </div>
    </PhoneMockup>
  ),
  errorComponent: ({ error }) => (
    <PhoneMockup>
      <div className="grid h-full place-items-center px-6 text-center text-sm text-neutral-500">
        {error.message}
      </div>
    </PhoneMockup>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "人物"} · 画堂春` },
      { name: "description", content: loaderData?.desc ?? "" },
    ],
  }),
});

function CharacterDetail() {
  const navigate = useNavigate();
  const c = Route.useLoaderData();

  const attrs = [
    { icon: Calendar, label: "年龄", value: `${c.age} 岁` },
    { icon: User, label: "身份", value: c.identity },
    { icon: Heart, label: "性格", value: c.personality },
    { icon: Sparkles, label: "擅长", value: c.skill },
    { icon: Lock, label: "秘密", value: c.secret },
  ];

  // Layout: center node + up to 4 around
  const others = c.relations
    .map((r: { id: string; label: string }) => ({ rel: r, char: getCharacter(r.id) }))
    .filter((x: { char: ReturnType<typeof getCharacter> }) => !!x.char) as { rel: { id: string; label: string }; char: NonNullable<ReturnType<typeof getCharacter>> }[];

  const top = others.slice(0, 2);
  const bottom = others.slice(2, 4);

  return (
    <div className="relative h-full bg-white text-neutral-900">
    <div className="relative h-full overflow-y-auto bg-white text-neutral-900 no-scrollbar">
      {/* HERO portrait */}
      <section className="relative h-[55vh] min-h-[460px] w-full overflow-hidden">
        <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 70%, #ffffff 100%)" }} />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-12">
          <button
            onClick={() => navigate({ to: "/" })}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md"
            aria-label="返回"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md">
              <Share2 className="h-4 w-4 text-white" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-md">
              <MoreHorizontal className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Name + motto */}
        <div className="absolute left-6 top-24 z-10 max-w-[60%]">
          <h1 className="font-brush text-[64px] leading-[0.95] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-[0.05em]">
            {c.name}
          </h1>
          {c.motto && (
            <p className="mt-3 text-[12px] leading-6 text-white/85 drop-shadow">
              {c.motto}
            </p>
          )}
        </div>
      </section>

      {/* Attributes card */}
      <section className="-mt-10 px-5">
        <div className="rounded-2xl border border-black/5 bg-white/85 p-4 shadow-[0_12px_30px_-15px_rgba(0,0,0,0.18)] backdrop-blur-sm">
          <ul className="divide-y divide-black/5">
            {attrs.map((a) => (
              <li key={a.label} className="flex items-center gap-3 py-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-black/[0.04]">
                  <a.icon className="h-3.5 w-3.5 text-neutral-500" />
                </span>
                <span className="w-12 shrink-0 text-[12px] text-neutral-500">{a.label}</span>
                <span className="text-[13px] leading-6 text-neutral-800">{a.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Relations */}
      <section className="mt-8 px-5">
        <div className="flex items-center gap-2 px-1">
          <span className="font-brush" style={{ color: "var(--rouge)" }}>❀</span>
          <h2 className="font-brush text-lg text-neutral-900">人物关系</h2>
        </div>

        <div className="relative mt-5 grid grid-cols-3 items-center gap-3 px-2">
          {/* connecting lines */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <g stroke="oklch(0.48 0.12 20 / 0.35)" strokeWidth="1" strokeDasharray="3 3" fill="none">
              <line x1="20%" y1="22%" x2="50%" y2="50%" />
              <line x1="80%" y1="22%" x2="50%" y2="50%" />
              <line x1="20%" y1="78%" x2="50%" y2="50%" />
              <line x1="80%" y1="78%" x2="50%" y2="50%" />
            </g>
          </svg>

          {/* top row */}
          <RelationNode item={top[0]} />
          <div />
          <RelationNode item={top[1]} />

          {/* center */}
          <div />
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)]">
              <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
            </div>
            <span className="mt-2 text-[12px] font-medium text-neutral-900">{c.name}</span>
          </div>
          <div />

          {/* bottom row */}
          <RelationNode item={bottom[0]} />
          <div />
          <RelationNode item={bottom[1]} />
        </div>
      </section>

      {/* Story */}
      <section className="mt-10 px-5">
        <div className="flex items-center gap-2 px-1">
          <span className="font-brush" style={{ color: "var(--rouge)" }}>❀</span>
          <h2 className="font-brush text-lg text-neutral-900">人物故事</h2>
        </div>
        <p className="mt-3 px-1 text-[13px] leading-7 text-neutral-700">{c.story}</p>
      </section>

      {/* All characters strip */}
      <section className="mt-10 px-5 pb-28">
        <div className="flex items-center gap-2 px-1">
          <span className="font-brush" style={{ color: "var(--rouge)" }}>❀</span>
          <h2 className="font-brush text-lg text-neutral-900">其他角色</h2>
        </div>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-2">
          {CHARACTERS.filter((x) => x.id !== c.id).map((x) => (
            <Link
              key={x.id}
              to="/character/$id"
              params={{ id: x.id }}
              className="relative h-[110px] w-[80px] shrink-0 overflow-hidden rounded-xl border border-black/5"
            >
              <img src={x.img} alt={x.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-1 text-center text-[11px] text-white">{x.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>

      {/* CTA — fixed to phone screen */}
      <div className="absolute bottom-6 right-5 z-30">
        <button
          className="grid h-20 w-20 place-items-center rounded-full text-white shadow-[var(--shadow-card)] transition active:scale-95"
          style={{ background: "var(--gradient-rouge)" }}
        >
          <span className="font-brush text-base leading-tight text-center">
            选他<br />入梦
          </span>
        </button>
      </div>
    </div>
  );
}

function RelationNode({
  item,
}: {
  item?: { rel: { id: string; label: string }; char: { id: string; name: string; role: string; img: string } };
}) {
  if (!item) return <div />;
  return (
    <Link
      to="/character/$id"
      params={{ id: item.char.id }}
      className="relative z-10 flex flex-col items-center"
    >
      <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white shadow-[0_4px_14px_-6px_rgba(0,0,0,0.3)]">
        <img src={item.char.img} alt={item.char.name} className="h-full w-full object-cover" />
      </div>
      <span className="mt-1.5 text-[12px] text-neutral-800">{item.char.name}</span>
      <span className="text-[10px] text-neutral-500">{item.rel.label}</span>
    </Link>
  );
}
