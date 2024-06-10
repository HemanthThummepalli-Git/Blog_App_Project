import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Signup() {

    let {register,handleSubmit,formState:{errors}}=useForm()
    let [err,setErr]=useState('')
    let navigate=useNavigate()
    
   async function submit(obj){
        if(obj.usertype=="User"){
            //make http post req
            let res=await axios.post('http://localhost:4000/user-api/new-user',obj)
            if(res.data.message === 'User is created')
            {
                //navigate to the signin page
                navigate('/signin')
            }else{
                //handle the error
                setErr(res.data.message)
            }
        }else if(obj.usertype=="Author"){
        //make the http post req to author
        let res=await axios.post('http://localhost:4000/author-api/new-user',obj)
        if(res.data.message== "Author is created"){
            //navigate to signin
            navigate('/signin')
        }else{
            //Handle the error
            setErr(res.data.message)
        }
    }
    }

  return (
    <div style={{height:"100%"}} className='m-5 p-5' >
        <div className="row mx-auto card shadow-lg m-5 " style={{width:"400px"}}>
            <div className="col p-2" >    
            <h1 className='text-center m-3 '>Signup</h1>
            {err.length!=0 && <p className='text-danger text-center m-2'>{err}</p>}
            <form className=' w-100  text-dark p-3 text-center' onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
            <div className="form-check form-check-inline m-0 p-0">
                                <input className="form-check-input mx-2" type="radio" name="usertype" value={"User"} {...register('usertype',{required:true})}/>
                                <label className="form-check-label">User</label>
                                
                                <div className="form-check form-check-inline">
                                <input className="form-check-input mx-2" type="radio" name="usertype" value={"Author"}{...register('usertype',{required:true})}/>
                                <label className="form-check-label">Author</label>
                                </div>  
                                {errors.usertype?.type==='required' && <p className='text-danger m-2'>Choose anyone</p>}
                            </div>
            </div>

            <div className='mb-3'>
                
                <input type="text" className='form-control' placeholder='Username' {...register('username',{required:true})}/>
                {errors.username?.type==='required' && <p className='text-danger m-2'>Username Required</p>}

            </div>
            <div className='mb-3'>

                <input type="email" className='form-control' placeholder='Email' {...register('email',{required:true})} />
                {errors.username?.type==='required' && <p className='text-danger m-2'>Email Required</p>}            
            
            </div>
            <div className='mb-3'>

                <input type="password" className='form-control' placeholder='Password'{...register('password',{required:true})}/>
                {errors.username?.type==='required' && <p className='text-danger  m-2'>Password Required</p>}

            </div>
            <button className='btn btn-success' type="submit">Register</button>
        </form>
        <p className='fs-6 px-3 text-center'>Already Registered!
            <Link to='/signin' className='px-1 link-success'>Login</Link>
            here
        </p>
        </div>
    </div>
    </div>
  )
}

export default Signup