import React from 'react'
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
const Footer = () => {
    return (
        <div className=' bg-[#6eb5aa] pt-4 pb-4'>
            <div className='max-w-6xl mx-auto flex flex-col  smlg:flex-row'>
                <div className='w-[100%] p smlg:w-[60%]'>
                    <h1 className='text-[39px] font-bold text-white '>
                        Real<span className='text-[#1b5051]'>Tor</span>
                    </h1>
                    <p className='text-white text-[18px] text-justify'>Our vision is to revolutionize the way people buy, sell, and explore real estate. We aim to be the go-to destination for individuals and families seeking their dream homes, offering a platform that combines cutting-edge technology with personalized service.</p>
                </div>
                <div className='w-[100%] p-3 smlg:w-[40%]'>

                    <p className='w-[100%] mt-3 text-[18px] text-[#1b5051] font-bold'>Subscribe To Get Latest Property Update</p>
                    <form className='mt-2'>
                        <input type="text" className=' p-[3px] w-[50%] h-[40px] rounded-sm border-2 border-[#1b5051] ' placeholder='Email...' />
                        <button className='mx-4 rounded-md text-[#1b5051] b border-2 border-[#1b5051] w-[80px] h-[35px]'>Subsribe</button>
                    </form>
                    <p className='w-[100%] mt-3 text-[18px] text-[#1b5051]   font-bold'>Payment Options:</p>
                    <div className='flex gap-3'>
                    <FaCcVisa size={35} color='#083c3c'/>
                    <FaCcMastercard size={35} color='#083c3c'/>
                    <FaCcApplePay size={35} color='#083c3c'/>
                    <FaGooglePay size={35} color='#083c3c'/>
                    <SiPhonepe size={35} color='#083c3c'/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer