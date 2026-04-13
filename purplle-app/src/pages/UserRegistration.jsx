import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserRegistration.css";

function UserRegistration() {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("https://purplleappbackend.onrender.com/registerUser", {
        name,
        mobile,
        email,
        password
      });

      if (res.data.success) {
        alert("User Registered Successfully");
        navigate("/login");
      }
      else {
        alert(res.data.message || "User already exists");
        navigate("/login");
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Error registering user");
    }
  };

  return (
    <div className="register-page-container">

      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

      </form>

    </div>
  );
}

export default UserRegistration;