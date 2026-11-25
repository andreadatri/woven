import { createFileRoute } from "@tanstack/react-router";

import { LoomereHome } from "@/components/loomere/page";

export const Route = createFileRoute("/")({
  // Title, description and social card come from the site metadata in the root
  // route. Only the icon set and the manifest belong to this page; the theme
  // colour travels with the manifest.
  head: () => ({
    meta: [{ name: "apple-mobile-web-app-title", content: "Loomere" }],
    links: [
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/head/favicon.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/head/favicon-32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/head/favicon-16.png",
      },
      { rel: "apple-touch-icon", href: "/assets/head/apple-touch-icon.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LoomereHome />;
}
