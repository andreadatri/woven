import { useEffect, useState } from "react";

import "@/styles/loomere.css";
import "@/styles/loomere-extra.css";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import type { ScrollScrubScene } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

import { Colourways } from "./colourways";
import {
  FabricMarquee,
  HeroReserve,
  Knot,
  LedgerIcon,
  StampReserve,
  ThreadLink,
} from "./parts";
import { PreorderProvider, usePreorder } from "./preorder";

/* One film, one scene: the hero CTA is bound here so the scene array stays a
 * module constant while the button still reads the preorder context. */
const JOURNEY: ScrollScrubScene[] = [
  { ...scrollScrubScenes[0], actions: <HeroReserve /> },
];

function Nav() {
  const { open } = usePreorder();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.82;
      setSolid((previous) => (previous === next ? previous : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="lm-nav" data-solid={solid}>
      <a className="lm-brand" href="#top">
        <Knot />
        <span className="lm-brand__word">Loomere</span>
      </a>
      <nav aria-label="Sections" className="lm-nav__links">
        <a className="lm-navlink" href="#thread">
          Make
        </a>
        <a className="lm-navlink" href="#colour">
          Colourways
        </a>
        <button
          className="lm-navlink"
          onClick={() => open("coral")}
          type="button"
        >
          Reserve a polo
        </button>
      </nav>
    </header>
  );
}

const LEDGER: {
  icon: Parameters<typeof LedgerIcon>[0]["name"];
  label: string;
  value: string;
}[] = [
  { icon: "fabric", label: "Fabric", value: "240 gsm piqué, long staple cotton" },
  { icon: "yarn", label: "Yarn", value: "60/2, double combed" },
  { icon: "collar", label: "Collar", value: "1x1 rib, 3 mm interlining" },
  { icon: "button", label: "Placket", value: "bias cut, three corozo buttons" },
  { icon: "dye", label: "Colour", value: "garment dyed at 40 degrees" },
  { icon: "fit", label: "Fit", value: "relaxed, half a size generous" },
  { icon: "care", label: "Care", value: "cold wash, dry flat" },
  { icon: "batch", label: "Batch", value: "400 pieces per colourway" },
  { icon: "dress", label: "Price", value: "128 EUR" },
  { icon: "post", label: "Post", value: "from Prato, 3 to 5 days" },
];

export function LoomereHome() {
  return (
    <PreorderProvider>
      <Nav />
      <main className="lm-page" id="top">
        <ScrollScrub scenes={JOURNEY} theme={scrollScrubTheme} />

        <section
          aria-labelledby="thread-title"
          className="lm-section lm-section--ink lm-section--flush"
          id="thread"
        >
          <div className="lm-thread lm-thread--ink">
            <div className="lm-thread__media">
              <img
                alt="A spool of coral cotton thread on a dark surface, one filament lifting away"
                src="/assets/macro/thread.webp"
              />
            </div>
            <div className="lm-thread__copy">
              <p className="lm-name">The thread</p>
              <h2 className="lm-h2" id="thread-title">
                It starts on a single spindle
              </h2>
              <p className="lm-body">
                Long staple cotton from the Nile delta, combed twice, spun to
                60/2 so the yarn keeps its sheen past fifty washes.
              </p>
              <ul className="lm-facts">
                <li>60/2 combed</li>
                <li>Nile delta</li>
                <li>Double combed</li>
              </ul>
              <ThreadLink href="#knit" label="Follow the filament" />
            </div>
          </div>
        </section>

        <section aria-labelledby="knit-title" className="lm-bleed" id="knit">
          <div className="lm-bleed__frame">
            <img
              alt="Macro view of coral piqué knit, the diamond stitch grid lit from the side"
              src="/assets/macro/knit.webp"
            />
          </div>
          <div className="lm-bleed__panel">
            <p className="lm-name">The knit</p>
            <h2 className="lm-h2" id="knit-title">
              A piqué you can read
            </h2>
            <p className="lm-body">
              Knitted on a 24 gauge machine, the stitch opens into a small
              diamond grid. Air passes through it, and the shirt keeps its line.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="collar-title"
          className="lm-section lm-section--sage"
          id="collar"
        >
          <div className="lm-collar">
            <div>
              <p className="lm-name">The collar</p>
              <h2 className="lm-h2" id="collar-title">
                The collar carries the shirt
              </h2>
              <p className="lm-body">
                A 1x1 rib knitted flat, then set with a 3 mm interlining so it
                stands on its own without a fused edge.
              </p>
              <ul className="lm-rib">
                <li>
                  <span>Rib</span>
                  <span>1x1, flat knitted</span>
                </li>
                <li>
                  <span>Interlining</span>
                  <span>3 mm, unlaminated</span>
                </li>
                <li>
                  <span>Collar roll</span>
                  <span>5 mm at the point</span>
                </li>
              </ul>
            </div>
            <div className="lm-collar__media">
              <img
                alt="The rib collar edge of the polo standing on its own, stitches close up"
                src="/assets/macro/collar.webp"
              />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="placket-title"
          className="lm-section lm-section--ivory lm-placket"
          id="placket"
        >
          <div className="lm-placket">
            <div className="lm-placket__head">
              <div>
                <p className="lm-name">The placket</p>
                <h2 className="lm-h2" id="placket-title">
                  Three buttons, corozo
                </h2>
              </div>
              <p className="lm-body">
                Tagua palm carved into buttons and sewn with a four hole cross
                that holds. The placket is cut on the bias, so it never pulls
                across the chest.
              </p>
            </div>

            <div className="lm-details">
              <figure className="lm-detail">
                <div className="lm-detail__img">
                  <img
                    alt="The bias cut placket with three corozo buttons"
                    src="/assets/macro/placket.webp"
                  />
                </div>
                <figcaption className="lm-detail__cap">
                  <b>Bias cut</b>
                  <span>2 mm stitch</span>
                </figcaption>
              </figure>
              <figure className="lm-detail">
                <div className="lm-detail__img">
                  <img
                    alt="A single corozo button with a coral cross stitch"
                    src="/assets/macro/button.webp"
                  />
                </div>
                <figcaption className="lm-detail__cap">
                  <b>Corozo</b>
                  <span>tagua palm</span>
                </figcaption>
              </figure>
              <figure className="lm-detail">
                <div className="lm-detail__img">
                  <img
                    alt="Coral piqué stitches beside the placket, close up"
                    src="/assets/macro/knit.webp"
                  />
                </div>
                <figcaption className="lm-detail__cap">
                  <b>Stitch</b>
                  <span>diamond piqué</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <Colourways />

        <section
          aria-labelledby="wear-title"
          className="lm-section lm-section--ivory lm-wear"
          id="wear"
        >
          <div className="lm-wear">
            <div className="lm-wear__head">
              <div>
                <p className="lm-name">The wear</p>
                <h2 className="lm-h2" id="wear-title">
                  Worn in, not worn out
                </h2>
              </div>
              <p className="lm-body">
                Pre-shrunk to 3 percent and cut half a size generous through the
                chest. Wash cold, dry flat, and the shoulder seam stays where it
                was sewn.
              </p>
            </div>

            <ul className="lm-ledger">
              {LEDGER.map((row) => (
                <li key={row.label}>
                  <LedgerIcon name={row.icon} />
                  <span className="lm-ledger__label">{row.label}</span>
                  <span className="lm-ledger__value">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FabricMarquee />

        <section
          aria-labelledby="reserve-title"
          className="lm-reserve"
          id="reserve"
        >
          <div className="lm-reserve__grid">
            <div>
              <Knot className="lm-reserve__knot" />
              <p className="lm-kicker">Preorder</p>
              <h2 className="lm-h2" id="reserve-title">
                Reserve before the first cut
              </h2>
              <p className="lm-body">
                The first batch is 400 pieces per colourway, cut in March and
                posted from Prato in the order reservations arrive.
              </p>
              <StampReserve />
            </div>
            <figure className="lm-reserve__card">
              <img
                alt="The coral polo hanging in the studio, collar up"
                src="/assets/product/polo-coral.webp"
              />
              <figcaption>
                <span>Coral, 128 EUR</span>
                <span>Batch 01</span>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="lm-footer">
        <div className="lm-footer__top">
          <a className="lm-brand" href="#top">
            <Knot />
            <span className="lm-brand__word">Loomere</span>
          </a>
          <nav aria-label="Footer" className="lm-footer__links">
            <a href="#colour">Colourways</a>
            <a href="#thread">The make</a>
            <a href="mailto:atelier@loomere.it">atelier@loomere.it</a>
          </nav>
        </div>
        <div className="lm-footer__base">
          <span>
            Loomere, a knitwear atelier in Prato, Italy. One polo, five
            colourways.
          </span>
          <span>2026</span>
        </div>
      </footer>
    </PreorderProvider>
  );
}
