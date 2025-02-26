import { tasksAreFetched, taskIsEdited, taskIsDeleted, taskIsAdded } from "../rtk"
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskList: []
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    extraReducers: (builder) => {
        builder
        .addMatcher(tasksAreFetched, (state, action)=> {
            state.taskList = action.payload.sort((a, b) => a.orderNumber - b.orderNumber)
        })
        .addMatcher(taskIsEdited, (state, action) => {
            const id = action.payload.id
            const taskData = action.payload
            const newList = state.taskList.map((task) => 
                task.id === id ? taskData : task
            )
            state.taskList = newList
        })
        .addMatcher(taskIsAdded, (state, action) => {
            state.taskList = [...state.taskList, action.payload]
        })
        .addMatcher(taskIsDeleted, (state, action) => {
            const deletedTaskId = action.payload.id
            state.taskList = state.taskList.filter((task) => {
                return task.id !== deletedTaskId
            })
        })
    }
  });

export default taskSlice.reducer;