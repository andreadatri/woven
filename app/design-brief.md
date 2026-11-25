# LOOMERE — design brief

**Design read.** A small knitwear atelier in Prato that makes one polo shirt in five colourways. The register is patient and material: a dye house ledger crossed with a couture fit session, never "premium lifestyle brand".

**Concept spine.** The site is a single coral thread being wound. One filament travels the page, loops into stitches, knots at the collar, and lands as a finished polo. Every section is a stage of that winding, and the knot is the brand mark.

**Delivery tier.** `cinema` — Lenis + GSAP for surrounding chrome, with the scroll-scrub film as the Tier-1 hero mechanic.

Animation mode: animated-website

**Journey shape:** single-shot. One continuous 15s macro take: the coral filament unspools, loops into a piqué grid, climbs to the collar, crosses the placket, floods the cloth coral, and pulls back to the finished polo. One world, one subject, ever closer and then resolved. No seams to police, so no `multi-leg`.

**Journey chapters** (all mapped to moments of that one film, rendered as semantic sections after the pinned film):
1. The thread — the filament unspools on a spindle. Focal: the filament leaving the spool. Proof tags: 60/2 combed, Nile delta, double combed.
2. The knit — the filament loops into a diamond piqué grid. Focal: the stitch opening under raking light. Proof tags: 24 gauge, piqué.
3. The collar — the thread climbs and doubles back into a 1x1 rib. Focal: the rib edge standing on its own. Proof tags: 1x1 rib, 3 mm interlining.
4. The placket — the thread crosses the placket and threads three corozo buttons. Focal: the button cross stitch. Proof tags: bias cut, corozo, three buttons.
5. The colour — coral floods the fibre, then leaves mint, shell, butter and sky in the bath. Focal: dye entering the yarn at the stitch.
6. The wear — the film resolves on the finished shirt. Focal: the whole garment, shoulders square. Proof tags: pre-shrunk 3 percent, relaxed fit.

**World grammar.** Byte-identical style preamble for every asset: deep pine ink #16211C seamless studio void, one warm key light from the upper left, soft shadow falloff, shallow depth of field, fine cotton fibre dust, matte cotton surfaces with a single glossy coral filament as the only specular element, locked exposure. Palette words: pine ink, warm ivory, celadon sage, coral red. No text, no logos, no watermark.

**Mobile framing.** Every focal point inside the centre 60 percent of frame; mobile encodes capped at 720p height, CRF 23.

**Delivery budget.** Desktop film ≤ 32 MiB (shipped 12.4 MiB), mobile ≤ 16 MiB (shipped 7.0 MiB).

**Locked palette.**
- Pine ink `#16211C` — the film void, the preorder block, all body type. Deliberately a green-black, not graphite.
- Warm ivory `#F4EEE2` — the dominant page ground for seven of nine sections.
- Celadon sage `#AFC3B2` — the mid tone, section fields and marquee type.
- Coral red `#D0452F` — the ONLY accent. It is the thread, the polo, and every CTA, in one hue.
- Pastel variants exist only as product colourways (mint `#CFE0D0`, shell `#EBD3CB`, butter `#EFE2BD`, sky `#CBD8DE`), never as UI accents.

Defense: the user named sage, ivory, pine and a single red, so this exact set applies. The dark-plus-warm-accent tell is avoided because ivory and sage own the page body, the accent is a true red (not amber or ember), and the dark ground appears in exactly two places: the film and the preorder block.

**Locked type.** Cabinet Grotesk (display, 700/800, tight tracking) + Inter Tight (body and UI, 400/500), both self hosted. No serif anywhere.

**Section plan.**
1. Journey / hero — pinned film, bottom-left copy (`film`)
2. The thread — portrait macro beside an offset text column (`split portrait`)
3. The knit — full-bleed macro with an inset ivory panel (`image as canvas`)
4. The collar — short split with a hairline ledger of rib facts (`spec split`)
5. The placket — horizontal strip of three button details under a wide statement (`detail strip`)
6. The colour — large product image with a five-chip colourway rail (`swatch rail`)
7. The wear + fabric facts — marquee band over a full spec ledger (`marquee + ledger`)
8. Preorder — pine block with oversized knot and the modal trigger (`poster block`)
9. Footer — knot, wordmark, three links (`sign-off`)

Nine sections, nine distinct families, no consecutive repeats. Eyebrow budget ceil(9/3) = 3: used once in the hero, once on the colourways, once on the preorder.

**Asset plan.** Six section boards; one 6-panel film storyboard; the 15s film (desktop plus mobile encodes with exact-frame posters); coral polo hero product shot; four pastel variants generated from it as reference; five macro plates (thread, piqué, collar, placket, corozo button); a nine glyph inline SVG set drawn to one stroke rule for the spec ledger, which is functional table UI and therefore the documented fallback; the knot mark as vector SVG plus the branding icon set; OG and cover from the branding run.

**CTA inventory** (each its own component, no shared button style):
- Nav "Reserve a polo" — text link whose underline is a coral thread that draws on hover.
- Hero "Reserve a polo" — corner-bracket target that closes on hover, coral ticks.
- Chapter inline "Follow the filament" — arrow that travels along a drawn wave path.
- Colourway chip — swatch that lifts and flips its label like a material sample, with "Reserve coral" sharing the page verb.
- Preorder block "Reserve a polo" — press that imprints on :active.
- Modal submit "Reserve a polo" — letter spacing opens as the label decodes.

**Build notes.** The piqué macro and the corozo button were re-shot once after the kit coherence pass, the first piqué plate reading too coarse and the first button reading as resin rather than palm. The pastel variants were generated from the coral shot as reference so the garment stays identical across the five.
