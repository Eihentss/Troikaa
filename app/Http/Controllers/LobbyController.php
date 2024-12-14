<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lobby;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LobbyController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request with new configuration options
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'creator_id' => 'required|exists:users,id',
            'max_players' => 'integer|min:2|max:4|nullable',
            'spectate_allowed' => 'boolean|nullable',
            'is_private' => 'boolean|nullable',
            'game_ranking' => 'in:ranked,unranked|nullable'
        ]);
    
        // Generate a unique 6-digit code
        $validated['code'] = Lobby::generateUniqueCode();
        
        // Set default values if not provided
        $validated['max_players'] = $validated['max_players'] ?? 4;
        $validated['current_players'] = 1; // Start with creator
        $validated['status'] = 'waiting';
        $validated['spectate_allowed'] = $validated['spectate_allowed'] ?? true;
        $validated['is_private'] = $validated['is_private'] ?? false;
        $validated['game_ranking'] = $validated['game_ranking'] ?? 'unranked';
        $validated['round_number'] = 0;
    
        // Create new lobby
        $lobby = Lobby::create($validated);
    
        // Return the created lobby
        return response()->json($lobby, 201);
    }

    public function index()
    {
        // Retrieve lobbies with their creators, ordered by most recent first
        $lobbies = Lobby::with('creator')
            ->orderBy('created_at', 'desc')
            ->paginate(9); // Adjusted to match the grid layout

        return Inertia::render('LobbiesIndex', [
            'lobbies' => $lobbies,
        ]);
    }

public function show($id)
{
    // Find the lobby with its creator and players using eager loading
    $lobby = Lobby::with(['creator', 'users'])->findOrFail($id); // Eager load creator and users (players)

    // Prepare the lobby details
    $lobbyDetails = [
        'id' => $lobby->id,
        'name' => $lobby->name,
        'code' => $lobby->code,
        'max_players' => $lobby->max_players,
        'current_players' => $lobby->current_players, // Explicitly return current_players
        'game_ranking' => $lobby->game_ranking,
        'creator_id' => $lobby->creator_id,
        'creator' => [
            'id' => $lobby->creator->id,
            'name' => $lobby->creator->name,
        ],
        'players' => $lobby->users->map(function ($player) use ($lobby) {
            return [
                'id' => $player->id,
                'name' => $player->name,
                'status' => $player->pivot->status ?? 'Waiting', // Handle player status from the pivot table
                'is_host' => $player->id === $lobby->creator_id, // Check if the player is the host
            ];
        }),
    ];

    // Return the lobby details to the Inertia.js frontend
    return Inertia::render('LobbyPage', [
        'lobby' => $lobbyDetails,
    ]);
}

    public function findByCode($code)
    {
        // Search for the lobby by the given code
        $lobby = Lobby::where('code', $code)->firstOrFail();

        return response()->json([
            'id' => $lobby->id,
            'name' => $lobby->name,
            'creator_id' => $lobby->creator_id,
            'max_players' => $lobby->max_players,
            'current_players' => $lobby->current_players,
            'spectate_allowed' => $lobby->spectate_allowed,
            'is_private' => $lobby->is_private,
            'game_ranking' => $lobby->game_ranking,
        ]);
    }

    public function deleteByUser($userId)
    {
        $deletedCount = Lobby::where('creator_id', $userId)->delete();

        return response()->json([
            'message' => "Deleted $deletedCount lobbies created by user with ID $userId",
            'deleted_count' => $deletedCount
        ], 200);
    }


public function joinLobby($lobbyId)
{
    // Get the current user
    $user = auth()->user();
    
    // Find the new lobby
    $lobby = Lobby::findOrFail($lobbyId);

    // Check if the lobby is full
    if ($lobby->current_players >= $lobby->max_players) {
        return response()->json(['message' => 'Lobby is full'], 400);
    }

    // Start a transaction to ensure both operations succeed
    \DB::beginTransaction();

    try {
        // First, remove the user from any previous lobby they are part of
        $previousLobby = \DB::table('lobby_user')->where('user_id', $user->id)->first();

        if ($previousLobby) {
            // Decrement the current_players count for the previous lobby
            $previousLobby = Lobby::find($previousLobby->lobby_id);
            $previousLobby->decrement('current_players');
        }

        // Increment the current_players count for the new lobby
        $lobby->increment('current_players');

        // Remove the user from any old lobby (if they were in one)
        \DB::table('lobby_user')->where('user_id', $user->id)->delete();

        // Add the user to the new lobby_user table
        \DB::table('lobby_user')->insert([
            'lobby_id' => $lobby->id,
            'user_id' => $user->id,
            'status' => 'waiting',  // Default status, can be updated later based on game progress
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Commit the transaction
        \DB::commit();

        return response()->json(['message' => 'Successfully joined the lobby'], 200);
    } catch (\Exception $e) {
        // Rollback the transaction if something goes wrong
        \DB::rollBack();
        return response()->json(['message' => 'Failed to join the lobby'], 500);
    }
}



    public function leaveLobby($lobbyId)
    {
        // Get the current user
        $user = auth()->user();
        
        // Find the lobby
        $lobby = Lobby::findOrFail($lobbyId);

        // Start a transaction to ensure data consistency
        \DB::beginTransaction();

        try {
            // Remove the user from the lobby_user pivot table
            $removedRows = \DB::table('lobby_user')
                ->where('lobby_id', $lobby->id)
                ->where('user_id', $user->id)
                ->delete();

            // Decrement the current players count
            $lobby->decrement('current_players');

            // If the lobby becomes empty, you might want to delete the lobby
            // Alternatively, you could check if the current user was the creator
            if ($lobby->creator_id === $user->id) {
                // If the creator leaves, you might want to choose a new creator 
                // or mark the lobby for deletion
                $nextCreator = \DB::table('lobby_user')
                    ->where('lobby_id', $lobby->id)
                    ->first();

                if ($nextCreator) {
                    $lobby->creator_id = $nextCreator->user_id;
                    $lobby->save();
                } else {
                    // If no other players, delete the lobby
                    $lobby->delete();
                }
            }

            // Commit the transaction
            \DB::commit();

            return response()->json([
                'message' => 'Successfully left the lobby',
                'removedRows' => $removedRows
            ], 200);
        } catch (\Exception $e) {
            // Rollback the transaction if something goes wrong
            \DB::rollBack();
            return response()->json([
                'message' => 'Failed to leave the lobby',
                'error' => $e->getMessage()
            ], 500);
        }
    }


}