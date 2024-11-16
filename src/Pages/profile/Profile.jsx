import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style/profile.css';
import img from '../../assets/media/profile.png';
import { FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { GlobalContext } from '../../context/Global';
import axios from 'axios';
import ProfileModal from '../../component/ProfileModal';
import {BACK_URL} from '../../../ENV'

const Profile = () => {
    const [modal, setModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const [userPoint, setUserPoint] = useState(null);
    const [userReferral, setUserReferral] = useState(null);
    const globalData = useContext(GlobalContext);
    const globalId = globalData.global.user._id
    console.log("Hey", globalId)
    const token = localStorage.getItem('authToken')
    console.log('token is that', token)
    console.log('UserId is ', globalId)

    useEffect(() => {
        const getId = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const response = await axios.get(`${BACK_URL}/api/getUser/${globalId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = response.data;
                console.log(result);
                setProfile(result.user);
                setUserPoint(result.point.point);
                setUserReferral(result.referral.referral);
            } catch (err) {
                console.log(err);
            }
        };
        getId();
    }, [globalId]);


    if (!profile) {
        return <div>Loading...</div>;
    }

    const handleProfileModal = () => {
        if (!modal) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }

    return (
        <div className="container mt-5">
            <div className=" justify-content-center">
                    <div className="profile-data">
                        {/* Profile Picture & Name */}
                        <div className="profile-img py-5 text-light" >
                            <img
                                src={img}
                                alt="Profile"
                            />
                            <h2>{profile.fname} {profile.lname}</h2>
                        </div>

                        {/* Profile Details */}
                        <div className="profile-info py-3 px-4">
                            {/* <div className='edit'>
                                <FaEdit size={29} className='mb-3' onClick={handleProfileModal} />
                            </div> */}
                            <h2 className="mb-3">Profile Details</h2>
                            <div className='p-0'>
                                <p><h5>Name: &nbsp;</h5>{profile.fname} {profile.lname}</p>
                                <p><h5>Email: &nbsp;</h5>{profile.email.slice(0, 25)}</p>
                                {profile.isApproved === "false" ? ("Account UnVerified") : (
                                    <p><h5>User Referral: &nbsp;</h5>{userReferral}</p>
                                )}

                                {profile.referral ? <p><h5>Join By: &nbsp;</h5>{profile.referral}</p> : ''}
                            </div>
                        </div>

                        
                    </div>
            </div>
            {/* {!modal ? '' : <ProfileModal closeModal={handleProfileModal} />} */}
        </div>
    );
};

export default Profile;
