<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Events\ChatMessageSent;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getChatHistory($lobbyId)
    {
        $messages = ChatMessage::where('lobby_id', $lobbyId)
            ->with('user')
            ->latest()
            ->take(50)
            ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request, $lobbyId)
    {
        $validatedData = $request->validate([
            'message' => 'required|string|max:60'
        ]);

        $message = ChatMessage::create([
            'lobby_id' => $lobbyId,
            'user_id' => auth()->id(),
            'message' => $validatedData['message']
        ]);

        broadcast(new ChatMessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}