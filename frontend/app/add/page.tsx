"use client";

import axios from "axios";
import React, { useState } from "react";

export default function AddPage() {
  const [namaKarya, setNamaKarya] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const setPost = async () => {
    try {
      if (!namaKarya || !deskripsi || !image) {
        alert("Seluruh Data Wajib Diisi !");
        return;
      }

      const formData = new FormData();
      formData.append("namaKarya", namaKarya);
      formData.append("deskripsi", deskripsi);
      formData.append("image", image);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      if (response.data.error === 0) {
        setNamaKarya("");
        setDeskripsi("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan data!");
    }
  };

  return (
    <div>
      <section className="flex items-center mb-4">
        <section className="w-1/4">
          <label htmlFor="txt_namaKarya">Nama Karya</label>
        </section>
        <section className="w-3/4">
          <input
            type="text"
            id="txt_namaKarya"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Nama Karya"
            value={namaKarya}
            onChange={(e) => setNamaKarya(e.target.value)}
          />
        </section>
      </section>
      <section className="flex items-center mb-4">
        <section className="w-1/4">
          <label htmlFor="txt_deskripsi">Deskripsi</label>
        </section>
        <section className="w-3/4">
          <textarea
            id="txt_deskripsi"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            placeholder="Isi Deskripsi Karya"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </section>
      </section>
      <section className="flex items-center mb-4">
        <section className="w-1/4">
          <label htmlFor="file_image">Gambar</label>
        </section>
        <section className="w-3/4">
          <input
            type="file"
            id="file_image"
            className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </section>
      </section>
      <section>
        <button
          className="bg-sky-500 border-2 border-sky-500 px-5 py-3 w-full rounded-full text-white"
          onClick={setPost}
        >
          Simpan
        </button>
      </section>
    </div>
  );
}