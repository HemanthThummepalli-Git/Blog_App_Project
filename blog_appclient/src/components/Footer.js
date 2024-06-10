import React from 'react'
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";  
import { FaXTwitter } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa"; 
import { FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div>
      <hr className='m-2'/>
    <footer class="footer">
    <div className='text-white container'>
      <div class="row">
        <div class="col-md-4">
          <h5>HEMANTH THUMMEPALLI</h5>
          <p>
            <i class="fas fa-map-marker-alt"></i> SM Royal apt<br/>
            <i class="fas fa-phone-alt"></i> 91+ 8019762100
          </p>
          <div class="footer-links">
            <a href="#" className='text-success'>Visit Blogger</a> | 
            <a href="#" className='text-success'>A to Z</a> | 
            <a href="#" className='text-success'>Contact Us</a>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div class="footer-links">
            <a href="#" className='text-success'>News</a> | 
            <a href="#" className='text-success'>Events</a> | 
            <a href="#" className='text-success'>Accessibility</a> | 
            <a href="#" className='text-success'>Details</a>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <div className='d-flex gap-1 justify-content-center allign-items-center'>
          <img className="rounded-3"src='https://i.pinimg.com/736x/c7/8f/cd/c78fcd874b7245671c234f4196d5e59b.jpg' width={'30px'} height={'30px'}></img>
          <h4>BLOGGER</h4>
          </div>
          <p>Blogging is passion</p>
          <a href="#"className='text-success btn btn-link'>Give to blog</a>
        </div>
      </div>
      </div>
      <hr/>
      <div className=" d-flex justify-content-between container text-white">
        <div>
          <p>© Hemanth Thummepalli</p>
        </div>
        <div class=" text-right">
          <a href="#"  className='m-2  text-success'><IoLogoInstagram /></a>
          <a href="#" className='m-2 text-success'><FaFacebook /></a>
          <a href="#" className='m-2 text-success'><FaLinkedin /></a>
          <a href="#" className='m-2 text-success'><FaSnapchatGhost /></a>
          <a href="#" className='m-2 text-success'><FaXTwitter /></a>
          <a href="#" className='m-2 text-success'><FaYoutube /></a>
          <a href="#" className='m-2 text-success'>Social Media Directory</a>
        </div>
      </div>
  </footer>
  </div>
  )
}

export default Footer