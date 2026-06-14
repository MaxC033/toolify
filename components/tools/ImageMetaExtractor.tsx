"use client";

import { useState } from "react";

interface ImageMeta {
  name: string;
  size: string;
  type: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export default function ImageMetaExtractor() {
  const [meta, setMeta] = useState<ImageMeta | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = (file.size / 1024).toFixed(1) + " KB";
    const metaData: Partial<ImageMeta> = {
      name: file.name,
      size: sizeStr,
      type: file.type,
    };

    // Load preview and get dimensions
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setPreview(src);

      const img = new Image();
      img.onload = () => {
        const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
        const divisor = gcd(img.width, img.height);
        const ratio = `${img.width / divisor}:${img.height / divisor}`;

        setMeta({
          name: metaData.name || "",
          size: metaData.size || "",
          type: metaData.type || "",
          width: img.width,
          height: img.height,
          aspectRatio: ratio,
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setMeta(null);
    setPreview("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[var(--border)] rounded-xl cursor-pointer hover:bg-[var(--surface-2)] transition-all bg-[var(--surface-1)]">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <span className="text-3xl mb-2">📷</span>
            <p className="mb-2 text-sm text-[var(--text-secondary)] font-semibold">
              Click to upload an image
            </p>
            <p className="text-xs text-[var(--text-muted)]">PNG, JPG, WebP, GIF, SVG</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      {preview && meta && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)] flex items-center justify-center">
            <img src={preview} alt="Upload preview" className="max-h-48 max-w-full rounded shadow-sm object-contain" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[var(--border)] pb-2">
              <span className="text-xs font-bold uppercase text-[var(--text-secondary)] tracking-wider">Property</span>
              <span className="text-xs font-bold uppercase text-[var(--text-secondary)] tracking-wider">Value</span>
            </div>
            {[
              { label: "File Name", value: meta.name },
              { label: "File Size", value: meta.size },
              { label: "MIME Type", value: meta.type },
              { label: "Dimensions", value: `${meta.width} × ${meta.height} px` },
              { label: "Aspect Ratio", value: meta.aspectRatio },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm py-1 border-b border-[var(--border)]/50">
                <span className="text-[var(--text-muted)] font-medium">{item.label}</span>
                <span className="font-mono text-[var(--text-primary)] font-semibold text-right max-w-[180px] truncate">
                  {item.value}
                </span>
              </div>
            ))}
            <button className="btn-secondary self-start text-red-500 mt-2" onClick={handleClear}>
              Clear Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
