<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HabitController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DailyGoalController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Welcome

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

//Dashboard

Route::get('/dashboard', [DashboardController::class, '__invoke'])->middleware(['auth', 'verified'])->name('dashboard');

//Perfil

Route::resource('users', UserController::class)->middleware(['auth', 'verified']);

//Habit

Route::resource('habits', HabitController::class)->middleware(['auth', 'verified']);

//Task

Route::resource('tasks', TaskController::class)->middleware(['auth', 'verified']);

//Daily Goal

Route::resource('dailygoals', DailyGoalController::class)->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
