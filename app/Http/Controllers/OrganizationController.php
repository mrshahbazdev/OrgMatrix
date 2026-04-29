<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Auth::user()->organizations()
            ->withCount(['roles', 'people'])
            ->latest()
            ->get();

        return Inertia::render('Organizations/Index', [
            'organizations' => $organizations,
        ]);
    }

    public function create()
    {
        return Inertia::render('Organizations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'industry' => 'nullable|string|max:255',
        ]);

        $organization = Auth::user()->organizations()->create($validated);

        return redirect()->route('organizations.show', $organization)
            ->with('success', 'Organization created successfully.');
    }

    public function show(Organization $organization)
    {
        $this->authorize($organization);

        $organization->load([
            'roles' => fn($q) => $q->withCount('assignments'),
            'people' => fn($q) => $q->withCount('assignments'),
        ]);

        $stats = [
            'total_roles' => $organization->roles->count(),
            'total_people' => $organization->people->count(),
            'active_roles' => $organization->roles->where('is_active', true)->count(),
            'unassigned_roles' => $organization->roles->filter(fn($r) => $r->assignments_count === 0)->count(),
        ];

        return Inertia::render('Organizations/Show', [
            'organization' => $organization,
            'stats' => $stats,
        ]);
    }

    public function edit(Organization $organization)
    {
        $this->authorize($organization);

        return Inertia::render('Organizations/Edit', [
            'organization' => $organization,
        ]);
    }

    public function update(Request $request, Organization $organization)
    {
        $this->authorize($organization);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'industry' => 'nullable|string|max:255',
        ]);

        $organization->update($validated);

        return redirect()->route('organizations.show', $organization)
            ->with('success', 'Organization updated successfully.');
    }

    public function destroy(Organization $organization)
    {
        $this->authorize($organization);

        $organization->delete();

        return redirect()->route('organizations.index')
            ->with('success', 'Organization deleted successfully.');
    }

    private function authorize(Organization $organization): void
    {
        abort_unless($organization->user_id === Auth::id(), 403);
    }
}
