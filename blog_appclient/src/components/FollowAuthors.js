import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { FaUserGraduate } from "react-icons/fa6";
import { toast } from 'react-toastify';

function FollowAuthors() {

    const location = useLocation()
    const { mystate } = location.state
    let {currentUser}=useSelector(state=>state.userAuthorReducer)
    let [currentAuthorList,setCurrentAuthorList]=useState(mystate)


    //get token from the local storage
  let token = localStorage.getItem('token')
  //create the axios with token
  let axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
  })


  const updateElement = (username, newValue) => {
    const updatedState = currentAuthorList.map(item => (item.username === username ? newValue : item));
    setCurrentAuthorList([...updatedState]);
  };

    const updateFollowStatus= async(Author)=>{
        let obj={}
        obj.username=currentUser.username
        obj.followStatus=true
        let res=await axiosWithToken.post(`http://localhost:4000/author-api/authors/${Author.username}`,obj)
        if(res.data.message=="Followers are updated")
            {
                updateElement(res.data.payload.username,res.data.payload)
                toast.success('Followed author')
            }
    }

    const updateUnfollowStatus= async(Author)=>{
        let obj={}
        obj.username=currentUser.username
        obj.followStatus=false
        let res=await axiosWithToken.post(`http://localhost:4000/author-api/authors/${Author.username}`,obj)
        if(res.data.message=="Followers are updated")
            {
                updateElement(res.data.payload.username,res.data.payload)   
                toast.failure('Unfollowed author')
            }
    }

  return (
    <div>
        {mystate.length === 0?(
            <h2 className='text-white text-center m-3'>No Authors yet...</h2>
        ):(
            <>
            {
                currentAuthorList.map(obj => (
                    <div className="m-2" key={obj._id}>
                        <div className='card py-4 bg-light rounded-2 m-auto d-block' style={{width:'250px'}}>
                            <div className='card-body text-center m-auto d-block p-0'>
                                <h3 className='mb-4 mt-2'><FaUserGraduate /> {obj.username}</h3>
                                {
                                    obj.followers.map(follower => (
                                        <div key={follower.username}>
                                            {
                                                (follower.followStatus === true && follower.username === currentUser.username) &&
                                                <button className='btn btn-secondary text-light' onClick={() => updateUnfollowStatus(obj)}>Unfollow</button>
                                            }
                                            {
                                                (follower.followStatus === false && follower.username === currentUser.username) &&
                                                <button className='btn btn-success' onClick={() => updateFollowStatus(obj)}>Follow</button>
                                            }
                                        </div>
                                    ))
                                }
                                {
                                    // Render the follow button if followers array is null or does not include the currentUser
                                    (!obj.followers || obj.followers.every(follower => follower.username !== currentUser.username)) &&
                                    <button className='btn btn-success' onClick={() => updateFollowStatus(obj)}>Follow</button>
                                }
                            </div>
                        </div>
                    </div>
                ))

            }
            
            </>
        )}
    </div>
  )
}

export default FollowAuthors