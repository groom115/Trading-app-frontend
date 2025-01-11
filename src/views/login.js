import React, { useState } from "react";

// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");



    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an account</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
                        >
                            {/* {showPassword ? (
                                <RemoveRedEyeOutlinedIcon className="w-4 h-4 text-black" />
                            ) : (
                                <VisibilityOffOutlinedIcon className="w-4 h-4 text-black" />
                            )} */}
                        </button>
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={{}}
                        className="text-blue-500 hover:underline"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}
