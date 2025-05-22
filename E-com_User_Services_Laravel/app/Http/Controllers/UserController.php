<?php

namespace App\Http\Controllers;

use App\Contracts\Repositories\IUserRepository;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        public IUserRepository $userRepository
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->userRepository->getAll();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->userRepository->store($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->userRepository->getById($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $model = $this->userRepository->getById($id);
        if(!$model) abort(404);
        return $this->userRepository->update($model,$request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = $this->userRepository->getById($id);
        if(!$model) abort(404);
        return $this->userRepository->delete($model);
    }
}
