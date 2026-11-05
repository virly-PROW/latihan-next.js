"use client";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/event";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [tampil, setTampil] = useState(4);
  const [hanyaTiket, setHanyaTiket] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");

  useEffect(() => {
    const simpan = localStorage.getItem("urut");
    if (simpan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrut(simpan);
    }
  }, []);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTiket || e.kuota - e.terisi > 0) &&
      (hargaMaks === "" || e.harga <= Number(hargaMaks))
  );

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") {
      return a.harga - b.harga;
    }
    if (urut === "mahal") {
      return b.harga - a.harga;
    }
    if (urut === "nama") {
      return a.judul.localeCompare(b.judul);
    }
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalHarga = tersusun.reduce((jumlah, e) => jumlah + e.harga, 0);
  const rataHarga =
    tersusun.length > 0 ? Math.round(totalHarga / tersusun.length) : 0;
  const totalSisa = tersusun.reduce(
    (jumlah, e) => jumlah + (e.kuota - e.terisi),
    0
  );
  const terlihat = tersusun.slice(0, tampil);
  const sisaKartu = tersusun.length - terlihat.length;

  return (
    <div>
      <KontrolKatalog
        cari={cari}
        kategori={kategori}
        urut={urut}
        hanyaTiket={hanyaTiket}
        hargaMaks={hargaMaks}
        daftarKategori={daftarKategori}
        onCari={(nilai) => {
          setCari(nilai);
          setTampil(4);
        }}
        onKategori={(nilai) => {
          setKategori(nilai);
          setTampil(4);
        }}
        onUrut={(nilai) => {
          setUrut(nilai);
          localStorage.setItem("urut", nilai);
          setTampil(4);
        }}
        onHanyaTiket={(nilai) => {
          setHanyaTiket(nilai);
          setTampil(4);
        }}
        onHargaMaks={(nilai) => {
          setHargaMaks(nilai);
          setTampil(4);
        }}
      />
      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataHarga)} · Total sisa tiket {totalSisa}
      </p>
      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang sesuai.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terlihat.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>
          {sisaKartu > 0 && (
            <button
              onClick={() => setTampil(tampil + 4)}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Tampilkan lagi ({sisaKartu} lagi)
            </button>
          )}
        </>
      )}
    </div>
  );
}