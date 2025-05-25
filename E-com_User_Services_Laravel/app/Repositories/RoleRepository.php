<?php

namespace App\Repositories;

use App\Contracts\Repositories\IRoleRepository;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleRepository extends EloquentRepository implements IRoleRepository
{
    public function getModel(): string
    {
        return Role::class;
    }
    public function getRelationships(): array
    {
        return ['users'];
    }
}