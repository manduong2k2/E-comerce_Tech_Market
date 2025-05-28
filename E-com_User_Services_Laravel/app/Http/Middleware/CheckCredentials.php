<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckCredentials
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            if (!$request->bearerToken()) {
                return response()->json(['error' => 'Unauthenticated - Token not provided'], 401);
            }
            
            $user = JWTAuth::parseToken()->authenticate();
            Auth::login($user);

            // Invalidate token
            if (!empty($user)) {
                response()->json(['error' => 'Unauthenticated'], 401);
            }

            return $next($request);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->__toString()], 500);
        }
    }
}
