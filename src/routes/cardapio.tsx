import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Minus, Flame, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { CartBar, useCart } from "@/components/OrderCart";
import menu from "@/data/menu.json";


type Item = {
  categoria: string; nome: string; descricao: string;
  preco?: number; preco_p2?: number; preco_p4?: number; imagem: string;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Brasas do Interior" },
      { name: "description", content: "Cardápio completo: carnes na brasa, petiscos, executivos, entradas, bebidas, drinks e sobremesas em Passira, PE." },
      { property: "og:title", content: "Cardápio — Brasas do Interior" },
      { property: "og:description", content: "Carnes na brasa, petiscos, executivos, bebidas e sobremesas." },
    ],
    links: [{ rel: "canonical", href: "/cardapio" }],
  }),
  component: Cardapio,
});

function Cardapio() {
  const items = menu as Item[];
  const cart = useCart();
  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.categoria))), [items]);
  const [cat, setCat] = useState(categories[0] ?? "");
  const [q, setQ] = useState("");


  const filtered = items.filter((i) => {
    const okCat = !cat || i.categoria === cat;
    const okQ = !q.trim() || (i.nome + " " + i.descricao).toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  });

  return (
    <Layout>
      {/* Header on cream */}
      <section className="pt-32 pb-10 bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-10 items-end">
          <div>
            <p className="eyebrow text-[color:var(--wine)] before:bg-[color:var(--wine)]">Cardápio da casa</p>
            <h1 className="mt-6 font-display text-[color:var(--cocoa)] text-[clamp(2.5rem,7vw,5rem)] leading-[1]" style={{ fontWeight: 400 }}>
              Escolha seu{" "}
              <em className="serif-italic-wine italic">momento.</em>
            </h1>
          </div>
          <p className="text-[color:var(--muted-foreground)] max-w-md md:ml-auto leading-relaxed">
            Comece pela brasa, siga pelo seu apetite. Tudo preparado para você pedir sem pressa e sem dúvida.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-10 mt-12">
          <div className="border-t border-[color:var(--border)] pt-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--muted-foreground)]" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="O que você está procurando?"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[color:var(--border)] focus:border-[color:var(--gold)] focus:outline-none text-sm placeholder:text-[color:var(--muted-foreground)]"
              />
            </div>
            <div className="relative">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="appearance-none pl-5 pr-10 py-3 rounded-full bg-white border border-[color:var(--border)] text-sm text-[color:var(--cocoa)] focus:border-[color:var(--gold)] focus:outline-none"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--muted-foreground)]" />
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm transition-all border ${
                  cat === c
                    ? "bg-[color:var(--wine)] text-white border-[color:var(--wine)]"
                    : "bg-transparent text-[color:var(--cocoa)]/80 border-[color:var(--border)] hover:border-[color:var(--wine)]/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="pb-24 bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">Para compartilhar</p>
              <h2 className="mt-2 font-display text-3xl text-[color:var(--cocoa)]">{cat}</h2>
            </div>
            <p className="text-xs text-[color:var(--muted-foreground)]">{filtered.length} itens</p>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[color:var(--muted-foreground)] py-16">Nenhum item encontrado.</p>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((it, i) => (
              <Reveal key={it.nome + i} delay={(i % 6) * 40}>
                <article className="card-lift bg-white border border-[color:var(--border)] rounded-2xl p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="h-9 w-9 rounded-full bg-[color:var(--gold)]/20 grid place-items-center text-[color:var(--wine)] shrink-0">
                      <Flame className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-[color:var(--cocoa)] leading-tight">{it.nome}</h3>
                    </div>
                    {it.preco !== undefined && (
                      <span className="font-mono text-base font-semibold text-[color:var(--wine)] whitespace-nowrap">
                        R$ {it.preco.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-[color:var(--muted-foreground)] leading-relaxed flex-1">
                    {it.descricao}
                  </p>
                  <div className="mt-5 pt-4 border-t border-dashed border-[color:var(--border)] flex flex-col gap-2">
                    {it.preco !== undefined && (
                      <AddRow cart={cart} id={`${it.nome}-un`} nome={it.nome} preco={it.preco} label={brl(it.preco)} />
                    )}
                    {it.preco_p2 !== undefined && (
                      <AddRow cart={cart} id={`${it.nome}-p2`} nome={it.nome} variacao="P/2" preco={it.preco_p2} label={`P/2 ${brl(it.preco_p2)}`} />
                    )}
                    {it.preco_p4 !== undefined && (
                      <AddRow cart={cart} id={`${it.nome}-p4`} nome={it.nome} variacao="P/4" preco={it.preco_p4} label={`P/4 ${brl(it.preco_p4)}`} />
                    )}
                    {it.preco === undefined && it.preco_p2 === undefined && it.preco_p4 === undefined && (
                      <span className="text-sm text-[color:var(--muted-foreground)]">Consultar</span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CartBar cart={cart} />
    </Layout>
  );
}

function AddRow({
  cart, id, nome, variacao, preco, label,
}: {
  cart: ReturnType<typeof useCart>; id: string; nome: string; variacao?: string; preco: number; label: string;
}) {
  const qtd = cart.qtyOf(id);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm px-2.5 py-1 rounded-full bg-[color:var(--gold)]/20 text-[color:var(--wine)] font-medium">
        {label}
      </span>
      {qtd === 0 ? (
        <button
          onClick={() => cart.add({ id, nome, variacao, preco })}
          className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--wine)] text-white text-sm px-4 py-1.5 hover:brightness-110 transition"
        >
          <Plus className="h-3.5 w-3.5" /> Adicionar
        </button>
      ) : (
        <span className="inline-flex items-center gap-2">
          <button onClick={() => cart.dec(id)} aria-label="Diminuir" className="h-8 w-8 grid place-items-center rounded-full border border-[color:var(--border)] text-[color:var(--cocoa)]">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-5 text-center text-sm text-[color:var(--cocoa)]">{qtd}</span>
          <button onClick={() => cart.add({ id, nome, variacao, preco })} aria-label="Aumentar" className="h-8 w-8 grid place-items-center rounded-full bg-[color:var(--wine)] text-white">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </span>
      )}
    </div>
  );
}
