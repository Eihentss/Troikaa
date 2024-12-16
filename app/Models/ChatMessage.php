<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $fillable = [
        'lobby_id', 
        'user_id', 
        'message'
    ];

    // Relationships
    public function lobby()
    {
        return $this->belongsTo(Lobby::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}