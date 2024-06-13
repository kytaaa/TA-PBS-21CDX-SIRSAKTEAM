"use client";
import React, { useRef } from "react";
import axios from "axios";
import useSWR from "swr";

// Fungsi fetchData untuk mengambil data dari API
const fetchData = async (url: string) => {
  console.log("Fetching data from:", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from API:", errorData);
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data fetched:", data);
    return data;
  } catch (error) {
    console.error("Fetching data error:", error);
    throw error;
  }
};

export default function EditPage({ params }: { params: { id: string } }) {
  // Mengambil data dari API
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/detail/${params.id}`, fetchData);

  // Menggunakan useRef untuk mengambil nilai input
  const ref_namaKarya = useRef<HTMLInputElement>(null);
  const ref_deskripsi = useRef<HTMLInputElement>(null);
  const ref_image = useRef<HTMLInputElement>(null);

  // Fungsi untuk mengirim data yang diubah ke server
  const setPut = () => {
    if (
      ref_namaKarya.current?.value === "" ||
      ref_deskripsi.current?.value === "" ||
      ref_image.current?.value === ""
    ) {
      alert("Seluruh Data Wajib Diisi !");
    } else {
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/edit/${params.id}`, {
          namaKarya: ref_namaKarya.current?.value,
          deskripsi: ref_deskripsi.current?.value,
          image_path: ref_image.current?.value,
        })
        .then((response) => {
          alert(response.data.message);
          if (response.data.error === 0) {
            location.replace(`/edit/${params.id}`);
          }
        })
        .catch((error) => {
          console.error("Data Gagal Dikirim!", error);
        });
    }
  };

  // Fungsi untuk refresh halaman
  const setRefresh = () => {
    location.reload();
  };

  // Menampilkan pesan error jika gagal mengambil data
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load data</div>;
  }

  // Menampilkan pesan loading jika data belum ada
  if (!data) {
    return <div>Loading...</div>;
  }

  console.log("Fetched data:", data);

  // Mengisi nilai input dengan data yang diterima
  const { namaKarya, deskripsi, image_path } = data;

  return (
    <div>
      <section>
        {/* area komponen */}
        <section className="flex items-center mb-4">
          {/* area label */}
          <section className="w-1/4">
            <label htmlFor="txt_nama">Nama Karya</label>
          </section>
          {/* area input */}
          <section className="w-3/4">
            <input
              type="text"
              id="txt_nama"
              className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
              placeholder="Isi Nama Karya"
              defaultValue={data.karya.namaKarya}
              ref={ref_namaKarya}
            />
          </section>
        </section>

        {/* area komponen */}
        <section className="flex items-center mb-4">
          {/* area label */}
          <section className="w-1/4">
            <label htmlFor="txt_deskripsi">Deskripsi Karya</label>
          </section>
          {/* area input */}
          <section className="w-3/4">
            <input
              type="text"
              id="txt_deskripsi"
              className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
              placeholder="Isi Deskripsi Karya"
              defaultValue={data.karya.deskripsi}
              ref={ref_deskripsi}
            />
          </section>
        </section>

        {/* area komponen */}
        <section className="flex items-center mb-4">
          {/* area label */}
          <section className="w-1/4">
            <label htmlFor="txt_image">Gambar Karya</label>
          </section>
          {/* area input */}
          <section className="w-3/4">
            <input
              type="text"
              id="txt_image"
              className="w-full border-2 border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-sky-500"
              placeholder="Isi Gambar Karya"
              defaultValue={data.karya.image_path}
              ref={ref_image}
            />
          </section>
        </section>

        {/* area komponen */}
        <section className="flex items-center">
          <section className="w-1/4"></section>
          <section className="w-3/4">
            <button
              id="btn_ubah"
              className="mr-1 bg-sky-500 px-5 py-3 w-40 rounded-full text-white active:bg-black active:text-sky-300 text-center"
              onClick={setPut}
            >
              Ubah
            </button>
            <button
              id="btn_refresh"
              className="ml-1 border-2 border-sky-500 px-5 py-3 w-40 rounded-full text-center"
              onClick={setRefresh}
            >
              Refresh
            </button>
          </section>
        </section>
      </section>
    </div>
  );
}