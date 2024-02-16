import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/`,
  }),
  // tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "cart",
      // providesTags: ["Cart"],
      transformResponse: (res, meta, arg) => res.data,
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    addOneToCart: builder.mutation({
      query: (productId) => ({
        url: `cart`,
        method: "POST",
        body: {
          productId: productId,
        },
      }),
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    updateCart: builder.mutation({
      query: ({ id, updatedItem }) => {
        return {
          url: `cart/${id}`,
          method: "PATCH",
          body: updatedItem,
        };
      },
      // invalidatesTags: ["Cart"],
      transformErrorResponse: (res, meta, arg) => res.message,
    }),

    deleteCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (res, meta, arg) => res.message,
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddOneToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = cartApi;
