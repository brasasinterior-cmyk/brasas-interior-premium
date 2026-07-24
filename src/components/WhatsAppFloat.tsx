import { MessageCircle } from "lucide-react";

export const WHATSAPP_URL =
  "https://wa.me/5581995497750?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 hover:scale-110 transition-transform animate-[ember_2s_ease-in-out_infinite]"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </a>
  );
}
