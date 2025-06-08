<?php

namespace App\Traits;

use Spatie\Activitylog\LogOptions;

trait ActivityLogOption
{
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'email', 'phone']);
    }
}
