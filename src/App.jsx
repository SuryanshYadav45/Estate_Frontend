import React from 'react'
import { BrowserRouter as Router, Routes,Route, useNavigate, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateProperty from './pages/CreateProperty'
import UserProperty from './pages/UserProperty'
import UpdateListing from './pages/UpdateListing'
import Property from './pages/Property'
import Search from './pages/Search'
import Success from './pages/Success'
import Cancel from "./pages/Cancel"
import { Zoom } from 'react-toastify';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders'

const App = () => {


  return (<>
  
    <Router>
      <Header/>
      
      <Routes>
        <Route  element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          </Route>
        <Route  element={<PrivateRoute/>}>
        <Route path='/create-property' element={<CreateProperty/>} />
          </Route>
        <Route  element={<PrivateRoute/>}>
        <Route path='/orders' element={<Orders/>} />
          </Route>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/userproperty' element={<UserProperty />} />
        <Route path='/updatelisting/:listingid' element={<UpdateListing/>} />
        <Route path='/property/:propid' element={<Property/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/success' element={<Success/>} />
        <Route path='/cancel' element={<Cancel/>} />
       
      </Routes>
      <ToastContainer position='top-center' theme='dark' className="z-40 top-4 " transition={Zoom} />
    </Router>
  </>
  )
}

export default App