<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KaryaLaut extends Model
{
    use HasFactory;

    protected $table = "tb_karya_laut";

    protected $fillable = ['id', 'namaKarya', 'deskripsi', 'image_path'];
}
