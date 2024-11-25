import React, { useContext, useEffect, useState } from 'react'
import '../../assets/style/ledger.css'

import WithdrawHistoryModal from '../../component/WithdrawHistoryModal';
import { GlobalContext } from '../../context/Global';
import axios from 'axios';
import {BACK_URL} from '../../../ENV'

function Ledger() {

    const [myRefferals, setMyRefferals] = useState([])
    const [myWidthDraws, setMyWidthDraws] = useState([])
    const [ledger, setLedger] = useState(true)
    const context = useContext(GlobalContext)
    console.log("Context ", context)

    const fetchReferrals = async () => {
        const token = localStorage.getItem('authToken');
        console.log("fetching data")
        const res = await axios.get(`${BACK_URL}/api/refs/${context.global.user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log("{ refferals: data }", res.data.data)
        context.setRefCount(res.data.count)
        setMyRefferals(res.data.data)
    }
    const fetchWithDrawReq = async () => {
        try {
            const res = await axios.get(`${BACK_URL}/api/balance/${context.global.user._id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const balanceData = Array.isArray(res.data) ? res.data : [res.data];

            setMyWidthDraws(balanceData);
        } catch (error) {
            setMyWidthDraws([]);
        }
    };

    console.log("refferals", myWidthDraws)
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        if (!modal) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }



    useEffect(() => {
        fetchReferrals()
        fetchWithDrawReq()
    }, [])


    return (
        <>
            <div className="container-fluid p-md-5 ledger ">
                <div className="d-flex justify-content-center flex-column flex-lg-row alig gap-4">
                    <div className="col-lg-6 col-12 history-box">
                        <div className="refrel-box p-2 text-center">
                            <h2>Successful Referral</h2>
                        </div>
                        <table className="">
                            <thead>
                                <tr className='table-head'>
                                    <th className='ledger-user-info'>Name</th>
                                    <th className='ledger-user-info'>Status</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRefferals.map((user, i) => (
                                    <tr className="refrel-data relative left-4" key={i}>

                                        <td className='ml-4 ledger-user-info'>{user.fname} {user.lname}</td>
                                        <td className='ml-4 ledger-user-info'>{user.isApproved == 'true' ? "Approved" : "Not Approved"}</td>
                                        <td className='ml-4'>{user?.email ? user.email.slice(0, 15) : "no email"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-lg-6 col-12 history-box">
                        <div className="refrel-box p-2 text-center">
                            <h2>Successful WithDraw</h2>
                        </div>
                        <table className="">
                            <thead>
                                <tr className='table-head'>
                                    <th className='ledger-user-info'>Company Name</th>
                                    <th className='ledger-user-info'>Account No</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myWidthDraws.length > 0? myWidthDraws.map((user, i) => (
                                    <tr className="refrel-data relative left-4" key={i}>

                                        <td className='ml-4 ledger-user-info'>{user.company}</td>
                                        <td className='ml-4 ledger-user-info'>{user.accountId}</td>
                                        <td className='ml-4 ledger-user-info'>{user.amount /10}</td>
                                        <td className='ml-4 ledger-user-info'>{user.isApproved == 'true' ? "Approved" : "Pending"}</td>
                                    </tr>
                                )) : ''}


                                {
                                    console.log(myWidthDraws.length, 'Hello AMan')
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
                {!modal ? '' : <WithdrawHistoryModal closeModal={handleModal} />}

            </div >
        </>
    )
}

export default Ledger