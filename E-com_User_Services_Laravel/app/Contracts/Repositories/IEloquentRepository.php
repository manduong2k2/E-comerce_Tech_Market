<?php

namespace App\Contracts\Repositories;

interface IEloquentRepository
{
    public function getAll();

    public function getById($id);

    public function store(array $data);

    public function update($model, array $data);

    public function delete($model);
}
