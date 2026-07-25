import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import fachada from "@/assets/fachada.jpg.asset.json";
import picanha from "@/assets/picanha.jpg.asset.json";
import premio from "@/assets/premio.jpg.asset.json";
import drink from "@/assets/drink-limao.jpg.asset.json";
import carneChapa from "@/assets/carne-chapa.jpg.asset.json";
import cebola from "@/assets/cebola-recheada.jpg.asset.json";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Brasas do Interior" },
      { name: "description", content: "Fotos dos nossos pratos, ambiente e experiência no Brasas do Interior." },
      { property: "og:title", content: "Galeria — Brasas do Interior" },
      { property: "og:description", content: "Confira nossas fotos: cortes, petiscos, drinks e ambiente." },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Galeria,
});

const photos = [
  { src: fachada.url, alt: "Fachada da Brasa do Interior em Passira" },
  { src: carneChapa.url, alt: "Carne na chapa quente" },
  { src: cebola.url, alt: "Cebola recheada com queijo e torradas" },
  { src: drink.url, alt: "Drink gelado com limão" },
  { src: premio.url, alt: "Prêmio Melhor Restaurante — Destaques do Agreste Passira-PE" },
  { src: picanha.url, alt: "Picanha na brasa fatiada" },
];

function Galeria() {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? 0 : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx]);

  return (
    <Layout>
      <section className="relative pt-32 pb-16 bg-[oklch(0.14_0.01_40)] text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Galeria</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">Sabores em imagens</h1>
          <p className="mt-4 text-white/70">Clique em qualquer foto para ampliar.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <Reveal key={p.alt} delay={(i % 6) * 60}>
                <button
                  onClick={() => setIdx(i)}
                  className={`relative w-full overflow-hidden rounded-xl group card-lift ${
                    i === 0 ? "aspect-[4/5] lg:col-span-2 lg:aspect-[16/10]" : "aspect-[4/5]"
                  }`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-4 left-4 text-white font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.alt}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {idx !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in" onClick={() => setIdx(null)}>
          <button className="absolute top-6 right-6 text-white p-2 hover:text-[color:var(--gold)]" onClick={() => setIdx(null)} aria-label="Fechar">
            <X className="h-7 w-7" />
          </button>
          <button
            className="absolute left-4 md:left-8 text-white p-3 hover:text-[color:var(--gold)]"
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length)); }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={photos[idx].src}
            alt={photos[idx].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 md:right-8 text-white p-3 hover:text-[color:var(--gold)]"
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i === null ? 0 : (i + 1) % photos.length)); }}
            aria-label="Próximo"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {idx + 1} / {photos.length} — {photos[idx].alt}
          </p>
        </div>
      )}
    </Layout>
  );
}
