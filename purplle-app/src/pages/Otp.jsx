import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Otp.css";

function Otp({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile || "";

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");


  const handleVerifyOtp = async () => {
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    try {
      const res = await fetch(`https://purplleappbackend.onrender.com/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Successful");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

;

  return (
    <div className="otp">
      <div className="otp-main">
        <button className="signup-close" onClick={onClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>

        <h3 className="otp-title">
          Please enter the OTP we have sent you on your email id
        </h3>

        <div className="otp-number">
          {mobile} 
        </div>

        <div className="otp-inputs">
          <input type="text" maxLength="1" value={otp1} onChange={(e) => setOtp1(e.target.value.replace(/[^0-9]/g, ""))} />
          <input type="text" maxLength="1" value={otp2} onChange={(e) => setOtp2(e.target.value.replace(/[^0-9]/g, ""))} />
          <input type="text" maxLength="1" value={otp3} onChange={(e) => setOtp3(e.target.value.replace(/[^0-9]/g, ""))} />
          <input type="text" maxLength="1" value={otp4} onChange={(e) => setOtp4(e.target.value.replace(/[^0-9]/g, ""))} />
          <input type="text" maxLength="1" value={otp5} onChange={(e) => setOtp5(e.target.value.replace(/[^0-9]/g, ""))} />
          <input type="text" maxLength="1" value={otp6} onChange={(e) => setOtp6(e.target.value.replace(/[^0-9]/g, ""))} />
        </div>


        <button
          className="verify-button"
          disabled={!(otp1 && otp2 && otp3 && otp4 && otp5 && otp6)}
          onClick={handleVerifyOtp}
        >
          VERIFY
        </button>
      </div>
    </div>
  );
}

export default Otp;