<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageSent;
use Illuminate\Http\Request;
use App\Models\LobbyMessage;

class ChatController extends Controller
{
    public function sendMessage(Request $request, $lobbyId)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:500'
        ]);

        $user = auth()->user();

        // Save message to database
        $chatMessage = LobbyMessage::create([
            'lobby_id' => $lobbyId,
            'user_id' => $user->id,
            'message' => $validated['message']
        ]);

        // Broadcast message
        broadcast(new ChatMessageSent($validated['message'], $user, $lobbyId));

        return response()->json(['status' => 'Message sent']);
    }

    public function getChatHistory($lobbyId)
    {
        $messages = LobbyMessage::with('user')
            ->where('lobby_id', $lobbyId)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        return response()->json($messages);
    }
}