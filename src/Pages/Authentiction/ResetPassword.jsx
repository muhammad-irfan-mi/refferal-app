import { useState } from "react";
import axios from "axios";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      console.log("reset password using otp")
      console.log({email,otp,newPassword})
      const response = await axios.post(`http://localhost:3001/api/reset`, {
        email,
        otp,
        newPassword,
      });
      console.log("response is",response.data)
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-[25rem] mx-auto gap-6">
      <h2 className="text-4xl text-white">Reset Password</h2>
      <input
        type="email"
        className='py-4 w-full bg-black px-9 rounded-md border border-solid'     

        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="text"
        className='py-4 w-full bg-black px-9 rounded-md border border-solid'  

        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <input
        type="password"
        className='py-4 w-full bg-black px-9 rounded-md border border-solid' 

        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default  ResetPassword 
