import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/ManageUsers.css";
import { useNavigate } from "react-router-dom";

function ManageUsers(){

    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const getUser=()=>{
        axios.get("https://purplleapp-1.onrender.com/users")
        .then(res => {
            setUser(res.data);
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://purplleapp-1.onrender.com/users/${id}`)
            .then(() => {
                alert("User deleted");
                getUser();
            }
        )
    };

return (
    <div className="ManageUsers-container">
        <h2> Manage Users</h2>

        <table className="users-table" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((user) => (
                    <tr key = {user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.mobile}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                            <button className="edit-user-button" onClick={() => navigate(`/admin/editUser/${user._id}`)}>
                                Edit
                            </button>

                            <button className="delete-user-button" onClick={() => handleDelete(user._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
);

}

export default ManageUsers;