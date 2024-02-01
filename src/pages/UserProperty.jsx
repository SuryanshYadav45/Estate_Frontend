import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserListing from '../components/UserListing'
import 'react-toastify/dist/ReactToastify.css';


  


const UserProperty = () => {
    const [property, setproperty] = useState([])
    const { currentuser, loading } = useSelector((state) => state.user)
    const decoded = currentuser ? jwtDecode(currentuser.token) : null
    const { id } = decoded || {};

    useEffect(()=>{

        const fetchdata=async()=>{
            const res= await fetch(`https://backendestate.onrender.com/listing/userlisting/${id}`);
            const data= await res.json();
            setproperty(data);
        }
        fetchdata();

    },[])

    console.log(property);
  return (
    <div className='w-full '>
       
        {
            property?(property?.map((data)=>
            {
                return <UserListing button={true} key={data._id} data={data} />
            }
            )):(
                <h1>You haven't listed any property yet</h1>
            )
        }
    </div>
  )
}

export default UserProperty