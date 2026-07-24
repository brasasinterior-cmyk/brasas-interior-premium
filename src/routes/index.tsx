import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Beer, Users, Car, Award, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/components/WhatsAppFloat";
import hero from "@/assets/hero-churrasqueira.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g5 from "@/assets/gallery-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brasas do Interior — Churrascaria em Passira, PE" },
      { name: "description", content: "Carnes na brasa, petiscos, cerveja gelada e ambiente familiar no coração de Passira, Pernambuco." },
      { property: "og:title", content: "Brasas do Interior — Churrascaria em Passira, PE" },
      { property: "og:description", content: "Carnes na brasa, petiscos e sabor autêntico do interior pernambucano." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const differentials = [
  { icon: Flame, title: "Carnes na Brasa", desc: "Cortes nobres preparados no ponto certo em brasa real." },
  { icon: Beer, title: "Cerveja Gelada", desc: "A temperatura ideal para acompanhar a sua refeição." },
  { icon: Users, title: "Ambiente Familiar", desc: "Espaço acolhedor para toda a família." },
  { icon: Car, title: "Estacionamento", desc: "Estacionamento próprio para maior comodidade." },
  { icon: Award, title: "Atendimento de Qualidade", desc: "Nossa equipe prepara tudo com carinho." },
];

const promos = [
  { title: "Terça do Petisco", subtitle: "Carne de sol na brasa com farofa e vinagrete", price: "R$ 39,90", img: g5 },
  { title: "Combo Família", subtitle: "Picanha argentina P/4 com todos os acompanhamentos", price: "R$ 179,90", img: g2 },
  { title: "Happy Hour", subtitle: "Chopp gelado e petiscos de dar água na boca", price: "A partir de R$ 10", img: g1 },
];

function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % promos.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <img src={hero} alt="Churrasqueira com carnes na brasa" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <p className="animate-fade-up text-[color:var(--gold)] tracking-[0.35em] text-xs md:text-sm uppercase mb-4">Passira · Pernambuco</p>
          <h1 className="animate-fade-up font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none">
            Brasas <span className="text-gradient-gold">do Interior</span>
          </h1>
          <p className="animate-fade-up mt-6 text-white/85 max-w-xl text-base md:text-lg" style={{ animationDelay: "0.2s" }}>
            Carnes na brasa, petiscos e sabor autêntico do sertão. Um pedaço do interior pernambucano na sua mesa.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/cardapio"
              className="group inline-flex items-center justify-center gap-2 bg-[color:var(--brand-red)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white rounded-md hover:bg-[color:var(--gold)] hover:text-black transition-all"
            >
              Ver Cardápio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-[color:var(--gold)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:text-[color:var(--gold)] rounded-md transition-all"
            >
              Fazer Reserva
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 text-xs uppercase tracking-widest animate-bounce">
          Role para descobrir
        </div>
      </section>

      {/* DIFFERENTIALS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Nossos Diferenciais</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Uma experiência acolhedora</h2>
            <p className="mt-4 text-muted-foreground">
              Cada detalhe pensado para que sua visita seja inesquecível.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="card-lift h-full bg-card border border-border rounded-xl p-6 text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-[color:var(--brand-red)]/10 flex items-center justify-center text-[color:var(--brand-red)]">
                    <d.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-foreground">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOÇÕES SLIDER */}
      <section className="py-20 md:py-28 bg-[oklch(0.14_0.01_40)] text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Promoções</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Ofertas em destaque</h2>
          </Reveal>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {promos.map((p) => (
                <div key={p.title} className="w-full shrink-0 relative aspect-[16/9] md:aspect-[21/9]">
                  <img src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1024} height={1024} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                    <p className="text-[color:var(--gold)] uppercase text-xs tracking-widest mb-3">Oferta especial</p>
                    <h3 className="font-display text-3xl md:text-5xl font-bold">{p.title}</h3>
                    <p className="mt-3 text-white/80 md:text-lg">{p.subtitle}</p>
                    <p className="mt-5 font-display text-3xl md:text-4xl text-[color:var(--gold)]">{p.price}</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 bg-[color:var(--brand-red)] hover:bg-[color:var(--gold)] hover:text-black transition-colors px-6 py-3 rounded-md text-sm font-semibold uppercase tracking-wider"
                    >
                      Pedir pelo WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSlide((s) => (s - 1 + promos.length) % promos.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-black flex items-center justify-center transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSlide((s) => (s + 1) % promos.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-[color:var(--gold)] hover:text-black flex items-center justify-center transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {promos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === slide ? "w-8 bg-[color:var(--gold)]" : "w-2 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED / GALLERY PREVIEW */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Nossa Cozinha</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Sabores que contam histórias
              </h2>
            </div>
            <Link to="/galeria" className="text-sm text-[color:var(--brand-red)] hover:text-[color:var(--gold)] font-semibold uppercase tracking-wider inline-flex items-center gap-2">
              Ver galeria completa <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { src: g2, title: "Cortes Nobres", h: "aspect-[4/5]" },
              { src: g5, title: "Petiscos", h: "aspect-square md:aspect-[4/5] md:mt-16" },
              { src: g3, title: "Ambiente", h: "aspect-[4/5]" },
            ].map((it, i) => (
              <Reveal key={it.title} delay={i * 100}>
                <div className={`relative overflow-hidden rounded-xl group ${it.h}`}>
                  <img src={it.src} alt={it.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={1024} height={1024} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[color:var(--gold)] text-xs uppercase tracking-widest">Destaque</p>
                    <h3 className="font-display text-2xl text-white mt-1">{it.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-[color:var(--brand-red)] text-white text-center">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <Star className="h-8 w-8 mx-auto text-[color:var(--gold)] mb-4" />
            <h2 className="font-display text-3xl md:text-5xl font-bold">Venha viver essa experiência</h2>
            <p className="mt-4 text-white/85">
              Reserve sua mesa ou peça pelo WhatsApp. Estamos esperando por você.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-white text-[color:var(--brand-red)] px-8 py-3.5 rounded-md font-semibold uppercase tracking-wider text-sm hover:bg-[color:var(--gold)] hover:text-black transition-colors">
                Fazer Pedido
              </a>
              <Link to="/contato" className="border-2 border-white/60 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] px-8 py-3.5 rounded-md font-semibold uppercase tracking-wider text-sm transition-colors">
                Como Chegar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
