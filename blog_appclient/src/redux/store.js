import {configureStore} from '@reduxjs/toolkit'
import userAuthorReducer from './slices/userauthorslice'
export let store=configureStore({
    reducer:{
        userAuthorReducer:userAuthorReducer
    }
})

