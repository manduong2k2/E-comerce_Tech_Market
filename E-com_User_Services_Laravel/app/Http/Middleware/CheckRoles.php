<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->bearerToken()) {
            return response()->json(['invalid' => 'Token not provided'], 401);
        }

        $user = JWTAuth::parseToken()->authenticate();

        $isAdmin = $user->roles->find(2);

        if (!$isAdmin) {
            return response()->json(['invalid' => 'You dont have permission to perform this action'], 403);
        }

        return $next($request);
    }
}
