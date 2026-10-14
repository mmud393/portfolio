import { ArrowRight, Mail } from 'lucide-react';
import { personal } from '../../data/personal';
import { Button } from '../common/Button';
import { SocialLinks } from '../common/SocialLinks';
import { PageContainer } from '../layout/PageContainer';
import { ProfileVisual } from './ProfileVisual';

export function Hero() {
  return (
    <section id="home" className="relative flex items-center overflow-hidden pb-16 pt-28 md:min-h-screen">
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

      <PageContainer className="relative w-full">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div className="min-w-0 animate-fade-up">
            <span className="glass inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-foreground-secondary">
              👋 Hi, I'm
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              {personal.firstName} <span className="text-gradient">{personal.lastName}</span>
            </h1>

            <p className="mt-3 text-lg font-semibold sm:text-2xl">
              <span className="text-gradient-spectrum">{personal.title}</span>
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground-secondary sm:text-lg">
              {personal.tagline}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 [&>a]:whitespace-nowrap [&>a]:px-3 sm:[&>a]:px-6 sm:flex sm:flex-wrap sm:gap-4">
              <Button href="#projects" variant="primary">
                View My Work
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="outline">
                Let's Connect
                <Mail size={16} aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm text-muted">Find me on</p>
              <SocialLinks />
            </div>
          </div>

          <div className="min-w-0 animate-fade-in [animation-delay:200ms]">
            <ProfileVisual />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
