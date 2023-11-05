import { createSlice } from "@reduxjs/toolkit";

const storedRegisteredUsers = localStorage.getItem("registeredUsers");
const initialState = {
  registeredUsers: storedRegisteredUsers
    ? JSON.parse(storedRegisteredUsers)
    : [],
  registerError: false,
  loginError: false,
};

export const prodAuthSlice: any = createSlice({
  name: "prodAuth",
  initialState,
  reducers: {
    registerUserProd: (state, { payload }) => {
      if (
        state.registeredUsers.find((user: any) => user.email === payload.email)
      ) {
        state.registerError = true;
      } else {
        state.registeredUsers.push(payload);
        localStorage.setItem(
          "registeredUsers",
          JSON.stringify(state.registeredUsers)
        );
        state.registerError = false;
      }
    },
    loginUsersProd: (state, { payload }) => {
      const userWhoTryingLogin: any = state.registeredUsers.find(
        (user: any) => user.email === payload.email
      );
      if (
        userWhoTryingLogin.email === payload.email &&
        userWhoTryingLogin.password === payload.password
      ) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        state.loginError = false;
      } else {
        state.loginError = true;
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
      }
    },
  },
});

export const { registerUserProd, loginUsersProd, updateUserDataprod } =
  prodAuthSlice.actions;

export default prodAuthSlice.reducer;
