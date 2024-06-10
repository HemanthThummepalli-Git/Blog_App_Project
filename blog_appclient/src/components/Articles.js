import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { MdReadMore } from "react-icons/md";
function Articles() {


  const [articlesList, setArticlesList] = useState([]);
  let navigate=useNavigate()

  //get token from the local storage
  let token = localStorage.getItem('token')
  //create the axios with token
  let axiosWithToken=axios.create({
      headers:{Authorization:`Bearer ${token}`}
  })


  const getArticlesOfCurrentAuthor=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/user-api/articles`)
    setArticlesList(res.data.payload)
  }


  const readArticleByArticleId=async (articleObj)=>{
    await axiosWithToken.put(`http://localhost:4000/user-api/views`,articleObj)
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }

    useEffect(()=>{
      getArticlesOfCurrentAuthor()
    },[])

    //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let month= new Date(iso).getUTCMonth();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${month+1}/${year}`;
  }

  return (
    <div className='container m-4 d-block m-auto'>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
            {articlesList.map((article) => (
              <div className="col" key={article.articleId}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      {article.Content.substring(0, 80) + "...."}
                    </p>
                    <button className='btn btn-info px-4 m-auto d-block' onClick={()=>readArticleByArticleId(article)}><MdReadMore className='fs-4'/> Read More</button>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <small className="text-body-secondary">
                      Last updated on {ISOtoUTC(article.dateOfModification)}
                    </small>
                    <small className="text-body-secondary">
                      Views: {article.views}
                    </small>
                  </div>
                </div>
              </div>
            ))}
      </div>
      </div>
  )
}

export default Articles