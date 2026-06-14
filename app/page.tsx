import Link from "next/link";
import toolsData from "@/data/tools.json";

const categories = [
  "All",
  ...Array.from(new Set(toolsData.map((t) => t.category))),
];

const categoryIcons: Record<string, string> = {
  All: "✦",
  Security: "🔐",
  Writing: "📝",
  Design: "🎨",
  Productivity: "🍅",
  Developer: "🔑",
};

export default function Home() {
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
        <CategoryFilter categories={categories} />

        {/* Tools Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          id="tools-grid"
        >
          {toolsData.map((tool, i) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="card p-6 flex flex-col gap-3 group"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="text-3xl animate-float"
                  style={{ animationDelay: `${i * 0.3}s` }}
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

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-10 inline-block max-w-xl w-full">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-2">More Tools Coming</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              We add new tools regularly. All tools are free, fast, and work
              entirely in your browser.
            </p>
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

function CategoryFilter({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {categories.map((cat) => (
        <span key={cat} className="tag">
          {categoryIcons[cat] || "📌"} {cat}
        </span>
      ))}
    </div>
  );
}
