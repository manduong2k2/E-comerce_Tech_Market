<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

interface IModelRequest 
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize();
    public function rules();
    public function messages();
    public function failedValidation(Validator $validator);
    public function validated($key = null, $default = null);
}
