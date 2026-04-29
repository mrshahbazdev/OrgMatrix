<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrgChartController extends Controller
{
    public function index(Organization $organization)
    {
        abort_unless($organization->user_id === Auth::id(), 403);

        $roles = $organization->roles()
            ->with(['assignments.person', 'parent'])
            ->orderBy('sort_order')
            ->get();

        $tree = $this->buildTree($roles);

        return Inertia::render('OrgChart/Index', [
            'organization' => $organization,
            'chartData' => $tree,
            'roles' => $roles,
        ]);
    }

    private function buildTree($roles, $parentId = null): array
    {
        $tree = [];

        foreach ($roles->where('parent_role_id', $parentId) as $role) {
            $primaryAssignment = $role->assignments->firstWhere('is_primary', true);
            $person = $primaryAssignment ? $primaryAssignment->person : null;

            $tree[] = [
                'id' => $role->id,
                'role_id' => $role->id,
                'name' => $role->name,
                'department' => $role->department,
                'criticality' => $role->criticality,
                'is_active' => $role->is_active,
                'person' => $person ? [
                    'id' => $person->id,
                    'name' => $person->full_name,
                    'title' => $person->title,
                    'avatar' => $person->avatar,
                ] : null,
                'assignee_count' => $role->assignments->count(),
                'children' => $this->buildTree($roles, $role->id),
            ];
        }

        return $tree;
    }
}
