<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Resource;

class ResourceController extends Controller
{
    public function index()
    {
        return Resource::with('resource')->orderBy('created_at', 'desc')->get()->groupBy('resource_type');
    }
}
