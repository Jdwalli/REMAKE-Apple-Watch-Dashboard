import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startOfToday } from 'date-fns'

interface State {
  date: string;
}

const initialState: State = {
  date: startOfToday().toISOString().slice(0, 10),
};

export const dateReducer = createSlice({
  name: 'workoutDate',
  initialState: initialState,
  reducers: {
    updateDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    
  },
});

export const { updateDate } = dateReducer.actions;

export default dateReducer.reducer;