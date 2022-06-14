<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PdfFile extends Model
{
    use HasFactory;

    protected $table = 'pdf_files';

    protected $fillable = [
        'title',
        'file_path'
    ];

    protected $appends = ['full_file_path'];

    public function resources()
    {
        return $this->morphMany('App\Models\Resource', 'resource');
    }

    public function getFullFilePathAttribute()
    {
        return url(Storage::url($this->file_path));
    }
}
