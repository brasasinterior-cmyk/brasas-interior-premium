import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { galleryQuery, productsQuery, uploadSiteImage, type Product } from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { secao?: string } => ({
    secao: typeof search.secao === "string" && search.secao ? search.secao : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Administração — Brasas do Interior" },
      { name: "description", content: "Área restrita." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Administração — Brasas do Interior" },
      { property: "og:description", content: "Área restrita." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const input =
  "w-full rounded-lg border border-[color:var(--border)] bg-background px-3 py-2 text-sm text-foreground focus:border-[color:var(--gold)] focus:outline-none";
const btn =
  "inline-flex items-center justify-center gap-1.5 rounded-full bg-[color:var(--wine)] text-white text-sm px-4 py-2 hover:brightness-110 transition disabled:opacity-50";
const btnGhost =
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-[color:var(--border)] text-sm px-4 py-2 text-foreground hover:border-[color:var(--wine)]";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsAdmin(null);
    supabase
      .rpc("has_role", { _user_id: session.user.id, _role: "admin" })
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      {!ready ? null : !session ? (
        <LoginForm />
      ) : isAdmin === null ? (
        <p className="p-10 text-center">Verificando acesso…</p>
      ) : !isAdmin ? (
        <div className="p-10 text-center space-y-4">
          <p>Esta conta não tem acesso de administrador.</p>
          <button className={btnGhost} onClick={() => supabase.auth.signOut()}>Sair</button>
        </div>
      ) : (
        <Dashboard email={session.user.email ?? ""} />
      )}
    </div>
  );
}

function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("E-mail ou senha incorretos");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) toast.error(error.message);
      else if (!data.session) toast.success("Conta criada! Confirme pelo link enviado ao seu e-mail.");
    }
    setBusy(false);
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-[color:var(--border)] bg-card p-8">
        <h1 className="font-display text-2xl">Área administrativa</h1>
        <input className={input} type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" required minLength={6} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className={`${btn} w-full`} disabled={busy}>{mode === "login" ? "Entrar" : "Criar conta"}</button>
        <button type="button" className="w-full text-xs text-muted-foreground underline" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ email }: { email: string }) {
  const { secao } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data = [] } = useQuery(productsQuery);
  const categories = useMemo(() => Array.from(new Set(data.map((p) => p.categoria))), [data]);
  const go = (s?: string) => navigate({ search: { secao: s } });
  const navItem = (label: string, value: string | undefined, count?: number) => (
    <button
      key={label}
      onClick={() => go(value)}
      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-left transition ${
        secao === value ? "bg-[color:var(--wine)] text-white" : "hover:bg-muted text-foreground"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && <span className="text-xs opacity-70">{count}</span>}
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Administração</h1>
          <p className="text-sm text-muted-foreground">{email} · <Link to="/" className="underline">ver site</Link></p>
        </div>
        <button className={btnGhost} onClick={() => supabase.auth.signOut()}><LogOut className="h-4 w-4" /> Sair</button>
      </header>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <nav className="space-y-1 md:sticky md:top-6 self-start rounded-xl border border-[color:var(--border)] bg-card p-2">
          {navItem("Início", undefined)}
          <p className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Cardápio</p>
          {categories.map((c) => navItem(c, c, data.filter((p) => p.categoria === c).length))}
          <p className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Site</p>
          {navItem("Fotos da galeria", "fotos")}
        </nav>
        <main>
          {secao === "fotos" ? (
            <PhotosAdmin />
          ) : secao ? (
            <ProductsAdmin categoria={secao} categories={categories} />
          ) : (
            <div>
              <h2 className="font-display text-2xl mb-4">Escolha uma seção</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                  <button key={c} onClick={() => go(c)} className="rounded-xl border border-[color:var(--border)] bg-card p-5 text-left hover:border-[color:var(--wine)] transition">
                    <p className="font-display text-lg">{c}</p>
                    <p className="text-sm text-muted-foreground">{data.filter((p) => p.categoria === c).length} produtos</p>
                  </button>
                ))}
                <button onClick={() => go("fotos")} className="rounded-xl border border-[color:var(--border)] bg-card p-5 text-left hover:border-[color:var(--wine)] transition">
                  <p className="font-display text-lg">Fotos da galeria</p>
                  <p className="text-sm text-muted-foreground">Adicionar e remover fotos</p>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

type Draft = Omit<Product, "id" | "ordem" | "ativo"> & { id?: string; ativo: boolean };
const emptyDraft: Draft = { categoria: "", nome: "", descricao: "", preco: null, preco_p2: null, preco_p4: null, imagem_url: null, ativo: true };

function ProductsAdmin({ categoria, categories }: { categoria: string; categories: string[] }) {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery(productsQuery);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [filter, setFilter] = useState("");
  const list = data.filter((p) => p.categoria === categoria && p.nome.toLowerCase().includes(filter.toLowerCase()));

  async function remove(p: Product) {
    if (!confirm(`Remover "${p.nome}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Produto removido");
    qc.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <div>
      <h2 className="font-display text-2xl mb-4">{categoria} <span className="text-base text-muted-foreground">({list.length})</span></h2>
      <div className="flex flex-wrap gap-3 mb-4">
        <input className={`${input} max-w-xs`} placeholder="Buscar produto…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <button className={btn} onClick={() => setEditing({ ...emptyDraft, categoria })}><Plus className="h-4 w-4" /> Novo produto</button>
      </div>
      {isLoading && <p>Carregando…</p>}
      <div className="divide-y divide-[color:var(--border)] rounded-xl border border-[color:var(--border)] bg-card">
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3">
            {p.imagem_url ? <img src={p.imagem_url} alt="" className="h-12 w-12 rounded object-cover" /> : <div className="h-12 w-12 rounded bg-muted" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.nome} {!p.ativo && <span className="text-xs text-muted-foreground">(oculto)</span>}</p>
              <p className="text-xs text-muted-foreground">
                {[p.preco && `R$ ${p.preco.toFixed(2)}`, p.preco_p2 && `P/2 R$ ${p.preco_p2.toFixed(2)}`, p.preco_p4 && `P/4 R$ ${p.preco_p4.toFixed(2)}`].filter(Boolean).join(" · ")}
              </p>
            </div>
            <button aria-label="Editar" className={btnGhost} onClick={() => setEditing({ ...p })}><Pencil className="h-4 w-4" /></button>
            <button aria-label="Remover" className={btnGhost} onClick={() => remove(p)}><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      {editing && <ProductForm draft={editing} categories={categories} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ProductForm({ draft, categories, onClose }: { draft: Draft; categories: string[]; onClose: () => void }) {
  const qc = useQueryClient();
  const [d, setD] = useState<Draft>(draft);
  const [busy, setBusy] = useState(false);
  const num = (v: string) => (v.trim() === "" ? null : Number(v.replace(",", ".")));

  async function onFile(f?: File) {
    if (!f) return;
    setBusy(true);
    try {
      const url = await uploadSiteImage(f, "produtos");
      setD((x) => ({ ...x, imagem_url: url }));
    } catch (e) {
      toast.error((e as Error).message);
    }
    setBusy(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const payload = {
      categoria: d.categoria.trim(), nome: d.nome.trim(), descricao: d.descricao.trim(),
      preco: d.preco, preco_p2: d.preco_p2, preco_p4: d.preco_p4, imagem_url: d.imagem_url, ativo: d.ativo,
    };
    const { error } = d.id
      ? await supabase.from("products").update(payload).eq("id", d.id)
      : await supabase.from("products").insert({ ...payload, ordem: 9999 });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Produto salvo");
    qc.invalidateQueries({ queryKey: ["products"] });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-3 rounded-2xl bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">{d.id ? "Editar produto" : "Novo produto"}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar"><X className="h-5 w-5" /></button>
        </div>
        <label className="block text-sm">Nome<input className={input} required value={d.nome} onChange={(e) => setD({ ...d, nome: e.target.value })} /></label>
        <label className="block text-sm">Categoria
          <input className={input} required list="cats" value={d.categoria} onChange={(e) => setD({ ...d, categoria: e.target.value })} />
          <datalist id="cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
        </label>
        <label className="block text-sm">Descrição<textarea className={input} rows={2} value={d.descricao} onChange={(e) => setD({ ...d, descricao: e.target.value })} /></label>
        <div className="grid grid-cols-3 gap-2">
          <label className="block text-sm">Preço único<input className={input} inputMode="decimal" defaultValue={d.preco ?? ""} onChange={(e) => setD({ ...d, preco: num(e.target.value) })} /></label>
          <label className="block text-sm">P/2<input className={input} inputMode="decimal" defaultValue={d.preco_p2 ?? ""} onChange={(e) => setD({ ...d, preco_p2: num(e.target.value) })} /></label>
          <label className="block text-sm">P/4<input className={input} inputMode="decimal" defaultValue={d.preco_p4 ?? ""} onChange={(e) => setD({ ...d, preco_p4: num(e.target.value) })} /></label>
        </div>
        <div className="text-sm space-y-2">
          <span>Foto (opcional)</span>
          {d.imagem_url && (
            <div className="flex items-center gap-3">
              <img src={d.imagem_url} alt="" className="h-20 w-20 rounded object-cover" />
              <button type="button" className={btnGhost} onClick={() => setD({ ...d, imagem_url: null })}>Remover foto</button>
            </div>
          )}
          <label className={`${btnGhost} cursor-pointer`}><Upload className="h-4 w-4" /> Enviar foto
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={d.ativo} onChange={(e) => setD({ ...d, ativo: e.target.checked })} /> Mostrar no cardápio</label>
        <button className={`${btn} w-full`} disabled={busy}>{busy ? "Salvando…" : "Salvar"}</button>
      </form>
    </div>
  );
}

function PhotosAdmin() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery(galleryQuery);
  const [busy, setBusy] = useState(false);
  const refresh = () => qc.invalidateQueries({ queryKey: ["gallery"] });

  async function add(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        const url = await uploadSiteImage(f, "galeria");
        const { error } = await supabase.from("gallery_photos").insert({ url, alt: f.name.replace(/\.[^.]+$/, ""), ordem: 9999 });
        if (error) throw error;
      }
      toast.success("Fotos adicionadas");
    } catch (e) {
      toast.error((e as Error).message);
    }
    setBusy(false);
    refresh();
  }

  async function rename(id: string, alt: string) {
    const { error } = await supabase.from("gallery_photos").update({ alt }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Legenda salva"); refresh(); }
  }

  async function remove(id: string) {
    if (!confirm("Remover esta foto?")) return;
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Foto removida"); refresh(); }
  }

  return (
    <div>
      <label className={`${btn} cursor-pointer mb-6`}>
        <Upload className="h-4 w-4" /> {busy ? "Enviando…" : "Adicionar fotos"}
        <input type="file" accept="image/*" multiple className="hidden" disabled={busy} onChange={(e) => add(e.target.files)} />
      </label>
      {isLoading && <p>Carregando…</p>}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((p) => (
          <div key={p.id} className="rounded-xl border border-[color:var(--border)] bg-card overflow-hidden">
            <img src={p.url} alt={p.alt} className="aspect-square w-full object-cover" />
            <div className="p-2 space-y-2">
              <input className={input} defaultValue={p.alt} placeholder="Legenda" onBlur={(e) => e.target.value !== p.alt && rename(p.id, e.target.value)} />
              <button className={`${btnGhost} w-full`} onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /> Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
