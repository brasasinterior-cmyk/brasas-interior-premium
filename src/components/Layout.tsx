import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { BackToTop } from "./BackToTop";
import { Snowfall } from "./HolidayTheme";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <Snowfall />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
