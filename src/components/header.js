import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import authSlice from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Header = ({ showBackButton = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(authSlice.actions.logout());
        navigate("/login");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <header className="bg-gray-800 text-gray-100 px-6 py-8 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                {showBackButton && (
                    <button
                        className="mr-4 p-0 text-3xl text-gray-100"
                        onClick={handleBack}
                    >
                        <ArrowBackIcon fontSize="inherit" />
                    </button>
                )}
                <div className="text-3xl font-semibold">
                    BlackRose
                </div>
            </div>
            <button
                className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-2 px-4 rounded transition"
                onClick={handleLogout}
            >
                <LogoutIcon className="mr-2" fontSize="small" />
                Logout
            </button>
        </header>
    );
};

export default Header;
