<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RecoverMail extends Mailable implements iMail
{
    use Queueable, SerializesModels;

    public $user;
    public $code;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user,string $code)
    {
        $this->user = $user;
        $this->code = $code;
    }

    public function getUser(){
        return $this->user;
    }

    public function build()
    {
        return $this->subject('Notification')->view('recover_mail');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'User Notification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'recover_mail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
