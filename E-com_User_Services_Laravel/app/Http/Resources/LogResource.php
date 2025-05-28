<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'properties' => $this->properties,
            'changes' => $this->changes(),
            'created_at' => $this->created_at->toDateTimeString(),
        ];

    }
}
