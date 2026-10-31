import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number | null;
  preco_p2: number | null;
  preco_p4: number | null;
  imagem_url: string | null;
  ordem: number;
  ativo: boolean;
};

export type GalleryPhoto = { id: string; url: string; alt: string; ordem: number };

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    const { data, error } = await supabase.from("products").select("*").order("ordem").order("created_at");
    if (error) throw error;
    return (data ?? []).map((p) => ({
      ...p,
      preco: p.preco === null ? null : Number(p.preco),
      preco_p2: p.preco_p2 === null ? null : Number(p.preco_p2),
      preco_p4: p.preco_p4 === null ? null : Number(p.preco_p4),
    }));
  },
});

export const galleryQuery = queryOptions({
  queryKey: ["gallery"],
  queryFn: async (): Promise<GalleryPhoto[]> => {
    const { data, error } = await supabase.from("gallery_photos").select("*").order("ordem").order("created_at");
    if (error) throw error;
    return data ?? [];
  },
});

/** Uploads an image to the private bucket and returns a long-lived link. */
export async function uploadSiteImage(file: File, folder: "produtos" | "galeria"): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage
    .from("site-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2 || !data) throw e2 ?? new Error("Falha ao gerar link da imagem");
  return data.signedUrl;
}
