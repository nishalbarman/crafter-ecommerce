import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 1,
  bannerItems: [
    {
      _id: "65c0967db7c738bbc89a5030",
      imageUrl:
        "https://imgs.search.brave.com/-g7c7St9_tIFkJTnsuQ0_jFFPPF6YVTMhDheNohdXB0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvYmFu/bmVyLXRlbXBsYXRl/LW1lZ2Etc2FsZV8y/My0yMTQ4NzI5NTMw/LmpwZz9zaXplPTYy/NiZleHQ9anBn",
      title: "Normal picture of a banner",
      altText: "Normal Picture",
      description:
        "Description of a banner that is currently not doing anything",
      link: "/home",
    },
    {
      _id: "65c0974db7c738bbc89a5031",
      imageUrl:
        "https://imgs.search.brave.com/6mgkC9IaOSq5lrzyk11WYgz91nOMcrzri79lIsLSTNU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL0VV/czRxTjNUcWNYOTU3/eWFwM0hEaTNrVGls/dm1ibGkwbFF1aTFr/bWpub1dmc19CV2pL/amVVSE1weWlXZjNz/OVAwTUZPT1k2a1pz/V3hqM3AxQ2doeXVx/d0xLc2pXSmN2Y2Fx/NWhTeE9iZUVqVHI5/WXZzZl9PNDFGX1Fo/VGlPbGVkNDBVUFhw/aEFEaG03S0JGRnN3/QmpwNGc",
      title: "Normal picture of a banner",
      altText: "Normal Picture",
      description:
        "Description of a banner that is currently not doing anything",
      link: "/home",
    },
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
    removeBanner: (state, { payload: index }) => {
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
