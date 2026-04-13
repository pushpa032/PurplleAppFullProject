import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditUser.css";

function EditUser(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        axios.get(`https://purplleappbackend.onrender.com/users/${id}`)
        .then(res => {
            setName(res.data.name);
            setMobile(res.data.mobile);
            setEmail(res.data.email);
            setPassword(res.data.password);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updateUser = {
            name,
            mobile,
            email,
            password
        };

        await axios.put(`https://purplleappbackend.onrender.com/users/${id}`, updateUser);

        alert("User Updated !");
        navigate("/admin/manageUsers");
    };

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>

            <form onSubmit={handleUpdate}>

                <input
                type="text"
                value={name}
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
                />

                <input
                type="number"
                value={mobile}
                placeholder="User Mobile"
                onChange={(e) => setMobile(e.target.value)}
                />

                <input
                type="email"
                value={email}
                placeholder="User Email"
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                type="password"
                value={password}
                placeholder="User Password"
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Update User
                </button>

            </form>
        </div>
    );
}

export default EditUser;