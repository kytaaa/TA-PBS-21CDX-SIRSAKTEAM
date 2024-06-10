<?php

namespace App\Http\Controllers;

use App\Models\KaryaLaut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; 
use Illuminate\Support\Facades\Storage;

class KaryaController extends Controller
{
    public function viewData()
    {
        $data = KaryaLaut::all();
        if ($data->isEmpty()) {
            return response(["karya" => $data, "error" => 1, "message" => "Data Karya Tidak Ditemukan!"]);
        }

        return response(["karya" => $data, "error" => 0, "message" => ""]);
    }

    public function searchData($keyword)
    {
        $data = KaryaLaut::where('id', 'LIKE', "%{$keyword}%")
            ->orWhere('namaKarya', 'LIKE', "%{$keyword}%")
            ->orWhere('deskripsi', 'LIKE', "%{$keyword}%")
            ->get();

        return response(["karya" => $data]);
    }

    public function saveData(Request $req)
    {
        // Validasi request
        $req->validate([
            'namaKarya' => 'required|max:100',
            'deskripsi' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            // Simpan file gambar
            $imagePath = $req->file('image')->store('images', 'public');

            // Buat entri baru dalam database
            $karya = new KaryaLaut();
            $karya->namaKarya = $req->namaKarya;
            $karya->deskripsi = $req->deskripsi;
            $karya->image_path = $imagePath;
            $karya->save();

            // Log data yang diterima dari frontend
            Log::info('Received data: ' . json_encode($req->all()));

            return response()->json(["error" => 0, "message" => "Data Berhasil Disimpan"]);
        } catch (\Exception $e) {
            // Tangani error jika ada
            Log::error('Error saving data: ' . $e->getMessage());
            return response()->json(["error" => 1, "message" => "Gagal menyimpan data"]);
        }
    }

    public function deleteData($id)
    {
        $karya = KaryaLaut::find($id);

        if ($karya) {
            Storage::disk('public')->delete($karya->image_path);
            $karya->delete();
            return response(["error" => 0, "message" => "Data Berhasil Dihapus"]);
        }

        return response(["error" => 1, "message" => "Data Gagal Dihapus!"]);
    }

    public function detailData($id)
    {
        $data = KaryaLaut::find($id);

        if ($data) {
            return response(["karya" => $data]);
        }

        return response(["karya" => [], "error" => 1, "message" => "Data Tidak Ditemukan"], 404);
    }

    public function editData($id, Request $req)
    {
    $karya = KaryaLaut::find($id);

    if (!$karya) {
        return response(["error" => 1, "message" => "Data Tidak Ditemukan"], 404);
    }

    $req->validate([
        'namaKarya' => 'sometimes|required|max:100',
        'deskripsi' => 'sometimes|required',
        'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Ubah penanganan gambar jika ada file yang diunggah
    if ($req->hasFile('image')) {
        Storage::disk('public')->delete($karya->image_path);
        $imagePath = $req->file('image')->store('images', 'public');
        $karya->image_path = $imagePath;
    }

    // Ganti update menjadi fill dan save
    $karya->fill($req->all());
    $karya->save();

    return response(["error" => 0, "message" => "Data Berhasil Diubah"]);
    }

}
