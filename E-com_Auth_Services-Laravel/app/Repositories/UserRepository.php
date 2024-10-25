<?php
namespace App\Repositories;

use App\Http\Contracts\Interfaces\IUserRepository;
use App\Models\User;

class UserRepository extends EloquentRepository implements IUserRepository{
    public function getModel(): string 
    {
        return User::class;
    }
}