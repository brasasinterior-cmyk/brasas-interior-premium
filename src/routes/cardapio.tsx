import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/components/WhatsAppFloat";
import menu from "@/data/menu.json";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const imgMap: Record<string, string> = {
  "gallery-1": g1, "gallery-2": g2, "gallery-4": g4, "gallery-5": g5, "gallery-6": g6,
};

type Item = {
  categoria: string; nome: string; descricao: string;
  preco?: number; preco_p2?: number; preco_p4?: number; imagem: string;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Brasas do Interior" },
      { name: "description", content: "Confira nosso cardápio completo: carnes na brasa, petiscos, executivos, bebidas, drinks e sobremesas." },
      { property: "og:title", content: "Cardápio — Brasas do Interior" },
      { property: "og:description", content: "Carnes na brasa, petiscos, executivos, bebidas e sobremesas." },
    ],
    links: [{ rel: "canonical", href: "/cardapio" }],
  }),
  component: Cardapio,
});

function Cardapio() {
  const items = menu as Item[];
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(items.map((i) => i.categoria)))], [items]);
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");

  const filtered = items.filter((i) => {
    const okCat = cat === "Todos" || i.categoria === cat;
    const okQ = !q.trim() || (i.nome + " " + i.descricao).toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  return (
    <Layout>
      <section className="relative pt-32 pb-16 bg-[oklch(0.14_0.01_40)] text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Nosso Cardápio</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">Cardápio Completo</h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">Todos os sabores do Brasas do Interior em um só lugar.</p>

          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar prato ou bebida..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 focus:border-[color:var(--gold)] focus:outline-none text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </section>

      <section className="sticky top-16 md:top-[68px] z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cat === c
                  ? "bg-[color:var(--brand-red)] text-white shadow-md"
                  : "bg-muted text-foreground/80 hover:bg-[color:var(--gold)]/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">Nenhum item encontrado.</p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((it, i) => (
              <Reveal key={it.nome + i} delay={(i % 6) * 50}>
                <article className="card-lift group bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={imgMap[it.imagem] ?? g1} alt={it.nome} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur text-[color:var(--gold)] text-xs uppercase tracking-wider px-2.5 py-1 rounded">
                      {it.categoria}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-foreground">{it.nome}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground flex-1">{it.descricao}</p>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div className="text-[color:var(--brand-red)] font-display text-lg leading-tight">
                        {it.preco !== undefined && <div>{brl(it.preco)}</div>}
                        {it.preco_p2 !== undefined && (
                          <div className="text-sm text-foreground/70 font-sans">P/2 <span className="text-[color:var(--brand-red)] font-display">{brl(it.preco_p2)}</span></div>
                        )}
                        {it.preco_p4 !== undefined && (
                          <div className="text-sm text-foreground/70 font-sans">P/4 <span className="text-[color:var(--brand-red)] font-display">{brl(it.preco_p4)}</span></div>
                        )}
                      </div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 bg-[color:var(--brand-red)] hover:bg-[color:var(--gold)] hover:text-black transition-colors text-white px-3.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Pedir
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
