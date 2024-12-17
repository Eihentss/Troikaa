import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import React, { useState } from 'react';

export default function CardGameRegister() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
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
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        setProcessing(false);

        if (Object.keys(newErrors).length === 0) {
            alert('Registration submitted!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Card-like background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-50px] left-[-50px] transform rotate-45 w-96 h-96 bg-red-100 opacity-30 rounded-3xl"></div>
                <div className="absolute bottom-[-50px] right-[-50px] transform -rotate-45 w-96 h-96 bg-black opacity-10 rounded-3xl"></div>
            </div>

            <div className="w-full max-w-md z-10">
                <div className="bg-white shadow-2xl rounded-2xl border-2 border-gray-200 overflow-hidden relative p-8">
                    

                    {/* Registration Content */}
                    <div className="p-8 text-center relative z-10">
                        <h2 className="text-4xl font-extrabold text-black mb-6">
                            Join the Game
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    required
                                    className="w-full px-4 py-3 border-2 border-black rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.username && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

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

                            <div>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    required
                                    className="w-full px-4 py-3 border-2 border-black rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.password_confirmation}
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
                                {processing ? 'Registering...' : 'Deal Me In'}
                            </button>

                            <div className="text-center mt-4">
                                <a 
                                    href="/login" 
                                    className="text-sm text-gray-600 hover:text-black transition-colors"
                                >
                                    Already have an account? Log in
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}