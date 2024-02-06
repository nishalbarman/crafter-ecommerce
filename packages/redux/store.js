import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { wishlistReducer } from "./slices/wishlistSlice";
// import { bannerReducer } from "./slices/bannerSlice";
import { keywordReducer } from "./slices/keywordsSlice";
import { categoryReducer } from "./slices/categorySlice";
import { bannerApi } from "./RTK_Query/bannerRTK";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    banner: bannerApi.reducer,
    keywords: keywordReducer,
    category: categoryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bannerApi.middleware),
});
