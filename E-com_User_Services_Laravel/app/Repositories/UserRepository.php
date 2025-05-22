<?php

namespace App\Repositories;

use App\Contracts\Repositories\IUserRepository;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository extends EloquentRepository implements IUserRepository
{
    public function getModel(): string
    {
        return User::class;
    }
    public function store(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        parent::store($data);
    }
}