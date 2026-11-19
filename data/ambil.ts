import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/data/event";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  // Isi URL bisa apa saja (misalnya /event/abc). Periksa dulu sebelum bertanya ke database.
  if (!Number.isInteger(id)) return null;
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id) // equal(sama dengan)
    .maybeSingle();
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id) //not equal (tidak sama dengan)
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event terkait: " + error.message);
  return data as Event[];
}

// Pesanan berisi nama dan email orang, jadi dibaca memakai kunci rahasia (hanya di server).
export async function hitungPesanan(
  eventId: number
): Promise<{ pesanan: number; tiket: number }> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);
  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);
  const tiket = (data ?? []).reduce((total, p) => total + p.jumlah, 0);
  return { pesanan: data?.length ?? 0, tiket };
}