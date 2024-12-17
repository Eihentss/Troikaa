import React from 'react';

export default function LearnRules() {
    return (
        // Apply background to the body and html to cover the entire screen
        <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-200 dark:from-gray-900 dark:to-gray-900 p-0">
            <div className="container mx-auto px-8 py-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white mb-10">
                    Learn the Rules of Shithead
                </h1>
                <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
                    Master the game of Shithead by following these simple steps. Let's get started!
                </p>

                <div className="space-y-10">
                    {/* Step 1: Game Setup */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">1</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Game Setup</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                        Players: <br></br> 
                        Ideal: 2–5 players. (More players work but can slow down the game.)<br></br>
                        Each player requires space for their cards:
                        <ul className="list-disc list-inside">
                            <li>Hand</li>
                            <li>Face-up</li>
                            <li>Face-down</li>
                        </ul>
                        <br></br>
                        Deck:
                        <ul className="list-disc list-inside">
                            <li>Use a standard 52-card deck.</li>
                            <li>Shuffle thoroughly.</li>
                            <li>
                                Optional: Add jokers for additional wild cards or custom rules.
                            </li>
                        </ul>
                        Seating:
                        <ul className="list-disc list-inside">
                            <li>Arrange players in a circle or around a table for ease of play.</li>
                            <li>Designate space in the center for the discard pile.</li>
                        </ul>
                        </p>
                    </div>

                    {/* Step 2: Dealing the cards */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-green-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">2</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Dealing the Cards</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Three Sets of Cards for Each Player:
                        </p>
                        <ul className="list-disc list-inside">
                            <li>
                                <b>Face-Down Cards:</b> Deal 3 cards face-down to each player. These remain hidden until played later.
                            </li>
                            <li>
                                <b>Face-Up Cards:</b> Deal 3 cards face-up to each player. Players place them on top of their face-down cards.
                            </li>
                            <li>
                                <b>Hand Cards:</b> Deal 3 cards into each player’s hand.
                            </li>
                        </ul>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            <b>Remaining Cards:</b>
                        </p>
                        <ul className="list-disc list-inside">
                            <li>
                                Place the rest of the deck in the center as a draw pile.
                            </li>
                        </ul>

                        </p>
                    </div>

                    {/* Step 3: Player's Preparation */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-purple-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">3</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Player's Preparation</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            After dealing, players can pick up and examine their hand cards.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            Players can swap cards between their hand and face-up cards to optimize their strategy.
                            For example:
                        </p>
                        <ul className="list-disc list-inside">
                            <li>Place high-value cards (e.g., Kings, Queens) in your hand.</li>
                            <li>Keep special cards (like 6s and 10s) accessible.</li>
                        </ul>

                        </p>
                    </div>

                    {/* Step 4: Determine Who Goes First */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md mb-8">
                        <div className="flex items-center mb-4">
                            <div className="bg-red-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">4</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Determine Who Goes First</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            Traditionally, the player with the lowest card in their hand starts.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            If you prefer, draw lots or use a random method.
                        </p>

                        </p>
                    </div>

                {/* Step 5: Gameplay Basics */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md mb-8 mt-8">
                        <div className="flex items-center mb-4">
                            <div className="bg-yellow-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">5</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Gameplay Basics</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            <b>Turn Order:</b>
                            <br /> Play proceeds clockwise.
                            <br /><br />
                            <b>Playing Cards:</b>
                            <br /> On their turn, a player must play one or more cards of the same rank.
                            <br /> The card(s) must be equal to or higher than the top card in the discard pile.
                            <br /><br />
                            <b>Special Rules for Specific Cards:</b>
                            <ul className="list-disc list-inside">
                                <li><b>2:</b> Resets the pile. The next player can play any card.</li>
                                <li><b>10:</b> Burns the pile. All cards in the pile are removed, and the same player goes again.</li>
                                <li><b>Jokers (if used):</b> Act as wild cards and can be played at any time.</li>
                            </ul>
                            <br />
                            <b>Drawing Cards:</b>
                            <br /> If a player cannot play, they must pick up the entire discard pile.
                            <br /> Players must always have at least 3 cards in hand (until the draw pile is empty). If a player has fewer than 3 cards, they draw from the deck to replenish their hand.
                        </p>
                    </div>
                </div>

                {/* Step 6: Transition from Hand to Face-Up Cards */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md mb-8 mt-8">
                        <div className="flex items-center mb-4">
                            <div className="bg-pink-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">6</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Transition from Hand to Face-Up Cards</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            After dealing, players can pick up and examine their hand cards.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            Players can swap cards between their hand and face-up cards to optimize their strategy.
                            For example:
                        </p>
                        <ul className="list-disc list-inside">
                            <li>Place high-value cards (e.g., Kings, Queens) in your hand.</li>
                            <li>Keep special cards (like 2s and 10s) accessible.</li>
                        </ul>

                        </p>
                    </div>

                    {/* Step 7: Ending the Game */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md mb-8 mt-8">
                        <div className="flex items-center mb-4">
                            <div className="bg-teal-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">7</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Ending the Game</h2>
                        </div>

                        <h3 className="text-xl text-gray-800 dark:text-gray-300 mt-8">Winning:</h3>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            The first player to get rid of all their cards <b>wins</b>.
                        </p>

                        <h3 className="text-xl text-gray-800 dark:text-gray-300 mt-8">Losing:</h3>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            The game continues until one player is left with cards.
                            This player is the <b>Shithead</b>.
                        </p>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            Optionally, the Shithead might face penalties (e.g., fetching the next round of drinks or dealing the next game).
                        </p>
                    </div>

                    {/* Step 8: Special Card Rules */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md mb-8 mt-8">
                        <div className="flex items-center mb-4">
                            <div className="bg-gray-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">8</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Special Card Rules</h2>
                        </div>
                        <h3 className="text-xl text-gray-800 dark:text-gray-300 mt-8">Special Cards:</h3>

                        <h4 className="text-lg text-gray-800 dark:text-gray-300 mt-4">10 (Burn the Pile):</h4>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            When a 10 is played, the entire discard pile is burned (removed from the game).
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            The player who played the 10 takes another turn immediately.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            This is a powerful move to reset the pile and avoid being stuck with unplayable cards.
                        </p>

                        <h4 className="text-lg text-gray-800 dark:text-gray-300 mt-8">6 (Reset the Pile):</h4>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                            When a 6 is played, the pile is reset. This means the next player can play any card (as if starting a new pile).
                        </p>
                    </div>

                <div className="mt-12 text-center flex justify-center space-x-4">
                    <a 
                        href="/" 
                        className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition duration-200"
                    >
                        Go Back to Playing
                    </a>
                    <a 
                        href="https://cardgames101.com/learn-to-play-the-card-game/shithead" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-200"
                    >
                        Learn the game with pictures
                    </a>
                    <a 
                        href="https://www.youtube.com/watch?v=JZ_Qd5KTy3k" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition duration-200"
                    >
                        Watch a video guide
                    </a>
                </div>
                    
            </div>
        </div>
    );
}
