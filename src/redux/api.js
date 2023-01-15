import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

axios.defaults.baseURL = 'https://todo-x6n1.onrender.com'

// export const getAllTask = ()=> {return async (dispatch) => {
//     dispatch(inProgress())
//     try {
//         const response = await axios.get("/")
//         dispatch(inSuccess(response.data))
//     } catch (e) {
//         console.log(e)
//         dispatch(inError("Not Found"))
//     }
// }}
export const getAllTask = createAsyncThunk('tasks/getAll', async (arg, thunkAPI) =>{
    try{
        const response = await axios.get("/")
        if(!response.data.length){
            return thunkAPI.rejectWithValue("Enter valid args")
        }
        return response.data
    }catch(e){
        return thunkAPI.rejectWithValue("Not found")
    }
})

export const addNewTask = createAsyncThunk('tasks/getAll', async (text, thunkAPI) =>{
    if(!text){
        return thunkAPI.rejectWithValue("Enter valid args")
    }
    try{
        const response = await axios.post("/",{text})
        return response.data
    }catch(e){
        return thunkAPI.rejectWithValue("Not found")
    }
})

export const deleteOneTask = createAsyncThunk('tasks/getAll', async (id, thunkAPI) =>{
    try{
        const response = await axios.delete(`/?id=${id}`)
        return response.data
    }catch(e){
        return thunkAPI.rejectWithValue("Not found")
    }
})

export const changeTaskStatus = createAsyncThunk('tasks/getAll', async (task, thunkAPI) =>{
    const {_id, completed} = task;
    console.log(_id, completed)
    console.log(task)
    if(!_id){
        return thunkAPI.rejectWithValue("Error")
    }
    try{
        const response = await axios.put("/",{id:_id, completed:!completed})
        return response.data
    }catch(e){
        return thunkAPI.rejectWithValue("Not found")
    }
})
