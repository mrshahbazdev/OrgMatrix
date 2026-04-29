<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Organization;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PersonController extends Controller
{
    public function index(Organization $organization)
    {
        $this->authorizeOrganization($organization);

        $people = $organization->people()
            ->with('roles')
            ->latest()
            ->get();

        return Inertia::render('Persons/Index', [
            'organization' => $organization,
            'people' => $people,
        ]);
    }

    public function create(Organization $organization)
    {
        $this->authorizeOrganization($organization);

        return Inertia::render('Persons/Create', [
            'organization' => $organization,
        ]);
    }

    public function store(Request $request, Organization $organization)
    {
        $this->authorizeOrganization($organization);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }
        unset($validated['avatar_file']);

        $person = $organization->people()->create($validated);

        ActivityLog::log('created', 'Person', $person->id, $person->full_name, $organization->id);

        return redirect()->route('organizations.persons.index', $organization)
            ->with('success', 'Person added successfully.');
    }

    public function edit(Organization $organization, Person $person)
    {
        $this->authorizeOrganization($organization);

        $person->load('roles');

        return Inertia::render('Persons/Edit', [
            'organization' => $organization,
            'person' => $person,
        ]);
    }

    public function update(Request $request, Organization $organization, Person $person)
    {
        $this->authorizeOrganization($organization);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            if ($person->avatar) {
                Storage::disk('public')->delete($person->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $person->update($validated);

        ActivityLog::log('updated', 'Person', $person->id, $person->full_name, $organization->id);

        return redirect()->route('organizations.persons.index', $organization)
            ->with('success', 'Person updated successfully.');
    }

    public function destroy(Organization $organization, Person $person)
    {
        $this->authorizeOrganization($organization);

        $name = $person->full_name;
        $person->delete();

        ActivityLog::log('deleted', 'Person', null, $name, $organization->id);

        return redirect()->route('organizations.persons.index', $organization)
            ->with('success', 'Person removed successfully.');
    }

    private function authorizeOrganization(Organization $organization): void
    {
        abort_unless($organization->user_id === Auth::id(), 403);
    }
}
