import { useState } from "react";
import axios from "axios";
import { BACK_URL } from '../../../ENV'
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      console.log("reset password using otp")
      console.log({ email, otp, newPassword })
      const response = await axios.post(`${BACK_URL}/api/reset`, {
        email,
        otp,
        newPassword,
      });
      // if (response.status === 200) {
        console.log("response is", response.data)
        setMessage(response.data.message);
      //   navigate('/')
      // }

    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center " style={{ minHeight: "100vh", alignItems: "center" }}>
      <div className="w-25">
        <h2 className="text-4xl text-white">Reset Password</h2>
        <input
          type="email"
          className='py-3 my-3 px-2 w-full bg-black w-100 border border-solid text-light'

          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="text"
          className='py-3 my-3 px-2 w-full bg-black w-100 border border-solid text-light'

          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <input
          type="password"
          className='py-3 my-3 px-2 w-full bg-black w-100 border border-solid text-light'

          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword 
