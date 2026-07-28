import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Brasas do Interior" },
      { name: "description", content: "Endereço, telefone e horários do Brasas do Interior em Passira, PE. Entre em contato ou faça sua reserva." },
      { property: "og:title", content: "Contato — Brasas do Interior" },
      { property: "og:description", content: "Fale conosco: Av. Alberto Bennig, Passira, PE. (81) 99549-7750." },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Contato,
});

function Contato() {
  return (
    <Layout>
      <section className="relative pt-32 pb-16 bg-top text-top">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-[color:var(--gold)] uppercase tracking-[0.3em] text-xs mb-3">Fale conosco</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">Contato</h1>
          <p className="mt-4 text-top-70">Estamos prontos para receber você.</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="space-y-5">
              <InfoCard icon={MapPin} title="Endereço" lines={["Avenida Alberto Bennig", "Passira, Pernambuco"]} />
              <InfoCard
                icon={Phone}
                title="Telefone / WhatsApp"
                lines={["(81) 99549-7750"]}
                actions={
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 bg-[color:var(--brand-red)] hover:bg-[color:var(--gold)] hover:text-black transition-colors text-white text-sm font-semibold px-4 py-2 rounded-md uppercase tracking-wider">
                    <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
                  </a>
                }
              />
              <InfoCard
                icon={Clock}
                title="Horário de funcionamento"
                lines={["Segunda a sexta: 10h às 23h", "Sábado e domingo: 10h às 00h"]}
              />
              <div className="flex gap-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-full bg-muted hover:bg-[color:var(--brand-red)] hover:text-white flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="h-11 w-11 rounded-full bg-muted hover:bg-[color:var(--brand-red)] hover:text-white flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl h-full min-h-[380px]">
              <iframe
                title="Localização Brasas do Interior"
                src="https://www.google.com/maps?q=Avenida+Alberto+Bennig,+Passira,+Pernambuco&output=embed"
                className="w-full h-full min-h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

function InfoCard({ icon: Icon, title, lines, actions }: { icon: typeof MapPin; title: string; lines: string[]; actions?: React.ReactNode }) {
  return (
    <div className="card-lift bg-card border border-border rounded-xl p-6 flex gap-4">
      <div className="h-12 w-12 shrink-0 rounded-full bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)] flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display text-lg">{title}</h3>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">{l}</p>
        ))}
        {actions}
      </div>
    </div>
  );
}
