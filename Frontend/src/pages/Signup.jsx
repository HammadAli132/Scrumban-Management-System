import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, UserPlus, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    email: '',
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
    setSignupData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        ...signupData
      });

      const data = response.data;
      if (response.status !== 201) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Registration successful
      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redirect to login page after successful registration
      }, 2000);
      
    } catch (err) {
      setError(err.response.data.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen self-center justify-self-center flex flex-col justify-center py-12">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-lg bg-blue-600 inline-flex items-center justify-center mb-4">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="text-gray-400 mt-2">Sign up to get started with your new workspace</p>
        </div>

        <div className="bg-[#1d1d1d] w-xl rounded-xl shadow-lg p-6 sm:p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-300 flex items-center">
              <div className="flex-1">
                <h3 className="font-medium">Registration successful!</h3>
                <p className="text-sm">You'll be redirected to login shortly.</p>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-300 flex items-start">
              <X className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium">Registration failed</h3>
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={signupData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={signupData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={signupData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="Enter your email"
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
                    minLength="8"
                    value={signupData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    placeholder="Create a password"
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
                <p className="mt-1.5 text-xs text-gray-400">Password must be at least 8 characters</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-2 ${
                  isLoading ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-3 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
              >
                {isLoading ? (
                  'Creating account...'
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;