import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { wishlistReducer } from "./slices/wishlistSlice";
import { bannerReducer, updateBanner } from "./slices/bannerSlice";
import { keywordReducer } from "./slices/keywordsSlice";
import { categoryReducer } from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    banner: bannerReducer,
    keywords: keywordReducer,
    category: categoryReducer,
  },
});

export {
  bannerReducer,
  cartReducer,
  categoryReducer,
  keywordReducer,
  wishlistReducer,
  updateBanner,
};
