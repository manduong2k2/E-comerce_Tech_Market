<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\IActivityRepository;
use App\Http\Controllers\Controller;
use App\Http\Resources\LogCollection;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function __construct(
        public IActivityRepository $repository
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return new LogCollection($this->repository->getByFilter($request->only(['name','description','event'])));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $request->all();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
