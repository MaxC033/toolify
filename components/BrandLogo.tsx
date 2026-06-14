"use client";

import { useState } from "react";

interface Props {
  url: string;
  fallbackEmoji: string;
  alt: string;
  size?: "sm" | "md";
}

export function BrandLogo({ url, fallbackEmoji, alt, size = "sm" }: Props) {
  const [error, setError] = useState(false);

  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
    return (
      <span className={size === "sm" ? "text-xl" : "text-2xl"}>
        {fallbackEmoji}
      </span>
    );
  }

  if (error) {
    return (
      <span className={size === "sm" ? "text-xl" : "text-2xl"}>
        {fallbackEmoji}
      </span>
    );
  }

  const imageSizeClass = size === "sm" ? "w-5 h-5" : "w-8 h-8";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?sz=128&domain=${hostname}`}
      alt={alt}
      className={`${imageSizeClass} object-contain`}
      onError={() => setError(true)}
    />
  );
}
