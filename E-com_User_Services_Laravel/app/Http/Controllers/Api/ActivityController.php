<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\IActivityRepository;
use App\Http\Controllers\Controller;
use App\Http\Resources\LogCollection;
use App\Http\Resources\LogResource;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

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
    public function show(Activity $activity)
    {
        return $activity;
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
