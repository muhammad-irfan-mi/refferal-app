import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/Global'

function ProfileModal(props) {
    const globalData = useContext(GlobalContext)
    const userID = globalData.global.user._id;

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    })
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const token = localStorage.getItem('authToken')
    const hanldeform = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3001/api/updateUser/${userID}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            })
            if(response.status === 200){
                alert("User update Successfully")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='profile-modal-main'>
            <div className="profile-modal">
                <div className="profile-modal-top d-flex justify-content-between align-items-center">
                    <h3>Update Profile</h3>
                    <i className='btn btn-close' onClick={props.closeModal}></i>
                </div>
                <form onSubmit={hanldeform}>
                    <input type="text" name='fname' value={formData.fname} placeholder="Enter first name" id="" onChange={handleInputChange} />
                    <input type="text" name='lname' value={formData.lname} placeholder="Enter last name" id="" onChange={handleInputChange} />
                    {/* <input type="email" name='email' value={formData.email} placeholder="Enter Email" id="" onChange={handleInputChange} /> */}
                    <input type="text" name='password' value={formData.password} placeholder="Enter Password" id="" onChange={handleInputChange} />
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal
