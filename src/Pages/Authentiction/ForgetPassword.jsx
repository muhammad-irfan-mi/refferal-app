import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BACK_URL} from '../../../ENV'

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      console.log({email})
      const response = await axios.get(`${BACK_URL}/api/reset/${email}`);
      console.log({res_foget:response.data})
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="w-[25rem] mx-auto flex justify-center items-center flex-col h-[100vh] gap-6">
      <h2 className="text-4xl text-white">Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='py-4 w-full bg-black px-9 rounded-md border border-solid'  
        placeholder="Enter your email"
      />
      <Link to='/reset'><button onClick={handleForgotPassword}>Send OTP</button></Link>
      <p>{message}</p>
    </div>
  );
};

export default ForgetPassword
