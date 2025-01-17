import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import authSlice from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(authSlice.actions.logout())
        navigate('/login')
    }
    return (
        <header className="bg-gray-800 text-gray-100 px-6 py-8 flex justify-between items-center shadow-md">
            <div className="text-3xl font-semibold flex items-center">
                BlackRose
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

