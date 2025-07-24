"use client";
import Image from "next/image";
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
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="p-8 max-w-md mx-auto">
        <div className="flex gap-2 mb-4">
          <input type="text" className="flex-1 bg-white text-black border border-[#D9D9D9] p-4 rounded" placeholder="Masukkan kegiatan kamu" />
          <button type="button" onClick={handleTambah} className="bg-black text-white px-5 rounded">
            +
          </button>
        </div>

        <button type="button" onClick={handleHapusSemua} className="bg-red-600 text-white px-5 py-2 rounded mb-4 hover:bg-red-700">
          Hapus Semua Kegiatan
        </button>

        <div className="p-2">
          <h1 className="text-xl font-bold mb-4">Daftar To-Do</h1>

          {/* Header Kolom */}
          <div className="bg-white grid grid-cols-3 font-semibold text-black px-4 py-2 border-b border-gray-300">
            <div className="text-black">Kegiatan</div>
            <div className="text-black">Prioritas</div>
            <div className="text-black">Status</div>
          </div>

          {/* Daftar Item */}
          <ul className="divide-y divide-gray-200">
            {kegiatan.map((item) => (
              <li key={item.id} className="grid grid-cols-3 px-4 py-3 bg-gray-100 rounded items-center">
                <div>
                  {/* Hari dan Tanggal */}
                  <div className="text-xs text-black">{item.tanggal}</div>

                  {/* Checkbox dan Nama */}
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={item.status === "done"} onChange={() => handleToggleStatus(item.id, item.status)} />
                    <span className={item.status === "done" ? "line-through text-gray-500" : "text-black"}>{item.nama}</span>
                  </div>
                </div>
                <div className="text-black">{item.prioritas}</div>
                <div className="text-black">{item.status === "done" ? "Done" : "Belum selesai"}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
