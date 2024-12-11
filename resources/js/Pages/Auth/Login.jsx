import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#35654d] via-[#2e5743] to-[#264a39] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />

            <div className="w-full max-w-md space-y-8 bg-gradient-to-br from-[#2e5743] to-[#264a39] shadow-xl rounded-xl p-8 border border-[#1e3a2d]">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-white">Sign in to your account</h1>
                    <p className="mt-2 text-sm text-gray-200">Log in to access your account</p>
                </div>

                {status && (
                    <div className="my-4 rounded-lg bg-[#35654d] p-3 text-sm font-medium text-white shadow">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" className="text-gray-200" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-[#1e3a2d] rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-white focus:border-white bg-[#264a39] text-gray-100"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                        />
                        <InputError message={errors.email} className="mt-2 text-gray-200" />
                    </div>

                    {/* Password Field */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-gray-200" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-[#1e3a2d] rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-white focus:border-white bg-[#264a39] text-gray-100"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-2 text-gray-200" />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-white border-[#1e3a2d] rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-200">
                                Remember me
                            </label>
                        </div>

                        {/* Forgot Password Link */}
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-gray-200 hover:text-white"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium text-green-800 
                                bg-white hover:bg-gray-200 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            disabled={processing}
                        >
                            {processing ? 'Signing In...' : 'Sign In'}
                        </PrimaryButton>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm text-gray-200">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-medium text-white hover:text-gray-200">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}
