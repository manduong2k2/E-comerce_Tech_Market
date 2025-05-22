<?php

namespace App\Repositories;

use App\Contracts\Repositories\IEloquentRepository;

abstract class EloquentRepository implements IEloquentRepository
{

    protected $_model;

    public function __construct()
    {
        $this->setModel();
    }

    private function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    abstract public function getModel(): string;

    public function getAll()
    {
        return $this->_model->all();
    }

    public function getById($id)
    {
        return $this->_model->findOrFail($id);
    }

    public function store(array $data)
    {
        return $this->_model->create($data);
    }

    public function update($model, array $data)
    {
        $model->update($data);
        return $model;
    }

    public function delete($model)
    {
        return $model->delete();
    }
}
