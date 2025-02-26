import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
        query: () => '/taskList',
    }),
    editTask: builder.mutation({
        query: (task) => ({
          url: `/taskList/${task.id}`,
          method: 'PUT',
          body: task,
        }),
    }),
    deleteTask: builder.mutation({
        query: (id) => ({
          url: `/taskList/${id}`,
          method: 'DELETE',
        }),
      }),
    addTask: builder.mutation({
        query: (newTask) => ({
          url: `/taskList`,
          method: 'POST',
          body: newTask,
        }),
    }),
  }),
});

export const { 
    useGetTasksQuery, 
    useEditTaskMutation, 
    useDeleteTaskMutation, 
    useAddTaskMutation 
  } = api;

export const tasksAreFetched = api.endpoints.getTasks.matchFulfilled
export const taskIsEdited = api.endpoints.editTask.matchFulfilled
export const taskIsDeleted = api.endpoints.deleteTask.matchFulfilled
export const taskIsAdded = api.endpoints.addTask.matchFulfilled

