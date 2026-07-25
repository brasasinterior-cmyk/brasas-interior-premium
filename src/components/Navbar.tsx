import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./WhatsAppFloat";

const links = [
  { to: "/cardapio", label: "Cardápio" },
  { to: "/sobre", label: "Nossa casa" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;

function LogoMark() {
  return (
    <img
      src="/brasa-do-interior-logo.jpg"
      alt="Brasa do Interior - Churrascaria & Petiscaria"
      className="h-11 w-11 shrink-0 rounded-full object-cover border border-[color:var(--gold)]/50"
    />
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = saved ? saved === "dark" : true;
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[oklch(0.16_0.024_40)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="hidden sm:block leading-tight">
            <span className="block font-display text-lg text-white">
              Brasas <em className="not-italic text-[color:var(--gold)] font-normal italic">do</em> Interior
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-white/50 uppercase">Passira · Pernambuco</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors ${
                  active ? "text-[color:var(--gold)]" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Alternar tema"
            className="h-10 w-10 grid place-items-center rounded-full border border-white/15 text-white/80 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/60 transition-colors"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-gold hidden sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> Pedir agora
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-md text-white"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[oklch(0.16_0.024_40)]">
          <nav className="flex flex-col px-5 py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 rounded-md text-white/90 hover:bg-white/5 font-medium"
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 btn-gold justify-center"
          >
            <MessageCircle className="h-4 w-4" /> Pedir agora
          </a>
        </nav>
      </div>
      )}
    </header>
  );
}
