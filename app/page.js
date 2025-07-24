"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [kegiatan, setKegiatan] = useState([]);
  const [daftarKegiatan, setDaftarKegiatan] = useState([]);
  const router = useRouter();

  const handleTambah = () => {
    router.push("/tambah"); // Arahkan ke screen tambah
  };

  const handleHapusSemua = async () => {
    const konfirmasi = confirm("Yakin ingin menghapus semua kegiatan?");
    if (!konfirmasi) return;

    const { error } = await supabase.from("kegiatan").delete().not("id", "is", null);

    if (error) {
      console.error("Gagal menghapus data:", error.message);
      alert("Gagal menghapus semua kegiatan");
    } else {
      setKegiatan([]); // kosongkan data di UI
      alert("Semua kegiatan berhasil dihapus");
    }
  };

  const fetchKegiatan = async () => {
    const { data, error } = await supabase.from("kegiatan").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil data:", error.message);
    } else {
      setKegiatan(data);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "done" ? "Belum selesai" : "done";

    const { error } = await supabase.from("kegiatan").update({ status: newStatus }).eq("id", id);

    if (error) {
      console.error("Gagal mengubah status:", error.message);
    } else {
      fetchKegiatan(); // Refresh data dari Supabase
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans px-4 py-6">
      <div className="mb-6 text-center">
        <h1 className="text-[24px] md:text-[32px] font-bold">TO DO APP</h1>
      </div>

      <div className="bg-[#268D8D] p-4 md:p-8 w-full max-w-md md:max-w-xl mx-auto rounded-lg">
        {/* Info Pengguna */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#B2F3DF] p-3 md:p-4 rounded w-full">
            <p className="text-black text-[12px] md:text-[18px] font-semibold">Nama Pengguna</p>
            <p className="text-gray-500 text-[10px] md:text-[16px]">Jabatan</p>
          </div>
        </div>

        {/* Input dan Tambah */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input type="text" className="flex-1 bg-white text-black border border-[#D9D9D9] p-4 rounded placeholder:text-[12px] md:placeholder:text-[18px]" placeholder="Masukkan kegiatan kamu" />
          <button type="button" onClick={handleTambah} className="bg-black text-white px-5 py-2 rounded">
            +
          </button>
        </div>

        {/* Tombol Hapus Semua */}
        <button type="button" onClick={handleHapusSemua} className="bg-red-600 text-white px-5 py-2 rounded mb-4 hover:bg-red-700 w-full md:w-auto">
          Hapus Semua Kegiatan
        </button>

        {/* Daftar To-Do */}
        <div>
          <div className="bg-white p-2 mb-2 rounded">
            <h2 className="text-black font-bold text-center">Daftar To-Do</h2>
          </div>

          {/* Header Kolom */}
          <div className="hidden sm:grid grid-cols-3 font-semibold text-black px-4 py-2 border-b border-gray-300 bg-white">
            <div>Kegiatan</div>
            <div>Prioritas</div>
            <div>Status</div>
          </div>

          {/* Daftar Item */}
          <ul className="divide-y divide-gray-200">
            {kegiatan.map((item) => (
              <li key={item.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-4 py-3 bg-gray-100 rounded items-start sm:items-center">
                {/* Kolom Kegiatan */}
                <div>
                  <div className="text-xs text-black">{item.tanggal}</div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={item.status === "done"} onChange={() => handleToggleStatus(item.id, item.status)} />
                    <span className={item.status === "done" ? "line-through text-gray-500" : "text-black"}>{item.nama}</span>
                  </div>
                </div>

                {/* Kolom Prioritas */}
                <div className="text-black">{item.prioritas}</div>

                {/* Kolom Status */}
                <div className="text-black">{item.status === "done" ? "Done" : "Belum selesai"}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
