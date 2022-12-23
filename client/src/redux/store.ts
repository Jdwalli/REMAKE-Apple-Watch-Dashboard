import { configureStore } from '@reduxjs/toolkit'
import uploadReducer from './features/uploadModalSlice'
import dateReducer from './features/workoutDateSlice'
import indexReducer from './features/workoutIndexSlice'


export const store = configureStore({
    reducer: {
        uploadModal: uploadReducer,
        workoutDate: dateReducer,
        workoutIndex: indexReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
