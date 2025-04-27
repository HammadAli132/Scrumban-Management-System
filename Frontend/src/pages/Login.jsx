import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, UserPlus, Upload, LogInIcon } from 'lucide-react';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({

        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Login data:', loginData);
    };

    return (
        <div className="min-h-screen self-center justify-self-center flex flex-col justify-center py-12">
            <div className="w-full mx-auto px-4 sm:px-6">
                <div className="text-center mb-6">
                    {/* Logo placeholder - replace with your actual logo */}
                    <div className="h-12 w-12 rounded-lg bg-blue-600 inline-flex items-center justify-center mb-4">
                        <LogInIcon className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                    <p className="text-gray-400 mt-2">Sign in to continue working towards your goals</p>
                </div>

                <div className="bg-[#1d1d1d] w-xl rounded-xl shadow-lg p-6 sm:p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">


                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={loginData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                    placeholder="Enter your username"
                                />
                            </div>



                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={loginData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Link to={"/dashboard"}>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Create account
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </Link>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SignupPage;