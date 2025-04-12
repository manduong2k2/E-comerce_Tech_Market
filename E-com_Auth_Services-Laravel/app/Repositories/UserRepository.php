<?php
namespace App\Repositories;

use App\Http\Contracts\Interfaces\IUserRepository;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserRepository extends EloquentRepository implements IUserRepository{
    public function getModel(): string 
    {
        return User::class;
    }
    public function create(array $data){
        $user = parent::create($data);
        if (isset($data['image']) && $data['image']->isValid()) {
            $image = $data['image'];
            $imageName = $user->username . '.jpg';

            $image->storeAs('public/images/user', $imageName);
        }
        $user->image = 'http://localhost/storage/images/user/' . $user->username . '.jpg';
        $user->save();
        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }
    public function authorize(array $data){
        $user = $this->findByFilter(['username'=>$data['username']]);
        if(!$user) return null;
        if(!Hash::check($data['password'],$user->password)) return null;
        return JWTAuth::fromUser($user);
    }
}