<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class LogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'log_name' => $this->log_name,
            'description' => $this->description,
            'event' => $this->event,
            'causer' => $this->causer ? $this->causer->toArray() : null,
            'subject' => $this->subject ? $this->subject->toArray() : null,
            'hashed_subject' => $this->hashed_subject ? $this->hashed_subject : null,
            'hashed_subject_encoded' => $this->hashed_subject ? json_decode(Crypt::decryptString($this->hashed_subject)) : null,
            'changes' => $this->changes(),
            'created_at' => $this->created_at,
        ];

    }
}
