<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Lobby;

class GameController extends Controller
{
    public function show($lobbyId)
    {
        $lobby = Lobby::with('players')->findOrFail($lobbyId);

        // Ensure the user is part of this lobby
        $userInLobby = $lobby->players->contains(auth()->id());
        
        if (!$userInLobby) {
            return redirect()->route('lobbies.index')
                ->with('error', 'You are not a member of this game lobby.');
        }

        $players = $lobby->players->map(function ($player) {
            return [
                'id' => $player->id,
                'name' => $player->name,
                'status' => $player->pivot->status
            ];
        });

        return Inertia::render('Game', [
            'lobby' => $lobby,
            'players' => $players,
            'is_creator' => auth()->id() === $lobby->creator_id
        ]);
    }
}