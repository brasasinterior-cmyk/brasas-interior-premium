import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed bottom-24 right-6 z-40 h-11 w-11 rounded-full bg-[color:var(--brand-red)] text-white shadow-lg hover:bg-[color:var(--gold)] hover:text-black transition-colors flex items-center justify-center"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
