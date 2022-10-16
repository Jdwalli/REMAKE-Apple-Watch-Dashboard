import { configureStore } from '@reduxjs/toolkit'
import uploadReducer from './features/uploadModalSlice'


export const store = configureStore({
    reducer: {
        uploadModal: uploadReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
