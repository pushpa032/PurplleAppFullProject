import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login({ onClose }) {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!mobile) {
      alert("Please enter your mobile number");
      return;
    }

    try {
      const res = await fetch(`https://purplleappbackend.onrender.com/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/otp", { state: { mobile } });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="login">
      <div className="login-main-page">
        <button type="button" className="login-close" onClick={onClose}>
          <i className="fa-solid fa-circle-xmark"></i>
        </button>

        <div className="offer-box">
          <span>FLAT</span>
          <strong>₹100</strong>
          <span>OFF</span>
          <p>on orders above ₹999</p>
          <div className="code">
            USE CODE: <b>APPFIRST</b>
          </div>
        </div>

        <h4>Login or Signup</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a 10-digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
          />

          <div>
            <input type="checkbox" required />
            <p className="allow">
              Allow shiprocket to fetch address based on past orders.
            </p>
          </div>

          <button type="submit" className="active-button">
            CONTINUE
          </button>

          <p className="signup-link">
            New User?
            <span onClick={() => navigate ("/userRegistration")}>
              Create Account
            </span>
          </p>
        </form>

        <div className="info">
          By creating an account or logging in, you agree to Purplle's Terms of
          Use, Privacy Policy and Shiprocket's Terms of Use, Privacy Policy and
          consent to the collection and use of your personal information.
          <a href="#"> Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}

export default Login;