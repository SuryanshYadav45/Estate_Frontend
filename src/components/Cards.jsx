import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { BiSolidBath } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const Cards = ({ data }) => {
const navigate=useNavigate();
  const checkout= async()=>
  {
    try {
      const response = await fetch('https://backendestate.onrender.com/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property: [
            {
              name:"product1",
              description: 'Description for Product 1',
              price: '74653',
              quantity: 2,
            },]
           }),
      });

      if (response.ok) {
        const session = await response.json();
        // Redirect the user to the checkout session URL
        window.location.href = session.url;
      } else {
        console.error('Error initiating payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
 

  return (
    <div onClick={()=>navigate(`/property/${data._id}`)} className="w-[250px] m-2 h-[350px] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden cursor-pointer">

      <img className="rounded-t-lg h-[45%] bg-cover w-full hover:scale-[1.1] transition-all duration-500" src={data.imageurls[0]} alt="" />

      <div className="p-2 my-1">
        <h6 className='text-[#2b5f57]  font-semibold text-[16px] capitalize'>{data.propname}</h6>
        <p className="my-1 text-[12px] text-gray-700 capitalize flex items-center"> <FaLocationDot color='green' /> {data.address}</p>
        <p className="text-gray-700 text-[13px] my-1  line-clamp-3 text-justify" >{data.desc}</p>
        <p className='font-bold text-[14px] text-[#1e5e1e] mt-2'>₹{data?.price?.toLocaleString("en-IN")}{data.type=="rent"?"/Month":""}</p>
        <div className='flex  justify-between mt-1'>
          <div className='flex'>
            <span className='flex items-center text-[13px] me-2'>{data.beds} <IoBed className='mx-1' size={20} color='#2b5f57' /></span>
            <span className='flex items-center text-[13px] ms-2'>{data.bathrooms} <BiSolidBath className='mx-1' size={20} color='#2b5f57' /></span>
          </div>

          {/* {data.type === "rent" ? <button onClick={checkout} className='w-[80px] h-[35px] rounded-md bg-[#398b7f] text-white'>Rent</button>
            : <button onClick={checkout} className='w-[80px] h-[35px] rounded-md bg-[#398b7f] text-white' >Buy</button>} */}
        </div>
      </div>
    </div>


  )
}

export default Cards