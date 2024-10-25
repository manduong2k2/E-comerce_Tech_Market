<?php

namespace App\Contracts\Services;

interface RepositoryServiceInterface
{
    public function getRepo(string $repoName);
}
