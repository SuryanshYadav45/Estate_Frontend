import React from 'react'
import {GoogleAuthProvider, getAuth,getIdToken, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {signinStart,signinEnd} from "../redux/slice/userSlice.js"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuth = (props) => {
  const naviagte=useNavigate();
  const dispatch=useDispatch();
  const {loading} = useSelector((state) => state.user);
    
 



    const handleauth=async()=>
    {
        try {
            dispatch(signinStart());
            const provider= new GoogleAuthProvider();
            const auth=getAuth(app)
            
            const result=await signInWithPopup(auth,provider)
            const idToken=await result.user.getIdToken();
            
            const response= await fetch('https://backendestate.onrender.com/auth/signin/google',{
              method:"POST",
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({idToken})
            })
            const data=await response.json();
            dispatch(signinEnd(data));
            if(response.status===200)
            {
              toast.success('Logged in Successfully', {
                position: toast.POSITION.TOP_CENTER
              });;
              naviagte('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div onClick={handleauth} className="w-full bg-white text-black border border-black  flex items-center justify-center  p-2 rounded-lg hover:cursor-pointer hover:opacity-80">
  <div className=" bg-white p-1 w-[40px] h-[30px] mx-1 flex justify-center items-center">
    <img className="size-5" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"/>
  </div>
  <p className="text-black font-400  capitalize">{loading? "loading":`Sign ${props.text} with google`}</p>
</div>
  )
}

export default GoogleAuth