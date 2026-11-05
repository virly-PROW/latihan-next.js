type Props = {
    cari: string;
    kategori: string;
    urut: string;
    hanyaTiket: boolean;
    hargaMaks: string;
    daftarKategori: string[];
    onCari: (nilai: string) => void;
    onKategori: (nilai: string) => void;
    onUrut: (nilai: string) => void;
    onHanyaTiket: (nilai: boolean) => void;
    onHargaMaks: (nilai: string) => void;
  };
  
  export default function KontrolKatalog({
    cari,
    kategori,
    urut,
    hanyaTiket,
    hargaMaks,
    daftarKategori,
    onCari,
    onKategori,
    onUrut,
    onHanyaTiket,
    onHargaMaks,
  }: Props) {
    return (
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={cari}
          onChange={(e) => onCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => onKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <select
          value={urut}
          onChange={(e) => onUrut(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hanyaTiket}
            onChange={(e) => onHanyaTiket(e.target.checked)}
          />
          Hanya yang masih ada tiket
        </label>
        <input
          type="number"
          min="0"
          value={hargaMaks}
          onChange={(e) => onHargaMaks(e.target.value)}
          placeholder="Harga maksimal"
          className="rounded border bg-white px-3 py-2"
        />
      </div>
    );
  }