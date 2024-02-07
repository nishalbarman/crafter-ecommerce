import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "cart",
      providesTags: ["Cart"],
      transformResponse: (res, meta, arg) => res.data,
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    updateCart: builder.mutation({
      query: (id, cartItem) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    deleteCart: builder.mutation({
      query: () => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      transformErrorResponse: (res, meta, arg) => res.message,
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation, useDeleteCartMutation } =
  cartApi;
