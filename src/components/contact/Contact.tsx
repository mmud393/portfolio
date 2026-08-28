import { PageContainer } from '../layout/PageContainer';
import { ScrollReveal } from '../common/ScrollReveal';
import { ContactCTA } from './ContactCTA';

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <PageContainer>
        <ScrollReveal>
          <ContactCTA />
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
