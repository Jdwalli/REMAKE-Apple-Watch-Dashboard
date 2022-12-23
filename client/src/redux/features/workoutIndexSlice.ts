import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  index: number;
}

const initialState: State = {
  index: 0,
};

export const indexReducer = createSlice({
  name: "workoutIndex",
  initialState: initialState,
  reducers: {
    updateIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const updateIndex = (index: number) => ({
  type: indexReducer.actions.updateIndex.type,
  payload: index,
});

export default indexReducer.reducer;
