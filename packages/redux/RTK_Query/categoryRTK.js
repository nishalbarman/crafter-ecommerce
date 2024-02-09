import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/`,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "category",
      providesTags: ["Category"],
      transformResponse: (res, meta, arg) => res.data,
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    updateCategory: builder.mutation({
      query: (id, categoryItem) => ({
        url: `category/${id}`,
        method: "PATCH",
        body: categoryItem,
      }),
      invalidatesTags: ["Category"],
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    deleteCategory: builder.mutation({
      query: () => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
      transformErrorResponse: (res, meta, arg) => res.message,
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation, useDeleteCartMutation } =
  categoryApi;
