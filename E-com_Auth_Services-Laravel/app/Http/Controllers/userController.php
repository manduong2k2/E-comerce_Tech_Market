<?php

namespace App\Http\Controllers;

use App\Http\Contracts\Interfaces\IUserRepository;
use App\Http\Requests\UserRequest;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Http\Request;

class userController extends Controller
{
    public UserRepository $userRepository;
    /**
     * Display a listing of the resource.
     */
    public function __construct(IUserRepository $iUserRepository)
    {
        $this->userRepository = $iUserRepository;
    }
    public function index()
    {
        try {
            $users = $this->userRepository->all();
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->__toString()
            ], 502);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function signup(UserRequest $request)
    {
        try {
            $user = $this->userRepository->create($request->all());
            return response()->json([
                'message' => 'Account created successfully !'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->__toString(),
                'request' => $request->all()
            ], 502);
        }
    }

    public function login(Request $request)
    {
        try {
            $authorization = $this->userRepository->authorize($request->all());
            if (!$authorization)
                return response()->json([
                    'message' => 'Invalid credential !'
                ], 401);
            return response()->json([
                'message' => 'Login success !',
                'token' => $authorization
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->__toString(),
                'request' => $request->all()
            ], 502);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = $this->userRepository->find($id);
            if (!$user)
                return response()->json([
                    'message' => 'User not found!'
                ], 404);
            return $user;
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->__toString()
            ], 502);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->__toString(),
                'request' => $request->all()
            ], 502);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->__toString()
            ], 502);
        }
    }
}
