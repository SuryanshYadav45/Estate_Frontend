import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { jwtDecode } from "jwt-decode";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useParams } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { FaBath } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { FaSquareParking } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Property = () => {
  const { currentuser } = useSelector((state) => state.user)
  const decoded = currentuser ? jwtDecode(currentuser.token) : null
  const { id } = decoded || {};
  const [property, setproperty] = useState([])
  const { propid } = useParams();
  
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`https://backendestate.onrender.com/listing/getUserListing/${propid}`)
      const data = await response.json();
      setproperty(data);
    }
    fetchdata();
  }, [])

  // console.log(property);
  const checkout = async () => {

    if(!id)
    {
      toast.error('Login First', { position: toast.POSITION.TOP_CENTER });
      return;
    }


    try {
      const response = await fetch('https://backendestate.onrender.com/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property: [
            {
              name: property.propname,
              price: property.price,
              quantity: 1,
              image: property.imageurls
            },],
          userId:id,
          propertyId: property._id
        }),

      });
      if (response.ok) {
        const session = await response.json();
        window.location = session;
        // Redirect the user to the checkout session URL
      } else {
        console.error('Error initiating payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  return (
    <div className='w-full'>
      <div className='flex flex-col max-w-[1300px]  m-auto med:flex-row '>
        <div className='w-[100%] p-2 med:w-[55%]'>
          <Swiper

            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-[100%] h-[300px] tabl:h-[500px]"
          >
            {
              property?.imageurls?.map((url, index) => (
                <SwiperSlide key={index}><img className='w-[100%] h-[100%] bg-contain' src={url} alt="" /></SwiperSlide>
              ))
            }

          </Swiper>
        </div>
        <div className='w-[100%] p-2 med:w-[45%]'>
          <h1 className='text-[#4f998e] font-bold text-[25px] mobxl:text-[30px] capitalize py-2' >{property.propname}</h1>
          <p className='text-[15px] flex items-center'><FaLocationDot color='green' />{property.address}</p>
          <p className='text-justify text-[16px] py-2'>{property.desc}</p>
          <div className='flex my-2'>
            <span className='flex items-center me-3 text-[16px] mobxl:text-[19px]'> <IoBedSharp className='me-1' color='#4f998e' size={22} />{property.beds}Beds</span>
            <span className='flex items-center me-3 text-[16px] mobxl:text-[19px]'><FaBath className='me-1' color='#4f998e' size={22} />{property.bathrooms}Baths</span>
            <span className='flex items-center me-3 text-[16px] mobxl:text-[19px]'><MdChair className='me-1' color='#4f998e' size={22} />{property.furnished ? "Furnished" : "Not Furnished"}</span>
            <span className='flex items-center me-3 text-[16px] mobxl:text-[19px]'><FaSquareParking className='me-1' color='#4f998e' size={22} />{property.parking ? "Parking" : "No Parking"}</span>

          </div>


          <p className='capitalize text-[20px] my-4 font-semibold text-[#3d877c] '>type: <span className='font-bold text-[#403d3d]'>{property.type}</span></p>
          <p className='capitalize text-[20px] font-semibold text-[#3d877c]'>price: <span className='font-bold text-[#403d3d]'>₹{property?.price?.toLocaleString("en-IN")}</span> </p>

          {
            property.type === "rent" ? <button className='w-[140px] h-[50px] my-5 rounded-md bg-[#398b7f] text-white' onClick={checkout}>Rent</button>
              : <button className='w-[140px] h-[50px] rounded-md bg-[#398b7f] my-5 text-white' onClick={checkout}>Buy</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Property  