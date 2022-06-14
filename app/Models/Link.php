<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $table = 'links';

    protected $fillable = [
        'title',
        'link',
        'open_in_new_tab'
    ];

    public function resources()
    {
        return $this->morphMany('App\Models\Resource', 'resource');
    }
}
