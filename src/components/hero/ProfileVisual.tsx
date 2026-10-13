import { Atom, FileCode2, Braces } from 'lucide-react';
import { personal } from '../../data/personal';
import { AvailabilityCard } from './AvailabilityCard';

const badges = [
  { icon: Atom, label: 'React', glow: 'shadow-glow-cyan', tone: 'text-cyan-light', className: 'left-0 -top-5 sm:-left-6' },
  { icon: Braces, label: 'JavaScript', glow: 'shadow-glow', tone: 'text-blue-light', className: 'right-0 top-1/3 sm:-right-5' },
  { icon: FileCode2, label: 'TypeScript', glow: 'shadow-glow-lg', tone: 'text-violet-light', className: 'left-2 bottom-20 sm:-left-5' },
];

const stack = [
  ['React Native', 'React.js', 'Next.js'],
  ['TypeScript', 'JavaScript', 'Node.js'],
  ['Firebase', 'AWS', 'Expo'],
  ['MongoDB', 'MySQL', 'Git'],
];

/** Hero visual: a developer "card" rendered as a code editor window. */
export function ProfileVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] pb-8 sm:max-w-[420px] lg:max-w-[480px]">
      <div className="rounded-2xl bg-gradient-conic-tech p-[2px] shadow-glow-lg">
        <div className="overflow-hidden rounded-[calc(1rem-2px)] bg-background-tertiary">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-3 font-mono text-xs text-muted">moin.ts</span>
          </div>

          <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-7 text-foreground-secondary sm:text-sm">
            <code>
              <span className="text-violet-light">const</span> <span className="text-blue-light">developer</span> = {'{'}
              {'\n  '}name: <span className="text-emerald">'{personal.firstName} {personal.lastName}'</span>,
              {'\n  '}role: [<span className="text-emerald">'Frontend'</span>, <span className="text-emerald">'Mobile App'</span>,
              {'\n         '}<span className="text-emerald">'Full Stack'</span>],
              {'\n  '}experience: <span className="text-emerald">'{personal.experienceYears}'</span>,
              {'\n  '}base: <span className="text-emerald">'{personal.location}'</span>,
              {'\n  '}stack: [
              {stack.map((row, i) => (
                <span key={row[0]}>
                  {'\n    '}
                  {row.map((s, j) => (
                    <span key={s}>
                      <span className="text-cyan-light">'{s}'</span>
                      {i < stack.length - 1 || j < row.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </span>
              ))}
              {'\n  '}],
              {'\n  '}openToWork: <span className="text-violet-light">true</span>,
              {'\n  '}ship: () =&gt; <span className="text-emerald">'🚀'</span>,
              {'\n'}
              {'}'};
              <span className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-blue-light" aria-hidden="true" />
            </code>
          </pre>
        </div>
      </div>

      {badges.map(({ icon: Icon, label, glow, tone, className }) => (
        <div
          key={label}
          className={`glass absolute flex h-12 w-12 items-center justify-center rounded-full border border-border sm:h-14 sm:w-14 ${glow} ${tone} ${className}`}
        >
          <Icon size={20} aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </div>
      ))}

      <AvailabilityCard />
    </div>
  );
}
