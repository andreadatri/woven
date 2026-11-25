import { useState } from "react";

import { usePreorder, type ColourwayId } from "./preorder";

type Way = {
  id: ColourwayId;
  name: string;
  swatch: string;
  img: string;
  note: string;
};

const WAYS: Way[] = [
  {
    id: "coral",
    name: "Coral",
    swatch: "var(--lm-coral)",
    img: "/assets/product/polo-coral.webp",
    note: "The shade the thread arrives in. Coral at three dips, 40 degrees.",
  },
  {
    id: "mint",
    name: "Mint",
    swatch: "var(--lm-mint)",
    img: "/assets/product/polo-mint.webp",
    note: "Celadon leaning, cooled with a green tint in the second bath.",
  },
  {
    id: "shell",
    name: "Shell",
    swatch: "var(--lm-shell)",
    img: "/assets/product/polo-shell.webp",
    note: "Warm blush, pulled early so it stays close to the skin tone.",
  },
  {
    id: "butter",
    name: "Butter",
    swatch: "var(--lm-butter)",
    img: "/assets/product/polo-butter.webp",
    note: "Cream with a yellow cast, dyed in a bath of its own.",
  },
  {
    id: "sky",
    name: "Sky",
    swatch: "var(--lm-sky)",
    img: "/assets/product/polo-sky.webp",
    note: "Grey blue, the last bath of the run and the palest of the five.",
  },
];

export function Colourways() {
  const [active, setActive] = useState<ColourwayId>("coral");
  const { open } = usePreorder();
  const current = WAYS.find((way) => way.id === active) ?? WAYS[0];

  return (
    <section
      aria-labelledby="colour-title"
      className="lm-section lm-section--ivory lm-colour"
      id="colour"
    >
      <div className="lm-colour__grid">
        <div className="lm-colour__copy">
          <p className="lm-kicker">Five colourways</p>
          <h2 className="lm-h2" id="colour-title">
            Five colourways, one dye bath
          </h2>
          <p className="lm-body">
            Coral first, then the four pastels the same bath leaves behind.
            Garment dyed at 40 degrees, so the shade sits inside the fibre
            instead of on top of it.
          </p>

          <ul className="lm-swatches">
            {WAYS.map((way) => (
              <li key={way.id}>
                <button
                  aria-label={`${way.name} colourway`}
                  aria-pressed={active === way.id}
                  className="lm-swatch"
                  onClick={() => setActive(way.id)}
                  type="button"
                >
                  <span
                    className="lm-swatch__chip"
                    style={{ background: way.swatch }}
                  />
                  <span className="lm-swatch__name">{way.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="lm-colour__foot">
            <div>
              <p className="lm-colour__wayname">{current.name}</p>
              <p className="lm-price">
                128 EUR <small>per shirt</small>
              </p>
            </div>
            <p className="lm-colour__note">{current.note}</p>
          </div>

          <button
            className="lm-threadlink"
            onClick={() => open(active)}
            style={{ background: "none", border: 0, cursor: "pointer" }}
            type="button"
          >
            <span>Reserve {current.name.toLowerCase()}</span>
            <svg aria-hidden="true" viewBox="0 0 54 14">
              <path d="M1 8c6-6 12 6 18 0s12 6 18 0 8 4 12 0" />
              <path d="M46 4l6 4-6 4" />
            </svg>
          </button>
        </div>

        <div className="lm-colour__media">
          {WAYS.map((way) => (
            <img
              alt={
                active === way.id
                  ? `${way.name} cotton piqué polo, front view`
                  : ""
              }
              aria-hidden={active === way.id ? undefined : true}
              key={way.id}
              loading="lazy"
              src={way.img}
              style={{
                opacity: active === way.id ? 1 : 0,
                transition: "opacity 420ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
