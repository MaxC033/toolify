"use client";

import { useState } from "react";

const IPSUM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
];

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateText = () => {
    let result = "";
    if (type === "paragraphs") {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        paras.push(IPSUM_PARAGRAPHS[i % IPSUM_PARAGRAPHS.length]);
      }
      if (startWithLorem && paras.length > 0) {
        paras[0] = paras[0].replace(/^[A-Z]\w+ \w+/, "Lorem ipsum");
      }
      result = paras.join("\n\n");
    } else if (type === "sentences") {
      // Split paragraphs into sentences
      const allSentences = IPSUM_PARAGRAPHS.flatMap((p) => p.split(/(?<=[.!?])\s+/));
      const sents: string[] = [];
      for (let i = 0; i < count; i++) {
        sents.push(allSentences[i % allSentences.length]);
      }
      if (startWithLorem && sents.length > 0) {
        sents[0] = sents[0].replace(/^[A-Z]\w+ \w+ \w+/, "Lorem ipsum dolor");
      }
      result = sents.join(" ");
    } else {
      // Words
      const allWords = IPSUM_PARAGRAPHS.flatMap((p) => p.split(/\s+/)).map((w) => w.replace(/[.,!?]/g, ""));
      const wrds: string[] = [];
      for (let i = 0; i < count; i++) {
        wrds.push(allWords[i % allWords.length].toLowerCase());
      }
      if (startWithLorem && wrds.length > 0) {
        wrds[0] = "lorem";
        if (wrds.length > 1) wrds[1] = "ipsum";
        if (wrds.length > 2) wrds[2] = "dolor";
      }
      // Capitalize first letter
      if (wrds.length > 0) {
        wrds[0] = wrds[0].charAt(0).toUpperCase() + wrds[0].slice(1);
      }
      result = wrds.join(" ") + ".";
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
        <div>
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Count
          </label>
          <input
            type="number"
            className="input w-full p-2 py-1"
            min={1}
            max={type === "words" ? 1000 : 50}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>

        <div>
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Type
          </label>
          <select
            className="input w-full p-2 py-1 bg-transparent"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div className="flex items-center gap-2 h-10">
          <input
            type="checkbox"
            id="start-lorem"
            className="rounded border-[var(--border)] text-[var(--accent)]"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
          />
          <label htmlFor="start-lorem" className="text-sm select-none">
            Start with "Lorem ipsum"
          </label>
        </div>

        <button className="btn w-full" onClick={generateText}>
          Generate
        </button>
      </div>

      {output && (
        <div className="flex flex-col gap-3">
          <textarea
            className="input w-full font-mono text-sm"
            rows={10}
            readOnly
            value={output}
          />
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => setOutput("")}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
