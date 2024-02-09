import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { wishlistReducer } from "./slices/wishlistSlice";
import { keywordReducer } from "./slices/keywordsSlice";
import { bannerApi } from "./RTK_Query/bannerRTK";
import { wishlistApi } from "./RTK_Query/wishlistRTK";
import { cartApi } from "./RTK_Query/cartRTK";
import { categoryApi } from "./RTK_Query/categoryRTK";

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

    keywords: keywordReducer,
    wishlistLocal: wishlistReducer,
    cartLocal: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bannerApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(cartApi.middleware)
      .concat(bannerApi.middleware)
      .concat(categoryApi.middleware),
});
