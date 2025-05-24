<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user_id = $this->route()->parameter('user');
        $rules = [
            'name' => 'string',
            'phone' => 'numeric',
            'email' => 'string|email|max:255|unique:users,email,' . $user_id,
            'phone' => 'unique:users,phone,' . $user_id
        ];

        if ($this->isMethod('POST')) {
            $rules['password'] = 'required|string|min:8';
            $rules['name'] = 'required';
            $rules['email'] = 'required';
            $rules['phone'] = 'required';
        }

        //if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {}

        return $rules;
    }
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',

            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a string.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email may not be greater than 255 characters.',
            'email.unique' => 'The email has already been taken.',

            'phone.required' => 'The phone field is required.',
            'phone.numeric' => 'The phone must be a number.',
            'phone.unique' => 'The phone number has already been taken.',

            'password.required' => 'The password field is required.',
            'password.string' => 'The password must be a string.',
            'password.min' => 'The password must be at least 8 characters.',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed',
            'details' => $validator->errors()
        ], 422));
    }
}
