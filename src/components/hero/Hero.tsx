import { ArrowRight, Mail } from 'lucide-react';
import { personal } from '../../data/personal';
import { Button } from '../common/Button';
import { SocialLinks } from '../common/SocialLinks';
import { PageContainer } from '../layout/PageContainer';
import { ProfileVisual } from './ProfileVisual';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-24 sm:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-[10%] h-[500px] w-[500px] opacity-[0.12]"
        style={{ background: 'radial-gradient(closest-side, var(--color-blue), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-[5%] h-[500px] w-[500px] opacity-[0.12]"
        style={{ background: 'radial-gradient(closest-side, var(--color-violet), transparent)' }}
      />

      <PageContainer className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="glass inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-foreground-secondary">
              👋 Hi, I'm
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-foreground sm:text-6xl lg:text-7xl">
              {personal.firstName} <span className="text-gradient">{personal.lastName}</span>
            </h1>

            <p className="mt-4 text-xl font-semibold sm:text-2xl">
              <span className="text-gradient-spectrum">{personal.title}</span>
            </p>

            <p className="mt-6 max-w-xl text-base text-foreground-secondary sm:text-lg">
              {personal.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#projects" variant="primary">
                View My Work
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="outline">
                Let's Connect
                <Mail size={16} aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-sm text-muted">Find me on</p>
              <SocialLinks />
            </div>
          </div>

          <div className="animate-fade-in [animation-delay:200ms]">
            <ProfileVisual />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
