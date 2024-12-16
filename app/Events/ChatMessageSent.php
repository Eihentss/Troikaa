<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $user;
    public $lobbyId;

    public function __construct($message, $user, $lobbyId)
    {
        $this->message = $message;
        $this->user = $user;
        $this->lobbyId = $lobbyId;
    }

    public function broadcastOn()
    {
        return new Channel('lobby-chat-' . $this->lobbyId);
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'timestamp' => now()->toIso8601String()
        ];
    }
}