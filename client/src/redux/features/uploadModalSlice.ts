import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialUploadModalState } from '../../types/upload'; 

export const uploadModalSlice = createSlice({
    name: 'uploadModal',
    initialState: initialUploadModalState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    }
})

export const { openModal } = uploadModalSlice.actions
export const { closeModal } = uploadModalSlice.actions

export default uploadModalSlice.reducer