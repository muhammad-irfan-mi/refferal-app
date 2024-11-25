import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style/wallet.css'
import { CiSquarePlus } from "react-icons/ci";
import { GlobalContext } from '../../context/Global';
import axios from 'axios';
import {BACK_URL} from '../../../ENV'

const Wallet = () => {
  const globalData = useContext(GlobalContext);
  const userPoint = globalData.global.point.point;
  const userId = globalData.global.user._id
  const approved = globalData.global.user.isApproved
  console.log(userId)
  console.log(approved)
  const userBalance = userPoint / 10;
  const [image, setImage] = useState(null);
  const [balanceData] = useState({
    totalBalance: '',
    totalReferrals: '',
  });

  const [formData, setFormData] = useState({
    company: '',
    accountId: '',
    amount: '',
  });

  const handleImage = (e) => {
    const myImage = e.target.files[0];
    if (myImage) {
      setImage(myImage);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId);

    try {
      const response = await fetch(`${BACK_URL}/api/approve`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload the image');
      }

      const result = await response.json();
      alert(result.msg);
      setImage('')

    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Image Already Upload")
      setImage('')
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BACK_URL}/api/balance/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 201) {
        console.log(response)
        alert("Transaction successful")
        setFormData({
          company: '',
          accountId: '',
          amount: '',
        });
      }
    }
    catch (err) {
      console.log("Error during transaction is that ", err)
    }
  }
  return (
    <div className="container mt-md-5 p-5 wallet-box shadow rounded">
      <div className="row">
        {/* Left Side: Wallet Details */}
        <div className="col-lg-5 text-light">
          <h3 className="mb-4">Wallet</h3>
          <div className="mb-3">
            <h5>Total Balance</h5>
            <p className="fs-4">₹ ({userBalance})</p>
          </div>
          <div>
            <h5>Total Referrals</h5>
            <p className="fs-4">₹ ({globalData.refCount})</p>
          </div>
        </div>
        {/* Right Side: UPI Transfer */}
        {approved === "false" ?
          <div className="col-lg-7 text-light">
            <h3 className="mb-4">UPI Transfer</h3>
            <div className='upload-img'>
              {image ? <img src={URL.createObjectURL(image)} alt="Uploaded preview" /> : ""}
              <input type="file" accept="image/*" id="fileInput" onChange={handleImage} />
              {!image && <CiSquarePlus size={29} className='upload-icon' onClick={() => document.getElementById('fileInput').click()} />}
            </div>
            <button className='btn btn-dark mt-3' onClick={handleUpload}>Upload</button>
          </div> : userBalance >= 500 ? <div className="col-md-7 text-light">
            <div className='d-flex justify-content-between'>
              <h3 className="mb-4">Withdraw Balance</h3>
              {/* <button>WithDraw</button> */}
            </div>
            <div className='withdraw-balance'>
              <form action="" onSubmit={handleWithdraw}>
                <input type="text" name='company' value={formData.company} placeholder='Enter Company name' onChange={handleInputChange} />
                <input type="text" name='accountId' value={formData.accountId} placeholder='Enter Account Number' onChange={handleInputChange} />
                <input type="text" name='amount' value={formData.amount} placeholder='Enter Amount value' onChange={handleInputChange} />
                <button type='submit'>Withdraw</button>
              </form>
            </div>
          </div>: <div className='col-md-7 text-light'><h1>Note: </h1><p className="fs-4">Cannot withdraw till 500 Rs Balance</p></div>
        }

      </div>
    </div>
  );
};

export default Wallet;
