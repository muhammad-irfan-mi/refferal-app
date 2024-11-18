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
    <div className=" d-flex justify-content-center" style={{minHeight:"100vh", alignItems:"center"}}>
      <div className="w-25" style={{height:"50%", textAlign:"center"}}>
      <h2 className="text-4xl text-white">Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='py-3 w-100 my-4 bg-black px-2 rounded-md border border-solid text-light'  
        placeholder="Enter your email"
      /><br/>
      <Link to='/reset' className="reset-btn"><button onClick={handleForgotPassword}>Send OTP</button></Link>
      <Link to='/' className="reset-btn"><button>Login</button></Link>
      <p>{message}</p>
      </div>
    </div>
  );
};

export default ForgetPassword
