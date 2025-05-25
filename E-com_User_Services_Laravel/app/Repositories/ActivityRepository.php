<?php

namespace App\Repositories;

use App\Contracts\Repositories\IActivityRepository;
use Spatie\Activitylog\Models\Activity;

class ActivityRepository extends EloquentRepository implements IActivityRepository
{
    public function getModel(): string
    {
        return Activity::class;
    }
    public function getRelationships(): array
    {
        return [];
    }
}