import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userAuthorPromise } from '../redux/slices/userauthorslice'
import {useDispatch, useSelector} from 'react-redux'
import { IoMdLogIn } from "react-icons/io";
function Signin() {

    let {isLogined,usertype,errStatus,errmsg}=useSelector(state=>state.userAuthorReducer)
    let {register,handleSubmit,formState:{errors}}=useForm()

    let dispatch=useDispatch()
    let navigate=useNavigate()

    function submit(userCredObj){
        dispatch(userAuthorPromise(userCredObj))
    }

    useEffect(()=>{
        if(isLogined==true && usertype=="User")
            navigate('/usersprofile')
        if(isLogined==true && usertype=="Author")
            navigate('/authorprofile')
    })

  return (
 <div style={{height:"100%"}} className='m-5 p-5'>
        <div className="row m-5 mx-auto " style={{width:'400px'}}>
            <div className="col card shadow-lg p-2" >    
            <h1 className='text-center m-3'>Signin</h1>
            {errStatus==true && <p className='text-danger m-2 text-center'>{errmsg}</p>}
            <form className='w-100 text-dark mx-auto d-block p-3 text-center ' onSubmit={handleSubmit(submit)}>
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
    
        <div className='mb-3 '>
            <input type="text" className='form-control' placeholder='Username' {...register('username',{required:true})}/>
            {errors.username?.type==='required' && <p className='text-danger m-2'>Username Required</p>}
        </div>

        <div className='mb-3'>
            <input type="password" className='form-control' placeholder='Password' {...register('password',{required:true})}/>
            {errors.password?.type==='required' && <p className='text-danger m-2'>Password Required</p>}
        </div>

        <button className='btn btn-success'type='submit'><IoMdLogIn /> Login</button>
        </form>
        <p className='fs-6 px-3 text-center '>New User! 
            <Link to='/signup' className='px-1 link-success'>Register</Link>
            here
        </p>
            </div>
        </div>
</div>
  )
}

export default Signin