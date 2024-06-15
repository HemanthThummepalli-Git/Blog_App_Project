//import a slice
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

//import the list from the external API
export const userAuthorPromise=createAsyncThunk("user-author-data",async (userCredObj,thunkApi)=>{
    try{
        if(userCredObj.usertype=='User'){
            //make http post request from the redux
            const res=await axios.post('http://localhost:4000/user-api/login',userCredObj)
            if(res.data.message=="Login success"){
                //store the token in the local/session storage
                localStorage.setItem('token',res.data.token)
                // toast notification
                toast.success('Login Successful !')
            }else{
                toast.error('Login failed')
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
        if(userCredObj.usertype=='Author'){
            //make the http post request fom the author 
            let res=await axios.post('http://localhost:4000/author-api/login',userCredObj)
            if(res.data.message=="Login success"){
                //store the token in the local storage
                localStorage.setItem('token',res.data.token)
                toast.success('Login Successful !')
            }else{
                toast.error('Login failed')
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
    }catch(err){
        return thunkApi.rejectWithValue(err)
    } 
})


export let userAuthorSlice=createSlice(
    {
        name:"userAuthorReducer",
        initialState:{currentUser:{},isPending:false,errmsg:'',errStatus:false,isLogined:false,usertype:""},
        reducers:{
            resetState:(state,action)=>{
                state.currentUser={}
                state.isPending=false
                state.isLogined=false
                state.errmsg=''
                state.errStatus=false
                state.usertype=""
                
            }
        },
        extraReducers: builder=>
            builder.addCase(userAuthorPromise.pending,(state,action)=>{
                state.isPending=true
            })
            .addCase(userAuthorPromise.fulfilled,(state,action)=>{
                
                state.currentUser=action.payload.user
                state.isPending=false
                state.isLogined=true
                state.errmsg=''
                state.errStatus=false
                state.usertype=action.payload.user.usertype
            })
            .addCase(userAuthorPromise.rejected,(state,action)=>{
                state.isPending=false
                state.errmsg=action.payload
                state.errStatus=true
                state.isLogined=false
                state.currentUser={}
            })
        
        
    }
)


//export the slice to the store
export default userAuthorSlice.reducer

//create the funcitons as actions creator functions
export let {resetState}=userAuthorSlice.actions