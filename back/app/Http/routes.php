<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::post('/subirFoto', function () {
    //I am storing the image in the public/images folder 
    $destinationPath = 'fotos/';

    $newImageName='MyImage.jpg';
    
    Input::file('file')->move($destinationPath,$newImageName); 
});

