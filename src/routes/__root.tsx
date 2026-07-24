import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-[color:var(--brand-red)]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[color:var(--brand-red)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[color:var(--gold)] hover:text-black"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente recarregar a página ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-[color:var(--brand-red)] px-4 py-2 text-sm font-medium text-white hover:bg-[color:var(--gold)] hover:text-black"
          >
            Tentar novamente
          </button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brasas do Interior — Restaurante e Churrascaria em Passira, PE" },
      {
        name: "description",
        content:
          "Carnes na brasa, petiscos, cerveja gelada e ambiente familiar em Passira, Pernambuco. Conheça o Brasas do Interior.",
      },
      { name: "theme-color", content: "#8B0000" },
      { property: "og:site_name", content: "Brasas do Interior" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Brasas do Interior — Restaurante e Churrascaria" },
      { property: "og:description", content: "Carnes na brasa e ambiente acolhedor em Passira, PE." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Brasas do Interior",
          servesCuisine: ["Brazilian", "Steakhouse", "Nordestina"],
          priceRange: "$$",
          telephone: "+55-81-99549-7750",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Avenida Alberto Bennig",
            addressLocality: "Passira",
            addressRegion: "PE",
            addressCountry: "BR",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "10:00", closes: "23:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday","Sunday"], opens: "10:00", closes: "00:00" },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
