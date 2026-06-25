import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Recommended Resources",
  description:
    "Boost your workflow with our hand-picked resources — top developer tools, design suites, writing assistants, web hosting, and security tools.",
};

const categories = [
  {
    name: "Writing & Productivity",
    icon: "✏️",
    deals: [
      {
        name: "Grammarly",
        description:
          "AI-powered writing assistant that checks grammar, style, and tone in real-time.",
        logo: "✍️",
        link: "https://grammarly.com",
      },
      {
        name: "Todoist",
        description:
          "Organize your life and work. Clean, simple, and integrates with pomodoro timers.",
        logo: "✅",
        link: "https://todoist.com",
      },
      {
        name: "Notion",
        description:
          "The all-in-one workspace for your notes, tasks, wikis, and databases.",
        logo: "📒",
        link: "https://notion.so",
      },
      {
        name: "Obsidian",
        description:
          "A powerful knowledge base on top of a local folder of plain text Markdown files.",
        logo: "🔮",
        link: "https://obsidian.md",
      },
    ],
  },
  {
    name: "Design & Creative Tools",
    icon: "🎨",
    deals: [
      {
        name: "Canva",
        description:
          "Create beautiful social media posts, presentation decks, flyers, and graphic mockups.",
        logo: "🖌️",
        link: "https://canva.com",
      },
      {
        name: "Figma",
        description:
          "The leading collaborative interface design tool. Free forever for individuals.",
        logo: "📐",
        link: "https://figma.com",
      },
    ],
  },
  {
    name: "Databases & API Testing",
    icon: "🗄️",
    deals: [
      {
        name: "Supabase",
        description:
          "An open-source Firebase alternative. Instant Postgres database, Auth, and APIs.",
        logo: "⚡",
        link: "https://supabase.com",
      },
      {
        name: "Postman",
        description:
          "The absolute industry standard for building, testing, and formatting REST APIs.",
        logo: "📬",
        link: "https://postman.com",
      },
    ],
  },
  {
    name: "Hosting & Infrastructure",
    icon: "🌐",
    deals: [
      {
        name: "Hostinger",
        description:
          "Affordable shared web hosting with direct WordPress deployment and high-speed SSDs.",
        logo: "🖥️",
        link: "https://hostinger.com",
      },
      {
        name: "Vercel",
        description:
          "The best framework and hosting platform for Next.js, React, and frontend developer teams.",
        logo: "▲",
        link: "https://vercel.com",
      },
    ],
  },
  {
    name: "Security & Privacy",
    icon: "🛡️",
    deals: [
      {
        name: "Bitwarden",
        description:
          "Open-source password manager. Store, sync, and share credentials securely.",
        logo: "🔐",
        link: "https://bitwarden.com",
      },
      {
        name: "1Password",
        description:
          "Elegant, enterprise-grade password management for families, teams, and individuals.",
        logo: "🔑",
        link: "https://1password.com",
      },
      {
        name: "NordVPN",
        description:
          "Industry-leading VPN service protecting your online identity and internet connection.",
        logo: "🛡️",
        link: "https://nordvpn.com",
      },
    ],
  },
];

export default function DealsPage() {
  return (
    <main className="noise-bg min-h-screen relative">
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
            href="/"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            All Tools
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
            className="btn-secondary py-2 px-4"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Recommended
            <br />
            <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Hand-picked recommendations of industry-standard tools, secure
            hosting, and productivity packages to supercharge your workflow.
          </p>
        </div>

        {/* Categories & Cards */}
        <div className="flex flex-col gap-12">
          {categories.map((category, idx) => (
            <section
              key={category.name}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  {category.name}
                </h2>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.deals.map((deal) => (
                  <a
                    key={deal.name}
                    href={deal.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="card p-5 flex items-start gap-4 group no-underline text-left"
                    id={`deal-card-${deal.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="text-3xl flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[var(--surface-2)] rounded-xl border border-[var(--border)] group-hover:border-[var(--accent)] transition-all overflow-hidden p-2">
                      <BrandLogo
                        url={deal.link}
                        fallbackEmoji={deal.logo}
                        alt={deal.name}
                        size="md"
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {deal.name}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {deal.description}
                      </p>
                    </div>
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[var(--text-muted)] text-center mt-20 border-t border-[var(--border)] pt-8">
          Disclosure: This page contains affiliate links. If you purchase or
          sign up via these links, we may receive a commission at no additional
          cost to you. We only recommend services we trust and use.
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-16 py-8 text-center text-sm text-[var(--text-muted)]">
        <p>
          © {new Date().getFullYear()} Toolify · Curated with care for web professionals
        </p>
      </footer>
    </main>
  );
}
