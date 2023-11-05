import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice/UserSlice";
import ThemeSlice from "./themeSlice/ThemeSlice";
import CartSlice from "./cartSlice/CartSlice";
import DummySlice from "./dummySlice/DummySlice";
import ProdAuthSlice from "./prodAuthSlice/ProdAuthSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    theme: ThemeSlice,
    cart: CartSlice,
    dummy: DummySlice,
    prodAuth: ProdAuthSlice,
  },
});

export type RootState = ReturnType<any>;
