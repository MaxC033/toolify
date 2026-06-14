"use client";

import { useState } from "react";
import Link from "next/link";
import toolsData from "@/data/tools.json";

const categoryOrder = ["Productivity", "Design", "Writing", "Developer", "Security"];

const categories = ["All", ...categoryOrder];

const categoryIcons: Record<string, string> = {
  All: "✦",
  Security: "🔐",
  Writing: "📝",
  Design: "🎨",
  Productivity: "🍅",
  Developer: "🔑",
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Group tools by custom category order, then by title
  const sortedTools = [...toolsData].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category);
    const indexB = categoryOrder.indexOf(b.category);
    if (indexA !== indexB) {
      return indexA - indexB;
    }
    return a.title.localeCompare(b.title);
  });

  // Filter tools based on selected category
  const filteredTools = selectedCategory === "All"
    ? sortedTools
    : sortedTools.filter((t) => t.category === selectedCategory);

  return (
    <main className="noise-bg min-h-screen relative">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Nav */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold gradient-text tracking-tight"
        >
          ⚡ Toolify
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/deals"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
          >
            Deals
          </Link>
          <Link
            href="/about"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-2 px-4"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-[var(--text-secondary)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] inline-block animate-pulse"></span>
            {toolsData.length} free tools, no login required
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Free Online Tools
            <br />
            <span className="gradient-text">That Just Work</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            A collection of fast, privacy-first tools for developers, writers,
            and designers. No ads popups, no account needed.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Tools Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          id="tools-grid"
        >
          {filteredTools.map((tool, i) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="card p-6 flex flex-col gap-3 group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="text-3xl animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {tool.icon}
                </div>
                <span
                  className="tag text-xs"
                  style={{ cursor: "default" }}
                >
                  {tool.category}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                  {tool.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                  Free · No login
                </span>
                <span className="text-xs text-[var(--accent)] font-medium group-hover:translate-x-1 transition-transform inline-block">
                  Open tool →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA & Partner Deals */}
        <div className="mt-20 flex flex-col gap-12 items-center">
          <div className="glass rounded-2xl p-10 text-center max-w-xl w-full">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-2">More Tools Coming</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              We add new tools regularly. All tools are free, fast, and work
              entirely in your browser.
            </p>
          </div>

          {/* Workflow Boosters (Deals Preview) */}
          <div className="w-full max-w-4xl animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest px-2">
                Workflow Boosters
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a
                href="https://grammarly.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="card p-4 flex items-start gap-3 group no-underline text-left"
                id="home-deal-grammarly"
              >
                <span className="text-2xl">✏️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">Grammarly</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(124,110,255,0.15)] text-[var(--accent)] border border-[rgba(124,110,255,0.3)]">Free Plan</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">AI writing assistant for grammar, tone, and clarity.</p>
                </div>
              </a>

              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="card p-4 flex items-start gap-3 group no-underline text-left"
                id="home-deal-supabase"
              >
                <span className="text-2xl">🗄️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">Supabase</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(124,110,255,0.15)] text-[var(--accent)] border border-[rgba(124,110,255,0.3)]">Free Tier</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Open-source Firebase alternative with full Postgres database.</p>
                </div>
              </a>

              <a
                href="https://hostinger.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="card p-4 flex items-start gap-3 group no-underline text-left sm:col-span-2 md:col-span-1"
                id="home-deal-hostinger"
              >
                <span className="text-2xl">🌐</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">Hostinger</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(124,110,255,0.15)] text-[var(--accent)] border border-[rgba(124,110,255,0.3)]">70% Off</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">High-speed SSD hosting optimized for fast web deployment.</p>
                </div>
              </a>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/deals"
                className="text-xs text-[var(--accent)] hover:underline font-medium"
              >
                View all curated deals & recommendations →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-20 py-8 text-center text-sm text-[var(--text-muted)]">
        <p>
          Built with ❤️ · All tools run in your browser · No data is ever sent
          to our servers
        </p>
      </footer>
    </main>
  );
}

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}

function CategoryFilter({ categories, selectedCategory, onSelect }: FilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`tag ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {categoryIcons[cat] || "📌"} {cat}
        </button>
      ))}
    </div>
  );
}
