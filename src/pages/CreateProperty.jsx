import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from "firebase/storage"
import { app } from "../firebase.js";
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProperty = () => {
    const navigate = useNavigate();
    const [uploading, setuploading] = useState(false)
    const { currentuser, loading } = useSelector((state) => state.user)
    const decoded = currentuser ? jwtDecode(currentuser.token) : null
    const [update, setupdate] = useState(true)
    const { id } = decoded || {};
    const [files, setfiles] = useState([])
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
        userid: id
    })


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

    const handleImageSubmit = () => {
    setuploading(true);
        if (files.length > 0 && files.length + formdata.imageurls.length < 7) {

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setupdate(false);
                    setuploading(false);
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

    const createlisting = async () => {
        if(update)
        {
            toast.warn("Atleast Upload One Image!",{
                position:toast.POSITION.TOP_CENTER
              })
              return;
        }

        const response = await fetch('https://backendestate.onrender.com/listing/createlisting', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(formdata)
        })
        if (response.status == 201) {
            toast.success("Property Created Successfully!",{
                position:toast.POSITION.TOP_CENTER
              })
            navigate('/profile');

        }

    }
    
    return (
        <div className='w-full lg:h-[calc(100vh-72px)] bg-gray-200 p-2'>
            <h1 className='text-center my-2 font-bold text-[22px]  mobxl:text-[30px] uppercase'>Create Your Property</h1>
            <div className='max-w-[1150px] m-auto flex flex-col tabl:flex-row'>

                <div className='w-[100%] tabl:w-[50%] p-4 flex flex-col'>
                    <input required type="text" onChange={handlechange} id='propname' className='shadow-lg my-2 rounded-md  h-[40px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2 w-full' placeholder='Name of the Product' />
                    <textarea required id="desc" onChange={handlechange} name="description" className='shadow-lg w-full   my-2 rounded-md p-2 border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] ' rows="7" placeholder='Description'></textarea>
                    <input required id='address' onChange={handlechange} type="text" className='shadow-lg my-2 rounded-md  h-[40px]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2 w-full' name="address" placeholder='Address' />
                    <div className='flex items-center justify-between'>
                        <ul className="items-center w-full text-sm font-medium text-black rounded-lg sm:flex ">
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="sell" type="checkbox" value="" className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="sell" className="w-full py-3 ms-2  text-gray-700 ">Sell</label>
                                </div>
                            </li>
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="rent" type="checkbox" value="" className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="rent" className="w-full py-3 ms-2 text-gray-700 ">Rent</label>
                                </div>
                            </li>
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="parking" type="checkbox" value="" className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="parking" className="w-full py-3 ms-2  text-gray-700 ">Parking Spot</label>
                                </div>
                            </li>
                            <li className="w-full rounded-sm m-2 ">
                                <div className="flex items-center ps-3">
                                    <input onChange={handlechange} id="furnished" type="checkbox" value="" className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label htmlFor="furnished" className="w-full py-3 ms-2  text-gray-700 ">Furnished</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div className='flex justify-between'>
                        <div> <input onChange={handlechange} required id='beds' className=' w-[100px] shadow-lg my-2 mx-1 rounded-md  h-[45px] mobxl:w-[80%]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2' type="number" /><span className='text-gray-700'>Beds</span></div>
                        <div><input onChange={handlechange} required id='bathrooms' className=" w-[100px] shadow-lg my-2 mx-1 rounded-md  h-[45px] mobxl:w-[80%]  border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2" type="number" /><span className='text-gray-700'>Baths</span></div>
                    </div>
                    <div>
                        <input onChange={handlechange} id='price' required className=' shadow-lg my-4 rounded-md w-[160px] mobxl:w-[200px]  h-[45px] mx-1 border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2' type="number" name="" /> <span>Regular Price (₹/Month)</span>
                    </div>

                </div>
                <div className='w-[100%] tabl:w-[50%] p-4'>
                    <p className='text-gray-700 m-2'><b className='text-black mx-[2px]'>Images:</b>The first image will be cover (max-6) </p>
                    <div className="flex justify-between p-2">
                        <input onChange={(e) => setfiles(e.target.files)} className='p-2 w-[65%]  border border-gray-400' type="file" multiple />
                        <button onClick={handleImageSubmit} className='w-[30%] border flex justify-center items-center border-green-700 text-green-700 px-4 py-2 rounded focus:outline-none focus:border-green-700 focus:text-green-700'>
                            {uploading ? <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                <circle className="opacity-[0]" cx="12" cy="12" r="10" stroke-width="4"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.055-2.09-7.097-5.002z"></path>
                            </svg> : "Upload"}</button>
                    </div>
                    <button onClick={createlisting} className='w-full h-[45px] rounded-md bg-[#6EB5AA] text-white font-semibold my-2 p-2' >Create Property</button>
                </div>
            </div>
        </div>
    )
}

export default CreateProperty