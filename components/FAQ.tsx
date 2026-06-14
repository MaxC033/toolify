"use client";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export function FAQ({ items }: Props) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="card p-0 overflow-hidden group"
          >
            <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer">
              <span className="font-medium text-[var(--text-primary)] group-open:text-[var(--accent)] transition-colors">
                {item.question}
              </span>
              <span className="faq-icon text-xl text-[var(--text-muted)] flex-shrink-0 leading-none">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-[var(--text-secondary)] leading-relaxed text-sm border-t border-[var(--border)] pt-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
