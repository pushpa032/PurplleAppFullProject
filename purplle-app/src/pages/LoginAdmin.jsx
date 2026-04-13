import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css"; 

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Admin_email = "admin@gmail.com";
  const Admin_password = "12345";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === Admin_email && password === Admin_password) {
      alert("Admin Login Successfully");
      navigate("/admin/adminDashboard");  
    } else {
      alert("Admin not found");
    }
  };

  return (
    <div className="admin-login">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginAdmin;