import {configureStore} from '@reduxjs/toolkit'
import  Todotask  from './TodoTaskAction'

export const store =configureStore({
    reducer:{
        todo:Todotask
    }
})