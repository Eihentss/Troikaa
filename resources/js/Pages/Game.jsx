import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

const Game = ({ lobby, players, is_creator = false }) => {
    const [gameInitialized, setGameInitialized] = useState(false);

    useEffect(() => {
        const initializeGame = async () => {
            // Only non-creators need to be redirected
            if (!is_creator) {
                try {
                    // Check if game has actually started
                    const response = await axios.get(`/api/lobbies/${lobby.id}`);
                    const updatedLobby = response.data;

                    if (updatedLobby.status === 'playing') {
                        // Redirect to game page for non-creators
                        router.visit(`/game/${lobby.id}`, {
                            method: 'get',
                            preserveState: false,
                            preserveScroll: false,
                            only: ['lobby', 'players']
                        });
                    }
                } catch (error) {
                    console.error('Game initialization error:', error);
                }
            } else {
                setGameInitialized(true);
            }
        };

        if (!gameInitialized) {
            initializeGame();
        }
    }, [lobby.id, is_creator, gameInitialized]);

    return (
        <div>
            <h1>Game View</h1>
            <h2>Players in the Game:</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        <strong>{player.name}</strong> - Status: {player.status}
                    </li>
                ))}
            </ul>
            {is_creator && <p>You are the game creator</p>}
        </div>
    );
};

export default Game;