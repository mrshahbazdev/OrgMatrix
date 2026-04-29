<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Organization $organization)
    {
        $this->authorizeOrganization($organization);

        $roles = $organization->roles()
            ->with(['parent', 'assignments.person'])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Roles/Index', [
            'organization' => $organization,
            'roles' => $roles,
        ]);
    }

    public function create(Organization $organization)
    {
        $this->authorizeOrganization($organization);

        $parentRoles = $organization->roles()->select('id', 'name')->get();

        return Inertia::render('Roles/Create', [
            'organization' => $organization,
            'parentRoles' => $parentRoles,
        ]);
    }

    public function store(Request $request, Organization $organization)
    {
        $this->authorizeOrganization($organization);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'department' => 'nullable|string|max:255',
            'parent_role_id' => 'nullable|exists:roles,id',
            'criticality' => 'required|in:low,medium,high,critical',
        ]);

        $organization->roles()->create($validated);

        return redirect()->route('organizations.roles.index', $organization)
            ->with('success', 'Role created successfully.');
    }

    public function edit(Organization $organization, Role $role)
    {
        $this->authorizeOrganization($organization);

        $parentRoles = $organization->roles()
            ->where('id', '!=', $role->id)
            ->select('id', 'name')
            ->get();

        return Inertia::render('Roles/Edit', [
            'organization' => $organization,
            'role' => $role,
            'parentRoles' => $parentRoles,
        ]);
    }

    public function update(Request $request, Organization $organization, Role $role)
    {
        $this->authorizeOrganization($organization);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'department' => 'nullable|string|max:255',
            'parent_role_id' => 'nullable|exists:roles,id',
            'criticality' => 'required|in:low,medium,high,critical',
            'is_active' => 'boolean',
        ]);

        $role->update($validated);

        return redirect()->route('organizations.roles.index', $organization)
            ->with('success', 'Role updated successfully.');
    }

    public function destroy(Organization $organization, Role $role)
    {
        $this->authorizeOrganization($organization);

        $role->delete();

        return redirect()->route('organizations.roles.index', $organization)
            ->with('success', 'Role deleted successfully.');
    }

    private function authorizeOrganization(Organization $organization): void
    {
        abort_unless($organization->user_id === Auth::id(), 403);
    }
}
