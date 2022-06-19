<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Link;
use App\Http\Requests\LinkRequest;

class LinkController extends Controller
{
    public function index()
    {
        return Link::all();
    }

    public function show($id)
    {
        $link = Link::find($id);

        return $link;
    }

    public function store(LinkRequest $request)
    {
        $link = Link::create($request->validated());

        $link->resources()->create();

        return response([
            'success' => 'New Link was successfully created.'
        ], 201);
    }

    public function update(LinkRequest $request, $id)
    {
        $link = Link::find($id);

        $link->update($request->validated());

        return $link;
    }

    public function destroy($id)
    {
        $link = Link::find($id);

        $link->resources()->delete();

        $link->delete();

        return response()->noContent();
    }
}
