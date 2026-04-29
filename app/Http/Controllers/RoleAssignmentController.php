<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Organization;
use App\Models\Role;
use App\Models\RoleAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoleAssignmentController extends Controller
{
    public function create(Organization $organization, Role $role)
    {
        $this->authorizeOrganization($organization);

        $availablePeople = $organization->people()
            ->whereNotIn('id', $role->assignments()->pluck('person_id'))
            ->get();

        return Inertia::render('Assignments/Create', [
            'organization' => $organization,
            'role' => $role->load('assignments.person'),
            'availablePeople' => $availablePeople,
        ]);
    }

    public function store(Request $request, Organization $organization, Role $role)
    {
        $this->authorizeOrganization($organization);

        $validated = $request->validate([
            'person_id' => 'required|exists:people,id',
            'is_primary' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'notes' => 'nullable|string',
        ]);

        if ($validated['is_primary'] ?? false) {
            $role->assignments()->update(['is_primary' => false]);
        }

        $assignment = $role->assignments()->create($validated);
        $person = $assignment->person;

        ActivityLog::log('assigned', 'RoleAssignment', $assignment->id, $person->full_name . ' -> ' . $role->name, $organization->id);

        return redirect()->route('organizations.roles.index', $organization)
            ->with('success', 'Person assigned to role successfully.');
    }

    public function destroy(Organization $organization, Role $role, RoleAssignment $assignment)
    {
        $this->authorizeOrganization($organization);

        $desc = ($assignment->person->full_name ?? '') . ' -> ' . ($role->name ?? '');
        $assignment->delete();

        ActivityLog::log('unassigned', 'RoleAssignment', null, $desc, $organization->id);

        return redirect()->route('organizations.roles.index', $organization)
            ->with('success', 'Assignment removed successfully.');
    }

    private function authorizeOrganization(Organization $organization): void
    {
        abort_unless($organization->user_id === Auth::id(), 403);
    }
}
