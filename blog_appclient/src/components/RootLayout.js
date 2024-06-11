import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function RootLayout() {
  return (
    <div 
      className="bg-black" 
      style={{backgroundImage: `url('https://wallpaperset.com/w/full/9/3/d/268863.jpg')`}}
    >
      <NavBar />
      <div style={{minHeight: "100vh"}}>
        <Outlet />
      </div>
      <div>
      <Footer/>
      </div>
      
    </div>
  );
}

export default RootLayout;
