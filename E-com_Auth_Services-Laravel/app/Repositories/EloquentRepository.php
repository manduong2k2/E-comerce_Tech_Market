<?php

namespace App\Repositories;

use App\Http\Contracts\Interfaces\IEloquentRepository;
use Illuminate\Database\Eloquent\Model;

abstract class EloquentRepository implements IEloquentRepository
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->model->find($id);
        return $record ? $record->update($data) : null;
    }

    public function delete($id)
    {
        $record = $this->model->find($id);
        return $record ? $record->delete() : null;
    }
}
