import React from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { FaCommentAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { FaUserGraduate } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { IoLink } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
function Article() {

  let {state}=useLocation()
  let {handleSubmit,register}=useForm()
  let {currentUser,usertype}=useSelector(state=>state.userAuthorReducer)
  let [comment,setComment]=useState("")
  let [editStatus,setEditStatus]=useState(false)
  let [currentArticle,setCurrentArticle]=useState(state)
  let [currentComments,setCurrentComments]=useState(currentArticle.comments)
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()

  //get token from the local storage
  let token = localStorage.getItem('token')
  //create the axios with token
  let axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
  })


  async function writeComment(obj){
    obj.username=currentUser.username
    obj.dateOfCommented=new Date()
    //post the http request
    let res=await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,obj)
    if(res.data.message=="Comment is added"){
      setComment("Comment is Posted")
    }
  }

  function enableEditState(){
    setEditStatus(true)
  }
  //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let month= new Date(iso).getUTCMonth();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${month+1}/${year}`;
  }

  const saveModifiedArticle = async (obj) => {
    obj={...state,...obj}
    //change the data of modification
    obj.dateOfModification= new Date();
    //remove the mongodb created id
    delete obj._id;
    //post a put axios http request 
    let res=await axiosWithToken.put('http://localhost:4000/author-api/articles',obj)
    if (res.data.message === "Article is updated") {
      setEditStatus(false);
      console.log(res.data.payload)
      navigate(`/authorprofile/article/${obj.articleId}`, {state: res.data.payload});
    }
  }

  const deleteArticle=async ()=>{
    let art={...currentArticle}
    delete art._id
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/articles/${currentArticle.articleId}`,art)
    if(res.data.message=="Article is Deleted"){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
  }

  const restoreArticle=async ()=>{
    let art={...currentArticle}
    delete art._id
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/articles/${currentArticle.articleId}`,art)
    if(res.data.message=="Article is Restored"){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
  }

  const updateReply = (commentObj) => {
    const updatedComments = currentComments.map(comment => {
      if (comment.username === commentObj.username) {
        // Ensure replies array exists
        if (!comment.replies) {
          comment.replies = [];
        }
        
        // Find the specific reply from the current user
        const replyIndex = comment.replies.findIndex(reply => reply.username === currentUser.username);
        
        if (replyIndex !== -1) {
          // Toggle the reply status for the found reply
          comment.replies[replyIndex].replyStatus = !comment.replies[replyIndex].replyStatus;
        } else {
          // Add a new reply if not found
          comment.replies.push({
            username: currentUser.username,
            reply: '',
            dateOfReply: new Date(),
            replyStatus: true
          });
        }
      }
      return comment;
    });
  
    // Update the state with the modified comments array
    setCurrentComments(updatedComments);
  };
  



const setReply = async (e, commentObj) => {
  e.preventDefault(); // Prevents the default form submission behavior

  const reply = e.target.reply.value; // Extracts the reply content from the form input field

  // Create a new reply object with the necessary properties
  const newReply = {
      reply: reply,
      dateOfReply: new Date(),
      username: currentUser.username,
      replyStatus:true
  };
  //console.log(newReply)
  const res = await axiosWithToken.put(`http://localhost:4000/user-api/comment/${currentArticle.articleId}/${commentObj.username}`, newReply);
  if(res.data.message="Article is modified(reply update)"){
  setCurrentArticle(res.data.payload)
  setMsg("Reply posted")
  }
};

  

  return (
    <div>
    {editStatus === false?(
      <div className='card m-5 p-4'>
    <div className='d-flex justify-content-between'>
    <h1>{state.title}</h1>
    <div className='mt-3 mb-3'>
              {usertype == "Author" && (
                <>
                  <button
                    className="me-2 btn btn-warning "
                    onClick={enableEditState}
                  >
                   <FaPen className='fs-5'/>
                  </button>
                  {currentArticle.status===true?(
                    <button
                    className="me-2 btn btn-danger " onClick={deleteArticle}
                  > 
                    <MdDelete className='fs-4'/>
                  </button>
                  ):(
                    <button
                    className="me-2 btn btn-info " onClick={restoreArticle}
                  >
                    <MdOutlineRestore className='fs-4'/>
                  </button>
                  )}
                </>
              )}
    </div>
    </div>
    <div className='d-flex justify-content-between'>
    <h4><FaUserGraduate /> Author: <span className='fs-5'>{state.username}</span></h4>
    <h3 className='fs-5'>Views: {state.views}</h3>
    </div>
    <div className='d-flex gap-4 mt-3 mb-3 allign-items-center'>
    <h5 className='fs-6 m-0'><FaCalendarAlt className='fs-5 m-0'/> Created On: <span>{ISOtoUTC(state.dateOfCreation)}</span></h5>
    <h5 className='fs-6 m-0'><MdAccessTimeFilled className='fs-5 m-0'/> Modified On: <span>{ISOtoUTC(state.dateOfModification)}</span></h5>
    </div>
    <p style={{ whiteSpace: "pre-line" }}>
      {state.Content}
    </p>

    <div>
      {state.comments.length===0?(
      <h3 className='m-2'>No comments yet...</h3>
      ):(
      <div>
      <h3 className='m-2'><GoCommentDiscussion /> Comments:</h3>
      {
        currentComments.map((commentObj,ind)=>
        <div key={ind} className='bg-light p-3 rounded-2 m-2'> 
        <div className='d-flex justify-content-between allign-items-center'>
            <h4 className='mt-2 mb-2'><FaUser className='fs-5' /> {commentObj.username}</h4>
            <p className='fs-6'>{ISOtoUTC(commentObj.dateOfCommented)}</p>
        </div>
            <p className='fs-6'><FaCommentAlt className='fs-5'/> {commentObj.comment}</p>
            <div className='d-flex gap-1'>
            <button className='border-0 bg-light'><FcLike /></button>
            <button className='border-0 text-secondary fs-6 bg-light' onClick={()=>updateReply(commentObj)}><FaReply /> Reply</button>
            </div>
            <div> 
            {commentObj.replies && commentObj.replies.map((reply, replyInd) => (
                  (reply.reply!="") &&
                      <div key={replyInd} className='bg-light shadow p-3 rounded-2 m-2 ms-5'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <h5 className='mt-1 mb-1'><FaUser className='fs-6' /> {reply.username}</h5>
                          <p className='fs-6'>{ISOtoUTC(reply.dateOfReply)}</p>
                        </div>
                        <p className='fs-6'><FaCommentAlt className='fs-6' /> {reply.reply}</p>
                      </div>
            ))}
            <h4 className='m-2'>{msg}</h4>
            {commentObj.replies && commentObj.replies.some(reply => reply.username === currentUser.username && reply.replyStatus) && (
            <form onSubmit={(e)=>handleSubmit(setReply(e,commentObj))} className='card bg-light p-3 shadow border-0 w-100'>
                <input
                    type="text"
                    {...register("reply")}
                    className="form-control mb-4 border-0"
                    placeholder="Write reply here...."
                />
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <button className='bg-light border-0 text-dark' ><IoLink /></button>
                        <button className='bg-light border-0 text-dark'>@</button>
                    </div>
                    <button type="submit" className="btn btn-success" >
                        Reply
                    </button>
                </div>
            </form>
            )} 
            </div>
            
        </div>)
      }
    </div>
      )}
  </div>
        
    <h3 className='m-2'>{comment}</h3>
        {usertype == "User" && (
              <form onSubmit={handleSubmit(writeComment)} className='card bg-secondary p-3 shadow border-0'>
                <input
                  type="text"
                  {...register("comment")}
                  className="form-control mb-4 bg-secondary border-0 h-50"
                  placeholder="Write comment here...."
                />
                <div className='d-flex justify-content-between allign-items-center'>
                <div className='d-flex allign-items-center'>
                <button className='bg-secondary border-0 text-white' ><IoLink /></button>
                <button className='bg-secondary border-0 text-white'>@</button>
                </div>
                <button type="submit" className="btn btn-success">
                  Comment 
                </button>
                </div>
              </form>
            )}
  </div>
    ):(
      <div style={{ fontFamily: 'Montserrat' }}>
            <div style={{width:600}} className="card p-4 mx-auto  mt-5 shadow bg-light">
                <div className="card-body">
                    <h3 className="text-dark mb-5 text-center">Edit the Article</h3>
                    <form onSubmit={handleSubmit(saveModifiedArticle)}>
                        
                            <div className="title mb-3">
                                <label htmlFor="title" className="form-label">Title</label>    
                                <input defaultValue={state.title} type="text" id="title" className="title form-control" {...register('title')} />
                            </div>
                        
                        <div className="mb-3">
                            <p className="fs-6">Category</p>
                            <select  defaultValue={state.category} name="category" id="category" className="form-select" {...register("category")}>
                                <option value="0">Choose option</option>
                                <option value="Sports">Sports</option>
                                <option value="AI and ML">AI and ML</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Technology">Technology</option>
                                <option value="Sustainability">Sustainability</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="Content" class="form-label">Content</label>
                            <textarea defaultValue={state.Content} class="form-control" id="Content" rows="8"  {...register("Content")}></textarea>
                        </div>
                        <button type='submit'className="btn btn-success px-5 m-auto d-block">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )}
    </div>       
  )
}

export default Article