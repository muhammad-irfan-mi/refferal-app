import React from 'react';
import img from '../assets/media/logo.jpg';

function WithdrawHistoryModal({ closeModal }) {
  return (
    <div className='modal-main rounded-3 p-4'>
      <div className='profile-modal withdraw-modal'>
        <div className='profile-modal-top d-flex justify-content-between align-items-center pb-2 mb-3'>
          <h3 className='m-0'>Withdraw Request</h3>
          <i className='btn-close' onClick={closeModal}></i>
        </div>

        <div className='withdraw-info text-center'>
          {/* Centered User Info */}
          <div className='user-details mb-3'>
            <div className='user-profile mx-auto mb-3'>
              <img
                src={img}
                alt='Loading error'
                className='profile-pic rounded-circle border'
                style={{
                  width: '90px',
                  height: '90px',
                  border: '2px solid',
                  background: 'linear-gradient(45deg, darkgray, gray)',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className='user-info'>
              <h5 className='m-0'>ABC XYZ</h5>
              <p className='mb-1 text-muted'>Email: example@gmail.com</p>
              <p className='mb-0 text-muted'>Requested 2 hours ago</p>
            </div>
          </div>

          {/* Withdraw Details */}
          <div className='withdraw-details border-top pt-3 text-center'>
            <div className='detail-item mb-2'>
              <strong>Amount:</strong> $100
            </div>
            <div className='detail-item mb-2'>
              <strong>Withdraw Method:</strong> Jazzcash
            </div>
            <div className='detail-item mb-2'>
              <strong>Transaction ID:</strong> +92 3090000000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawHistoryModal;
