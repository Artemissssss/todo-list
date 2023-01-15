import { createSlice, nanoid } from "@reduxjs/toolkit";
import { addNewTask, deleteOneTask, getAllTask } from "./api";


const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items:[],
    loading: false,
    error: null
  },
  reducers: {

    inProgress(state){

      state.loading = true;
    },
    inSuccess(state, action){
      state.loading = false;
      state.items = action.payload;
    },
    inError(state, action){
      state.loading = false;
      state.error = action.payload;
    },


    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
  extraReducers:{
    [getAllTask.pending](state){
      state.loading = true;
    },
    [getAllTask.fulfilled](state, action){
      state.loading = false;
      state.items = action.payload;
    },
    [getAllTask.rejected](state, action){
      state.loading = false;
      state.error = action.payload;
    },

    //!===========================

    [addNewTask.pending](state){
      state.loading = true;
    },
    [addNewTask.fulfilled](state, action){
      state.loading = false;
      state.items = action.payload;
    },
    [addNewTask.rejected](state, action){
      state.loading = false;
      state.error = action.payload;
    },

    //!============================
    [deleteOneTask.pending](state){
      state.loading = true;
    },
    [deleteOneTask.fulfilled](state, action){
      state.loading = false;
      state.items = action.payload;
    },
    [deleteOneTask.rejected](state, action){
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const { addTask, deleteTask, toggleCompleted,inProgress,inSuccess,inError } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;