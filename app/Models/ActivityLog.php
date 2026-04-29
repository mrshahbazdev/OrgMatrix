<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'organization_id',
        'action',
        'subject_type',
        'subject_id',
        'subject_name',
        'changes',
    ];

    protected $casts = [
        'changes' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public static function log(string $action, string $subjectType, ?int $subjectId, ?string $subjectName, ?int $organizationId = null, ?array $changes = null): self
    {
        return self::create([
            'user_id' => auth()->id(),
            'organization_id' => $organizationId,
            'action' => $action,
            'subject_type' => $subjectType,
            'subject_id' => $subjectId,
            'subject_name' => $subjectName,
            'changes' => $changes,
        ]);
    }
}
