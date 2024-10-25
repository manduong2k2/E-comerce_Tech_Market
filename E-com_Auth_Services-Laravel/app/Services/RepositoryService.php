<?php

namespace App\Services;

use App\Contracts\Services\RepositoryServiceInterface;

class RepositoryService implements RepositoryServiceInterface
{
    public function test()
    {
        return 'OK';
    }

    public function getRepo(string $model)
    {
        return app()->make("App\\Contracts\\Repositories\\{$model}RepositoryInterface");
    }
}
