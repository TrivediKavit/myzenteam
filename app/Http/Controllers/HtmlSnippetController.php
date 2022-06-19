<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\HtmlSnippet;
use App\Http\Requests\HtmlSnippetRequest;

class HtmlSnippetController extends Controller
{
    public function index()
    {
        return HtmlSnippet::all();
    }

    public function show($id)
    {
        $html_snippet = HtmlSnippet::find($id);

        return $html_snippet;
    }

    public function store(HtmlSnippetRequest $request)
    {
        $html_snippet = HtmlSnippet::create($request->validated());

        $html_snippet->resources()->create();

        return response([
            'success' => 'New HTML Snippet was successfully created.'
        ], 201);
    }

    public function update(HtmlSnippetRequest $request, $id)
    {
        $html_snippet = HtmlSnippet::find($id);

        $html_snippet->update($request->validated());

        return $html_snippet;
    }

    public function destroy($id)
    {
        $html_snippet = HtmlSnippet::find($id);

        $html_snippet->resources()->delete();

        $html_snippet->delete();

        return response()->noContent();
    }
}
