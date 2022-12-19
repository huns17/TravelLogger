/* eslint-disable @typescript-eslint/no-redeclare */
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  user: string;
  dashboardIndex: number;
  theme: string;
  token: string;
  isLoggedIn: boolean;
};

const initialState: initialState = {
  user: "",
  dashboardIndex: 0,
  theme: "themeLight",
  token: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    updateDashboardIndex(state, action: PayloadAction<number>) {
      state.dashboardIndex = action.payload;
    },
    updateTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    updateIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    reset: () => initialState,
  },
});

//Create the store
const store = configureStore({
  reducer: userSlice.reducer,
});

export const usersActions = userSlice.actions;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
