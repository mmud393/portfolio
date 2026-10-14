import { Briefcase } from 'lucide-react';
import { personal } from '../../data/personal';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { PageContainer } from '../layout/PageContainer';
import { ScrollReveal } from '../common/ScrollReveal';
import { AboutInfo } from './AboutInfo';

export function About() {
  return (
    <section id="about" className="py-24">
      <PageContainer>
        <ScrollReveal>
          <GlassCard className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="About Me"
                title={personal.aboutHeading}
                highlight="ship"
              />
              <p className="mt-6 text-base leading-relaxed text-foreground-secondary">
                {personal.aboutDescription}
              </p>
              <Button href="#experience" variant="secondary" className="mt-8">
                <Briefcase size={16} aria-hidden="true" />
                View my experience
              </Button>
            </div>

            <AboutInfo />
          </GlassCard>
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
