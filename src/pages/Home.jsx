import React, { useEffect, useState } from 'react'
import CarouselComponent from '../components/CarouselComponent'

const Home = () => {
  const [data, setdata] = useState([])
  const [rent, setrent] = useState([])
  const [buy, setbuy] = useState([])
  const [Electronics, setElectronics] = useState([])
  const [Fashion, setFashion] = useState([])
  const [Beauty, setBeauty] = useState([])
  const [Health, setHealth] = useState([])
  const [Books, setBooks] = useState([])
  const [Toy, setToy] = useState([])
  useEffect(() => {
    const fetchdata = async () => {
      const respone = await fetch('https://backendestate.onrender.com/listing/getlisting')
      const data = await respone.json();
      const rentListings = data.filter((item) => item.type === 'rent');
      const buyListings = data.filter((item) => item.type === 'sell');

      setrent(rentListings);
      setbuy(buyListings);
      setdata(data);
    }

    const product=async()=>{
      const response= await fetch('https://backendestate.onrender.com/listing/getproductlisting')
      const data =await response.json();
      const Electronics=data.filter((item)=>item.category==="Electronics")
      const Fashion=data.filter((item)=>item.category==="Fashion")
      const Beauty=data.filter((item)=>item.category==="Beauty & Personal Care")
      const Health=data.filter((item)=>item.category==="Health & Wellness")
      const Books=data.filter((item)=>item.category==="Books")
      const Toy=data.filter((item)=>item.category==="Toys & Games")
      console.log(Electronics )
      setElectronics(Electronics)
      setBeauty(Beauty)
      setBooks(Books)
      setFashion(Fashion)
      setHealth(Health)
      setToy(Toy)
    }
    product();
    fetchdata();
  }, [])

  
  return (
    <div className="relative bg-[rgba(72,71,71,0.1)]">
      <div
        className="bg-cover bg-center h-[400px]  relative "
        style={{
          backgroundImage: 'url("https://propertymarkets.news/wp-content/uploads/Fabric_1300x813.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className='max-w-[1150px] relative m-auto mobxl:flex flex-col justify-center'>
          <h3 className="font-extrabold text-[21px] text-white capitalize z-10 px-4 pt-[35%] mobxl:pt-0 mobxl:mt-[100px] mobxl:text-[30px] ">
          Discover the Start of Something Great:<br /> <span className='text-[#a2e3e3] uppercase'> Your One-Stop Destination for All Your E-commerce Needs! </span>
          </h3>
          <button className='z-10 bg-white mx-4 mt-5 w-[100px] rounded h-10'> Explore</button>
        </div>
      </div>
      <div className="max-w-[1150px] mx-auto">
          <div className='py-7'>
            <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Electronics</h4>
            <CarouselComponent data={Electronics} property={false} />
          </div>
           <div className='py-7'>
            <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Fashion</h4>
            <CarouselComponent data={Fashion} property={false} />
          </div>
         
          <div className='py-7'>
            <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Beauty & Personal Care</h4>
            <CarouselComponent data={Beauty} property={false} />
          </div>
           
          <div className='py-7'>
            <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Health & Wellness</h4>
            <CarouselComponent data={Health}  property={false} />
          </div>
          
          <div className='py-7'>
            <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Books</h4>
            <CarouselComponent data={Books}  property={false} />
          </div>
          

        <div className='py-7'>
          <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Rent Real Estate Property</h4>
          <CarouselComponent data={rent}  property={true} />
        </div>

        <div className='py-10'>
          <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Buy Real Estate Property</h4>
          <CarouselComponent data={buy}  property={true} />
        </div> 

      </div>
      

    </div>
  )
}

export default Home