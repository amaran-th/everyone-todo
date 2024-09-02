/* eslint-disable import/no-extraneous-dependencies */
import { LoginResponseDto } from "@/types/dto/auth.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "react-cookies";

interface AuthState {
  value: LoginResponseDto;
}

const initialState: AuthState = {
  value: {
    user_id: -1,
    access_token: "",
    refresh_token: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponseDto>) => {
      cookie.save("auth", JSON.stringify(action.payload), {});
      state.value = action.payload;
    },
    logout: (state) => {
      cookie.remove("auth");
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
