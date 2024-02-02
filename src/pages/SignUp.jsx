import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import GoogleAuth from '../components/GoogleAuth';
import { useSelector,useDispatch } from 'react-redux';
import { signinEnd,signinStart } from '../redux/slice/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const {loading}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(signinStart());
    const res= await fetch("https://backendestate.onrender.com/auth/signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    })
    const data=await res.json();
    dispatch(signinEnd(null));
    if(res.status===409){
       toast.warn('User Already Exists!', {
        position: toast.POSITION.TOP_CENTER
      });;
      navigate('/signin')
    if(res.status===201){
       toast.success('User Created Successfully', {
        position: toast.POSITION.TOP_CENTER
      });;
      navigate('/signin')
    }
    console.log(res);

  };

  return (
    <div className='w-full h-[calc(100vh-72px)] flex justify-center items-center flex-col bg-gray-300 '>
      <div className='m-4 bg-white rounded-2xl shadow-xl overflow-hidden  hover:shadow-xl items-center'>
        <h2 className='font-bold text-4xl text-center mt-4 text-[#1b5051] uppercase'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='p-5 w-full gap-7 flex flex-col'>
          <input type="text"
            name='username'
            autoComplete='off'
            onChange={handleChange}
            className='w-[250px] text-[14px] mt-3 h-9 p-2 outline-2 border outline-none border-gray-500 focus:border-gray-900 focus:border-2 rounded-lg moblg:w-[320px] tabl:w-[320px] lg:w-[400px] moblg:text-[18px]'
            placeholder='Enter Your Name'
            required />
          <input type="email"
            name='email'
            autoComplete='off'
            onChange={handleChange}
            className='w-[250px] text-[14px]  h-9 p-2 outline-2 border outline-none border-gray-500 focus:border-gray-900 focus:border-2 rounded-lg moblg:w-[320px] tabl:w-[320px] lg:w-[400px] moblg:text-[18px]'
            placeholder='Enter Your Email'
            required />
          <input type="password"
            name="password"
            onChange={handleChange}
            className='w-[250px] text-[14px]  h-9 p-2 outline-2 border outline-none border-gray-500 focus:border-gray-900 focus:border-2 rounded-lg moblg:w-[320px] tabl:w-[320px] lg:w-[400px] moblg:text-[18px]'
            placeholder='Enter Your Password'
            required />
          <button disabled={loading==true} type="submit" className='bg-[#1b5051] text-white p-2 rounded-md capitalize' >{loading? <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                <circle className="opacity-[0]" cx="12" cy="12" r="10" stroke-width="4"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416A7.96 7.96 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.055-2.09-7.097-5.002z"></path>
                            </svg>:"Sign Up"}</button>
          <p className='text-center m-[-20px]'>OR</p>
          <GoogleAuth text="up"/>
        </form>
      </div>
      <p>
        Already have an account? <Link to="/signin" className='cursor-pointer text-[#1b5051]'>SignIn</Link>
      </p>
    </div>
  )
}
}
export default SignUp