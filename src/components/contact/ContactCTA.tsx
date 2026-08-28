import { Mail } from 'lucide-react';
import { personal } from '../../data/personal';
import { Button } from '../common/Button';
import { SocialLinks } from '../common/SocialLinks';

export function ContactCTA() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-contact p-8 sm:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Let's Work Together
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Let's work together</h2>
          <p className="mt-3 max-w-md text-white/85">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>

          <Button
            href={`mailto:${personal.email}`}
            variant="secondary"
            className="mt-6 bg-white text-primary hover:brightness-95"
          >
            Send Me an Email
            <Mail size={16} aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-white/80">Or find me on</p>
          <SocialLinks className="[&_a]:border-white/30 [&_a]:bg-white/10 [&_a]:text-white hover:[&_a]:border-white" />
        </div>
      </div>
    </div>
  );
}
