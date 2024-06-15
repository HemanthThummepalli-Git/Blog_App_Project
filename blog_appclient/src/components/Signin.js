import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userAuthorPromise } from '../redux/slices/userauthorslice'
import {useDispatch, useSelector} from 'react-redux'
import { IoMdLogIn } from "react-icons/io";

function Signin() {

    const styles = {
        input: {
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          borderRadius: '40px',
          fontSize: '16px',
          color: '#fff',
          padding: '10px 45px 10px 20px',
          border: '2px solid #7aae09',
        },
        placeholder: {  
          color: '#fff',
        },
        icon: {
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '20px',
        }
      };


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
 <div style={{height:"100%"}} className='m-5 p-5' >
    <style>
        {`
        .button-86 {
          all: unset;
          width: 100px;
          height: 30px;
          font-size: 16px;
          background: transparent;
          border: none;
          position: relative;
          color: #f0f0f0;
          cursor: pointer;
          z-index: 1;
          padding: 10px 20px;
          display: flex;
          margin:auto;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        
        .button-86::after,
        .button-86::before {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: -99999;
          transition: all .4s;
        }
        
        .button-86::before {
          transform: translate(0%, 0%);
          width: 100%;
          height: 100%;
          background: #28282d;;
          border-radius: 10px;
        }
        
        .button-86::after {
          transform: translate(10px, 10px);
          width: 35px;
          height: 35px;
          background: #ffffff15;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border-radius: 50px;
        }
        
        .button-86:hover::before {
          transform: translate(5%, 20%);
          width: 110%;
          height: 110%;
        }
        
        .button-86:hover::after {
          border-radius: 10px;
          transform: translate(0, 0);
          width: 100%;
          height: 100%;
        }
        
        .button-86:active::after {
          transition: 0s;
          transform: translate(0, 5%);
        }
        `}
      </style>
        <div className="row m-5 mx-auto " style={{width:'450px'}}>
            <div className="col card shadow-lg p-4  border-0 rounded-lg" style={{ background:'transparent',backdropFilter: 'blur(50px)',borderTopLeftRadius:'50px',borderTopRightRadius:'50px',borderBottomLeftRadius:'50px',borderBottomRightRadius:'50px'}}>    
        
            <h1 className='text-center m-3'>Signin</h1>
            
            {errStatus==true && <p className='text-danger m-2 text-center'>{errmsg}</p>}
            <form  className='w-100 text-dark mx-auto d-block p-3 text-center ' onSubmit={handleSubmit(submit)}>
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
            <input type="text" style={styles.input} className='form-control' placeholder='Username' {...register('username',{required:true})}/>
            {errors.username?.type==='required' && <p className='text-danger m-2'>Username Required</p>}
        </div>

        <div className='mb-3'>
            <input type="password" style={styles.input}  className='form-control' placeholder='Password' {...register('password',{required:true})}/>
            {errors.password?.type==='required' && <p className='text-danger m-2'>Password Required</p>}
        </div>

        <div className="d-flex justify-content-center w-100">
            <button className='button-86' type="submit">Login</button>
          </div>
          

        {/* <button className='btn btn-light w-100'>Sign in with Google</button> */}

        </form>
        <p className='fs-6 px-3 text-center '>New User! go to 
            <Link to='/signup' className='px-1 link-success'>Signup</Link>
            
        </p>
            </div>
        </div>
        
</div>
  )
}

export default Signin