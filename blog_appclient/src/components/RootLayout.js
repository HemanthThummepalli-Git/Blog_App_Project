import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
function RootLayout() {
  return (
        <div className="bg-black" >
        <NavBar/>
        <div style={{minHeight:"100vh"}}> 
        <Outlet />
        </div>
        <Footer/>
        </div>
  )
}

export default RootLayout