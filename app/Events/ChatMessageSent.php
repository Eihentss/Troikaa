<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\ChatMessage;

class ChatMessageSent implements ShouldBroadcast
{
    public $message;

    public function __construct(ChatMessage $message)
    {
        $this->message = $message->load('user');
    }

    public function broadcastOn()
    {
        return new Channel('lobby-chat-' . $this->message->lobby_id);
    }

    public function broadcastAs()
    {
        return 'ChatMessageSent';
    }
}