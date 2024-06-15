import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MdArticle } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
function UsersProfile() {

  let [Authors,setAuthors]=useState([])
  let navigate=useNavigate()

   //get token from the local storage
   let token = localStorage.getItem('token')
   //create the axios with token
   let axiosWithToken=axios.create({
       headers:{Authorization:`Bearer ${token}`}
   })
 
     const getAllAuthors= async()=>{
         //get http request for all authors
         let res=await axiosWithToken.get('http://localhost:4000/author-api/authors')
         setAuthors(res.data.payload)
     }
     useEffect(()=>{
        getAllAuthors()
     },[])

  return (
    <div>
      <div className='d-flex justify-content-around m-3'>
      <NavLink className="fs-4 text-decoration-none ab text-center text-black" to={`/usersprofile/articles`} ><MdArticle className='fs-3 m-0' /> View Articles</NavLink>
      <NavLink to={"/usersprofile/followauthors"} state={{ mystate: Authors }} className="fs-4  text-decoration-none ab text-center text-black"><FaUserGraduate className='fs-2 m-0'/> Authors</NavLink>
      </div>
      <Outlet/>
    </div>
  )
}

export default UsersProfile