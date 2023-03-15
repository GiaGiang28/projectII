import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fooditemReducer from "./foodItemSlice";
import cartReducer from "./cartSlice";
import cartItemReducer from "./cartItemSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  fooditem: fooditemReducer,
  cart: cartReducer,
  cartItem: cartItemReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// const rootReducer = {
//   user: userReducer,
//   fooditem: fooditemReducer,
//   cart: cartReducer,
//   cartItem: cartItemReducer,
// };

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
