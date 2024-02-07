import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlist",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "wishlist",
      providesTags: ["Wishlist"],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.message,
    }),

    updateWishlist: builder.mutation({
      query: (id, item) => ({
        url: `wishlist/${id}`,
        method: "PATCH",
        body: item,
      }),
      invalidatesTags: ["Wishlist"],
      transformErrorResponse: (response, meta, arg) => response.message,
    }),

    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
      transformErrorResponse: (response, meta, arg) => response.message,
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
