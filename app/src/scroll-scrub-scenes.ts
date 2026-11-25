/**
 * Scene data for the LOOMERE scroll-scrub journey.
 *
 * Single-shot: ONE entry, whose clip is the one continuous 15s macro film of
 * the coral filament winding itself into the polo. The six chapters of the
 * make are rendered as semantic sections over and after it.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#d0452f",
  background: "#16211c",
  ink: "#f4eee2",
  muted: "rgba(244, 238, 226, 0.72)",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "scene-01",
    label: "The film",
    kicker: "Knitwear, Prato",
    title: "One thread. One polo.",
    body: "A single coral filament, wound into 240 grams of long staple cotton. One shirt, five colourways, twice a year.",
    align: "left",
    scroll: 3.4,
    linger: 0.16,
    objectPosition: "50% 46%",
    mobileObjectPosition: "56% 50%",
    poster: "/assets/world/scene-01-poster.webp",
    mobilePoster: "/assets/world/scene-01-mobile-poster.webp",
    clip: "/assets/world/scene-01.mp4",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
  },
];
