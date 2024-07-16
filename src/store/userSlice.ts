import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:{}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      console.log("action: ", action);
      state.data = action.payload;
    },
    removeUserDetail: (state) => {
        state.data={}
    },
  },
});

export const { setUserDetail, removeUserDetail } = userSlice.actions;

export default userSlice.reducer;