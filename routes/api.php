<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ResourceController;
use App\Http\Controllers\PdfFileController;
use App\Http\Controllers\HtmlSnippetController;
use App\Http\Controllers\LinkController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/resources', [ResourceController::class, 'index']);

Route::get('/pdf-files', [PdfFileController::class, 'index']);
Route::get('/pdf-files/{id}', [PdfFileController::class, 'show']);
Route::post('/pdf-files/create', [PdfFileController::class, 'store']);
Route::patch('/pdf-files/{id}', [PdfFileController::class, 'update']);
Route::delete('/pdf-files/{id}', [PdfFileController::class, 'destroy']);

Route::get('/html-snippets', [HtmlSnippetController::class, 'index']);
Route::get('/html-snippets/{id}', [HtmlSnippetController::class, 'show']);
Route::post('/html-snippets/create', [HtmlSnippetController::class, 'store']);
Route::patch('/html-snippets/{id}', [HtmlSnippetController::class, 'update']);
Route::delete('/html-snippets/{id}', [HtmlSnippetController::class, 'destroy']);

Route::get('/links', [LinkController::class, 'index']);
Route::get('/links/{id}', [LinkController::class, 'show']);
Route::post('/links/create', [LinkController::class, 'store']);
Route::patch('/links/{id}', [LinkController::class, 'update']);
Route::delete('/links/{id}', [LinkController::class, 'destroy']);