import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { navigationItems } from "../../data/navigation";
import { personal } from "../../data/personal";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useTheme } from "../../hooks/useTheme";
import { PageContainer } from "./PageContainer";
import { cn } from "../../utils/cn";

const sectionIds = navigationItems.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const scrolled = useScrollPosition(20);
  const activeSection = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          scrolled || menuOpen
            ? "border-b border-border bg-navbar backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <PageContainer>
          <nav
            className="flex h-[72px] items-center justify-between"
            aria-label="Primary"
          >
            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 font-bold"
            >
              <span className="text-foreground">{personal.name}</span>
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "relative py-1 text-sm font-medium text-muted transition-colors hover:text-foreground",
                        isActive && "text-blue-light",
                      )}
                      aria-current={isActive ? "true" : undefined}
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
                aria-label={
                  theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
              >
                {theme === "dark" ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </nav>
        </PageContainer>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 md:hidden",
          "transition-[opacity,visibility] duration-300",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
        />

        <div
          className={cn(
            "relative mx-4 mt-3 overflow-hidden rounded-3xl border border-border bg-navbar shadow-2xl backdrop-blur-xl",
            "transition-transform duration-300 ease-out",
            menuOpen ? "translate-y-0" : "-translate-y-4",
          )}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-primary opacity-20 blur-3xl" />

          <ul className="relative flex flex-col p-3">
            {navigationItems.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    tabIndex={menuOpen ? 0 : -1}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors",
                      isActive ? "bg-surface" : "hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "w-6 text-xs font-semibold tabular-nums",
                        isActive ? "text-blue-light" : "text-muted opacity-60",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-lg font-semibold",
                        isActive
                          ? "text-foreground"
                          : "text-muted group-hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full bg-gradient-primary transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative flex items-center gap-3 border-t border-border p-4">
            <button
              type="button"
              onClick={toggleTheme}
              tabIndex={menuOpen ? 0 : -1}
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun size={18} aria-hidden="true" />
              ) : (
                <Moon size={18} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
