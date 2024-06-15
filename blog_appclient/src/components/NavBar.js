import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../redux/slices/userauthorslice';
import { FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";

function NavBar() {
  let { isLogined, currentUser } = useSelector(state => state.userAuthorReducer);
  let dispatch = useDispatch();

  function SignOut() {
    // remove the token from the local storage
    localStorage.removeItem('token');
    dispatch(resetState());
  }

  return (
    <div className='navbar-container shadow-lg shadow-light bg-black'>
      <ul className='list-unstyled  d-flex gap-3 px-3 py-2 m-0 justify-content-between align-items-center'>
        <div className='d-flex gap-2 align-items-center'>
          <li><img className="rounded-3" src='https://i.pinimg.com/736x/c7/8f/cd/c78fcd874b7245671c234f4196d5e59b.jpg' width={'40px'} height={'40px'} alt="logo" /></li>
          <h3 className='text-white fs-2'>Blogger</h3>
        </div>
        {(isLogined === false) ? 
          <>
            <div className='d-flex'>
              <li><NavLink className="fs-4 text-white text-decoration-none ab" to=''><FaHome /> Home</NavLink></li>
              <li><NavLink className="fs-4 text-white text-decoration-none ab" to='signin'><FaSignInAlt /> Signin</NavLink></li>
              {/* <li><NavLink className="fs-4 text-white text-decoration-none ab" to='signup'><RiContactsFill /> Signup</NavLink></li> */}
            </div>
          </> :
          <>
            <div className='d-flex gap-4 align-items-center'>
              <li><p className='text-white fs-4 m-0'>Welcome, <span className='text-success'>{currentUser.username}</span></p></li>
              <li><NavLink className="fs-4 text-white text-decoration-none ab m-auto" to='signin' onClick={SignOut}><FaSignOutAlt /></NavLink></li>
            </div>
          </>
        }
      </ul>
    </div>
  );
}

export default NavBar;
