import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, LogInIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem("user");
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginData);
            
            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            // Redirect to dashboard
            navigate("/dashboard");
            
        } catch (err) {
            // Handle different error responses
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.message || 'Login failed');
            } else if (err.request) {
                // The request was made but no response was received
                setError('Network error. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen self-center justify-self-center flex flex-col justify-center py-12">
            <div className="w-full mx-auto px-4 sm:px-6">
                <div className="text-center mb-6">
                    <div className="h-12 w-12 rounded-lg bg-blue-600 inline-flex items-center justify-center mb-4">
                        <LogInIcon className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                    <p className="text-gray-400 mt-2">Sign in to continue working towards your goals</p>
                </div>

                <div className="bg-[#1d1d1d] w-xl rounded-xl shadow-lg p-6 sm:p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-300 flex items-start">
                            <X className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-medium">Login failed</h3>
                                <p className="text-sm">{error}</p>
                            </div>
                            <button 
                                onClick={() => setError(null)} 
                                className="ml-2 text-red-400 hover:text-red-300"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}

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

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center gap-2 ${
                                    isLoading ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                                } text-white py-3 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
                            >
                                {isLoading ? (
                                    'Logging in...'
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
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

export default LoginPage;