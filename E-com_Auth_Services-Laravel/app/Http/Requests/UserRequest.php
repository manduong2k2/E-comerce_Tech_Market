<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|max:255',
            'fullname' => 'required|string|max:255',
            'image' => 'required|file',
            'email' => 'required|string|max:255',
            'address' => 'string|max:255',
            'password' => 'required|string|max:255',
        ];
    }
    public function messages(): array
    {
        return [
            'username.required' => 'Username can not be null',
            'fullname.required' => 'fullname can not be null',
            'image.required' => 'image can not be null',
            'email.required' => 'email can not be null',
            'password.required' => 'password can not be null',
        ];
    }
}
