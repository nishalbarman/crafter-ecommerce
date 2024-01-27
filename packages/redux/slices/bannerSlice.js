import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  bannerItems: [
    {
      imageUrl:
        "https://imgs.search.brave.com/6mgkC9IaOSq5lrzyk11WYgz91nOMcrzri79lIsLSTNU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL0VV/czRxTjNUcWNYOTU3/eWFwM0hEaTNrVGls/dm1ibGkwbFF1aTFr/bWpub1dmc19CV2pL/amVVSE1weWlXZjNz/OVAwTUZPT1k2a1pz/V3hqM3AxQ2doeXVx/d0xLc2pXSmN2Y2Fx/NWhTeE9iZUVqVHI5/WXZzZl9PNDFGX1Fo/VGlPbGVkNDBVUFhw/aEFEaG03S0JGRnN3/QmpwNGc",
      altText: "Woman with one drink",
      title: "Woman with one drink",
      description: "A woman is holding one glass of wine",
      path: "/",
    },
    {
      imageUrl:
        "https://imgs.search.brave.com/UBtyLY3OaMnsAfV8pyvhmdueu15W1MyxxOmapjIJuME/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/dXNlYXN0MS5rYXB3/aW5nLmNvbS9zdGF0/aWMvZVpjLVNvdW5j/bG91ZC1CYW5uZXIt/SW1hZ2Uud2VicA",
      altText: "Normal picture of a banner",
      title: "Normal picture of a banner",
      description: "Normal picture of a banner",
      path: "/home",
    },
    {
      imageUrl:
        "https://imgs.search.brave.com/ly_ZswOCDZad3g1Tq6ZMXXu4THtAXYrt3DmZlloTfto/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YmlnZm90by5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTkv/MTEvYWlycGxhbmUt/MTAyNHg2ODMuanBn",
      altText: "A beautiful scenario",
      title: "A beautiful scenario",
      description: "A beautiful scenario",
      path: "/ios",
    },
    // Add more items as needed
  ],
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  reducers: {
    // add Banner -> action creator
    addBanner: (state, { payload: banner }) => {
      return { banner, ...state };
    },
    // remove Banner -> action creator
    removeBanner: (state, { paylod: index }) => {
      state.splice(index, 1);
    },
    // update Banner -> action creator
    updateBanner: (state, { payload: items }) => {
      state.bannerItems = items;
    },
  },
});

export const { updateBanner } = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
