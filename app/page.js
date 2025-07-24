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

  const fetchKegiatan = async () => {
    const { data, error } = await supabase.from("kegiatan").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil data:", error.message);
    } else {
      setKegiatan(data);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="p-8 max-w-md mx-auto">
        <div className="flex gap-2 mb-4">
          <input type="text" className="flex-1 bg-white text-black border border-[#D9D9D9] p-4 rounded" placeholder="Masukkan kegiatan kamu" value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} />
          <button type="button" onClick={handleTambah} className="bg-black text-white px-5 rounded">
            +
          </button>
        </div>

        <div className="p-2">
          <h1 className="text-xl font-bold mb-4">Daftar To-Do</h1>
          <ul className="space-y-2">
            {kegiatan.map((item) => (
              <li key={item.id} className="p-4 bg-gray-100 rounded">
                <div className="font-semibold text-black">{item.nama}</div>
                <div className="text-sm text-black">Waktu: {item.waktu}</div>
                <div className="text-sm text-black">Prioritas: {item.prioritas}</div>
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
