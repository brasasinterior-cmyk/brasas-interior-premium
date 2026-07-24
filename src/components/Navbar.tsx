import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Flame, Moon, Sun } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/galeria", label: "Galeria" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Flame className={`h-7 w-7 transition-colors ${solid ? "text-[color:var(--brand-red)]" : "text-[color:var(--gold)]"}`} />
          <span
            className={`font-display text-xl md:text-2xl font-bold tracking-wide ${
              solid ? "text-foreground" : "text-white drop-shadow"
            }`}
          >
            Brasas <span className="text-[color:var(--gold)]">do Interior</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  solid ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"
                } ${active ? "!text-[color:var(--gold)]" : ""}`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[color:var(--gold)] transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <button
            onClick={toggleDark}
            aria-label="Alternar tema"
            className={`p-2 rounded-full transition-colors ${solid ? "hover:bg-muted" : "hover:bg-white/10"}`}
          >
            {dark ? <Sun className={`h-5 w-5 ${solid ? "text-foreground" : "text-white"}`} /> : <Moon className={`h-5 w-5 ${solid ? "text-foreground" : "text-white"}`} />}
          </button>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden p-2 rounded-md ${solid ? "text-foreground" : "text-white"}`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 rounded-md text-foreground hover:bg-muted font-medium"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={toggleDark}
              className="flex items-center gap-2 px-3 py-3 rounded-md text-foreground hover:bg-muted font-medium text-left"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {dark ? "Modo claro" : "Modo escuro"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
