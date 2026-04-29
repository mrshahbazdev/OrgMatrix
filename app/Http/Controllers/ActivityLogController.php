<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {
        $logs = ActivityLog::where('user_id', Auth::id())
            ->with('organization')
            ->latest()
            ->take(50)
            ->get();

        return Inertia::render('ActivityLog/Index', [
            'logs' => $logs,
        ]);
    }
}
