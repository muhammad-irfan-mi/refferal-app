import React from 'react'
import { Link } from 'react-router-dom';


import { IoHome } from "react-icons/io5";
import { FaBook } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import { GoPersonFill } from "react-icons/go";
import { FaTasks } from "react-icons/fa";



import logo from '../assets/media/logo.jpg'


function Navbar() {
    return (
        <>
            <nav>
                <div >
                    <img src={logo} alt="" />
                </div>
                <ul>
                    <li><Link to='/home'><IoHome size={32} /></Link>
                        <p className='navbar-icon-text'>Home</p>
                    </li>
                    <li><Link to='/ledger'><FaBook size={29} /></Link>
                        <p className='navbar-icon-text'>Ledger</p>
                    </li>
                    <li><Link to='/wallet'><FaWallet size={31} /></Link>
                        <p className='navbar-icon-text'>Wallet</p>
                    </li>
                    <li><Link to='/task'><FaTasks size={34} /></Link>
                        <p className='navbar-icon-text'>Task</p>
                    </li>
                    <li><Link to='/profile'><GoPersonFill size={37} /></Link>
                        <p className='navbar-icon-text'>Profile</p>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
