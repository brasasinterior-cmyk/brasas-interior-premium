import { createFileRoute } from "@tanstack/react-router";
import { Flame, Heart, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Brasas do Interior" },
      { name: "description", content: "Conheça a história do Brasas do Interior, uma churrascaria familiar no coração de Passira, Pernambuco." },
      { property: "og:title", content: "Sobre — Brasas do Interior" },
      { property: "og:description", content: "Nossa história: tradição, brasa e sabor do interior pernambucano." },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 bg-[oklch(0.14_0.01_40)] text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Nossa História</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">Um pedaço do interior</h1>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed">
            Nascemos com a missão de trazer para a mesa a autenticidade da culinária pernambucana, feita com brasa, tempero e afeto.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 items-center">
          <Reveal>
            <img 
              src="/fachada-do-brasa-do-interior-passira.jpg" 
              alt="Fachada da churrascaria Brasa do Interior em Passira" 
              className="rounded-lg shadow-md w-full object-cover" 
            />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Nossa essência</p>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">Tradição em cada brasa</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                O <strong className="text-foreground">Brasas do Interior</strong> nasceu do sonho de reunir família e amigos em torno de uma boa mesa. Em Passira, Pernambuco, encontramos o cenário perfeito para preservar o sabor autêntico da nossa terra.
              </p>
              <p>
                Cada corte é selecionado com cuidado, temperado com sabedoria e preparado na brasa como sempre foi feito no sertão. Aqui, a receita mais importante é o carinho.
              </p>
              <p>
                Nosso espaço foi pensado para acolher: mesas grandes, luz quente e um atendimento que faz você se sentir em casa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-3">
          {[
            { icon: Flame, title: "Brasa Autêntica", desc: "Preparo tradicional, do jeito do interior." },
            { icon: Heart, title: "Feito com afeto", desc: "Cada prato leva o carinho da nossa equipe." },
            { icon: Users, title: "Ambiente familiar", desc: "Espaço acolhedor para todas as ocasiões." },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card-lift bg-card border border-border p-8 rounded-xl text-center h-full">
                <v.icon className="h-10 w-10 mx-auto text-[color:var(--brand-red)]" />
                <h3 className="mt-4 font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <img 
          src="/picanha.jpg" 
          alt="Picanha grelhada na brasa" 
          className="absolute inset-0 h-full w-full object-cover" 
          loading="lazy" 
          width={1300} 
          height={745} 
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-4">
          <Reveal>
            <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Nossa promessa</p>
            <blockquote className="font-display text-2xl md:text-4xl italic leading-relaxed">
              "Servir o melhor da brasa com o carinho de quem cozinha para a família."
            </blockquote>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
