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
        prodname: "",
        description: "",
        price: 0,
        stock:0,
        category:"",
        imageurls: [],
        userid: id,

    })


    const handlechange = (e) => {

     if (e.target.type == "number" || e.target.type == "text" || e.target.type == "textarea") {
            setformdata({
                ...formdata,
                [e.target.id]: e.target.value,
            })
        }
    }

    // useEffect(()=>
    // {
    //     console.log(formdata);

    // },[formdata])

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
    const categories = [
        "Electronics", "Fashion", "Beauty & Personal Care",
        "Health & Wellness", "Books", "Toys & Games","Other"
    ];


    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setformdata( {
            ...formdata,
            category:value

        });
    };

    const createProduct = async () => {
        if (update) {
            toast.warn("Atleast Upload One Image!", {
                position: toast.POSITION.TOP_CENTER
            })
            return;
        }

        const response = await fetch('https://backendestate.onrender.com/listing/createproduct', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(formdata)
        })
        if (response.status == 201) {
            toast.success("Property Created Successfully!", {
                position: toast.POSITION.TOP_CENTER
            })
            navigate('/profile');

        }

    }

    return (
        <div className='w-full  bg-gray-200 p-2'>
            <h1 className='text-center my-2 font-bold text-[22px] mobxl:text-[30px] uppercase'>Create Your Product</h1>
            <div className='max-w-[1150px] m-auto flex flex-col tabl:flex-row'>
                <div className='w-[100%] tabl:w-[50%] p-4 flex flex-col'>
                    <input required type="text" onChange={handlechange} id='prodname' className='shadow-lg my-2 rounded-md h-[40px] border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2 w-full' placeholder='Name of the Product' />
                    <textarea required id="description" onChange={handlechange} name="description" className='shadow-lg w-full my-2 rounded-md p-2 border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA]' rows="7" placeholder='Description'></textarea>
                    <div>
                        <p className='text-gray-700 my-2'>Categories:</p>
                        <ul className="items-center w-full text-sm font-medium text-black rounded-lg sm:flex flex-wrap">
                            {categories.map((category) => (
                                <li key={category} className="w-full rounded-sm m-2">
                                    <div className="flex items-center">
                                        <input onChange={handleCategoryChange} id={category} type="radio" name="category" value={category} className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                        <label htmlFor={category} className="w-full py-3 ms-2 text-gray-700">{category}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col mobxl:flex-row'>
                        <div>
                            <input onChange={handlechange} required id='price' className='shadow-lg my-2 mx-1 rounded-md h-[45px] mobxl:w-[70%] border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2' type="number" />
                            <br />
                            <span className='text-gray-700 ml-1'>Price(₹)</span>
                        </div>
                        <div>
                            <input onChange={handlechange} required id='stock' className="shadow-lg my-2 mx-1 rounded-md h-[45px] mobxl:w-[80%] border focus:outline-none focus:ring-[#6EB5AA] focus:border-[#6EB5AA] p-2" type="number" />
                            <br />
                            <span className='text-gray-700 ml-1'>Stock</span>
                        </div>
                    </div>
                </div>
                <div className='w-[100%] tabl:w-[50%] p-4'>
                    <p className='text-gray-700 m-2'><b className='text-black mx-[2px]'>Images:</b>Upload product images (max-6) </p>
                    <div className="flex justify-between p-2">
                        <input onChange={(e) => setfiles(e.target.files)} className='p-2 w-[65%] border border-gray-400' type="file" multiple />
                        <button onClick={handleImageSubmit} className='w-[30%] border flex justify-center items-center border-green-700 text-green-700 px-4 py-2 rounded focus:outline-none focus:border-green-700 focus:text-green-700'>
                            {uploading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                <circle className="opacity-[0]" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.055-2.09-7.097-5.002z"></path>
                            </svg> : "Upload"}
                        </button>
                    </div>
                    <button onClick={createProduct}  className='w-full h-[45px] rounded-md bg-[#6EB5AA] text-white font-semibold my-2 p-2'>Create Product</button>
                </div>
            </div>
        </div>

    )
}

export default CreateProperty