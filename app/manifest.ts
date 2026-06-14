import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Toolify — Free Online Tools",
    short_name: "Toolify",
    description:
      "A collection of fast, privacy-first tools for developers, writers, and designers. No ads popups, no account needed.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0A0F",
    theme_color: "#7C6EFF",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
