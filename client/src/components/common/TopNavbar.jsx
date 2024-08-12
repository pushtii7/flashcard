import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TopNavbar = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="p-2 flex justify-between border-b">
            <h1 className="text-3xl font-medium">Flashcard App</h1>
            {user ? (
                <Link to={"/dashboard"}>
                    <img
                        src={`http://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`}
                        alt="user profile"
                        loading="lazy"
                        className="w-10 h-10 rounded-full"
                    />
                </Link>
            ) : (
                <Link
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    to={"/login"}
                >
                    Login
                </Link>
            )}
        </div>
    );
};

export default TopNavbar;
