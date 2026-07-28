import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, ChefHat, Sparkles, ShoppingBag, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/components/WhatsAppFloat";
import hero from "@/assets/hero-churrasqueira.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brasas do Interior — O verdadeiro sabor da brasa em Passira, PE" },
      { name: "description", content: "Carne no ponto, lenha queimando devagar e o tempero do interior de Pernambuco. Cardápio, promoções e reservas em Passira." },
      { property: "og:title", content: "Brasas do Interior — O verdadeiro sabor da brasa" },
      { property: "og:description", content: "Restaurante e churrascaria em Passira, PE. Carnes na brasa, petiscos e ambiente acolhedor." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const differentials = [
  { icon: Flame, title: "Carnes na brasa", sub: "Feitas na hora" },
  { icon: ChefHat, title: "Tempero de casa", sub: "Receitas do interior" },
  { icon: Sparkles, title: "Ambiente acolhedor", sub: "Para ficar à vontade" },
  { icon: ShoppingBag, title: "Peça fácil", sub: "Direto pelo WhatsApp" },
  { icon: MapPin, title: "No coração de Passira", sub: "Avenida Alberto Bennig" },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative bg-cocoa-rays pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <img
          src={hero}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 h-[85%] w-[65%] object-cover hero-art [mask-image:radial-gradient(50%_60%_at_60%_50%,black,transparent_75%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <p className="eyebrow animate-fade-up">Passira, Pernambuco</p>

          <h1 className="animate-fade-up font-display text-top text-[clamp(3rem,10vw,8.5rem)] leading-[0.95] mt-6 max-w-5xl" style={{ animationDelay: ".05s", fontWeight: 400 }}>
            O verdadeiro{" "}
            <em className="serif-italic-gold not-italic">
              <span className="italic">sabor</span>
            </em>{" "}
            da brasa.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,20rem)] md:items-end animate-fade-up" style={{ animationDelay: ".15s" }}>
            <p className="text-top-70 max-w-md text-base md:text-lg leading-relaxed">
              Carne no ponto, lenha queimando devagar e o tempero que a gente aprendeu no interior.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/cardapio" className="btn-gold group">
                Ver o cardápio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost-top">
                <MessageCircle className="h-4 w-4" /> Pedir pelo WhatsApp
              </a>
            </div>

            <div className="border-l border-[color:var(--gold)] pl-5 hidden md:block">
              <h3 className="font-display text-top text-lg">Da lenha para a mesa</h3>
              <p className="text-top-50 text-sm mt-1 leading-relaxed">
                Um pedaço do nosso interior em cada prato.
              </p>
            </div>
          </div>

          <p className="mt-14 hidden md:block text-top-40 text-[11px] tracking-[0.35em] uppercase">
            — Desça para escolher
          </p>
        </div>
      </section>

      {/* DIFFERENTIALS STRIP */}
      <section className="diff-strip border-y border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 divide-x divide-[color:var(--border)]">
          {differentials.map((d) => (
            <div key={d.title} className="flex items-center gap-3 px-5 py-6">
              <span className="h-10 w-10 rounded-full bg-[color:var(--gold)]/15 grid place-items-center text-[color:var(--wine)]">
                <d.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-[color:var(--cocoa)]">{d.title}</p>
                <p className="text-[11px] text-[color:var(--muted-foreground)]">{d.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESCOLHA SEU MOMENTO */}
      <section className="bg-[color:var(--cream)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="eyebrow text-[color:var(--wine)] before:bg-[color:var(--wine)]">Cardápio da casa</p>
            <h2 className="mt-6 font-display text-[color:var(--cocoa)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] max-w-md" style={{ fontWeight: 400 }}>
              Escolha seu{" "}
              <em className="serif-italic-wine italic">momento.</em>
            </h2>
          </div>
          <div>
            <p className="text-[color:var(--muted-foreground)] max-w-md md:ml-auto leading-relaxed">
              Comece pela brasa, siga pelo seu apetite. Tudo preparado para você pedir sem pressa e sem dúvida.
            </p>
            <div className="mt-8 md:text-right">
              <Link to="/cardapio" className="inline-flex items-center gap-2 text-[color:var(--wine)] font-medium border-b border-[color:var(--wine)]/40 pb-1 hover:border-[color:var(--wine)]">
                Ver o cardápio completo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured highlights list */}
        <div className="mx-auto max-w-7xl px-6 md:px-10 mt-16 grid gap-6 md:grid-cols-3">
          {[
            { name: "Picanha argentina", tag: "Favorito", price: "R$ 89,90", desc: "Arroz, feijão tropeiro, macarrão, batata maionese, farofa e vinagrete." },
            { name: "Carne de sol na brasa", tag: "Da casa", price: "R$ 64,90", desc: "Servida com todos os acompanhamentos do interior." },
            { name: "Costela no bafo", tag: "Para a mesa", price: "R$ 64,90", desc: "Cozida lentamente, desmancha no garfo." },
          ].map((it) => (
            <Reveal key={it.name}>
              <article className="card-lift bg-white rounded-2xl border border-[color:var(--border)] p-6 h-full">
                <div className="flex items-start justify-between gap-3">
                  <span className="h-9 w-9 rounded-full bg-[color:var(--gold)]/20 grid place-items-center text-[color:var(--wine)]">
                    <Flame className="h-4 w-4" />
                  </span>
                  <span className="text-[color:var(--wine)] font-mono text-sm">{it.price}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-[color:var(--cocoa)]">{it.name}</h3>
                <span className="mt-2 inline-block bg-[color:var(--gold)]/20 text-[color:var(--cocoa)] text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded">{it.tag}</span>
                <p className="mt-3 text-sm text-[color:var(--muted-foreground)] leading-relaxed">{it.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-[color:var(--muted-foreground)] tracking-wide">P/2 · P/4</span>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-[color:var(--wine)] text-sm inline-flex items-center gap-1 border-b border-[color:var(--wine)]/40 hover:border-[color:var(--wine)]">
                    Pedir <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* O JEITO BRASAS — deep wine section */}
      <section className="bg-[color:var(--wine)] text-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-[color:var(--gold)] tracking-[0.32em] text-[11px] uppercase mb-8">O jeito Brasas</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]" style={{ fontWeight: 400 }}>
              Aqui, o tempo{" "}
              <em className="italic text-[color:var(--gold)] font-normal">tem outro gosto.</em>
            </h2>
          </div>
          <div>
            <p className="text-white/85 leading-relaxed max-w-md">
              A gente acredita que boa comida começa antes do prato: na conversa, no cheiro da lenha e no cuidado de quem conhece cada corte. Em Passira, a mesa é extensão da casa.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
              <div>
                <h4 className="font-display italic text-[color:var(--gold)] text-2xl">Desde cedo</h4>
                <p className="text-white/70 text-sm mt-1">Almoço de segunda a domingo</p>
              </div>
              <div>
                <h4 className="font-display italic text-[color:var(--gold)] text-2xl">Na brasa</h4>
                <p className="text-white/70 text-sm mt-1">O sabor que fica na memória</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISITE — cream */}
      <section className="bg-[color:var(--cream)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow text-[color:var(--wine)] before:bg-[color:var(--wine)]">Visite a gente</p>
            <h2 className="mt-6 font-display text-[color:var(--cocoa)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] max-w-sm" style={{ fontWeight: 400 }}>
              A mesa está{" "}
              <em className="serif-italic-wine italic">posta.</em>
            </h2>
            <p className="mt-6 text-[color:var(--muted-foreground)] max-w-md leading-relaxed">
              Chegue com fome. A saída da cidade passa por aqui.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-wine mt-8">
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[color:var(--border)] bg-white">
            <div className="p-6 border-r border-b border-[color:var(--border)]">
              <MapPin className="h-4 w-4 text-[color:var(--wine)]" />
              <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Endereço</p>
              <p className="mt-2 font-display text-[color:var(--cocoa)] text-lg leading-tight">Avenida Alberto Bennig</p>
              <p className="text-sm text-[color:var(--muted-foreground)]">Passira, Pernambuco</p>
            </div>
            <div className="p-6 border-b border-[color:var(--border)]">
              <MessageCircle className="h-4 w-4 text-[color:var(--wine)]" />
              <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Telefone</p>
              <p className="mt-2 font-display text-[color:var(--cocoa)] text-lg leading-tight">(81) 99549-7750</p>
              <a href="tel:+5581995497750" className="text-sm text-[color:var(--wine)] hover:underline">Ligar agora</a>
            </div>
            <div className="p-6 col-span-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Horário de funcionamento</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-[color:var(--cocoa)]">Segunda a sexta</p>
                  <p className="text-sm text-[color:var(--muted-foreground)]">10:00 às 23:00</p>
                </div>
                <div>
                  <p className="font-medium text-[color:var(--cocoa)]">Sábado e domingo</p>
                  <p className="text-sm text-[color:var(--muted-foreground)]">10:00 às 00:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
