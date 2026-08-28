import { projects } from '../../data/projects';
import { SectionHeading } from '../common/SectionHeading';
import { PageContainer } from '../layout/PageContainer';
import { ScrollReveal } from '../common/ScrollReveal';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <PageContainer>
        <ScrollReveal>
          <SectionHeading eyebrow="Featured Projects" title="Things I've built" highlight="built" />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
