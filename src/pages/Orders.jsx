import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserListing from '../components/UserListing';

function Orders() {
    const [property, setproperty] = useState([])
    const { currentuser, loading } = useSelector((state) => state.user)
    const decoded = currentuser ? jwtDecode(currentuser.token) : null
    const { id } = decoded || {};

    useEffect(() => {

        const fetchdata = async () => {
            const res = await fetch(`https://backendestate.onrender.com/listing/purchased/${id}`);
            const data = await res.json();
            setproperty(data);
        }
        fetchdata();

    }, [])

    console.log(property);
    return (
        <div className='w-full '>
  <h1>Property Bought</h1>

            {
                property.length>0 ? (property.map((data) => {
                    return <UserListing button={false} key={data._id} data={data} />
                }
                )) :
                    (
                        <h2>you haven't purchased any property yet</h2>
                    )


            }
        </div>
    )
}

export default Orders