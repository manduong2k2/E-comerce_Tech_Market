<?php

namespace App\Repositories;

use App\Contracts\Repositories\IEloquentRepository;

abstract class EloquentRepository implements IEloquentRepository
{

    protected $_model;
    protected $relationships = [];

    public function __construct()
    {
        $this->setModel();
        $this->setRelationships();
    }

    private function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    private function setRelationships()
    {
        $this->relationships = $this->getRelationships();
    }

    abstract public function getModel(): string;
    abstract public function getRelationships(): array;

    public function getAll()
    {
        return $this->_model::with($this->relationships)->get();
    }

    public function getById($id)
    {
        return $this->_model::with($this->relationships)->find($id);
    }

    public function getByFilter($filters)
    {
        $query = $this->_model::with($this->relationships);
        foreach ($filters as $column => $value) {
            if (!is_null($value)) {
                $query->where($column, 'LIKE', '%' . $value . '%');
            }
        }
        return $query->get();
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
