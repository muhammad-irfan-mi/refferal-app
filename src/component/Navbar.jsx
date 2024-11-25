import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHome, IoLogOut } from "react-icons/io5";
import { FaBook, FaWallet, FaTasks } from 'react-icons/fa';
import { GoPersonFill } from "react-icons/go";
import logo from '../assets/media/reffaralmoney.png';
import '../assets/style/Logout.css'

function Navbar() {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        console.log("Hello fron logout")
        localStorage.removeItem('authToken');
        localStorage.removeItem('hasRefreshed');
        window.location.href = '/';
    };

    return (
        <>
            <nav>
                <div>
                    <img src={logo} alt="" />
                </div>
                <ul>
                    <li>
                        <Link to='/home'><IoHome size={32} /></Link>
                        <p className='navbar-icon-text'>Home</p>
                    </li>
                    <li>
                        <Link to='/ledger'><FaBook size={29} /></Link>
                        <p className='navbar-icon-text'>Ledger</p>
                    </li>
                    <li>
                        <Link to='/wallet'><FaWallet size={31} /></Link>
                        <p className='navbar-icon-text'>Wallet</p>
                    </li>
                    <li>
                        <Link to='/task'><FaTasks size={34} /></Link>
                        <p className='navbar-icon-text'>Task</p>
                    </li>
                    <li>
                        <Link to='/profile'><GoPersonFill size={37} /></Link>
                        <p className='navbar-icon-text'>Profile</p>
                    </li>
                    <li>
                        <span onClick={() => setShowModal(true)} style={{ cursor: 'pointer', color:'white'}}>
                            <IoLogOut size={37} />
                        </span>
                        <p className='navbar-icon-text'>Log Out</p>
                    </li>
                </ul>
            </nav>

            {/* Modal */}
            {showModal && (
                <div className="logout-modal-overlay">
                    <div className="logout-modal">
                        <p>Are you sure you want to log out?</p>
                        <div className="logout-modal-buttons">
                            <button onClick={handleLogout}>OK</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
