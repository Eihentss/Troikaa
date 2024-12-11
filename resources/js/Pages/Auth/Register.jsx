import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#35654d] via-[#2e5743] to-[#264a39] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Register" />
            <div className="w-full max-w-md space-y-8 bg-gradient-to-br from-[#2e5743] to-[#264a39] shadow-xl rounded-xl p-8 border border-[#1e3a2d]">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white">
                        Create your account
                    </h2>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-gray-200" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full px-3 py-2 border border-[#1e3a2d] rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-white focus:border-white bg-[#264a39] text-gray-100"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Enter your full name"
                        />
                        <InputError message={errors.name} className="mt-2 text-gray-200" />
                    </div>

                    {/* Email Field */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-200" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-[#1e3a2d] rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-white focus:border-white bg-[#264a39] text-gray-100"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
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
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-2 text-gray-200" />
                    </div>

                    {/* Password Confirmation Field */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-gray-200"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full px-3 py-2 border border-[#1e3a2d] rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-white focus:border-white bg-[#264a39] text-gray-100"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            placeholder="Confirm your password"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2 text-gray-200"
                        />
                    </div>

                    {/* Submit and Login Link */}
                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm font-medium text-gray-200 hover:text-white"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton
                            className="py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium text-green-800 
                                bg-white hover:bg-gray-200 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            disabled={processing}
                        >
                            {processing ? 'Registering...' : 'Register'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
