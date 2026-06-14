import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Toolify is a collection of free online tools for developers, writers, and designers. All tools run in your browser — no login, no ads, no tracking.",
};

export default function AboutPage() {
  return (
    <main className="noise-bg min-h-screen">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold gradient-text tracking-tight">
          ⚡ Toolify
        </Link>
        <span className="text-[var(--border)]">·</span>
        <span className="text-sm text-[var(--text-secondary)]">About</span>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">About Toolify</h1>

        <div className="flex flex-col gap-8 text-[var(--text-secondary)] leading-relaxed">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              🎯 What is Toolify?
            </h2>
            <p>
              Toolify is a curated collection of free online tools for
              developers, writers, and designers. Every tool is designed to do
              one thing well — and do it instantly, without friction.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              🔒 Privacy First
            </h2>
            <p>
              All tools run entirely in your browser. Your data is never sent to
              any server. No login. No account. No tracking beyond anonymous
              page view analytics.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              💡 Why Free?
            </h2>
            <p>
              We believe useful tools should be accessible to everyone. Toolify
              is supported by small, non-intrusive ads and affiliate links. No
              paywalls, ever.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
              🚀 More Coming
            </h2>
            <p>
              We add new tools regularly. If you have a suggestion, reach out
              via GitHub.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="btn-primary">
            ← Back to tools
          </Link>
        </div>
      </div>
    </main>
  );
}
