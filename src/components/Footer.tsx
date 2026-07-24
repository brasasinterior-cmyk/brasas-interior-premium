import { Link } from "@tanstack/react-router";
import { Flame, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.14_0.01_40)] text-white/85 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-7 w-7 text-[color:var(--gold)]" />
            <span className="font-display text-xl font-bold">
              Brasas <span className="text-[color:var(--gold)]">do Interior</span>
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Carnes na brasa, sabor autêntico do interior de Pernambuco. Ambiente familiar e atendimento acolhedor.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4 text-[color:var(--gold)]">Contato</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--gold)]" /> Av. Alberto Bennig, Passira – PE</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--gold)]" /> (81) 99549-7750</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4 text-[color:var(--gold)]">Horários</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--gold)]" /> Seg – Sex: 10h às 23h</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--gold)]" /> Sáb – Dom: 10h às 00h</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4 text-[color:var(--gold)]">Navegue</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><Link to="/" className="hover:text-[color:var(--gold)]">Início</Link></li>
            <li><Link to="/cardapio" className="hover:text-[color:var(--gold)]">Cardápio</Link></li>
            <li><Link to="/galeria" className="hover:text-[color:var(--gold)]">Galeria</Link></li>
            <li><Link to="/sobre" className="hover:text-[color:var(--gold)]">Sobre</Link></li>
            <li><Link to="/contato" className="hover:text-[color:var(--gold)]">Contato</Link></li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-black transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-black transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 text-center">
          © {new Date().getFullYear()} Brasas do Interior. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
