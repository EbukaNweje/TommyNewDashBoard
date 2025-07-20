import React from 'react'
import img from '../../assets/sideimage.png'
import logo from '../../assets/logo.png'

const Await = () => {
  return (
    <div className='w-[100vw] bg-[#f5f6fa] h-[100vh] flex items-center justify-between phone:w-full'>
        <div className='w-[50%] h-[100vh] flex flex-col justify-between items-center'>
            <div className='w-[100%] h-[100px] flex items-center justify-start ' style={{padding: '20px'}}>
                <img src={logo} alt="logo" style={{width: '200px', height: '100%', backgroundSize: 'contain'}}/>
            </div>
            <span className='w-[100%] h-[70%] flex flex-col items-center' style={{gap: '20px'}}>
                <h3 style={{fontSize: '35px', color: 'black'}}>Verification in Process....</h3>
                <p style={{fontSize: '20px', color: 'grey'}}>Your account is under review Kindly waiting for Admin Approval</p>

                </span>
        </div>
        <div
          className='w-[50vw] h-[100vh]'
          style={{ backgroundImage: `url(${img})`, backgroundSize:  'cover', backgroundPosition: 'center' }}  
        ></div>
    </div>
  )
}

export default Await
