import React, { useRef } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeCartProduct } from "@store/redux/cartLocal";
import {
  addWishlistProduct,
  removeWishlistProduct,
} from "@store/redux/wishlistLocal";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import Link from "next/link";

function CartItem(item) {
  const {
    _id,
    title,
    imageUrl,
    originalPrice,
    discountedPrice,
    quantity,
    totalNumberOfRatings,

    cartItems,
    wishlistItems,

    addNewWishlist,
    removeOneWishlist,
    removeOneFromCart,
  } = item;

  const dispatch = useDispatch();
  const cookiesStore = useCookies();

  const token = cookiesStore?.get("token") || null;

  const quantityModalRef = useRef();
  const sizeModalRef = useRef();
  const colourModalRef = useRef();

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!token) {
      return toast.success("You need to be logged in first.");
    }
    if (wishlistItems?.hasOwnProperty(_id)) {
      // removeOneWishlist(_id);
      // dispatch(removeWishlistProduct(_id));
    } else {
      addNewWishlist(_id);
      dispatch(
        addWishlistProduct({
          _id,
          title,
          imageUrl,
          originalPrice,
          discountedPrice,
          totalNumberOfRatings,
        })
      );
      if (cartItems?.hasOwnProperty(_id)) {
        removeOneFromCart(_id);
        dispatch(removeCartProduct(_id));
      }
    }
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (!token) {
      return toast.success("You need to be logged in first.");
    }
    removeOneFromCart(_id);
    dispatch(removeCartProduct(_id));
  };

  return (
    <>
      {/* cart item */}
      <div className="p-[2.5%_2.5%_0_2.5%] border-[1px] border-[rgb(204,204,204)] rounded-[5px] mb-[20px]">
        <div className="upper flex justify-between max-[588px]:flex-col-reverse">
          <div>
            <Link
              className="text-[rgba(0,0,0,0.7)] font-semibold text-[16px] mb-[8px] cursor-pointer w-[100%] hover:text-[rgba(0,0,0,0.9)] font-andika text-left"
              href={`/products/${_id}`}>
              <p className="text-[rgba(0,0,0,0.7)] font-semibold text-[16px] mb-[8px] cursor-pointer w-[100%] hover:text-[rgba(0,0,0,0.9)] font-andika text-left">
                {title}
              </p>
            </Link>
            <p className="mb-[8px]">
              <span className="text-[rgb(51,51,51)] text-[18px] font-bold">
                ₹{discountedPrice}
              </span>{" "}
              <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px] line-through">
                ₹{originalPrice}
              </span>
            </p>
            <p className="text-[rgb(50,140,91)] text-[16px] mb-[10px]">
              You saved <span>₹{originalPrice - discountedPrice} INR</span>
            </p>

            <div className="qp flex justify-start mt-[20px] mb-[30px] max-[961px]:flex-col max-[961px]:gap-2">
              <div
                className="mr-[16px] cursor-pointer p-[8px_12px] border-[1px] border-[rgba(0,0,0,0.12)] rounded-[5px]"
                id="sizeButton">
                <span>Size :</span>{" "}
                <b>
                  {" "}
                  <span id="size">S</span>{" "}
                </b>{" "}
                <i className="fa-solid fa-angle-down mr-[3px]" />
              </div>
              <div
                className="mr-[16px] cursor-pointer p-[8px_12px] border-[1px] border-[rgba(0,0,0,0.12)] rounded-[5px]"
                id="qtyButton">
                <span>Qty :</span>{" "}
                <b>
                  {" "}
                  <span id="qty">{quantity}</span>{" "}
                </b>{" "}
                <i className="fa-solid fa-angle-down mr-[3px]" />
              </div>
            </div>
          </div>

          <div className="ml-[40px] max-[588px]:ml-0 max-[588px]:w-[100%] max-[588px]:flex max-[588px]:items-center max-[588px]:justify-center">
            <img
              className="rounded-[5px] h-[150px] max-[500px]:aspcet-square"
              src={
                "https://imgs.search.brave.com/rKZrmkTSLXfWaqAnvfSt_tW5IIPY3CC1G9d_ujAhEPo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM5/NTE5MTU4NC9waG90/by9ibHVldG9vdGgt/c3BlYWtlci1pc29s/YXRlZC1vbi13aGl0/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9cFVhVWk1TVNq/SmJpbXdkXzBrQ2Nv/a1BlWHQ0WHlhQ3Qx/UnQ2S2h3ZXJzYz0"
              }
              alt={title}
            />
          </div>
        </div>

        <div className="bottom_section flex w-[100%] text-center text-[rgba(0,0,0,0.7)] border-t-[2px] border-t-[rgba(0,0,0,0.04)] m-[0px_10px] text-[12px] mt-[15px] mb-0">
          <div
            onClick={handleRemoveFromCart}
            id="removeButton"
            className="p-[18px_0px] w-[35%] border-r-[2px] border-r-[rgba(0,0,0,0.04)] cursor-pointer text-[14px]">
            Remove
          </div>

          <div
            onClick={handleAddToWishlist}
            id="wishList"
            className="p-[18px_0px] w-[65%] cursor-pointer text-[14px]">
            Move to Wishlist
          </div>
        </div>
      </div>

      {/* size modal */}
      <div
        ref={sizeModalRef}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="size_modal">
        <div className="size_model_container absolute overflow-hidden w-fit max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[20px] rounded-[5px]">
          <p className="text-center mb-[15px] text-[14px] opacity-[0.7] block">
            Select Size
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="S">
            S
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="M">
            M
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="L">
            L
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="XL">
            XL
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="2XL">
            2XL
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="3XL">
            3XL
          </p>
        </div>
      </div>

      {/* quantity modal  */}
      <div
        ref={quantityModalRef}
        className="hidden bg-[rgb(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="qty_modal">
        <div className="qty_model_container absolute overflow-hidden w-fit max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[20px] text-center rounded-[5px]">
          <p className="mb-[15px] text-[14px] opacity-[0.7] block">
            Select Quantity
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="1">
            1
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="2">
            2
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="3">
            3
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="4">
            4
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="5">
            5
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="6">
            6
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="7">
            7
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="8">
            8
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="9">
            9
          </p>
          <p
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="10">
            10
          </p>
        </div>
      </div>
    </>
  );
}

export default CartItem;
