"use client";

import { useState } from "react";

// Tiny pure-JS MD5 implementation for client-side MD5 generation
function md5(string: string) {
  function k(x: number, y: number) {
    return ((x << y) | (x >>> (32 - y))) + x;
  }
  function f(x: number, y: number, z: number) {
    return (x & y) | (~x & z);
  }
  function g(x: number, y: number, z: number) {
    return (x & z) | (y & ~z);
  }
  function h(x: number, y: number, z: number) {
    return x ^ y ^ z;
  }
  function i(x: number, y: number, z: number) {
    return y ^ (x | ~z);
  }

  const words: number[] = [];
  const str = unescape(encodeURIComponent(string));
  for (let j = 0; j < str.length * 8; j += 8) {
    words[j >> 5] |= (str.charCodeAt(j / 8) & 255) << (j % 32);
  }
  words[str.length >> 2] |= 128 << ((str.length % 4) * 8);
  words[(((str.length + 8) >> 6) << 4) + 14] = str.length * 8;

  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let j = 0; j < words.length; j += 16) {
    const aa = a, bb = b, cc = c, dd = d;

    a = k(a + f(b, c, d) + words[j + 0] + -680876936, 7);
    d = k(d + f(a, b, c) + words[j + 1] + -389564586, 12);
    c = k(c + f(d, a, b) + words[j + 2] + 606105819, 17);
    b = k(b + f(c, d, a) + words[j + 3] + -1044525330, 22);
    a = k(a + f(b, c, d) + words[j + 4] + -176418897, 7);
    d = k(d + f(a, b, c) + words[j + 5] + 1200080426, 12);
    c = k(c + f(d, a, b) + words[j + 6] + -1473231341, 17);
    b = k(b + f(c, d, a) + words[j + 7] + -45705983, 22);
    a = k(a + f(b, c, d) + words[j + 8] + 1770035416, 7);
    d = k(d + f(a, b, c) + words[j + 9] + -1958414417, 12);
    c = k(c + f(d, a, b) + words[j + 10] + -42063, 17);
    b = k(b + f(c, d, a) + words[j + 11] + -1990404162, 22);
    a = k(a + f(b, c, d) + words[j + 12] + 1804603682, 7);
    d = k(d + f(a, b, c) + words[j + 13] + -40341101, 12);
    c = k(c + f(d, a, b) + words[j + 14] + -1502002290, 17);
    b = k(b + f(c, d, a) + words[j + 15] + 1236535329, 22);

    a = k(a + g(b, c, d) + words[j + 1] + -165796510, 5);
    d = k(d + g(a, b, c) + words[j + 6] + -1069501632, 9);
    c = k(c + g(d, a, b) + words[j + 11] + 643717713, 14);
    b = k(b + g(c, d, a) + words[j + 0] + -373897302, 20);
    a = k(a + g(b, c, d) + words[j + 5] + -701558691, 5);
    d = k(d + g(a, b, c) + words[j + 10] + 38016083, 9);
    c = k(c + g(d, a, b) + words[j + 15] + -660478335, 14);
    b = k(b + g(c, d, a) + words[j + 4] + -405537848, 20);
    a = k(a + g(b, c, d) + words[j + 9] + 568446438, 5);
    d = k(d + g(a, b, c) + words[j + 14] + -1019803690, 9);
    c = k(c + g(d, a, b) + words[j + 3] + -187363961, 14);
    b = k(b + g(c, d, a) + words[j + 8] + 1163531501, 20);
    a = k(a + g(b, c, d) + words[j + 13] + -1444681467, 5);
    d = k(d + g(a, b, c) + words[j + 2] + -51403784, 9);
    c = k(c + g(d, a, b) + words[j + 7] + 1735328473, 14);
    b = k(b + g(c, d, a) + words[j + 12] + -1926607734, 20);

    a = k(a + h(b, c, d) + words[j + 5] + -378558, 4);
    d = k(d + h(a, b, c) + words[j + 8] + -2022574463, 11);
    c = k(c + h(d, a, b) + words[j + 11] + 1839030562, 16);
    b = k(b + h(c, d, a) + words[j + 14] + -35309556, 23);
    a = k(a + h(b, c, d) + words[j + 1] + -1530992060, 4);
    d = k(d + h(a, b, c) + words[j + 4] + 1272893353, 11);
    c = k(c + h(d, a, b) + words[j + 7] + -155497632, 16);
    b = k(b + h(c, d, a) + words[j + 10] + -1094730640, 23);
    a = k(a + h(b, c, d) + words[j + 13] + 681279174, 4);
    d = k(d + h(a, b, c) + words[j + 0] + -358537222, 11);
    c = k(c + h(d, a, b) + words[j + 3] + -722521979, 16);
    b = k(b + h(c, d, a) + words[j + 6] + 76029189, 23);
    a = k(a + h(b, c, d) + words[j + 9] + -640364487, 4);
    d = k(d + h(a, b, c) + words[j + 12] + -421815835, 11);
    c = k(c + h(d, a, b) + words[j + 15] + 950634151, 16);
    b = k(b + h(c, d, a) + words[j + 2] + -90574732, 23);

    a = k(a + i(b, c, d) + words[j + 0] + -198630844, 6);
    d = k(d + i(a, b, c) + words[j + 7] + 1126891415, 10);
    c = k(c + i(d, a, b) + words[j + 14] + -1416354905, 15);
    b = k(b + i(c, d, a) + words[j + 5] + -57434055, 21);
    a = k(a + i(b, c, d) + words[j + 12] + 1700485571, 6);
    d = k(d + i(a, b, c) + words[j + 3] + -1894986606, 10);
    c = k(c + i(d, a, b) + words[j + 10] + -1051523, 15);
    b = k(b + i(c, d, a) + words[j + 1] + -2054922799, 21);
    a = k(a + i(b, c, d) + words[j + 8] + 1873313359, 6);
    d = k(d + i(a, b, c) + words[j + 15] + -30611744, 10);
    c = k(c + i(d, a, b) + words[j + 6] + -1560198380, 15);
    b = k(b + i(c, d, a) + words[j + 13] + 1309151649, 21);
    a = k(a + i(b, c, d) + words[j + 4] + -145523070, 6);
    d = k(d + i(a, b, c) + words[j + 11] + -1120210379, 10);
    c = k(c + i(d, a, b) + words[j + 2] + 718787259, 15);
    b = k(b + i(c, d, a) + words[j + 9] + -343485551, 21);

    a = (a + aa) | 0;
    b = (b + bb) | 0;
    c = (c + cc) | 0;
    d = (d + dd) | 0;
  }

  const hex = (n: number) => {
    let s = "";
    for (let j = 0; j <= 3; j++) {
      s += "0123456789abcdef".charAt((n >> (j * 8 + 4)) & 15) +
           "0123456789abcdef".charAt((n >> (j * 8)) & 15);
    }
    return s;
  };
  return hex(a) + hex(b) + hex(c) + hex(d);
}

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState({
    md5: "",
    sha1: "",
    sha256: "",
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculateHashes = async (val: string) => {
    setText(val);
    if (!val) {
      setHashes({ md5: "", sha1: "", sha256: "" });
      return;
    }

    // MD5 (JS Fallback)
    const md5Hash = md5(val);

    // SHA-1 (Web Crypto)
    const encoder = new TextEncoder();
    const data = encoder.encode(val);
    
    let sha1Hash = "";
    let sha256Hash = "";
    
    try {
      const sha1Buffer = await crypto.subtle.digest("SHA-1", data);
      sha1Hash = Array.from(new Uint8Array(sha1Buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
      sha256Hash = Array.from(new Uint8Array(sha256Buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch (err) {
      console.error("Crypto API error", err);
    }

    setHashes({
      md5: md5Hash,
      sha1: sha1Hash,
      sha256: sha256Hash,
    });
  };

  const handleCopy = (key: string, value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={6}
        placeholder="Enter text to generate hashes…"
        value={text}
        onChange={(e) => calculateHashes(e.target.value)}
      />

      <div className="flex flex-col gap-4">
        {[
          { label: "MD5", value: hashes.md5, key: "md5" },
          { label: "SHA-1", value: hashes.sha1, key: "sha1" },
          { label: "SHA-256", value: hashes.sha256, key: "sha256" },
        ].map((item) => (
          <div key={item.label} className="bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-[var(--text-secondary)]">{item.label}</span>
              {item.value && (
                <button
                  className="text-xs text-[var(--accent)] hover:underline"
                  onClick={() => handleCopy(item.key, item.value)}
                >
                  {copiedKey === item.key ? "Copied! ✓" : "Copy"}
                </button>
              )}
            </div>
            <div className="font-mono text-xs break-all text-[var(--text-primary)]">
              {item.value || "Waiting for input..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
