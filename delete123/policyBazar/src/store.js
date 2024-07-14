import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./components/layout/API/proceedToApi";
import dataReducer from "../src/components/layout/API/dataSlice";

const store = configureStore({
  reducer: {
    data:dataReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});

export default store;
