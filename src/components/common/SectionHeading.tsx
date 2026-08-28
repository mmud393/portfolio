interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, highlight, align = 'left' }: SectionHeadingProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        {highlight ? (
          <>
            {parts[0]}
            <span className="text-gradient">{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}
