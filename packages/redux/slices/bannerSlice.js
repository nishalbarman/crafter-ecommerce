import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  bannerItems: [
    {
      imageUrl:
        "https://imgs.search.brave.com/m0bwS_KsA5PYBlGuh5K5_nfWDrOB2P1Fo34oguIQyuU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJy/dTViL3N0eWxlcy9i/YW5uZXJCYWNrZ3Jv/dW5kSW1hZ2VfNWpz/bmo4ZW5sbmVhMS5q/cGc_Zm9ybWF0PXBq/cGcmcz01YzE1NzRh/OWM0MGQ4MjgwZTE0/NGY0Y2EwMjVlOWFj/ZTg0OGU1ZDE0",
      altText: "Woman with one drink",
      title: "Woman with one drink",
      description: "A woman is holding one glass of wine",
      path: "/",
    },
    {
      imageUrl:
        "https://imgs.search.brave.com/6mgkC9IaOSq5lrzyk11WYgz91nOMcrzri79lIsLSTNU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL0VV/czRxTjNUcWNYOTU3/eWFwM0hEaTNrVGls/dm1ibGkwbFF1aTFr/bWpub1dmc19CV2pL/amVVSE1weWlXZjNz/OVAwTUZPT1k2a1pz/V3hqM3AxQ2doeXVx/d0xLc2pXSmN2Y2Fx/NWhTeE9iZUVqVHI5/WXZzZl9PNDFGX1Fo/VGlPbGVkNDBVUFhw/aEFEaG03S0JGRnN3/QmpwNGc",
      altText: "Normal picture of a banner",
      title: "Normal picture of a banner",
      description: "Normal picture of a banner",
      path: "/home",
    },
    {
      imageUrl:
        "https://imgs.search.brave.com/-g7c7St9_tIFkJTnsuQ0_jFFPPF6YVTMhDheNohdXB0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvYmFu/bmVyLXRlbXBsYXRl/LW1lZ2Etc2FsZV8y/My0yMTQ4NzI5NTMw/LmpwZz9zaXplPTYy/NiZleHQ9anBn",
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
