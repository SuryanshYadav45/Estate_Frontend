import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../components/Cards';

const Search = () => {
    const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [property, setproperty] = useState([]);

  useEffect(()=>
  {
    const fetchdata=async()=>
    {
        const response= await fetch(`https://backendestate.onrender.com/listing//categoryproduct/Electronics`)
        const data= await response.json();
        setproperty(data);
        console.log(data)
    }
  fetchdata();

  },[query])

  return (
    <div className='w-full  min-h-[calc(100vh-72px)] bg-[rgba(72,71,71,0.1)]  p-2'>
        <div className='max-w-[1150px] mx-auto'>
        <h1 className='font-bold ml-4 mobxl:text-[28px] text-[#1b5051] uppercase underline'>Electronics</h1>

        <div className='w-full h-full flex'>
        {
            property?.map((property)=>
            { return (
                <Cards data={property}/>
            )})
        }
        </div>
        </div>
    </div>
  )
}

export default Search
