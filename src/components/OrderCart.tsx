import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, X, MessageCircle, MapPin, ChevronLeft } from "lucide-react";

export const WHATSAPP_PHONE = "5581995497750";

export type CartLine = {
  id: string;
  nome: string;
  variacao?: string;
  preco: number;
  qtd: number;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = (line: Omit<CartLine, "qtd">) =>
    setLines((prev) => {
      const found = prev.find((l) => l.id === line.id);
      if (found) return prev.map((l) => (l.id === line.id ? { ...l, qtd: l.qtd + 1 } : l));
      return [...prev, { ...line, qtd: 1 }];
    });

  const dec = (id: string) =>
    setLines((prev) =>
      prev.flatMap((l) => (l.id === id ? (l.qtd > 1 ? [{ ...l, qtd: l.qtd - 1 }] : []) : [l])),
    );

  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const clear = () => setLines([]);

  const count = lines.reduce((s, l) => s + l.qtd, 0);
  const total = lines.reduce((s, l) => s + l.qtd * l.preco, 0);
  const qtyOf = (id: string) => lines.find((l) => l.id === id)?.qtd ?? 0;

  return { lines, add, dec, remove, clear, count, total, qtyOf };
}

type Entrega = {
  nome: string;
  tipo: "entrega" | "retirada";
  rua: string;
  numero: string;
  bairro: string;
  referencia: string;
};

function buildOrderMessage(lines: CartLine[], total: number, entrega: Entrega) {
  const itens =
    lines
      .map(
        (l) =>
          `• ${l.qtd}x ${l.nome}${l.variacao ? ` (${l.variacao})` : ""} — ${brl(l.qtd * l.preco)}`,
      )
      .join("\n") + `\n\nTotal: ${brl(total)}`;

  const endereco =
    entrega.tipo === "retirada"
      ? `Nome: ${entrega.nome}\nRetirada no local`
      : `Nome: ${entrega.nome}\nEntrega: ${entrega.rua}, ${entrega.numero} - ${entrega.bairro}${
          entrega.referencia.trim() ? ` (Referência: ${entrega.referencia.trim()})` : ""
        }`;

  return `Olá, gostaria de fazer um pedido:\n\n${itens}\n\n${endereco}`;
}

export function CartBar({ cart }: { cart: ReturnType<typeof useCart> }) {
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [erros, setErros] = useState<string[]>([]);
  const [entrega, setEntrega] = useState<Entrega>({
    nome: "",
    tipo: "entrega",
    rua: "",
    numero: "",
    bairro: "",
    referencia: "",
  });

  const { lines, count, total, add, dec, remove, clear } = cart;

  const finalHref = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildOrderMessage(lines, total, entrega))}`,
    [lines, total, entrega],
  );

  const enviar = () => {
    const errs: string[] = [];
    if (!entrega.nome.trim()) errs.push("nome");
    if (entrega.tipo === "entrega") {
      if (!entrega.rua.trim()) errs.push("rua");
      if (!entrega.numero.trim()) errs.push("numero");
      if (!entrega.bairro.trim()) errs.push("bairro");
    }
    setErros(errs);
    if (errs.length > 0) return;
    window.open(finalHref, "_blank", "noopener");
    setCheckout(false);
    setOpen(false);
    clear();
  };

  if (count === 0) return null;

  const campoErro = (k: string) => erros.includes(k) ? "border-[color:var(--wine)]" : "border-[color:var(--border)]";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 p-4 pointer-events-none">
        <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl bg-[color:var(--wine)] text-white shadow-2xl shadow-black/30 flex items-center gap-4 px-5 py-4">
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-[color:var(--gold)] text-black text-[11px] font-semibold grid place-items-center">
              {count}
            </span>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/70">Seu pedido</p>
            <p className="font-semibold">{brl(total)}</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            Ver itens
          </button>
          <button
            onClick={() => { setOpen(true); setCheckout(true); }}
            className="rounded-full bg-[color:var(--gold)] text-black px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition"
          >
            <MessageCircle className="h-4 w-4" /> Finalizar
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full md:max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl md:rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              {checkout ? (
                <>
                  <button
                    onClick={() => { setCheckout(false); setErros([]); }}
                    className="inline-flex items-center gap-1 text-sm text-[color:var(--cocoa)] hover:opacity-70"
                  >
                    <ChevronLeft className="h-4 w-4" /> Voltar
                  </button>
                  <button onClick={() => setOpen(false)} aria-label="Fechar" className="p-2 rounded-full hover:bg-black/5">
                    <X className="h-5 w-5 text-[color:var(--cocoa)]" />
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-[color:var(--cocoa)]">Seu pedido</h3>
                  <button onClick={() => setOpen(false)} aria-label="Fechar" className="p-2 rounded-full hover:bg-black/5">
                    <X className="h-5 w-5 text-[color:var(--cocoa)]" />
                  </button>
                </>
              )}
            </div>

            {checkout ? (
              <div>
                <h3 className="font-display text-2xl text-[color:var(--cocoa)]">Onde entregamos?</h3>
                <p className="text-xs text-[color:var(--muted-foreground)] mt-1">
                  Confirme seus dados para enviamos o pedido pelo WhatsApp.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-sm text-[color:var(--cocoa)] mb-1.5">Seu nome *</label>
                    <input
                      type="text"
                      value={entrega.nome}
                      onChange={(e) => setEntrega({ ...entrega, nome: e.target.value })}
                      placeholder="Ex: Maria Silva"
                      className={`w-full px-4 py-3 rounded-xl bg-[color:var(--cream)] border ${campoErro("nome")} focus:border-[color:var(--gold)] focus:outline-none text-sm text-[color:var(--cocoa)] placeholder:text-[color:var(--muted-foreground)]`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEntrega({ ...entrega, tipo: "entrega" })}
                      className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                        entrega.tipo === "entrega"
                          ? "bg-[color:var(--wine)] text-white border-[color:var(--wine)]"
                          : "bg-[color:var(--cream)] text-[color:var(--cocoa)] border-[color:var(--border)] hover:border-[color:var(--wine)]/50"
                      }`}
                    >
                      Entrega
                    </button>
                    <button
                      type="button"
                      onClick={() => setEntrega({ ...entrega, tipo: "retirada" })}
                      className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                        entrega.tipo === "retirada"
                          ? "bg-[color:var(--wine)] text-white border-[color:var(--wine)]"
                          : "bg-[color:var(--cream)] text-[color:var(--cocoa)] border-[color:var(--border)] hover:border-[color:var(--wine)]/50"
                      }`}
                    >
                      Retirar no local
                    </button>
                  </div>

                  {entrega.tipo === "entrega" && (
                    <div className="rounded-2xl border border-[color:var(--border)] p-4 space-y-4">
                      <p className="flex items-center gap-2 text-sm font-medium text-[color:var(--cocoa)]">
                        <MapPin className="h-4 w-4 text-[color:var(--wine)]" /> Endereço de entrega
                      </p>
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <div>
                          <label className="block text-sm text-[color:var(--cocoa)] mb-1.5">Rua *</label>
                          <input
                            type="text"
                            value={entrega.rua}
                            onChange={(e) => setEntrega({ ...entrega, rua: e.target.value })}
                            placeholder="Nome da rua"
                            className={`w-full px-4 py-3 rounded-xl bg-[color:var(--cream)] border ${campoErro("rua")} focus:border-[color:var(--gold)] focus:outline-none text-sm text-[color:var(--cocoa)] placeholder:text-[color:var(--muted-foreground)]`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[color:var(--cocoa)] mb-1.5">Nº *</label>
                          <input
                            type="text"
                            value={entrega.numero}
                            onChange={(e) => setEntrega({ ...entrega, numero: e.target.value })}
                            placeholder="123"
                            className={`w-full px-4 py-3 rounded-xl bg-[color:var(--cream)] border ${campoErro("numero")} focus:border-[color:var(--gold)] focus:outline-none text-sm text-[color:var(--cocoa)] placeholder:text-[color:var(--muted-foreground)] sm:w-24`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-[color:var(--cocoa)] mb-1.5">Bairro *</label>
                        <input
                          type="text"
                          value={entrega.bairro}
                          onChange={(e) => setEntrega({ ...entrega, bairro: e.target.value })}
                          placeholder="Bairro"
                          className={`w-full px-4 py-3 rounded-xl bg-[color:var(--cream)] border ${campoErro("bairro")} focus:border-[color:var(--gold)] focus:outline-none text-sm text-[color:var(--cocoa)] placeholder:text-[color:var(--muted-foreground)]`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[color:var(--cocoa)] mb-1.5">
                          Ponto de referência <span className="text-[color:var(--muted-foreground)]">(opcional)</span>
                        </label>
                        <input
                          type="text"
                          value={entrega.referencia}
                          onChange={(e) => setEntrega({ ...entrega, referencia: e.target.value })}
                          placeholder="Ex: perto da igreja, portão azul..."
                          className="w-full px-4 py-3 rounded-xl bg-[color:var(--cream)] border border-[color:var(--border)] focus:border-[color:var(--gold)] focus:outline-none text-sm text-[color:var(--cocoa)] placeholder:text-[color:var(--muted-foreground)]"
                        />
                      </div>
                    </div>
                  )}

                  {erros.length > 0 && (
                    <p className="text-sm text-[color:var(--wine)]">
                      Preencha os campos marcados para continuar.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                  <span className="text-[color:var(--muted-foreground)] text-sm">Total</span>
                  <span className="font-display text-2xl text-[color:var(--wine)]">{brl(total)}</span>
                </div>

                <button
                  onClick={enviar}
                  className="mt-5 w-full justify-center rounded-full bg-[color:var(--wine)] text-white px-4 py-3.5 text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition"
                >
                  <MessageCircle className="h-4 w-4" /> Enviar pedido pelo WhatsApp
                </button>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-[color:var(--border)]">
                  {lines.map((l) => (
                    <li key={l.id} className="py-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[color:var(--cocoa)] font-medium leading-tight">{l.nome}</p>
                        <p className="text-xs text-[color:var(--muted-foreground)]">
                          {l.variacao ? `${l.variacao} · ` : ""}
                          {brl(l.preco)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(l.id)} aria-label="Diminuir" className="h-8 w-8 grid place-items-center rounded-full border border-[color:var(--border)]">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm">{l.qtd}</span>
                        <button onClick={() => add(l)} aria-label="Aumentar" className="h-8 w-8 grid place-items-center rounded-full border border-[color:var(--border)]">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => remove(l.id)} aria-label="Remover" className="h-8 w-8 grid place-items-center rounded-full text-[color:var(--wine)] hover:bg-[color:var(--wine)]/10">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                  <span className="text-[color:var(--muted-foreground)] text-sm">Total</span>
                  <span className="font-display text-2xl text-[color:var(--wine)]">{brl(total)}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button onClick={clear} className="rounded-full border border-[color:var(--border)] px-4 py-3 text-sm text-[color:var(--cocoa)]">
                    Limpar
                  </button>
                  <button
                    onClick={() => setCheckout(true)}
                    className="flex-1 justify-center rounded-full bg-[color:var(--wine)] text-white px-4 py-3 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" /> Finalizar pedido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
