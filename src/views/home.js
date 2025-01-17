import React from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-black min-h-screen text-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
                <h1 className="text-3xl font-light mb-8">Welcome to BlackRose</h1>
                <div className="flex gap-4">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-2 px-5 rounded transition"
                        onClick={() => navigate('/table')}
                    >
                        View Table
                    </button>
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-2 px-5 rounded transition"
                        onClick={() => alert("Navigating to Trading Data...")}
                    >
                        Trading Data
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Homepage;
