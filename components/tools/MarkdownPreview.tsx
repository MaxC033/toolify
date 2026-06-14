"use client";

import { useState, useEffect } from "react";

const INITIAL = `# Welcome to Markdown Preview

Write **Markdown** here and see a *live preview* on the right.

## Features

- GitHub Flavored Markdown support
- Live preview as you type
- Copy HTML output

## Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## Table

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |

> **Tip:** All processing happens in your browser. Nothing is stored.
`;

function parseMarkdown(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="language-${lang}">${code.trimEnd()}</code></pre>`
    )
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headings
    .replace(/^#{6}\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#{5}\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^#{4}\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>")
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Strikethrough
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    // Blockquotes
    .replace(/^&gt;\s*(.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered lists
    .replace(/^[-*+]\s+(.+)$/gm, "<li>$1</li>")
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Horizontal rule
    .replace(/^---$/gm, "<hr>")
    // Tables (simple)
    .replace(/^\|(.+)\|$/gm, (_, row) => {
      const cells = row.split("|").map((c: string) => c.trim());
      return `<tr>${cells.map((c: string) => `<td>${c}</td>`).join("")}</tr>`;
    })
    // Paragraphs
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");

  return `<p>${html}</p>`;
}

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(INITIAL);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const html = parseMarkdown(markdown);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
          Live Preview
        </span>
        <button className="btn-secondary py-1 px-3 text-xs" onClick={copyHtml} id="copy-html-btn">
          {copiedHtml ? "✓ Copied!" : "Copy HTML"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <label className="text-xs text-[var(--text-muted)] mb-2 block">Markdown</label>
          <textarea
            className="input font-mono text-sm"
            id="markdown-input"
            rows={20}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            style={{ minHeight: 400, fontSize: 13 }}
          />
        </div>

        {/* Preview */}
        <div>
          <label className="text-xs text-[var(--text-muted)] mb-2 block">Preview</label>
          <div
            className="bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-5 overflow-auto prose-dark"
            style={{ minHeight: 400, maxHeight: 600 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <style jsx>{`
        .prose-dark h1, .prose-dark h2, .prose-dark h3 { color: var(--text-primary); font-weight: 700; margin: 1em 0 0.5em; }
        .prose-dark h1 { font-size: 1.6em; }
        .prose-dark h2 { font-size: 1.3em; }
        .prose-dark h3 { font-size: 1.1em; }
        .prose-dark p { color: var(--text-secondary); line-height: 1.7; margin: 0.5em 0; }
        .prose-dark strong { color: var(--text-primary); font-weight: 700; }
        .prose-dark em { color: var(--accent-2); }
        .prose-dark a { color: var(--accent); text-decoration: underline; }
        .prose-dark code { background: var(--surface); padding: 2px 6px; border-radius: 4px; font-size: 0.85em; color: var(--accent-2); }
        .prose-dark pre { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; overflow: auto; margin: 1em 0; }
        .prose-dark pre code { background: none; padding: 0; }
        .prose-dark blockquote { border-left: 3px solid var(--accent); padding-left: 16px; margin: 1em 0; color: var(--text-muted); }
        .prose-dark li { color: var(--text-secondary); margin: 4px 0 4px 20px; list-style: disc; }
        .prose-dark hr { border: none; border-top: 1px solid var(--border); margin: 1.5em 0; }
        .prose-dark del { color: var(--text-muted); }
        .prose-dark table { width: 100%; border-collapse: collapse; margin: 1em 0; }
        .prose-dark td, .prose-dark th { border: 1px solid var(--border); padding: 8px 12px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}
