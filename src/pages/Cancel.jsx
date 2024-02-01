import React from 'react'
import cancel from "../assets/cancel.gif"
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
  const navigate=useNavigate();
  return (
    <div className='w-full h-[calc(100vh-72px)] flex justify-center '>
        <div className='mt-[100px] flex flex-col items-center'>
        <img src={cancel} className='w-[180px]' alt="" />
        <p className='text-center text-[30px] font-extrabold text-red-600'>Error! Occured </p>
        <button className='w-full mt-10 h-[45px] rounded-md bg-red-600 text-white' onClick={()=>navigate("/")}> Home</button>
        </div>
    </div>
  )
}

export default Cancel