"use server";
import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

function samaAman(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  if (A.length !== B.length) return false;
  return timingSafeEqual(A, B);
}

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData
): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");
  const toples = await cookies();

  // membaca hitungan gagal: "jumlah.waktuBuka"
  const [jumlahStr, bukaStr] = (toples.get("gagal")?.value ?? "0.0").split(".");
  const jumlah = Number(jumlahStr) || 0;
  const buka = Number(bukaStr) || 0;

  if (buka > Date.now()) {
    return { pesan: "Terlalu banyak percobaan. Coba lagi 1 menit lagi." };
  }

  if (!samaAman(sandi, process.env.ADMIN_PASSWORD ?? "")) {
    const baru = jumlah + 1;
    const waktuBuka = baru >= 5 ? Date.now() + 60_000 : 0;
    toples.set("gagal", `${baru >= 5 ? 0 : baru}.${waktuBuka}`, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 5,
    });
    return {
      pesan:
        baru >= 5
          ? "Terlalu banyak percobaan. Coba lagi 1 menit lagi."
          : "Kata sandi salah.",
    };
  }

  toples.delete("gagal");

  toples.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true, // tidak terbaca oleh JavaScript di browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  // hanya boleh kembali ke halaman admin (mencegah dilempar ke situs lain)
  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect("/login");
}