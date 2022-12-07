import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';



const initialState = {
  books: [],
  status: 'idle',
  error: null
}

export const fetchBooks = createAsyncThunk(
    '/fetchBooks',
    async (data) => {
      const response = await axios.get('http://localhost:5000/book/getAll');
      return response.data
    }
  )
  export const searchBook = createAsyncThunk(
    '/searchBook',
    async (key) => {
        console.log("key",key)
      const response = await axios.get(`http://localhost:5000/book/search?value=${key}`);
      return response.data
    }
  )

  export const addBook = createAsyncThunk(
    '/addBook',
    async (data) => {
        
      const response = await axios.post('http://localhost:5000/order/createOrder',data);
      return response.data
    }
  )

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
        console.log(action.payload)
        state.books = action?.payload.books
    //   return state + action.payload
    })
    builder.addCase(fetchBooks.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    })
    builder.addCase(searchBook.fulfilled, (state, action) => {
        console.log("action",action.payload)
        state.books = action?.payload.books
    //   return state + action.payload
    })
    builder.addCase(searchBook.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    })
    builder.addCase(addBook.fulfilled, (state, action) => {
      console.log("action",action.payload)
      state.books = action?.payload.books
  //   return state + action.payload
  })
  builder.addCase(addBook.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message
  })
  },
})

export default bookSlice.reducer
