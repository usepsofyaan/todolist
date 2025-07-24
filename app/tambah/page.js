"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function tambah() {
  const [kegiatan, setKegiatan] = useState("");
  const [daftarKegiatan, setDaftarKegiatan] = useState([]);
  const [waktu, setWaktu] = useState("");
  const [prioritas, setPrioritas] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const tambahKegiatan = async () => {
    if (!kegiatan.trim() || !waktu.trim() || !prioritas.trim()) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("kegiatan") // Ganti sesuai nama tabel kamu
      .insert([
        {
          nama: kegiatan,
          waktu,
          prioritas,
        },
      ]);

    setLoading(false);

    if (error) {
      alert("Gagal menambahkan kegiatan");
      console.error(error);
      return;
    }

    // Reset input dan kembali ke home
    setKegiatan("");
    setWaktu("");
    setPrioritas("");
    router.push("/");
  };

  return (
    <div className="p-8 space-y-4">
      <input type="text" placeholder="Masukkan nama kegiatan" className="w-full border border-gray-300 p-3 rounded" value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} />
      <input type="date-time-local" placeholder="Waktu" className="w-full border border-gray-300 p-3 rounded" value={waktu} onChange={(e) => setWaktu(e.target.value)} />
      <select className="w-full border border-gray-300 p-3 rounded" value={prioritas} onChange={(e) => setPrioritas(e.target.value)}>
        <option className="text-black" value="">
          Pilih Prioritas
        </option>
        <option className="text-black" value="Low">
          Low
        </option>
        <option className="text-black" value="Medium">
          Medium
        </option>
        <option className="text-black" value="High">
          High
        </option>
      </select>
      <button type="button" onClick={tambahKegiatan} className="bg-white text-black px-5 py-2 rounded disabled:opacity-50" disabled={loading}>
        {loading ? "Menyimpan..." : "Tambah Kegiatan"}
      </button>
    </div>
  );
}
