import { configureStore } from "@reduxjs/toolkit";
// import { cartReducer } from "./slices/cartSlice";
// import { wishlistReducer } from "./slices/wishlistSlice";
// import { bannerReducer } from "./slices/bannerSlice";
import { keywordReducer } from "./slices/keywordsSlice";
// import { categoryReducer } from "./slices/categorySlice";
import { bannerApi } from "./RTK_Query/bannerRTK";
import { wishlistApi } from "./RTK_Query/wishlistRTK";
import { cartApi } from "./RTK_Query/cartRTK";
import { categoryApi } from "./RTK_Query/categoryRTK";

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    keywords: keywordReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bannerApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(bannerApi.middleware)
      .concat(categoryApi.middleware),
});
