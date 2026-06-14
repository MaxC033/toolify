"use client";

import Link from "next/link";
import type { Tool } from "@/types/tool";

interface Props {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolShell({ tool, children }: Props) {
  return (
    <div className="noise-bg min-h-screen">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Nav */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold gradient-text tracking-tight"
          >
            ⚡ Toolify
          </Link>
          <span className="text-[var(--border)] hidden sm:inline">·</span>
          <span className="text-sm text-[var(--text-secondary)] hidden sm:inline">
            {tool.title}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/resources"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-1.5 px-3 text-xs hidden sm:inline-block"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{tool.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="tag text-xs">{tool.category}</span>
                <span className="text-xs text-[var(--text-muted)]">
                  Free · No login
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{tool.title}</h1>
            </div>
          </div>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
            {tool.description}
          </p>
        </div>

        {/* Tool content */}
        <div>{children}</div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <Link
            href="/"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← Back to all tools
          </Link>
        </div>
      </div>

      <footer className="border-t border-[var(--border)] mt-8 py-6 text-center text-xs text-[var(--text-muted)]">
        All tools run in your browser · No data is ever sent to our servers
      </footer>
    </div>
  );
}
