import { skills } from '../../data/skills';
import { SectionHeading } from '../common/SectionHeading';
import { PageContainer } from '../layout/PageContainer';
import { ScrollReveal } from '../common/ScrollReveal';
import { SkillCard } from './SkillCard';

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <PageContainer>
        <ScrollReveal>
          <SectionHeading eyebrow="My Skills" title="Technologies I work with" highlight="work with" />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.id} delay={(index % 6) * 70}>
              <SkillCard skill={skill} />
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
