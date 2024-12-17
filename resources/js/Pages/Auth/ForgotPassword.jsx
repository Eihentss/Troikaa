import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

import React, { useState } from 'react';

export default function ForgotPassword({ status }) {
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Basic email validation
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        setProcessing(false);

        if (Object.keys(newErrors).length === 0) {
            alert('Password reset link sent!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Card-like background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-100px] left-[-50px] transform rotate-45 w-96 h-96 bg-red-100 opacity-30 rounded-3xl"></div>
                <div className="absolute bottom-[-100px] right-[-50px] transform -rotate-45 w-96 h-96 bg-black opacity-10 rounded-3xl"></div>
            </div>

            <div className="w-full max-w-md z-10">
                <div className="bg-white shadow-2xl rounded-2xl border-2 border-gray-200 overflow-hidden relative">
                
                    {/* Forgot Password Content */}
                    <div className="p-8 text-center relative z-10">
                        <h2 className="text-4xl font-extrabold text-black mb-6">
                            Reset Your Hand
                        </h2>

                        <div className="mb-4 text-sm text-gray-700 text-left">
                            Forgot your password? No problem. 
                            Enter your email, and we'll deal you a new password reset link.
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 text-left">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email Address"
                                    required
                                    className="w-full px-4 py-3 border-2 border-black rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1 text-left">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-black text-white font-bold rounded-lg 
                                    hover:bg-gray-800 transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                {processing ? 'Shuffling...' : 'Deal Reset Link'}
                            </button>

                            <div className="text-center mt-4">
                                <a 
                                    href="/login" 
                                    className="text-sm text-gray-600 hover:text-black transition-colors"
                                >
                                    Remember your password? Back to Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}