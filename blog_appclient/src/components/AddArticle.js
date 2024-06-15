import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function AddArticle() {

    let {register,handleSubmit,formState:{errors}}=useForm()
    let {currentUser}=useSelector(state=>state.userAuthorReducer)

    let navigate=useNavigate()

    //get token from the local storage
    let token = localStorage.getItem('token')
    //create the axios with token
    let axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })


    async function getNewArticle(article)
    {
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.articleId = Date.now();
        article.username = currentUser.username;
        article.comments = [];
        article.status = true;
        article.views=0
        article.likers=[]
        //make http post request
        let res=await axiosWithToken.post('http://localhost:4000/author-api/articles',article)
        if(res.data.message=="New article is created"){
            navigate(`/authorprofile/articles-by-author/${currentUser.username}`)
            toast.success('New article posted.')
        }
    }
  return (
    
    <div style={{ fontFamily: 'Montserrat' }}>
            <div style={{width:600}} className="card p-4 mx-auto  mt-5 shadow bg-light">
                <div className="card-body">
                    <h3 className="text-dark mb-5 text-center">Write an Article</h3>
                    <form onSubmit={handleSubmit(getNewArticle)}>
                        
                            <div className="title mb-3">
                                <label htmlFor="title" className="form-label">Title</label>    
                                <input type="text" id="title" className="title form-control" {...register('title',{required:true})} />
                                {errors.title?.type=='required' && <p className='text-danger mt-1'>Title Required</p>}
                            </div>
                        
                        <div className="mb-3">
                            <p className="fs-6">Category</p>
                            <select name="category" id="category" className="form-select" {...register("category")}>
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
                            <textarea class="form-control" id="Content" rows="8"  {...register("Content")}></textarea>
                        </div>
                        <button type='submit'className="btn btn-info px-5 m-auto d-block">POST</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default AddArticle