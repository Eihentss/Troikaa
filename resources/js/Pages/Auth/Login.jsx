import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import React, { useState } from 'react';

export default function CardGameLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        setProcessing(false);

        if (Object.keys(newErrors).length === 0) {
            alert('Login submitted!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Card-like background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20px] left-[-50px] transform rotate-45 w-96 h-96 bg-red-100 opacity-30 rounded-3xl"></div>
                <div className="absolute bottom-[-20px] right-[-50px] transform -rotate-45 w-96 h-96 bg-black opacity-10 rounded-3xl"></div>
            </div>

            <div className="w-full max-w-md z-10">
                <div className="bg-white shadow-2xl rounded-2xl border-2 border-gray-200 overflow-hidden relative">
                   
                    {/* Login Content */}
                    <div className="p-8 text-center relative z-10">
                        <h2 className="text-4xl font-extrabold text-black mb-6">
                            Welcome Back
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-4 py-3 border-2 border-black rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                    className="w-full px-4 py-3 border-2 border-black rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.password && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                    />
                                    <label 
                                        htmlFor="remember-me" 
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div>
                                    <a 
                                        href="/forgot-password" 
                                        className="text-sm text-gray-600 hover:text-black"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-black text-white font-bold rounded-lg 
                                    hover:bg-gray-800 transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                {processing ? 'Logging in...' : 'Draw Your Hand'}
                            </button>

                            <div className="text-center mt-4">
                                <a 
                                    href="/register" 
                                    className="text-sm text-gray-600 hover:text-black transition-colors"
                                >
                                    Need an account? Join the Game
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}