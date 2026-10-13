import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/hero/Hero';
import { About } from '../components/about/About';
import { Skills } from '../components/skills/Skills';
import { Projects } from '../components/projects/Projects';
import { Experience } from '../components/experience/Experience';
import { Contact } from '../components/contact/Contact';
import { CursorEffectsLayer } from '../effects/CursorEffectsLayer';

export function Home() {
  return (
    <>
      <CursorEffectsLayer />
      <Navbar />
      <div className="relative z-10">
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  );
}
