<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ImportExportController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\OrgChartController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleAssignmentController;
use App\Http\Controllers\RoleController;
use App\Models\ActivityLog;
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

    $allRoles = collect();
    $allPeople = collect();
    foreach ($organizations as $org) {
        $orgRoles = $org->roles()->with('assignments')->get();
        $allRoles = $allRoles->merge($orgRoles);
        $allPeople = $allPeople->merge($org->people);
    }

    $analytics = [
        'total_organizations' => $organizations->count(),
        'total_roles' => $allRoles->count(),
        'total_people' => $allPeople->count(),
        'total_assignments' => $allRoles->sum(fn($r) => $r->assignments->count()),
        'criticality_breakdown' => [
            'low' => $allRoles->where('criticality', 'low')->count(),
            'medium' => $allRoles->where('criticality', 'medium')->count(),
            'high' => $allRoles->where('criticality', 'high')->count(),
            'critical' => $allRoles->where('criticality', 'critical')->count(),
        ],
        'departments' => $allRoles->groupBy('department')->map->count()->filter(fn($v, $k) => $k)->toArray(),
        'coverage' => [
            'filled' => $allRoles->filter(fn($r) => $r->assignments->count() > 0)->count(),
            'vacant' => $allRoles->filter(fn($r) => $r->assignments->count() === 0)->count(),
        ],
        'risk_roles' => $allRoles->filter(fn($r) => $r->assignments->count() === 0 && in_array($r->criticality, ['high', 'critical']))->count(),
    ];

    $recentActivity = ActivityLog::where('user_id', $user->id)
        ->with('organization')
        ->latest()
        ->take(10)
        ->get();

    return Inertia::render('Dashboard', [
        'organizations' => $organizations,
        'analytics' => $analytics,
        'recentActivity' => $recentActivity,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/activity-log', [ActivityLogController::class, 'index'])->name('activity-log');

    Route::resource('organizations', OrganizationController::class);

    Route::prefix('organizations/{organization}')->name('organizations.')->group(function () {
        Route::resource('roles', RoleController::class)->except(['show']);
        Route::resource('persons', PersonController::class)->except(['show']);

        Route::get('roles/{role}/assign', [RoleAssignmentController::class, 'create'])->name('roles.assign');
        Route::post('roles/{role}/assign', [RoleAssignmentController::class, 'store'])->name('roles.assign.store');
        Route::delete('roles/{role}/assignments/{assignment}', [RoleAssignmentController::class, 'destroy'])->name('roles.assign.destroy');

        Route::get('chart', [OrgChartController::class, 'index'])->name('chart');

        // Import/Export
        Route::get('export/roles', [ImportExportController::class, 'exportRoles'])->name('export.roles');
        Route::get('export/people', [ImportExportController::class, 'exportPeople'])->name('export.people');
        Route::post('import/roles', [ImportExportController::class, 'importRoles'])->name('import.roles');
        Route::post('import/people', [ImportExportController::class, 'importPeople'])->name('import.people');
    });
});

require __DIR__.'/auth.php';
