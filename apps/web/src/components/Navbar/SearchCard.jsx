// "use client";

// import Image from "next/image";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// import MyAccount from "./MyAccount";
// import { useDispatch } from "react-redux";
// import { useGetCartQuery, useGetWishlistQuery } from "@store/redux";

// function SearchCard() {
//   const navigator = useRouter();

//   const token = useSelector((state) => state.auth.jwtToken);

//   const wishlistTotalCount = useSelector(
//     (state) => state.wishlistSlice.totalCount
//   );
//   const cartTotalCount = useSelector((state) => state.cartSlice.totalCount);

//   const dispatch = useDispatch();

//   const { data: userCartItems } = useGetCartQuery();
//   const { data: userWishlistItems } = useGetWishlistQuery();

//   useEffect(() => {
//     if (token) {
//       if (userWishlistItems?.length > 0) {
//         const wishlistData = {};
//         userWishlistItems?.forEach((item) => {
//           wishlistData[item.product._id] = item.product;
//         });
//         dispatch(
//           updateWishlist({
//             totalCount: data.length || 0,
//             wishlists: wishlistData,
//           })
//         );
//       }
//     }
//   }, [userWishlistItems]);

//   useEffect(() => {
//     if (userCartItems?.length > 0) {
//       const cartDataForStore = {};

//       userCartItems?.forEach((item) => {
//         cartDataForStore[item.product._id] = {
//           ...item.product, // to fix the override _id issue we should place this line in 2nd place
//           ...item, //will override the previouse product _id
//           _id: item.product._id, // we can also manually add the _id field to fix the issue
//           _cartProductId: item._id,
//           product: null,
//         };
//       });

//       dispatch(
//         updateCart({
//           totalCount: cartData.length || 0,
//           cartItems: cartDataForStore,
//         })
//       );
//     }
//   }, [userCartItems]);

//   return (
//     <>
//       {/* search bar with icon */}
//       <div className="hidden lg:flex items-center justify-center h-[42px] w-fit bg-[#F5F4F4] rounded-[4px]">
//         <input
//           className="font-andika tracking-[1px] flex items-center placeholder:text-sm h-full w-full border-none outline-none rounded-[4px] bg-[#F5F4F4] p-4"
//           type="text"
//           name="search-text"
//           placeholder="What are you looking for?"
//         />
//         <div className="h-[25px] w-[25px] mr-3 flex items-center">
//           <Image
//             src="/assets/search.svg"
//             alt="search logo"
//             width={27}
//             height={27}
//           />
//         </div>
//       </div>

//       <div
//         onClick={() => {
//           navigator.push("/wishlist");
//         }}
//         className="h-fit w-fit relative cursor-pointer">
//         {wishlistTotalCount != 0 && (
//           <div
//             className={`box-content absolute z-[1] flex items-center justify-center aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
//             <span className="text-[10px] text-white font-semibold">
//               {wishlistTotalCount}
//             </span>
//           </div>
//         )}
//         <Image src="/assets/love.svg" alt="love logo" width={31} height={31} />
//       </div>

//       <div
//         onClick={() => {
//           navigator.push("/cart");
//         }}
//         className="h-fit w-fit relative cursor-pointer">
//         {cartTotalCount != 0 && (
//           <div
//             className={`box-content absolute z-[1] flex items-center justify-center  aspect-square right-[-5px] rounded-full p-1 absolute bottom-5 bg-[#DB4444] min-w-4 min-h-4`}>
//             <span className="text-[10px] text-white font-semibold">
//               {cartTotalCount}
//             </span>
//           </div>
//         )}
//         <Image
//           className="transform translate-y-[1px] cursor-pointer"
//           src="/assets/cart.svg"
//           alt="cart logo"
//           width={28.5}
//           height={28.5}
//         />
//       </div>

//       <div className="h-fit w-fit relative group mb-[8px]">
//         <Image
//           className="cursor-pointer transform translate-y-[0.14rem]"
//           src="/assets/user.svg"
//           alt="user logo"
//           width={35}
//           height={35}
//         />
//         <div className="absolute top-6 pt-2 right-[-15px] z-[999] ease-linear duration-300 group-hover:flex hidden">
//           <div className="bg-black opacity-[0.8] rounded-[5px]">
//             <MyAccount />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SearchCard;
