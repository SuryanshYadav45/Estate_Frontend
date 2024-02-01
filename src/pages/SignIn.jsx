import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logout, signinEnd,signinStart} from ".././redux/slice/userSlice.js"
import GoogleAuth from '../components/GoogleAuth.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
  const dispatch=useDispatch();
  const {loading} = useSelector((state) => state.user);


  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSignInResponse = (status) => {
    switch (status) {
      case 200:
        toast.success('Logged in Successfully', { position: toast.POSITION.TOP_CENTER });
        navigate('/');
        break;
      case 401:
        toast.error('Wrong Password', { position: toast.POSITION.TOP_CENTER });
        break;
      case 404:
        toast.error('User Not Found', { position: toast.POSITION.TOP_CENTER });
        dispatch(logout());
        break;
      default:
        // Handle other status codes if needed
        break;
    }
  };

  const handleSubmit=async(e)=>
  {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const response = await fetch("https://backendestate.onrender.com/auth/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      dispatch(signinEnd(data));
  
      handleSignInResponse(response.status);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-full h-[calc(100vh-72px)] flex justify-center items-center flex-col bg-gray-300 '>
      <div className='m-4 bg-white rounded-2xl shadow-xl overflow-hidden  hover:shadow-xl items-center'>
        <h2 className='font-bold text-4xl text-center mt-4 text-[#1b5051] uppercase'>Sign In</h2>
        <form onSubmit={handleSubmit} className='p-5 w-full gap-7 flex flex-col'>
        
          <input type="email"
            name='email'
            autoComplete='off'
            onChange={handleChange}
            className='w-[250px] text-[14px]  h-9 p-2 outline-2 border outline-none border-gray-500 focus:border-gray-900 focus:border-2 rounded-lg moblg:w-[320px] tabl:w-[320px] lg:w-[400px] moblg:text-[18px]'
            placeholder='Enter Your Email' 
            required/>
          <input type="password"
            name="password"
            onChange={handleChange}
            className='w-[250px] text-[14px]  h-9 p-2 outline-2 border outline-none border-gray-500 focus:border-gray-900 focus:border-2 rounded-lg moblg:w-[320px] tabl:w-[320px] lg:w-[400px] moblg:text-[18px]'
            placeholder='Enter Your Password'
            required />
          <button  disabled={loading} type="submit" className='bg-[#1b5051] text-white p-2 rounded-md capitalize flex justify-center' >{loading? <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                <circle className="opacity-[0]" cx="12" cy="12" r="10" stroke-width="4"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.055-2.09-7.097-5.002z"></path>
                            </svg>:"Sign In"}</button>
          <p className='text-center m-[-20px]'>OR</p>
          <GoogleAuth text="in" />
        </form>
      </div>
      <p>
        Don't have an account? <Link to="/signup" className='cursor-pointer text-[#1b5051]'>SignUp</Link>
      </p>
    </div>
  )
}

export default SignIn