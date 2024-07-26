import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://45.117.153.94:1007/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = "cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c";
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// export const dashboardApi = createApi({
//   reducerPath: "api/dashboard",
//   baseQuery,
//   endpoints: (builder) => ({
//     fetchDashboard: builder.query({
//       query: () => "dashboards?populate=*",
//     }),
//   }),
// });

export const dashboardApi = createApi({
    reducerPath: "api/dashboard",
    baseQuery,
    endpoints: (builder) => ({
      fetchDashboard: builder.mutation({
        query: () => ({
          url: "dashboards?populate=*",
          method: "GET",
        }),
      }),
    }),
  });

// export const dashboardApi = createApi({
//     reducerPath: 'api/dashboard',
//     baseQuery,
//     endpoints: (builder) => ({
//       fetchDashboard: builder.mutation({
//         query: () => ({
//           url: 'dashboards?populate=*',
//           method: 'GET',
//         })
//       })
//     })
//   });

// Export hooks for usage in components
// export const { useFetchDashboardQuery } = dashboardApi;
export const { useFetchDashboardMutation } = dashboardApi;
export default dashboardApi;
