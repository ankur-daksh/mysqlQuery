import { configureStore } from "@reduxjs/toolkit";

import bookSlice from './slices/bookslice'

export const store = configureStore({
    reducer: {
      bookSlice
    },
  })