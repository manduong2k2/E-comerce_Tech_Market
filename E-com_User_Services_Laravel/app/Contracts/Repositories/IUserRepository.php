<?php

namespace App\Contracts\Repositories;

interface IUserRepository extends IEloquentRepository
{
    public function auth(array $data);
}