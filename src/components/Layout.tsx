import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { BackToTop } from "./BackToTop";
import { Snowfall } from "./HolidayTheme";

export function Layout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // O cardápio mantém o tema próprio, sem a neve do seasonal.
  const festive = pathname !== "/cardapio";

  return (
    <>
      <Navbar />
      {festive && <Snowfall />}
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
