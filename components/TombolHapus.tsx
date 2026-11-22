"use client";

export default function TombolHapus() {
  return (
    <button
      className="text-red-600 underline"
      onClick={(e) => {
        if (!window.confirm("Yakin hapus event ini?")) {
          e.preventDefault();
        }
      }}
    >
      Hapus
    </button>
  );
}