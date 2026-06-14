"use client";

import { useState } from "react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://toolify-eight-gilt.vercel.app");
  const [size, setSize] = useState(250);
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!text.trim()) return;
    setLoading(true);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      text
    )}`;
    setQrUrl(url);
  };

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(qrUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
        <div className="md:col-span-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            QR Code Data (URL or Text)
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter URL or text…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Size (px)
          </label>
          <select
            className="input w-full bg-transparent"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          >
            <option value={150}>150 x 150</option>
            <option value={200}>200 x 200</option>
            <option value={250}>250 x 250</option>
            <option value={300}>300 x 300</option>
            <option value={400}>400 x 400</option>
          </select>
        </div>
      </div>

      <button className="btn self-start" onClick={handleGenerate}>
        Generate QR Code
      </button>

      {qrUrl && (
        <div className="flex flex-col items-center gap-4 bg-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)] max-w-sm mx-auto w-full">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-[var(--border)]">
            <img
              src={qrUrl}
              alt="QR Code"
              className="w-full h-auto"
              onLoad={() => setLoading(false)}
            />
          </div>
          {loading && <div className="text-xs text-[var(--text-muted)]">Generating...</div>}
          {!loading && (
            <button className="btn-secondary w-full" onClick={handleDownload}>
              Download PNG
            </button>
          )}
        </div>
      )}
    </div>
  );
}
