"use client";

import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

const fetchData = async (url: string) => {
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

export default function ViewPage() {
  const [search, setSearch] = useState("");

  const searchData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    setSearch(searchValue);
  };

  const apiUrl = search === ""
    ? `${process.env.NEXT_PUBLIC_API_URL}/view`
    : `${process.env.NEXT_PUBLIC_API_URL}/search/${search}`;

  const { data, error, mutate } = useSWR(apiUrl, fetchData);

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load data</div>;
  }

  if (!data) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  console.log("Data fetched:", data);

  const setDelete = async (id: string, nama: string) => {
    try {
      if (confirm(`Data Karya: ${nama} Ingin Dihapus?`)) {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`);
        alert(response.data.message);
        mutate(); // Mutate data to refresh
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus data!");
    }
  };

  let data_number = 1;

  return (
    <div>
      <form onSubmit={searchData} className="flex justify-end mb-5">
        <input
          type="text"
          name="search"
          placeholder="Cari Data Karya"
          className="mr-4 border-2 border-slate-300 px-3 py-2 w-2/8 rounded-lg outline-none focus:border-sky-500"
        />
        <button className="bg-sky-500 border-2 border-sky-500 px-3 py-2 w-40 rounded-lg text-white">
          Cari Data
        </button>
        <Link href={"/add"} className="ml-1 bg-sky-500 px-3 py-2 rounded-lg text-white active:bg-black active:text-sky-300 text-center">
          Tambah Data
        </Link>
        <button
          type="button"
          className="ml-1 border-2 bg-sky-500 border-sky-500 px-3 py-2 rounded-lg text-center text-white"
          onClick={() => mutate(apiUrl)} // Ensure we pass the apiUrl to mutate
        >
          Refresh Data
        </button>
      </form>

      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className="w-1/12 border-2 border-slate-300 bg-blue-700 text-white h-10 text-center">Aksi</th>
            <th className="w-1/12 border-2 border-slate-300 bg-blue-700 text-white h-10 text-center">No</th>
            <th className="w-2/12 border-2 border-slate-300 bg-blue-700 text-white h-10 text-center">Nama</th>
            <th className="w-auto border-2 border-slate-300 bg-blue-700 text-white h-10 text-center">Deskripsi</th>
            <th className="w-2/12 border-2 border-slate-300 bg-blue-700 text-white h-10 text-center">Gambar</th>
          </tr>
        </thead>
        <tbody>
          {data.karya && data.karya.length > 0 ? (
            data.karya.map((item: any) => (
              <tr key={item.id}>
                <td className="border-2 border-slate-300 bg-white text-black h-8 text-center p-3">
                  <Link href={`/edit/${item.id}`} className="bg-sky-700 text-white px-3 py-2 rounded-md mr-1">
                    <i className="fa-solid fa-pencil"></i>
                  </Link>
                  <button
                    className="bg-rose-700 text-white px-3 py-2 rounded-md ml-1"
                    onClick={() => setDelete(item.id, item.namaKarya)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
                <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">{data_number++}</td>
                <td className="border-2 border-slate-300 bg-white text-black h-8 text-justify">{item.namaKarya}</td>
                <td className="border-2 border-slate-300 bg-white text-black h-8 text-center">{item.deskripsi}</td>
                <td className="border-2 border-slate-300 bg-white text-black h-8 text-justify">
                  {item.image_path ? (
                    <img src={`http://localhost:8000/storage/${item.image_path}`} alt={item.namaKarya} />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border-2 border-slate-300 bg-white text-black h-8 text-center" colSpan={5}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}