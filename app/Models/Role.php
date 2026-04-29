<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'parent_role_id',
        'name',
        'description',
        'department',
        'criticality',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'parent_role_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Role::class, 'parent_role_id');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(RoleAssignment::class);
    }

    public function people(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'role_assignments')
            ->withPivot('is_primary', 'start_date', 'end_date', 'notes')
            ->withTimestamps();
    }

    public function primaryPerson(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'id', 'role_id')
            ->whereHas('assignments', function ($q) {
                $q->where('role_id', $this->id)->where('is_primary', true);
            });
    }

    public function childrenRecursive(): HasMany
    {
        return $this->children()->with('childrenRecursive', 'assignments.person');
    }
}
