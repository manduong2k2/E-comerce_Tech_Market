<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\IRoleRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\RoleRequest;

class RoleController extends Controller
{
    public function __construct(
        public IRoleRepository $repository
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(RoleRequest $request)
    {
        return $this->repository->getByFilter($request->only('name','description'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        return $this->repository->store($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->repository->getById($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, $id)
    {
        $model = $this->repository->getById($id);
        if(!$model) abort(404);
        return $this->repository->update($model,$request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = $this->repository->getById($id);
        if(!$model) abort(404);
        return $this->repository->delete($model);
    }
}
