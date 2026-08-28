import { experience } from '../../data/experience';
import { SectionHeading } from '../common/SectionHeading';
import { PageContainer } from '../layout/PageContainer';
import { ScrollReveal } from '../common/ScrollReveal';
import { ExperienceItem } from './ExperienceItem';

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <PageContainer>
        <ScrollReveal>
          <SectionHeading eyebrow="Experience" title="My professional journey" highlight="journey" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ol className="mt-12 flex max-w-2xl flex-col gap-10">
            {experience.map((item, index) => (
              <ExperienceItem key={item.id} item={item} isLast={index === experience.length - 1} />
            ))}
          </ol>
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
