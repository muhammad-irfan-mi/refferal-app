import React, { useContext, useEffect, useState } from 'react'
import '../../assets/style/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../assets/style/swiper.css'
import '../../assets/style/login.css'
import axios from 'axios';
import { GlobalContext } from '../../context/Global';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [offer, setOffer] = useState([])
    const global = useContext(GlobalContext)
    const navigate = useNavigate()
    console.log(global)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            // alert("Please fill in the form");
            toast.info("Please fill in the form")
            return;
        }

        console.log(formData);

        try {
            const response = await axios.post('http://localhost:3001/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const token = response.data.token;
                console.log("Data for Token is", response.data);
                localStorage.setItem('authToken', token);
                // global.setGlobal(response.data)
                if (response.data.User.isBlocked === "true") {
                    setInterval(()=>{
                        navigate('/block')
                    }, 2000)
                    toast.info("You Have Blocked Temporary")
                }
                else {
                    setInterval(()=>{
                        navigate('/home');
                    },2000)
                    toast.success("Login Successful")
                    
                }
            } else {
                toast.error('Invalid User!')
            }
        } catch (err) {
            console.error('Error during login:', err);
            toast.error('Invalid User!')

        }
    };


    useEffect(() => {
        const getOffer = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/offer')
                const result = response.data
                setOffer(result)

            }
            catch (err) {
                console.log("Offer error is that ", err)
            }
        }
        getOffer()
    }, [])
    console.log('Offer response is that ', offer)

    return (
        <>
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup-form-left">
                        <Swiper
                            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
                            effect="coverflow"
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                        >
                            {
                                offer.map((offer, i) => {
                                    return <SwiperSlide key={i}><img src={`http://localhost:3001${offer.imageUrl}`} alt="Loading Error" width={"100%"} /></SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                    <div className="signup-form-right login-right">
                        <h4>Login Here </h4>
                        <form onSubmit={handleSubmit}>
                            {/* <div className="login-name">
                                <input type="text" name="fullName" id="" value={formData.fullName} placeholder='Full Name (Optional)' onChange={handleInputChange} />
                            </div> */}
                            <div className="signup-email">
                                <input type="text" name="email" id="" value={formData.email} placeholder='Email' onChange={handleInputChange} />
                            </div>
                            <div className="signup-password">
                                <input type="text" name="password" id="" value={formData.password} placeholder='Enter Password' onChange={handleInputChange} />
                            </div>
                            <button type='submit'>Login</button>
                        </form>
                        <p>If you don't have an account &nbsp;&nbsp;&nbsp;<Link to='/signup'>Signup</Link></p>
                        <div className="flex gap-6 justify-center items-center">
                            <p><Link to='/forget'>Forget Password</Link></p>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Login;
