<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\IUserRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        public IUserRepository $repository
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(UserRequest $request)
    {
        return $this->repository->getByFilter($request->only(['name','email','phone']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = $this->repository->store($request->validated());
        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $model = $this->repository->getById($id);
        if (!$model) 
        return response()->json([
            'message' => 'User not found',
        ], 404);
        return $model;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, $id)
    {
        $model = $this->repository->getById($id);
        if (!$model) 
        return response()->json([
            'message' => 'User not found',
        ], 404);
        return $this->repository->update($model, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = $this->repository->getById($id);
        if (!$model)
        return response()->json([
            'message' => 'User not found',
        ], 404);
        return $this->repository->delete($model);
    }
}
