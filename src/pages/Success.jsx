import React from 'react'
import success from "../assets/orderSuccess.gif"
import { useNavigate } from 'react-router-dom'
const Success = () => {
  const navigate=useNavigate();
  return (
    <div className='w-full h-[calc(100vh-72px)] flex justify-center '>
        <div className='mt-[100px]'>
        <img src={success} className='w-[250px]' alt="" />
        <p className='text-center text-[30px] font-extrabold text-green-800'>Order Successful</p>
        <button className='w-full mt-10 h-[45px] rounded-md bg-green-700 text-white' onClick={()=>navigate("/")}>Explore More Property</button>
        </div>
    </div>
  )
}

export default Success