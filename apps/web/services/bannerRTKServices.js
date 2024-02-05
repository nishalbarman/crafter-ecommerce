import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const bannerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/banner/" }),
  endpoints: (builder) => ({
    getBannerWithLimit: builder.query({
      query: (limit) => `banner?limit=${limit}`,
    }),
    getUpdateBannerWithId: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `banner/${id}`,
        method: "PATCH",
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    deleteBannerWithId: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id }) => ({
        url: `banner/${id}`,
        method: "DELETE",
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBannerWithLimitQuery,
  useGetUpdateBannerWithIdMutation,
  useDeleteBannerWithIdMutation,
} = bannerApi;
