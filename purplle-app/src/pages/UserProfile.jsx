import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    if (!user) return <h2>Please login</h2>;

    return (
        <div>
            <h2>User Profile</h2>

            <p>Name: {user.name}</p>
            <p>Mobile: {user.mobile}</p>
            <p>Email: {user.email}</p>

            <button
                onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                }}
            >
                Logout
            </button>


            <button onClick={() => navigate("/userOrders")}>
                My Orders
            </button>
        </div>
    );
}

export default UserProfile;