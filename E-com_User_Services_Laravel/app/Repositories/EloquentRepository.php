<?php

namespace App\Repositories;

use App\Contracts\Repositories\IEloquentRepository;

abstract class EloquentRepository implements IEloquentRepository
{

    protected $_model;
    protected $transactions = [];

    public function __construct()
    {
        $this->setModel();
        $this->setTransactions();
    }

    private function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    private function setTransactions()
    {
        $this->transactions = $this->getTransactions();
    }

    abstract public function getModel(): string;
    abstract public function getTransactions(): array;

    public function getAll()
    {
        return $this->_model::with($this->transactions)->get();
    }

    public function getById($id)
    {
        return $this->_model->find($id);
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
