import { useState } from 'react';
import { FaSearch, FaBars, FaCross } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import {logout} from "../redux/slice/userSlice"
import { jwtDecode } from "jwt-decode";



const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [Query, setQuery] = useState('')
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {currentuser}=useSelector((state)=>state.user);
  
  const decoded=currentuser && currentuser.token? jwtDecode(currentuser.token):null
  const{photoUrl}=decoded||{};

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSearch= (e)=>
  {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(Query)}`)
  }

  return (
    <header className='py-4 px-5 bg-[#6eb5aa]'>
      <div className='flex justify-between items-center max-w-6xl mx-auto h-10'>
        <Link className="flex items-center justify-center" to="/">
          <h1 className='text-[35px] font-bold text-white'>
            Real<span className='text-[#1b5051]'>Tor</span>
          </h1>
        </Link>
        
        {/* Menu Icon for Small Screens */}
        <div className='smlg:hidden cursor-pointer' onClick={toggleMenu}>
          {menuVisible? <IoMdClose size={25} className='text-white' onClick={()=>setMenuVisible(!menuVisible)}/>:<FaBars size={25} className='text-white' />}
        </div>

        {/* Navigation for Large Screens */}
        <div className={` hidden smlg:flex items-center space-x-4 ${menuVisible ? 'flex' : 'hidden'}`}>
          <form className='flex items-center rounded-xl p-1 bg-white' onSubmit={handleSearch}>
            <input type="text" placeholder='Search.....' className='rounded-xl w-[250px] px-[10px] py-[5px] outline-none' onChange={(e)=>setQuery(e.target.value)}/>
            <FaSearch size={25} className='text-[#1b5051]' />
          </form>
          </div>
          <div className={`hidden smlg:flex items-center space-x-4 ${menuVisible ? 'flex' : 'hidden'}`}>
          <ul className='flex gap-4'>
            <Link className="flex items-center justify-center" to="/"><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>Home</li></Link>
            <Link  className="flex items-center justify-center" to="/about"><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>About</li></Link>
            {currentuser?
            <Link to="/profile"><img className='rounded-full w-12 h-12 border-2 cursor-pointer ' src={photoUrl}/></Link>
            
            
            :<Link className="flex items-center justify-center" to='/signin'><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>Sign In</li></Link>}
          </ul>
        </div>

        {/* Mobile Navigation for Small Screens */}
        {menuVisible && (
            <>

            
          <div className='smlg:hidden fixed top-[72px] bg-[#a9c2be] left-0 w-full h-full z-[999] flex  justify-center transition-all duration-300 ease-in-out '>
            <div className=' w-full p-4 rounded-md'>
              <form className='flex items-center mb-4 bg-white rounded' onSubmit={handleSearch} >
                <input type="text" placeholder='Search.....' className='rounded-xl w-[90%] px-[10px] py-[5px] outline-none' onChange={(e)=>setQuery(e.target.value)} />
                <FaSearch size={25} className='text-[#1b5051]' />
              </form>

              <ul className='flex flex-col gap-2'>
                <Link onClick={()=>setMenuVisible(!menuVisible)} to="/"><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>Home</li></Link>
                <Link onClick={()=>setMenuVisible(!menuVisible)}  to="/about"><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>About</li></Link>
                {currentuser?<Link onClick={()=>setMenuVisible(!menuVisible)} to='/profile'><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>Profile</li></Link>:<Link onClick={()=>setMenuVisible(!menuVisible)} to='/signin'><li className='text-[#1b5051] font-semibold text-[20px] hover:underline hover:text-white'>Sign In</li></Link>}</ul>           </div>
          </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
