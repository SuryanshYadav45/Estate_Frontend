import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from "firebase/storage"
import { app } from "../firebase.js";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';


const UpdateListing = () => {
    const { listingid } = useParams();
    const [files, setfiles] = useState([]);
    const navigate=useNavigate();
    const { currentuser, loading } = useSelector((state) => state.user)
    const decoded = currentuser ? jwtDecode(currentuser.token) : null
    const { id } = decoded || {};
    const [formdata, setformdata] = useState({
        propname: "",
        desc: "",
        address: "",
        price: 0,
        beds: 0,
        bathrooms: 0,
        parking: false,
        furnished: false,
        imageurls: [],
        type: 'rent',
        userid: ""
    })
    useEffect(() => {
        const fetchListing = async () => {
            const response = await fetch(`https://backendestate.onrender.com/listing/getUserListing/${listingid}`)
            const data = await response.json();
            setformdata({
                propname: data.propname,
                desc: data.desc,
                address: data.address,
                price: data.price,
                beds: data.beds,
                bathrooms: data.bathrooms,
                parking: data.parking,
                furnished: data.furnished,
                imageurls: data.imageurls,
                type: data.type,
                userid: id
            })
        }
        fetchListing();
    }, [])




    const handlechange = (e) => {
        if (e.target.id == "sell" || e.target.id == "rent") {
            setformdata({
                ...formdata,
                type: e.target.id,
            })
        }

        if (e.target.id == "parking" || e.target.id == "furnished") {
            setformdata({
                ...formdata,
                [e.target.id]: e.target.checked,
            })
        }

        if (e.target.type == "number" || e.target.type == "text" || e.target.type == "textarea") {
            setformdata({
                ...formdata,
                [e.target.id]: e.target.value,
            })
        }
    }
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, `property/` + fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formdata.imageurls.length < 7) {

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setformdata({
                        ...formdata,
                        imageurls: formdata.imageurls.concat(urls),
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            console.log("error occured");
        }
    };

    const updatelisting = async() => {
        try {
            const response= await fetch(`https://backendestate.onrender.com/listing/updatelisting/${listingid}`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "userid":id
            },
            body:JSON.stringify(formdata)
        })

        if(response.status==200)
        {
            navigate("/userproperty");
        }
        } catch (error) {
            console.log(error);
        }

    }
    const handleImageDelete = (urlToDelete) => {
        setformdata((prevData) => {
          const updatedImageUrls = prevData.imageurls.filter((url) => url !== urlToDelete);
          return {
            ...prevData,
            imageurls: updatedImageUrls,
          };
        });
      };

    return (
        <div className='w-full lg:h-[calc(100vh-72px)] bg-gray-200 p-2'>
            <h1 className='text-center my-2 font-bold text-[22px]  mobxl:text-[30px] uppercase'>update Your Property</h1>
            <div className='max-w-[1150px] m-auto flex flex-col tabl:flex-row'>

                <div className='w-[100%] tabl:w-[50%] p-4 flex flex-col'>
                    <input required type="text" onChange={handlechange} value={formdata.propname} id='propname' className='shadow-lg my-2 rounded-md  h-[40px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2 w-full' placeholder='Name of the Property' />
                    <textarea required id="desc" onChange={handlechange} value={formdata.desc} name="description" className='shadow-lg w-full   my-2 rounded-md p-2 border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] ' rows="7" placeholder='Description'></textarea>
                    <input required id='address' onChange={handlechange} value={formdata.address} type="text" className='shadow-lg my-2 rounded-md  h-[40px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2 w-full' name="address" placeholder='Address' />
                    <div className='flex items-center justify-between'>
                        <ul className="items-center w-full text-sm font-medium text-black rounded-lg sm:flex ">
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="sell" type="checkbox" checked={formdata.type === "sell"} className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="sell" className="w-full py-3 ms-2  text-gray-700 ">Sell</label>
                                </div>
                            </li>
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="rent" type="checkbox" checked={formdata.type === "rent"} className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="rent" className="w-full py-3 ms-2 text-gray-700 ">Rent</label>
                                </div>
                            </li>
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="parking" type="checkbox" checked={formdata.parking} className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="parking" className="w-full py-3 ms-2  text-gray-700 ">Parking Spot</label>
                                </div>
                            </li>
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="furnished" type="checkbox" checked={formdata.furnished} value="" className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="furnished" className="w-full py-3 ms-2  text-gray-700 ">Furnished</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div className='flex justify-between'>
                        <div> <input onChange={handlechange} value={formdata.beds} required id='beds' className='w-[80%] shadow-lg my-2 mx-1 rounded-md  h-[45px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2' type="number" /><span className='text-gray-700'>Beds</span></div>
                        <div><input onChange={handlechange} value={formdata.bathrooms} required id='bathrooms' className="w-[80%] shadow-lg my-2 mx-1 rounded-md  h-[45px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2" type="number" /><span className='text-gray-700'>Baths</span></div>
                    </div>
                    <div>
                        <input onChange={handlechange} id='price' value={formdata.price} required className=' shadow-lg my-4 rounded-md  h-[45px] mx-1 border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2' type="number" name="" /> <span>Regular Price (₹/Month)</span>
                    </div>

                </div>
                <div className='w-[100%] tabl:w-[50%] p-4'>
                    <p className='text-gray-700 m-2'><b className='text-black mx-[2px]'>Images:</b>The first image will be cover (max-6) </p>
                    <div className="flex justify-between p-2">
                        <input onChange={(e) => setfiles(e.target.files)} className='p-2 w-[65%]  border border-gray-400' type="file" multiple />
                        <button onClick={handleImageSubmit} className='w-[30%] border border-green-700 text-green-700 px-4 py-2 rounded focus:outline-none focus:border-green-700 focus:text-green-700'>Upload</button>
                    </div>
                    <button onClick={updatelisting} className='w-full h-[45px] rounded-md bg-[#6EB5AA] text-white font-semibold my-2 p-2 capitalize'>update Property</button>

                    {formdata.imageurls.map((url, index) => (
                        <ImageComponent key={index} data={url} onDelete={handleImageDelete} />
                    ))} 
                </div>
            </div>
        </div>
    )
}

export default UpdateListing