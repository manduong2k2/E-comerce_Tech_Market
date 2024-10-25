<?php

namespace App\Http\Contracts\Interfaces;

use Dotenv\Repository\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

interface IEloquentRepository 
{
    public function all();
    public function getModel();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
