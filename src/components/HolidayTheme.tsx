import type { CSSProperties } from "react";

/* Deterministic pseudo-random: identical output on server and client (no hydration mismatch). */
const rand = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

type Flake = {
  id: number;
  left: number;
  size: number;
  dur: number;
  delay: number;
  drift: number;
  op: number;
  star: boolean;
};

const FLAKES: Flake[] = Array.from({ length: 30 }, (_, i) => {
  const star = i % 7 === 3;
  return {
    id: i,
    left: +(rand(i, 1) * 100).toFixed(2),
    size: +(star ? 9 + rand(i, 2) * 6 : 3 + rand(i, 2) * 6).toFixed(1),
    dur: +(9 + rand(i, 3) * 12).toFixed(2),
    delay: -+(rand(i, 4) * 20).toFixed(2),
    drift: +((rand(i, 5) - 0.5) * 130).toFixed(1),
    op: +(0.3 + rand(i, 6) * 0.5).toFixed(2),
    star,
  };
});

/** Neve dourada caindo sobre a página. Decorativa, não bloqueia cliques. */
export function Snowfall() {
  return (
    <div aria-hidden className="snow-layer">
      {FLAKES.map((f) => (
        <span
          key={f.id}
          className="snow-flake"
          style={
            {
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              background: f.star ? "transparent" : undefined,
              "--flake-duration": `${f.dur}s`,
              "--flake-delay": `${f.delay}s`,
              "--flake-drift": `${f.drift}px`,
              "--flake-opacity": f.op,
            } as CSSProperties
          }
        >
          {f.star && <span className="snow-star" />}
        </span>
      ))}
    </div>
  );
}

const DROPS = [
  { x: 120, y: 30, r: 6, fill: "var(--gold)" },
  { x: 260, y: 48, r: 8, fill: "var(--wine)" },
  { x: 420, y: 58, r: 6, fill: "var(--gold)" },
  { x: 600, y: 62, r: 9, fill: "var(--wine)" },
  { x: 780, y: 58, r: 6, fill: "var(--gold)" },
  { x: 940, y: 48, r: 8, fill: "var(--wine)" },
  { x: 1080, y: 30, r: 6, fill: "var(--gold)" },
];

/** Guirlanda pendurada no topo do hero — cordão dourado com bolas de vinho e ouro. */
export function Garland({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 84" fill="none" aria-hidden className={`garland ${className}`}>
      <path d="M0 6C200 58 400 62 600 62s400-4 600-56" stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M0 2C220 46 420 50 600 50s380-4 600-48" stroke="var(--wine)" strokeOpacity="0.4" strokeWidth="1" />
      {DROPS.map((d) => (
        <g key={d.x}>
          <line x1={d.x} y1={d.y} x2={d.x} y2={d.y + 9} stroke="var(--gold)" strokeOpacity="0.7" strokeWidth="1" />
          <circle cx={d.x} cy={d.y + 9 + d.r} r={d.r} fill={d.fill} fillOpacity="0.9" />
          <circle
            cx={d.x - d.r * 0.3}
            cy={d.y + 9 + d.r - d.r * 0.35}
            r={d.r * 0.28}
            fill="var(--cream)"
            fillOpacity="0.5"
          />
        </g>
      ))}
      <path d="M340 40l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill="var(--gold)" fillOpacity="0.85" />
      <path d="M860 40l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill="var(--gold)" fillOpacity="0.85" />
    </svg>
  );
}

/** Ornamento central: linha, estrela e dois pingentes — para separar trechos. */
export function HolidayOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" fill="none" aria-hidden className={className}>
      <path d="M0 12h52" stroke="var(--gold)" strokeOpacity="0.55" strokeWidth="1" />
      <path d="M108 12h52" stroke="var(--gold)" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="58" cy="12" r="2.5" fill="var(--wine)" />
      <circle cx="102" cy="12" r="2.5" fill="var(--wine)" />
      <path d="M80 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="var(--gold)" />
    </svg>
  );
}

/** Selo "Tempo de festas" legível nos dois temas. */
export function HolidayPill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-top ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" className="h-3 w-3" aria-hidden>
        <path d="M12 2v20M4 6l16 12M20 6L4 18" />
        <path d="M12 6.5l2.4-2.4M12 6.5L9.6 4.1M12 17.5l2.4 2.4M12 17.5l-2.4 2.4" />
      </svg>
      Tempo de festas
    </span>
  );
}
