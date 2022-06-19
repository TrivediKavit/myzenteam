<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\PdfFile;
use App\Http\Requests\CreatePdfFileRequest;
use App\Http\Requests\EditPdfFileRequest;

class PdfFileController extends Controller
{
    public function index()
    {
        return PdfFile::all();
    }

    public function show($id)
    {
        $pdf_file = PdfFile::find($id);

        return $pdf_file;
    }

    public function store(CreatePdfFileRequest $request)
    {
        $pdf_file = new PdfFile;

        if($request->file()) {

            $validated = $request->validated();

            $original_file_name = time() . '_' . $request->file->getClientOriginalName();

            $file_path = $request->file('file')->storeAs('uploads', $original_file_name, 'public');

            $pdf_file->title = $request->title;

            $pdf_file->file_path = $file_path;

            $pdf_file->save();

            $pdf_file->resources()->create();

            return response([
                'success' => 'New PDF File was successfully uploaded.'
            ], 201);
        }
    }

    public function update(EditPdfFileRequest $request, $id)
    {
        $pdf_file = PdfFile::find($id);

        $pdf_file->update($request->validated());

        return $pdf_file;
    }

    public function destroy($id)
    {
        $pdf_file = PdfFile::find($id);

        $pdf_file->resources()->delete();

        $pdf_file->delete();

        Storage::disk('public')->delete($pdf_file->file_path);

        return response()->noContent();
    }
}
