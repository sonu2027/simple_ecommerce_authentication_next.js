import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//   data: {}
// };

type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
  otp: string;
  verified: boolean;
}

const initialState = {
  data: {
    id: 0,
    name: '',
    email: '',
    password: '',
    otp: '',
    verified: false,
  }
};

// interface UserState {
//   data: UserData | {};
// }

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<UserData>) => {
      console.log("action: ", action);
      state.data.id = action.payload.id;
      state.data.name = action.payload.name;
      state.data.email = action.payload.email;
      state.data.password = action.payload.password;
      state.data.otp = action.payload.otp;
      state.data.verified = action.payload.verified;
    },
    removeUserDetail: (state) => {
      state.data = {
        id: 0,
        name: '',
        email: '',
        password: '',
        otp: '',
        verified: false,
      }
    },
  },
});

export const { setUserDetail, removeUserDetail } = userSlice.actions;

export default userSlice.reducer;