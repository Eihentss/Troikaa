<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use App\Models\Lobby;

class GameStarted implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $lobby;

    /**
     * Izveido jaunu notikumu instance.
     *
     * @param \App\Models\Lobby $lobby
     */
    public function __construct(Lobby $lobby)
    {
        $this->lobby = $lobby->load('players'); // Iekļaujam spēlētājus datu kopā
    }

    /**
     * Kanāls, kurā tiek pārraidīts notikums.
     *
     * @return \Illuminate\Broadcasting\Channel
     */
    public function broadcastOn()
    {
        return new PrivateChannel('lobby-' . $this->lobby->id);
    }

    /**
     * Notikuma nosaukums klientam.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'GameStarted';
    }
}
