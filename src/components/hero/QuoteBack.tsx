import type { Quote } from '../../data/quotes';

interface QuoteBackProps {
  quote: Quote;
  index: number;
  total: number;
}

/** Back face body: a developer tip laid out like a doc comment in the editor. */
export function QuoteBack({ quote, index, total }: QuoteBackProps) {
  const lines = [
    <span key="open" className="text-muted">/**</span>,
    <span key="q" className="text-foreground">
      <span className="text-muted"> * </span>
      <span className="text-[var(--color-blue-dark)]">“</span>
      {quote.text}
      <span className="text-[var(--color-blue-dark)]">”</span>
    </span>,
    <span key="gap" className="text-muted"> *</span>,
    <span key="a">
      <span className="text-muted"> * </span>
      <span className="text-[var(--color-blue-dark)]">@tag</span> <span className="text-[var(--color-blue-dark)]">{quote.tag}</span>
    </span>,
    <span key="close" className="text-muted"> */</span>,
  ];

  return (
    <div key={index} className="flex h-full flex-col justify-between px-4 py-4 font-mono sm:px-5 sm:py-5">
      <div className="flex flex-1 flex-col justify-center gap-1 text-[13px] leading-7 sm:text-base sm:leading-8">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words pl-1 [text-indent:-1.6ch] [padding-left:1.6ch]">
            {line}
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted sm:text-xs">
        <span className="text-[var(--color-blue-dark)]">const</span> quote = {index + 1} <span className="text-muted">/ {total}</span>;
        <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-blue-light" aria-hidden="true" />
      </p>
    </div>
  );
}
