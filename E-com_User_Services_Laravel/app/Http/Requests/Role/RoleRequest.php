<?php

namespace App\Http\Requests\Role;

use App\Http\Requests\IModelRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RoleRequest extends FormRequest implements IModelRequest
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
        return [
            'name' => 'string',
            'description' => 'string'
        ];
        $rules = [
            'name' => 'string',
            'description' => 'string'
        ];

        if ($this->isMethod('POST') || $this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['name'] = 'required';
            $rules['description'] = 'required';
        }

        return $rules;
    }
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',

            'description.required' => 'The description field is required.',
            'description.string' => 'The description must be a string.',
        ];
    }

    public function validated($key = null, $default = null): array
    {
        return parent::validated(); 
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed',
            'details' => $validator->errors()
        ], 422));
    }
}
