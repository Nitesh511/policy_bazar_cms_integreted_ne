
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardData: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "api/dashboard",
  initialState,
  reducers: {
    setDashboardData(state, action) {
      state.dashboardData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setDashboardData, setLoading, setError } = dataSlice.actions;

export default dataSlice.reducer;

export const selectDashboard=(state)=>{
  
    return state.data.dashboardData

}
export const selectDashboardLoading=(state)=>{
    return state.data.loading

}
export const selectDashboardError=(state)=>{
    return state.data.error

}

