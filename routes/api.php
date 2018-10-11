<?php

use Illuminate\Http\Request;

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


$api = app('Dingo\Api\Routing\Router');

$api->version('v1', [
    'namespace' => "App\Http\Controllers",
    'limit'     => 10,
    'expires'   => 1,
], function ($api) {

    $api->post('message','MessageController@store')
    ->name('api.message.store');

    $api->get('message','MessageController@index')
    ->name('api.message.index');



});
