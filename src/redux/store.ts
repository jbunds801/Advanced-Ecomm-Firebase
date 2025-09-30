import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

//wraps cart reducer with persistReducer to save cart data in local storage
