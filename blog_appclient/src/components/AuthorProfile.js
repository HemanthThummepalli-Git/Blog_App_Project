import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdOutlinePostAdd } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import './NavBar.css';
function AuthorProfile() {

  let {currentUser}=useSelector(state=>state.userAuthorReducer)

  return (
    <div>
      <div className='d-flex justify-content-evenly m-3'>
      <NavLink className="fs-4 text-decoration-none ab text-center" to={`articles-by-author/${currentUser.username}`} ><MdArticle className='fs-3 m-0' /> View Articles</NavLink>
      <NavLink className="fs-4 text-decoration-none ab text-center" to={'newarticle'} ><MdOutlinePostAdd className='fs-3'/> Add Article</NavLink>
    </div>
    <Outlet/>
    </div>
    
  )
}

export default AuthorProfile