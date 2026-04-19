import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

function UserProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    if (!user) return <h2>Please login</h2>;


    return (
        <div className="profile-container">
            <div className="profile-card">

                <h2>User Profile</h2>

                <p><b>Name:</b> {user.name}</p>
                <p><b>Mobile:</b> {user.mobile}</p>
                <p><b>Email:</b> {user.email}</p>

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
        </div>
    );

}

export default UserProfile;