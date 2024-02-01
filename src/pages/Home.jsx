import React, { useEffect, useState } from 'react'
import CarouselComponent from '../components/CarouselComponent'

const Home = () => {
  const [data, setdata] = useState([])
  const [rent, setrent] = useState([])
  const [buy, setbuy] = useState([])
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
    fetchdata();
  }, [])

  console.log(rent);
  console.log(buy);
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
          <h3 className="font-extrabold text-[25px] text-white capitalize z-10 px-4 pt-[35%] mobxl:pt-0 mobxl:mt-[100px] mobxl:text-[40px] ">
            Beginning of something <br /> <span className='text-[#a2e3e3] uppercase'>new</span>  starts with Owning a <br /> <span className='text-[#a2e3e3] uppercase'>house </span>
          </h3>
          <button className='z-10 bg-white mx-4 mt-5 w-[100px] rounded h-10'> Explore</button>
        </div>
      </div>
      <div className="max-w-[1150px] mx-auto">
        <div className='py-7'>
          <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Rent Property</h4>
          <CarouselComponent data={rent} />
        </div>

        <div className='py-10'>
          <h4 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Buy Property</h4>
          <CarouselComponent data={buy} />
        </div>

      </div>

    </div>
  )
}

export default Home