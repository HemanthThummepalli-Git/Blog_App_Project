import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdReadMore } from "react-icons/md";
function ArticlesByAuthor() {

    let {currentUser}=useSelector(state=>state.userAuthorReducer)
    let [articlesList,setArticles]=useState([])
    let navigate=useNavigate()

    //get token from the local storage
    let token = localStorage.getItem('token')
    //create the axios with token
    let axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })

    
        const getArticleOfCurrentAuthor = async()=>{
            let res=await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
            //console.log(res)
            setArticles(res.data.payload)
            //console.log(res.data.payload)
        }
    
        const getArticleContentByAuthor= async (obj)=>{
            navigate(`../article/${obj.articleId}`,{state:obj})
        }

        useEffect(()=>{
            getArticleOfCurrentAuthor()
          },[])

          function ISOtoUTC(iso) {
            let date = new Date(iso).getUTCDate();
            let day = new Date(iso).getUTCDay();
            let month= new Date(iso).getUTCMonth();
            let year = new Date(iso).getUTCFullYear();
            return `${date}/${month+1}/${year}`;
          }

  return (
    <div className='container m-4 d-block m-auto'>
    <h1 className='text-center text-dark m-3'>{currentUser.username}'s articles</h1>
    <div className='mt-5 g-4 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row '>
        {
        articlesList.map(articleObj=><div className="col" key={articleObj.id}>

            <div className='card h-100'>
                <div className='card-body'>
                    <h5 className='card-title'>{articleObj.title}</h5>
                    <p  className='card-text'>
                        {
                            articleObj.Content.substring(0,80)+" ...."
                        }
                    </p>
                    <button className='btn btn-success px-4 m-auto d-block' onClick={()=>getArticleContentByAuthor(articleObj)}><MdReadMore className='fs-4'/> Read More</button>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <small className="text-body-secondary">
                      Last updated on {ISOtoUTC(articleObj.dateOfModification)}
                    </small>
                    <small className="text-body-secondary">
                      Views: {articleObj.views}
                    </small>
                  </div>
            </div>

        </div>)
        }
    </div>
    </div>
  )
}

export default ArticlesByAuthor