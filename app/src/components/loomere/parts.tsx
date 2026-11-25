import { usePreorder } from "./preorder";

/* The knot mark: three interlaced ellipses, drawn once and reused. */
export function Knot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className ? `lm-knot ${className}` : "lm-knot"}
      fill="none"
      viewBox="0 0 32 32"
    >
      <g
        stroke="currentColor"
        strokeDasharray="16 5.5"
        strokeLinecap="round"
        strokeWidth="2.2"
      >
        <ellipse cx="16" cy="16" rx="10.4" ry="6.1" />
        <ellipse cx="16" cy="16" rx="10.4" ry="6.1" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="10.4" ry="6.1" transform="rotate(120 16 16)" />
      </g>
    </svg>
  );
}

/* Inline link whose underline is a drawn filament that travels on hover. */
export function ThreadLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="lm-threadlink" href={href}>
      <span>{label}</span>
      <svg aria-hidden="true" viewBox="0 0 54 14">
        <path d="M1 8c6-6 12 6 18 0s12 6 18 0 8 4 12 0" />
        <path d="M46 4l6 4-6 4" />
      </svg>
    </a>
  );
}

/* Hero CTA: a corner target that closes in around the label. */
export function HeroReserve() {
  const { open } = usePreorder();
  return (
    <button className="lm-herocta" onClick={() => open("coral")} type="button">
      <i />
      <i />
      <i />
      <i />
      <span>Reserve a polo</span>
    </button>
  );
}

/* Reserve CTA: a press that imprints, used once, in the preorder block. */
export function StampReserve() {
  const { open } = usePreorder();
  return (
    <button className="lm-stamp" onClick={() => open("coral")} type="button">
      <span>Reserve a polo</span>
    </button>
  );
}

const FACTS = [
  "240 gsm piqué",
  "24 gauge knit",
  "60/2 combed cotton",
  "1x1 rib collar",
  "corozo buttons",
  "garment dyed at 40C",
  "pre-shrunk 3 percent",
  "made in Prato",
  "batch of 400",
];

function MarqueeGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="lm-marquee__group">
      {FACTS.map((fact) => (
        <span className="lm-marquee__item" key={fact}>
          {fact}
        </span>
      ))}
    </div>
  );
}

export function FabricMarquee() {
  return (
    <div className="lm-marquee">
      <span className="lm-sr">Fabric facts</span>
      <div aria-hidden="true" className="lm-marquee__track">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}

type IconName =
  | "fabric"
  | "yarn"
  | "collar"
  | "button"
  | "dye"
  | "fit"
  | "care"
  | "batch"
  | "dress"
  | "post";

const PATHS: Record<IconName, string[]> = {
  fabric: ["M4 8h16M4 8v8h16V8", "M8 8v8M12 8v8M16 8v8"],
  yarn: ["M12 4a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15", "M6 15.5C10 14 14 10.5 16 5"],
  collar: ["M6 6l6 5 6-5", "M12 11v9", "M6 6v4", "M18 6v4"],
  button: [
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
    "M10.6 10.6h.01M13.4 10.6h.01M10.6 13.4h.01M13.4 13.4h.01",
  ],
  dye: ["M12 4s5 5.4 5 8.6a5 5 0 0 1-10 0C7 9.4 12 4 12 4z"],
  fit: ["M4 12h16", "M7 9l-3 3 3 3", "M17 9l3 3-3 3"],
  care: ["M5 12a7 7 0 1 1 2.1 5", "M4 13l1-4 3.6 1.6"],
  batch: ["M4 7h16", "M4 12h16", "M4 17h10"],
  dress: ["M12 4.5a1.9 1.9 0 0 1 1.9 1.9c0 1.1-1.9 1.2-1.9 2.4", "M12 9.2 4 14.2h16L12 9.2z"],
  post: ["M3 8l9-4 9 4-9 4-9-4z", "M3 8v8l9 4 9-4V8"],
};

export function LedgerIcon({ name }: { name: IconName }) {
  return (
    <span className="lm-ledger__icon">
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        {PATHS[name].map((d) => (
          <path d={d} key={d} />
        ))}
      </svg>
    </span>
  );
}
