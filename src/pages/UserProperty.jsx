import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserListing from '../components/UserListing'
import 'react-toastify/dist/ReactToastify.css';


  


const UserProperty = () => {
    const [property, setproperty] = useState([])
    const [product, setProduct]=useState([])
    const { currentuser, loading } = useSelector((state) => state.user)
    const decoded = currentuser ? jwtDecode(currentuser.token) : null
    const { id } = decoded || {};

    useEffect(()=>{

        const fetchdata=async()=>{
            const res= await fetch(`https://backendestate.onrender.com/listing/userlisting/${id}`);
            const data= await res.json();
            if(data==="no listing found")
            {
                
            }
            else{
            setproperty(data);}

            const response= await fetch(`https://backendestate.onrender.com/listing/userproduct/${id}`);
            const prod= await response.json()
            // console.log(prod)
            setProduct(prod)
        }
        fetchdata();

    },[])

  return (
    <div className='w-full min-h-[70vh]'>
        
        {
            property.length !== 0 || product.length !== 0 ? (
                [...property, ...product].map((item) => (
                    <UserListing button={true} key={item._id} data={item} />
                ))
            ):(
                <h1>You haven't listed any property yet</h1>
            )
        }
    </div>
  )
}

export default UserProperty