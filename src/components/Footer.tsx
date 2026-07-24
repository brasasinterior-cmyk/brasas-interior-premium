import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[color:var(--cream)] border-t border-[color:var(--border)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-10 w-10 rounded-full border border-[color:var(--wine)]/40 grid place-items-center bg-white"
          >
            <span className="font-display italic text-[color:var(--wine)]">B</span>
          </span>
          <div>
            <p className="font-display text-[color:var(--cocoa)]">
              Brasas <em className="italic text-[color:var(--wine)] font-normal">do</em> Interior
            </p>
            <p className="text-[10px] tracking-[0.3em] text-[color:var(--muted-foreground)] uppercase">Passira · Pernambuco</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm text-[color:var(--cocoa)]/80">
          <Link to="/cardapio" className="hover:text-[color:var(--wine)]">Cardápio</Link>
          <Link to="/sobre" className="hover:text-[color:var(--wine)]">Nossa casa</Link>
          <Link to="/galeria" className="hover:text-[color:var(--wine)]">Galeria</Link>
          <Link to="/contato" className="hover:text-[color:var(--wine)]">Contato</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[color:var(--cocoa)]/70 hover:text-[color:var(--wine)]">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-[color:var(--cocoa)]/70 hover:text-[color:var(--wine)]">
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[color:var(--muted-foreground)]">
          <p className="italic font-display">O verdadeiro sabor da brasa.</p>
          <p>© {new Date().getFullYear()} Brasas do Interior</p>
        </div>
      </div>
    </footer>
  );
}
