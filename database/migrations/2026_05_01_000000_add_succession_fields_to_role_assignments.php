<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('role_assignments', function (Blueprint $table) {
            $table->enum('succession_horizon', ['short', 'mid', 'long'])->nullable()->after('is_primary');
            $table->unsignedTinyInteger('readiness_score')->nullable()->after('succession_horizon');
        });
    }

    public function down(): void
    {
        Schema::table('role_assignments', function (Blueprint $table) {
            $table->dropColumn(['succession_horizon', 'readiness_score']);
        });
    }
};
