"use client";

import type { AffiliateLink } from "@/data/affiliates";
import { BrandLogo } from "@/components/BrandLogo";

interface Props {
  links: AffiliateLink[];
  toolTitle: string;
}

export function AffiliateSection({ links, toolTitle }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <section className="mt-12">
      {/* Label */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest px-2">
          Recommended Tools
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4 text-center">
        Level up your workflow with these tools related to {toolTitle.toLowerCase()}.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="card p-4 flex items-start gap-3 group no-underline"
            id={`affiliate-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {/* Icon */}
            <span className="text-2xl flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--surface-3)] border border-[var(--border)] overflow-hidden p-1.5 group-hover:border-[var(--accent)] transition-colors">
              <BrandLogo
                url={link.href}
                fallbackEmoji={link.logo || "🔗"}
                alt={link.label}
                size="sm"
              />
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {link.label}
                </span>
                {link.badge && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(124,110,255,0.15)",
                      color: "var(--accent)",
                      border: "1px solid rgba(124,110,255,0.3)",
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                {link.description}
              </p>
            </div>

            {/* Arrow */}
            <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1 flex-shrink-0 text-sm">
              ↗
            </span>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-[var(--text-muted)] text-center mt-3">
        Affiliate links · We may earn a commission if you purchase via these links, at no extra cost to you.
      </p>
    </section>
  );
}
