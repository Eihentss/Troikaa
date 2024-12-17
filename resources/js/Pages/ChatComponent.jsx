import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const ChatComponent = ({ lobby, auth }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Configure Laravel Echo
    useEffect(() => {
        window.Pusher = Pusher;
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true
        });

        // Subscribe to lobby chat channel
        window.Echo.channel(`lobby-chat-${lobby.id}`)
            .listen('ChatMessageSent', (e) => {
                setMessages(prevMessages => [...prevMessages, e]);
            });

        // Fetch chat history
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`/api/lobbies/${lobby.id}/chat-history`);
                setMessages(response.data.reverse());
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();

        // Cleanup on component unmount
        return () => {
            window.Echo.leave(`lobby-chat-${lobby.id}`);
        };
    }, [lobby.id]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            // Pievienojiet autorizācijas žetonu
            await axios.post(`/api/lobbies/${lobby.id}/chat`, { message: newMessage }, {});
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error);
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 h-[300px] flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-3 pr-2">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.user.id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-[70%] px-4 py-2 rounded-xl ${
                                msg.user.id === auth.user.id 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            <div className="text-sm font-semibold mb-1">
                                {msg.user.name}
                            </div>
                            <div>{msg.message}</div>
                            <div className="text-xs text-opacity-70 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;