<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_karya_laut', function (Blueprint $table) {

            // buat field id
            $table->integer('id')->autoIncrement();
            // buat field nama karya
            $table->string("namaKarya", 100);
            //buat field deskripsi karya
            $table->text("deskripsi");
            // buat field image_path untuk menyimpan path gambar
            $table->string("image_path", 512);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_karya_laut');
    }
};
