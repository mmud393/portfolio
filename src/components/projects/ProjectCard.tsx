import { useState } from 'react';
import { Code, ExternalLink, Smartphone } from 'lucide-react';
import type { Project } from '../../types/project';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, technologies, links, cover, imagePosition = 'center' } = project;
  const [imageFailed, setImageFailed] = useState(false);
  const showFallback = !cover || imageFailed;

  return (
    <GlassCard as="article" glow className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-background-tertiary">
        {showFallback ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-background-secondary to-background-tertiary text-muted">
            <Smartphone size={28} aria-hidden="true" />
            <span className="text-sm font-medium">{title}</span>
          </div>
        ) : (
          <>
            <img
              src={cover}
              alt={`${title} application preview`}
              loading="lazy"
              width={1600}
              height={900}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: imagePosition }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                opacity: 0,
                background: 'linear-gradient(to bottom, transparent 45%, var(--color-overlay) 100%)',
              }}
            />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {(links?.github || links?.live) && (
          <div className="mt-auto flex items-center gap-3 pt-2 opacity-80 transition-opacity group-hover:opacity-100">
            {links?.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source code on GitHub`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-blue-light"
              >
                <Code size={16} aria-hidden="true" />
              </a>
            )}
            {links?.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live project`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-blue-light"
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
