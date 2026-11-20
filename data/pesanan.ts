export type Pesanan = {
    nomor: number;
    event_id: number;
    nama: string;
    email: string;
    jumlah: number;
    total: number;
    dibuat: string;
    events: {jusul: string} | null;
};

