import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authSlice from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);
            const token = response.token
            localStorage.setItem('token', token);
            console.log(response)
            toast.success('Login successful!', {
                onClose: () => {
                    dispatch(dispatch(authSlice.actions.login(token)))
                    navigate('/')
                },
            });

        } catch (error) {
            toast.error(error.message || "Something went wrong, please try again.");
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-white">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-lg font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-lg font-medium text-gray-300">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 mt-8"
                        >
                            {showPassword ? (
                                <RemoveRedEyeOutlinedIcon className="w-4 h-4 text-black" />
                            ) : (
                                <VisibilityOffOutlinedIcon className="w-4 h-4 text-black" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-600 focus:outline-none"
                    >
                        Log In
                    </button>
                </form>
                <div className="text-sm text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-white hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
            <ToastContainer autoClose={4000} />
        </div>
    );
}
