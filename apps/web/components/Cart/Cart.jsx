"use client";

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useDeleteCartMutation } from "@store/redux/cart";
import { useAddWishlistMutation } from "@store/redux/wishlist";

import CartItem from "./CartItem";

function Cart() {
  const [couponCode, setCouponCode] = useState({
    value: "",
    isTouched: false,
    isError: false,
    error: "Coupon invalid",
  });

  const [appliedCoupon, setAppliedCoupon] = useState(); // coupon which needs to be sent to server, coupon will be stored here after applying.

  const cartData = useSelector((state) => state.cartLocal.cartItems);
  const cartCount = useSelector((state) => state.cartLocal.totalItems);
  const wishlistItems = useSelector(
    (state) => state.wishlistLocal.wishlistItems
  );

  const couponApplyModalRef = useRef();
  const couponThankYouRef = useRef();
  const quantityModalRef = useRef();
  const sizeModalRef = useRef();
  const colourModalRef = useRef();

  const [
    removeOneFromCart,
    { isLoading: isLoadingRmCart, isError: isErrorRmCart },
  ] = useDeleteCartMutation();
  const [addNewWishlist, { isLoading, isError }] = useAddWishlistMutation();

  const handleCouponCodeKeyUp = (e) => {
    setCouponCode((prev) => ({
      ...prev,
      isTouched: true,
      isError: !prev.value,
      value: e.target.value,
    }));
  };

  console.log(couponCode);

  const handleCouponFormSubmit = async (e) => {
    e.preventDefault();

    console.log(couponCode);
    if (couponCode.value === "") {
      return setCouponCode((prev) => ({ ...prev, isError: true }));
    }

    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: true });
      }, 500);
    });

    if (response.status) {
      couponApplyModalRef.current.classList.add("hidden");
      couponThankYouRef.current.classList.remove("hidden");
    }

    setCouponCode((prev) => ({ value: "", isError: false, isTouched: false }));

    setTimeout(() => {
      couponThankYouRef.current.classList.add("hidden");
    }, 800);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <p className="text-xl font-andika">Cart ({cartCount})</p>
        <button className="rounded-[4px] border-[1px] border-[black] h-[45px] w-[150px] p-[0px_20px]">
          Remove All
        </button>
      </div>

      {cartCount !== 0 && (
        <div className="main-div">
          <p className="mb-2 pl-[5px] text-[17px] text-[#181818]">
            <b>My Bag </b>
            <span id="total-items">
              {cartCount} {cartCount > 1 ? "items" : "item"}
            </span>
          </p>

          {/* Cart items, price and coupon section  */}
          <div className="flex max-[961px]:flex-col gap-[20px] ">
            {/* cart items container  */}
            <div
              className="w-[58.33333333%] max-[961px]:w-[100%]"
              id="cart-item-container">
              <div className="flex rounded-[5px] bg-[rgb(252,255,238)] items-center p-[20px] mb-[20px]">
                <img
                  className="w-[19px] h-[12px] duration-2000 transition mr-[5px]"
                  src="/assets/truck.svg"
                  alt="truck"
                />
                <p className="text-black text-[15px]">
                  Yay! You get FREE delivery on this order
                </p>
              </div>
              <div id="cart-append">
                {Object.values(cartData)?.map((item) => {
                  return (
                    <CartItem
                      key={item._id}
                      {...item}
                      removeOneFromCart={removeOneFromCart}
                      addNewWishlist={addNewWishlist}
                      wishlistItems={wishlistItems}
                      cartItems={cartData}
                    />
                  );
                })}
              </div>
            </div>

            {/* payments details and coupons */}
            <div className="w-[41.66666667%] max-[961px]:w-[100%]">
              <div id="coupons_text">
                <div className="mb-[15px] rounded-[4px] border-[1px] border-[rgb(234,234,234)] bg-[rgb(255,255,255)] text-[rgb(45,45,45)] leading-[1.44] text-[14px] p-[5px_15px]">
                  <p className="text-[16px]">
                    Whistles! Get extra 20% Cashback on any orders. Coupon code
                    - MASAI20. Applicable for new/old customers!
                  </p>
                </div>
              </div>
              <div className="apply_coupon_outer p-[6px] border-[1px] border-[#eaeaea] text-overflow-none overflow-none">
                <div
                  onClick={() => {
                    couponApplyModalRef.current.classList.remove("hidden");
                  }}
                  className="flex items-center justify-between items-center cursor-pointer h-[32px] w-[100%] bg-[rgba(66,162,161,0.1)] rounded-[5px] p-[10px] text-overflow-none overflow-none"
                  id="couponApply">
                  <span className="font-bold text-[12px] text-[#42a2a2] w-auto text-center overflow-none text-nowrap text-overflow-none">
                    Apply Coupon / Gift Card
                  </span>

                  <span className="font-bold text-[12px] text-[#42a2a2] text-left overflow-none text-nowrap text-overflow-none">
                    Redeem!{" "}
                    <img
                      src="https://images.bewakoof.com/web/coupon-redeem-arrow-1634641878.png"
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div id="couponApplied"></div>
              <div className="price_details border-[1px] border-[#e0e0e0] mb-[20px] pr-0">
                <div className="text-[11px] uppercase bg-[rgb(235,235,235)] p-[13px_20px] font-bold mb-[20px]">
                  <p>PRICE SUMMARY</p>
                </div>
                <div className="flex p-[0px_20px] pb-[4px]">
                  <p className="text-left w-[100%] text-[14px] ">
                    Total MRP (Incl. of taxes)
                  </p>
                  <p
                    className="text-right w-[100%] text-[14px] "
                    id="originalprice">
                    ₹2598
                  </p>
                </div>
                <div className="flex p-[0px_20px] pb-[10px]">
                  <p className="text-left w-[100%] text-[14px] ">
                    Shipping Charges{" "}
                  </p>
                  <p
                    className="text-right w-[100%] text-[14px] "
                    id="shippingprice">
                    FREE
                  </p>
                </div>
                <div className="flex p-[0px_20px] pb-[15px]">
                  <p className="text-left w-[100%] text-[14px]">Bag Discount</p>
                  <p
                    className="text-right w-[100%] text-[14px]"
                    id="bagdiscount">
                    - ₹1300
                  </p>
                </div>
                <div className="flex p-[0px_20px] pb-[15px] font-bold">
                  <p className="text-left w-[100%] text-[14px]">Subtotal </p>
                  <p className="text-right w-[100%] text-[14px]" id="subtotal">
                    ₹1298
                  </p>
                </div>

                <div className="price_bottom_section flex text-[12px] p-[10px_20px] border-t-[1px] border-t-[rgba(0,0,0,0.12)] shadow-none static mt-[30px] w-[100%]">
                  <div className="block text-[#000] leading-[20px] p-[0_0_4px] w-[100%]">
                    <p className="text-[14px] mb-[1px]">Total</p>
                    <p className="text-[18px]" id="totalprice">
                      ₹ 1298
                    </p>
                  </div>

                  <button
                    className="bg-[rgb(66,162,162)] border-[rgb(66,162,162)] text-white p-[15px] bg-[#42a2a2] bg-[rgb(219,69,69)] rounded-[5px] text-[16px] leading-[18px] uppercase w-[100%] border-none cursor-pointer"
                    id="continuePayment">
                    Continue
                  </button>
                </div>
                <div className="flex justify-around p-[15px]">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] mb-[6px] text-[#8f98a9]"
                      src="https://images.bewakoof.com/web/cart-badge-trust.svg"
                      alt="cart_100%_secure"
                    />
                    <p className="text-[8px] leading-[12px] text-center text-[#c7cbd4]">
                      100% SECURE PAYMENTS
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] mb-[6px] text-[#8f98a9]"
                      src="https://images.bewakoof.com/web/cart-easy-return.svg"
                      alt="quick_return"
                    />
                    <p className="text-[8px] leading-[12px] text-center text-[#c7cbd4]">
                      EASY RETURNS & QUICK REFUNDS
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] mb-[6px] text-[#8f98a9]"
                      src="https://images.bewakoof.com/web/quality-check.svg"
                      alt="quality_assurance"
                    />
                    <p className="text-[8px] leading-[12px] text-center text-[#c7cbd4]">
                      QUALITY ASSURANCE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* empty cart display */}
      {cartCount === 0 && (
        <div
          id="emptydisplay"
          className="no-item hidden flex-col justify-center items-center gap-[10px] mt-[40px]">
          <img
            className="m-auto w-[150px]"
            src="https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png"
            alt="empty-bag"
            style={{ margin: "auto", width: 150 }}
          />
          <p className="text-[18px] text-[rgb(0,0,0,0.8)]">
            Nothing in the bag
          </p>
          <a
            className="p-[12px_12px] border-[2opx] border-[black] inline-block mt-[15px] text-[#51cccc] mb-[20px] font-bold"
            id="continuetohome"
            href="/index.html">
            Continue Shopping
          </a>

          {/* <div className="category">
            <p>You could try one of these categories:</p>
            <div id="resp-table">
              <div id="resp-table-body">
                <div className="resp-table-row">
                  <div className="table-body-cell">Men</div>
                  <div className="table-body-cell">Topwear</div>
                  <div className="table-body-cell">Bottomwear</div>
                </div>

                <div className="resp-table-row">
                  <div className="table-body-cell"></div>
                  <div className="table-body-cell">Footwear</div>
                  <div className="table-body-cell">Bestsellers</div>
                </div>
                <br />
                <br />
                <div className="resp-table-row">
                  <div className="table-body-cell">Women</div>
                  <div className="table-body-cell">Topwear</div>
                  <div className="table-body-cell">Bottomwear</div>
                </div>

                <div className="resp-table-row">
                  <div className="table-body-cell"></div>
                  <div className="table-body-cell">Bestsellers</div>
                  <div className="table-body-cell"></div>
                </div>
                <br />
                <br />
                <div className="resp-table-row">
                  <div className="table-body-cell">Mobile Covers</div>
                  <div className="table-body-cell">All Mobile Covers</div>
                  <div className="table-body-cell"></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      )}

      {/* modals section  */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          couponApplyModalRef.current.classList.add("hidden");
        }}
        ref={couponApplyModalRef}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="coupon_modal">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="coupon_model_container absolute overflow-hidden w-[370px] max-h-[100%] top-[50%] left-[50%] bg-[#fff] transfrom translate-x-[-50%] translate-y-[-50%] p-[20px] text-center rounded-[5px]">
          <p className="coupon_title_apply_box text-[16px] text-[#000] relative mb-[40px] text-center font-bold">
            Apply Coupon / Gift Card
          </p>
          <form onSubmit={handleCouponFormSubmit} id="coupon-form">
            <input
              //
              onKeyUp={handleCouponCodeKeyUp}
              className="text-[14px] uppercase outline-none p-[5px_0px] border-b-[2px] border-b-[#42a2a2] border-b-[rgb(219,69,69)] w-[100%] mb-[10px] placeholder:text-[rgba(0,0,0,0.3)] placeholder:opacity-[1] placeholder:font-bold focus:border-b-[2px] focus:border-b-[rgb(219,69,69)]"
              type="text"
              id="cpn_code"
              placeholder="ENTER CODE"
              autoComplete="false"
            />
            {couponCode?.isError && (
              <div
                className="p-[12px] bg-[rgb(253,244,244)] w-[100%] rounded-[5px]"
                id="error_coupon_holder">
                <p
                  className="text-[12px] leading-[13px] text-[#e02020] text-left"
                  id="error-text">
                  {couponCode?.error || "Coupon invalid"}
                </p>
              </div>
            )}

            <button
              disabled={
                !couponCode || !couponCode.isTouched || couponCode.isError
              }
              className="bg-[#42a2a2] bg-[rgb(219,69,69)] disabled:cursor-not-allowed disabled:bg-[rgba(219,69,69,0.2)] border-none rounded-[5px] text-[#fff] text-[16px] uppercase p-[16px_0] block w-[100%] mt-[20px] cursor-pointer"
              type="submit">
              APPLY
            </button>
          </form>
        </div>
      </div>

      {/* size modal */}
      <div
        ref={sizeModalRef}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="size_modal">
        <div className="size_model_container absolute overflow-hidden w-fit max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[20px] text-center rounded-[5px]">
          <p className="hover:bg-[rgb(230,230,230)] mb-[15px] text-[12px] opacity-[0.7] block">
            Select Size
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="S">
            S
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="M">
            M
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="L">
            L
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="XL">
            XL
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="2XL">
            2XL
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
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
          <p className="mb-[15px] text-[12px] opacity-[0.7] block">
            Select Quantity
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="1">
            1
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="2">
            2
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="3">
            3
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="4">
            4
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="5">
            5
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="6">
            6
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="7">
            7
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="8">
            8
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="9">
            9
          </p>
          <p
            className="hover:bg-[rgb(230,230,230)] text-[16px] p-[10px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer"
            id="10">
            10
          </p>
        </div>
      </div>

      {/* coupon applied tick mark modal */}
      <div
        ref={couponThankYouRef}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="coupon_thank_you">
        <div className="coupon_model_thank_container absolute overflow-hidden w-[360px] max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[48px] text-center rounded-[5px] flex flex-col gap-3 justify-center items-center">
          <img
            className="tickMarkCoupon w-[95px] h-[95px]"
            src="/assets/tickmark-animation.gif"
            alt="couponTick"
          />
          <p className="coupon_applied_msg text-[14px] mt-[16px] ">
            Coupon Successfully Applied
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Cart;

{
  /* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl-grid-cols-6 gap-5 items-center m-[40px_0] w-[100%]"> */
}
{
  /* <div className="grid grid-cols-4 w-[100%] shadow rounded p-[20px_25px]">
        <div className="w-[100%] flex justify-start items-center">
          <span className="font-semibold">Product</span>
        </div>
        <div className="w-[100%] flex justify-center items-center">
          <span className="font-semibold">Price</span>
        </div>
        <div className="w-[100%] flex justify-center items-center">
          <span className="font-semibold">Quantity</span>
        </div>
        <div className="w-[100%] flex justify-center items-center">
          <span className="font-semibold">Subtotal</span>
        </div>
      </div> */
}
{
  /* /* bewakoof cart section */
}
