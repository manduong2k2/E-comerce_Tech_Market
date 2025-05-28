<?php

namespace App\Repositories;

use App\Contracts\Repositories\IUserRepository;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserRepository extends EloquentRepository implements IUserRepository
{
    public function getModel(): string
    {
        return User::class;
    }
    public function getRelationships(): array
    {
        return ['roles'];
    }
    public function store(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = parent::store($data);
        $user->roles()->attach(1);
        activity()->log('user ' . $user['name'] . ' granted role user');
        return $user;
    }
    public function auth(array $data){

        if (! $token = Auth::attempt($data)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        return response()->json(['token' => $token], 200);
    }
}