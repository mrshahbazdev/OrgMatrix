<?php

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\OrgChartController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleAssignmentController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/language/{locale}', [LanguageController::class, 'switch'])->name('language.switch');

Route::get('/dashboard', function () {
    $user = Auth::user();
    $organizations = $user->organizations()->withCount(['roles', 'people'])->latest()->get();

    return Inertia::render('Dashboard', [
        'organizations' => $organizations,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('organizations', OrganizationController::class);

    Route::prefix('organizations/{organization}')->name('organizations.')->group(function () {
        Route::resource('roles', RoleController::class)->except(['show']);
        Route::resource('persons', PersonController::class)->except(['show']);

        Route::get('roles/{role}/assign', [RoleAssignmentController::class, 'create'])->name('roles.assign');
        Route::post('roles/{role}/assign', [RoleAssignmentController::class, 'store'])->name('roles.assign.store');
        Route::delete('roles/{role}/assignments/{assignment}', [RoleAssignmentController::class, 'destroy'])->name('roles.assign.destroy');

        Route::get('chart', [OrgChartController::class, 'index'])->name('chart');
    });
});

require __DIR__.'/auth.php';
