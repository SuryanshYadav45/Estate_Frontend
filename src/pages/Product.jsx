import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { jwtDecode } from "jwt-decode";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarouselComponent from '../components/CarouselComponent'

const Property = () => {
  const { currentuser } = useSelector((state) => state.user)
  const [quantity,setQuantity]=useState(1)
  const decoded = currentuser ? jwtDecode(currentuser.token) : null
  const { id } = decoded || {};
  const [property, setproperty] = useState([])
  const [similar,setSimilar]=useState([]);
  const { prodid } = useParams();
  
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`https://backendestate.onrender.com/listing/getuserproductlisting/${prodid}`)
      const proddata = await response.json();
      setproperty(proddata);
      const getsimilarproduct=async()=>{
        const response=await fetch(`https://backendestate.onrender.com/listing/categoryproduct/${proddata.category}`)
        const data =await response.json();
        const similar= data.filter((item)=>item._id!=prodid)
        setSimilar(similar);
      }
      if(proddata){
      getsimilarproduct();
      }
    }

   
    fetchdata();
  }, prodid)

  console.log(quantity)
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
              name: property.prodname,
              price: property.price,
              quantity: quantity,
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
          <h1 className='text-[#4f998e] font-bold text-[25px] mobxl:text-[30px] capitalize py-2' >{property.prodname}</h1>
          <p className='text-justify text-[16px] py-2'>{property.description}</p>
          


          <p className='capitalize text-[20px] my-2 font-semibold text-[#3d877c] '>Category: <span className='font-bold text-[#403d3d]'>{property.category}</span></p>
          <p className='capitalize text-[20px] my-2 font-semibold text-[#3d877c]'>price: <span className='font-bold text-[#403d3d]'>₹{property?.price?.toLocaleString("en-IN")}</span> </p>
          <div className='mt-[-4px] p-0'>
            <span className='capitalize text-[20px] font-semibold text-[#3d877c]'>Quantity:</span>
            <input type="number" onChange={(e)=>setQuantity(e.target.value)} className='shadow-lg my-2 mx-1 rounded-md h-[45px] w-[120px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2'/>
          </div>
          
            <button className='w-[140px] h-[50px] rounded-md bg-[#398b7f] my-5 text-white' onClick={checkout}>Buy</button>
        
        </div>
      </div>

      <div className='max-w-[1300px]  m-auto med:flex-row my-5'>
        <h5 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Recommendation:</h5>
        <CarouselComponent data={similar} property={false} />
      </div>
    </div>
  )
}

export default Property  