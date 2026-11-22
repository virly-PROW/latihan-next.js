import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import { rupiah } from "@/data/event";
import { hapusEvent } from "@/app/admin/actions";
import TombolHapus from "@/components/TombolHapus";

export default async function Admin({ searchParams }: PageProps<"/admin">) {
  const { info, galat, q } = await searchParams;
  const kata = typeof q === "string" ? q.trim().toLowerCase() : "";
  const semua = await ambilEvents();
  const events = kata
    ? semua.filter((e) => e.judul.toLowerCase().includes(kata))
    : semua;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Event</h1>
        <Link
          href="/admin/baru"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Tambah event
        </Link>
      </div>

      {typeof info === "string" && (
        <p className="mb-3 rounded bg-green-100 px-3 py-2 text-green-800">{info}</p>
      )}
      {typeof galat === "string" && (
        <p className="mb-3 rounded bg-red-100 px-3 py-2 text-red-800">{galat}</p>
      )}

      <form action="/admin" className="mb-4 flex gap-2">
        <input
          name="q"
          defaultValue={typeof q === "string" ? q : ""}
          placeholder="Cari judul event..."
          className="w-full max-w-sm rounded border px-3 py-1.5"
        />
        <button className="rounded bg-slate-800 px-3 py-1.5 text-sm text-white">
          Cari
        </button>
      </form>

      <table className="w-full rounded-xl border bg-white text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">Event</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Harga</th>
            <th className="p-2">Terisi</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">{e.judul}</td>
              <td className="p-2">{e.tanggal}</td>
              <td className="p-2">{rupiah(e.harga)}</td>
              <td className="p-2">
                {e.terisi}/{e.kuota}
              </td>
              <td className="p-2">
                <div className="flex gap-3">
                  <Link href={`/admin/${e.id}/ubah`} className="text-blue-600 underline">
                    Ubah
                  </Link>
                  <form action={hapusEvent}>
                    <input type="hidden" name="id" value={e.id} />
                    <TombolHapus />
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-slate-500">
                Tidak ada event yang cocok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}