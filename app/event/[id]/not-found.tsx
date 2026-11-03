import Link from "next/link";

export default function NotFound() {
    return (
        <div className="py-16 text-center">
            <h1 className="text-2xl font-bold"> Event Tidak Ditemukan</h1>
            <p className="mt-2 text-slate-600"> Mungkin Event ini sudah dihapus atau alamat-nya salah</p>
            <Link href="/event" className="MT-4 inline-block text-blue-600 hover:underline">Kembali ke katalog</Link>
        </div>
    );
}