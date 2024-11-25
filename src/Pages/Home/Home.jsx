// Home.jsx
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style/home.css';
import reward from '../../assets/media/reward.jpg'
import friendReward from '../../assets/media/friend-reward.jpg'
import easyPaisa from '../../assets/media/easypaisa.jpg'
import earn from '../../assets/media/earn.jpg'
import { GlobalContext } from '../../context/Global';
import { useEffect } from 'react';

const Home = () => {

  const globalData = useContext(GlobalContext)
  const userPoint = globalData.global.point.point;
  const refNumber = globalData.refCount
  const fname = globalData.global.user.fname
  const lname = globalData.global.user.lname
  const userBalance = userPoint / 10;
  console.log(userBalance)

  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");
    console.log(hasRefreshed, "hasRefreshedgdfdgkfhsvadjfkhgdsg")
    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload(); 
    }
  }, []);

  return (
    <div className="container-fluid bg-image">
      <div className="align-items-center home-top">
        <h1>Refer & Earn</h1>
        <h3>Hi, {fname} {lname}</h3>
        <h5 className="badge bg-primary p-3 m-2"><strong className='h5'>Amount in your wallet: ₹ ({userBalance})</strong></h5>
        <h5 className="badge bg-primary p-3 m-2"><strong className='h5'>Your Total Referral: ₹({refNumber}) </strong></h5>
      </div>
      <div >
        <div className="question-answer-box p-3 shadow-sm mb-4">
          <div className="d-flex align-items-start">
            <img src={easyPaisa} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>First Pay & Approve Your Account</h4>
              <h2 className='text-light'>Muzzafar Iqbal</h2>
              <h2 className='text-light'>0328 1520177</h2>
            </div>
          </div>
        </div>
        <div className="question-answer-box p-3 shadow-sm mb-4">
          <div className="d-flex align-items-start">
            <img src={reward} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>What Will I Get?</h4>
              <p>You will get ₹100 for every referral.</p>
            </div>
          </div>
        </div>
        <div className="question-answer-box p-3 shadow-sm mb-4">
          <div className="d-flex align-items-start">
            <img src={friendReward} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>What Will My Friend Get?</h4>
              <p>They will also get ₹100 for every referral.</p>
            </div>
          </div>
        </div>
        <div className="question-answer-box p-3 shadow-sm mb-4">
          <div className="d-flex align-items-start">
            <img src={earn} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>When Does My Friend Earn?</h4>
              <p>When they successfully refer someone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
