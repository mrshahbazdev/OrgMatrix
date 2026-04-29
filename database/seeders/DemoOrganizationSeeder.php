<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Person;
use App\Models\Role;
use App\Models\RoleAssignment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoOrganizationSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@orgmatrix.com'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
            ]
        );

        $org = Organization::create([
            'user_id' => $user->id,
            'name' => 'Allocore Technologies',
            'description' => 'A forward-thinking technology company specializing in organizational intelligence and workforce optimization solutions.',
            'industry' => 'Technology',
        ]);

        // Top-level roles
        $ceo = Role::create([
            'organization_id' => $org->id,
            'name' => 'Chief Executive Officer',
            'department' => 'Executive',
            'criticality' => 'critical',
            'sort_order' => 1,
        ]);

        $cto = Role::create([
            'organization_id' => $org->id,
            'name' => 'Chief Technology Officer',
            'department' => 'Engineering',
            'parent_role_id' => $ceo->id,
            'criticality' => 'critical',
            'sort_order' => 2,
        ]);

        $cfo = Role::create([
            'organization_id' => $org->id,
            'name' => 'Chief Financial Officer',
            'department' => 'Finance',
            'parent_role_id' => $ceo->id,
            'criticality' => 'critical',
            'sort_order' => 3,
        ]);

        $vpe = Role::create([
            'organization_id' => $org->id,
            'name' => 'VP of Engineering',
            'department' => 'Engineering',
            'parent_role_id' => $cto->id,
            'criticality' => 'high',
            'sort_order' => 4,
        ]);

        $vpSales = Role::create([
            'organization_id' => $org->id,
            'name' => 'VP of Sales',
            'department' => 'Sales',
            'parent_role_id' => $ceo->id,
            'criticality' => 'high',
            'sort_order' => 5,
        ]);

        $hrDir = Role::create([
            'organization_id' => $org->id,
            'name' => 'HR Director',
            'department' => 'Human Resources',
            'parent_role_id' => $ceo->id,
            'criticality' => 'high',
            'sort_order' => 6,
        ]);

        $seniorDev = Role::create([
            'organization_id' => $org->id,
            'name' => 'Senior Developer',
            'department' => 'Engineering',
            'parent_role_id' => $vpe->id,
            'criticality' => 'medium',
            'sort_order' => 7,
        ]);

        $devOps = Role::create([
            'organization_id' => $org->id,
            'name' => 'DevOps Engineer',
            'department' => 'Engineering',
            'parent_role_id' => $vpe->id,
            'criticality' => 'high',
            'sort_order' => 8,
        ]);

        $designer = Role::create([
            'organization_id' => $org->id,
            'name' => 'UX Designer',
            'department' => 'Design',
            'parent_role_id' => $cto->id,
            'criticality' => 'medium',
            'sort_order' => 9,
        ]);

        $accountant = Role::create([
            'organization_id' => $org->id,
            'name' => 'Senior Accountant',
            'department' => 'Finance',
            'parent_role_id' => $cfo->id,
            'criticality' => 'medium',
            'sort_order' => 10,
        ]);

        $salesMgr = Role::create([
            'organization_id' => $org->id,
            'name' => 'Sales Manager',
            'department' => 'Sales',
            'parent_role_id' => $vpSales->id,
            'criticality' => 'medium',
            'sort_order' => 11,
        ]);

        $recruiter = Role::create([
            'organization_id' => $org->id,
            'name' => 'Recruiter',
            'department' => 'Human Resources',
            'parent_role_id' => $hrDir->id,
            'criticality' => 'low',
            'sort_order' => 12,
        ]);

        // People
        $people = [
            ['first_name' => 'Alexander', 'last_name' => 'Weber', 'email' => 'a.weber@allocore.com', 'title' => 'CEO & Founder', 'department' => 'Executive'],
            ['first_name' => 'Maria', 'last_name' => 'Schmidt', 'email' => 'm.schmidt@allocore.com', 'title' => 'CTO', 'department' => 'Engineering'],
            ['first_name' => 'Thomas', 'last_name' => 'Mueller', 'email' => 't.mueller@allocore.com', 'title' => 'CFO', 'department' => 'Finance'],
            ['first_name' => 'Sarah', 'last_name' => 'Fischer', 'email' => 's.fischer@allocore.com', 'title' => 'VP Engineering', 'department' => 'Engineering'],
            ['first_name' => 'Daniel', 'last_name' => 'Braun', 'email' => 'd.braun@allocore.com', 'title' => 'VP Sales', 'department' => 'Sales'],
            ['first_name' => 'Lisa', 'last_name' => 'Wagner', 'email' => 'l.wagner@allocore.com', 'title' => 'HR Director', 'department' => 'Human Resources'],
            ['first_name' => 'Michael', 'last_name' => 'Becker', 'email' => 'm.becker@allocore.com', 'title' => 'Senior Full-Stack Developer', 'department' => 'Engineering'],
            ['first_name' => 'Julia', 'last_name' => 'Hoffmann', 'email' => 'j.hoffmann@allocore.com', 'title' => 'DevOps Lead', 'department' => 'Engineering'],
            ['first_name' => 'Anna', 'last_name' => 'Klein', 'email' => 'a.klein@allocore.com', 'title' => 'UX/UI Designer', 'department' => 'Design'],
            ['first_name' => 'Peter', 'last_name' => 'Schulz', 'email' => 'p.schulz@allocore.com', 'title' => 'Senior Accountant', 'department' => 'Finance'],
            ['first_name' => 'Laura', 'last_name' => 'Richter', 'email' => 'l.richter@allocore.com', 'title' => 'Sales Manager', 'department' => 'Sales'],
        ];

        $createdPeople = [];
        foreach ($people as $personData) {
            $createdPeople[] = Person::create(array_merge($personData, ['organization_id' => $org->id]));
        }

        // Assignments
        $assignments = [
            [$ceo->id, $createdPeople[0]->id, true],
            [$cto->id, $createdPeople[1]->id, true],
            [$cfo->id, $createdPeople[2]->id, true],
            [$vpe->id, $createdPeople[3]->id, true],
            [$vpSales->id, $createdPeople[4]->id, true],
            [$hrDir->id, $createdPeople[5]->id, true],
            [$seniorDev->id, $createdPeople[6]->id, true],
            [$devOps->id, $createdPeople[7]->id, true],
            [$designer->id, $createdPeople[8]->id, true],
            [$accountant->id, $createdPeople[9]->id, true],
            [$salesMgr->id, $createdPeople[10]->id, true],
            // Recruiter role left VACANT intentionally to demonstrate vacancy indicator
        ];

        foreach ($assignments as [$roleId, $personId, $isPrimary]) {
            RoleAssignment::create([
                'role_id' => $roleId,
                'person_id' => $personId,
                'is_primary' => $isPrimary,
                'start_date' => now()->subMonths(rand(1, 24))->format('Y-m-d'),
            ]);
        }
    }
}
