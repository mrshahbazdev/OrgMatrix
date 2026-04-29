<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonController extends Controller
{
    public function index(Organization $organization)
    {
        $this->authorize($organization);

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
        $this->authorize($organization);

        return Inertia::render('Persons/Create', [
            'organization' => $organization,
        ]);
    }

    public function store(Request $request, Organization $organization)
    {
        $this->authorize($organization);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $organization->people()->create($validated);

        return redirect()->route('organizations.persons.index', $organization)
            ->with('success', 'Person added successfully.');
    }

    public function edit(Organization $organization, Person $person)
    {
        $this->authorize($organization);

        $person->load('roles');

        return Inertia::render('Persons/Edit', [
            'organization' => $organization,
            'person' => $person,
        ]);
    }

    public function update(Request $request, Organization $organization, Person $person)
    {
        $this->authorize($organization);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $person->update($validated);

        return redirect()->route('organizations.persons.index', $organization)
            ->with('success', 'Person updated successfully.');
    }

    public function destroy(Organization $organization, Person $person)
    {
        $this->authorize($organization);

        $person->delete();

        return redirect()->route('organizations.persons.index', $organization)
            ->with('success', 'Person removed successfully.');
    }

    private function authorize(Organization $organization): void
    {
        abort_unless($organization->user_id === Auth::id(), 403);
    }
}
