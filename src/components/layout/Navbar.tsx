import { useState, useEffect } from 'react';
import { Download, Moon, Sun, Menu, X } from 'lucide-react';
import { navigationItems } from '../../data/navigation';
import { personal } from '../../data/personal';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useTheme } from '../../hooks/useTheme';
import { PageContainer } from './PageContainer';
import { cn } from '../../utils/cn';

const sectionIds = navigationItems.map((item) => item.href.replace('#', ''));

export function Navbar() {
  const scrolled = useScrollPosition(20);
  const activeSection = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border bg-navbar backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <PageContainer>
        <nav className="flex h-[72px] items-center justify-between" aria-label="Primary">
          <a href="#home" className="flex items-center gap-2 font-bold">
            <span className="text-gradient text-lg">{personal.initials}</span>
            <span className="hidden text-foreground sm:inline">{personal.name}</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'relative py-1 text-sm font-medium text-muted transition-colors hover:text-foreground',
                      isActive && 'text-blue-light',
                    )}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-primary" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
            >
              {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
            <a
              href={personal.resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
      </PageContainer>

      {menuOpen && (
        <div className="border-t border-border bg-navbar backdrop-blur-xl md:hidden">
          <PageContainer>
            <ul className="flex flex-col gap-1 py-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-muted hover:bg-surface hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between px-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted"
                >
                  {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <a
                  href={personal.resumeUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  <Download size={16} aria-hidden="true" />
                  CV
                </a>
              </li>
            </ul>
          </PageContainer>
        </div>
      )}
    </header>
  );
}
