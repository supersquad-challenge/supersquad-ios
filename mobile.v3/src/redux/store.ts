import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalSlice from "@/src/redux/slice/modalSlice";
import authSlice from "@/src/redux/slice/authSlice";

const rootReducer = combineReducers({
  modal: modalSlice,
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
