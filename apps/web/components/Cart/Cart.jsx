"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDeleteCartMutation } from "@store/redux/cart";
import { updateCart } from "@store/redux/cartLocal";
import { useAddWishlistMutation } from "@store/redux/wishlist";

import CartItem from "./CartItem";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Cart() {
  const [couponCode, setCouponCode] = useState({
    value: "",
    isTouched: false,
    isError: false,
    error: "Coupon invalid",
  });

  const [appliedCoupon, setAppliedCoupon] = useState(); // coupon which needs to be sent to server, coupon will be stored here after applying.

  const [hash, setHash] = useState("");
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderStatus, setOrderStatus] = useState(true);
  const [orderStatusText, setOrderStatusText] = useState("");

  const cartData = useSelector((state) => state.cartLocal.cartItems);
  const cartCount = useSelector((state) => state.cartLocal.totalItems);
  const wishlistItems = useSelector(
    (state) => state.wishlistLocal.wishlistItems
  );

  const dispatch = useDispatch();

  const couponApplyModalRef = useRef();
  const couponThankYouRef = useRef();
  const transactionLoadingRef = useRef();
  const transactionStatusRef = useRef();

  const [
    removeOneFromCart,
    { isLoading: isLoadingRmCart, isError: isErrorRmCart },
  ] = useDeleteCartMutation();
  const [addNewWishlist, { isLoading, isError }] = useAddWishlistMutation();

  const navigation = useRouter();

  const handleCouponCodeKeyUp = (e) => {
    setCouponCode((prev) => ({
      ...prev,
      isTouched: true,
      isError: !prev.value,
      value: e.target.value,
    }));
  };

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

  const initiatePayment = (pay) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://test.payu.in/_payment"; // URL of your payment page
    form.target = "PaymentPopup";

    // Add each key-value pair from postData as a hidden input field
    for (const key in pay) {
      if (pay.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = pay[key];
        form.appendChild(input);
      }
    }

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();

    // Clean up the form after submission
    document.body.removeChild(form);
  };

  const handlePaymentContinueClick = async () => {
    const isAddressAvailble = true || localStorage.getItem("isAddressAvailble");
    if (isAddressAvailble) {
      const response = await axios.get(`/api/v1/payment/payu/cart-hash`); // generate hash

      console.log(response?.data);

      const pay = response.data.paymentDetails;

      initiatePayment(pay);

      transactionLoadingRef.current.classList.remove("hidden");

      // Define a function to handle custom events from the popup
      function handlePopupEvent(event) {
        // Handle the event from the popup
        var data = event.detail;
        console.log("Received data from popup:", data);

        // Close loading indicator or perform any other actions

        if (!data?.success) {
          transactionLoadingRef.current.classList.add("hidden");
          transactionStatusRef.current.classList.remove("hidden");
          setOrderStatusText("Order Placed Successfully");
          setOrderStatus(true);
          dispatch(updateCart({ totalCount: 0, cartItems: {} }));
        } else {
          transactionLoadingRef.current?.classList.add("hidden");
          transactionStatusRef.current?.classList.remove("hidden");
          setOrderStatus(false);
          setOrderStatusText("Order Failed");
        }
        document.removeEventListener("paymentResponseData", handlePopupEvent);
      }

      // Listen for custom events from the popup
      document.addEventListener("paymentResponseData", handlePopupEvent);
    } else {
      navigation.push("/billing?redirect=payment-cart");
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    let subtotalPrice = 0;
    let totalDiscountPrice = 0;

    Object.values(cartData).map((item) => {
      totalPrice += item.originalPrice;
      subtotalPrice += item.discountedPrice;
      totalDiscountPrice += item.originalPrice - item.discountedPrice;
    });

    setTotalPrice(totalPrice);
    setSubtotalPrice(subtotalPrice);
    setTotalDiscountPrice(totalDiscountPrice);
  }, [cartData]);

  return (
    <>
      {/* <div className="flex justify-between items-center mb-10">
        <p className="text-xl font-andika">Cart ({cartCount})</p>
        <button className="rounded-[4px] border-[1px] border-[black] h-[45px] w-[150px] p-[0px_20px]">
          Remove All
        </button>
      </div> */}

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
                  {/* Yay! You get FREE delivery on this order */}
                  Get FREE delivery over ₹499
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
                    Redeem!&nbsp;
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
                    ₹{totalPrice}
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
                    - ₹{totalDiscountPrice}
                  </p>
                </div>
                <div className="flex p-[0px_20px] pb-[15px] font-bold">
                  <p className="text-left w-[100%] text-[14px]">Subtotal </p>
                  <p className="text-right w-[100%] text-[14px]" id="subtotal">
                    ₹{subtotalPrice}
                  </p>
                </div>

                <div className="price_bottom_section flex text-[12px] p-[10px_20px] border-t-[1px] border-t-[rgba(0,0,0,0.12)] shadow-none static mt-[30px] w-[100%]">
                  <div className="block text-[#000] leading-[20px] p-[0_0_4px] w-[100%]">
                    <p className="text-[14px] mb-[1px]">Total</p>
                    <p className="text-[18px]" id="totalprice">
                      ₹{subtotalPrice}
                    </p>
                  </div>
                  {/* border-[rgb(66,162,162)] bg-[#42a2a2]  */}
                  <button
                    onClick={handlePaymentContinueClick}
                    className="text-white p-[15px] bg-[rgb(219,69,69)] rounded-[5px] text-[16px] leading-[18px] uppercase w-[100%] border-none cursor-pointer">
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
      {cartCount <= 0 && (
        <div
          id="emptydisplay"
          className="flex flex-col justify-center items-center gap-[10px] mt-[40px]">
          <Image
            draggable={false}
            className="m-auto w-[300px] select-none user-drag-none"
            src="/assets/empty-cart.svg"
            width={500}
            height={500}
            alt="empty-bag"
            style={{ margin: "auto" }}
          />
          <p className="text-[18px] text-[rgb(0,0,0,0.8)] text-center">
            Nothing in the bag
          </p>
          <Link
            className="p-[12px_20px] border-[2opx] border-[black] inline-block mt-[15px] text-[white] mb-[20px] font-bold text-center bg-[rgb(219,68,68)] rounded"
            href="/products">
            Continue Shopping
          </Link>

          {/* <div className="category flex flex-col justify-center items-center gap-5">
            <p className="">You could try one of these categories:</p>
            <div className="flex gap-10">
              <div className="resp-table-row flex flex-col gap-2 items-start justify-start">
                <div className="table-body-cell">Men</div>
                <div className="table-body-cell">Topwear</div>
                <div className="table-body-cell">Bottomwear</div>
              </div>

              <div className="resp-table-row flex flex-col gap-2 items-start justify-start">
                <div className="table-body-cell"></div>
                <div className="table-body-cell">Footwear</div>
                <div className="table-body-cell">Bestsellers</div>
              </div>
              <br />
              <br />
              <div className="resp-table-row flex flex-col gap-2 items-start justify-start">
                <div className="table-body-cell">Women</div>
                <div className="table-body-cell">Topwear</div>
                <div className="table-body-cell">Bottomwear</div>
              </div>

              <div className="resp-table-row flex flex-col gap-2 items-start justify-start">
                <div className="table-body-cell"></div>
                <div className="table-body-cell">Bestsellers</div>
                <div className="table-body-cell"></div>
              </div>
              <br />
              <br />
              <div className="resp-table-row flex flex-col gap-2 items-start justify-start">
                <div className="table-body-cell">Mobile Covers</div>
                <div className="table-body-cell">All Mobile Covers</div>
                <div className="table-body-cell"></div>
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
              onKeyUp={handleCouponCodeKeyUp}
              className="text-[14px] uppercase outline-none p-[5px_0px] border-b-[2px] border-b-[#42a2a2] w-[100%] mb-[10px] placeholder:text-[rgba(0,0,0,0.3)] placeholder:opacity-[1] placeholder:font-bold focus:border-b-[2px] focus:border-b-[#42a2a2]"
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
              className="bg-[#42a2a2] disabled:cursor-not-allowed disabled:bg-[#42a2a2]-200 border-none rounded-[5px] text-[#fff] text-[16px] uppercase p-[16px_0] block w-[100%] mt-[20px] cursor-pointer"
              type="submit">
              APPLY
            </button>
          </form>
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

      {/* transaction loading */}
      <div
        ref={transactionLoadingRef}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="coupon_thank_you">
        <div className="coupon_model_thank_container absolute overflow-hidden w-[360px] max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[48px] text-center rounded-[5px] flex flex-col gap-3 justify-center items-center">
          <Image
            className="w-[95px] h-[95px]"
            src="/assets/loading-animation1.gif"
            width={95}
            height={95}
            alt="couponTick"
          />
          <p className="coupon_applied_msg text-[14px] mt-[6px] ">
            Loading... Please complete the payment
          </p>
        </div>
      </div>

      {/* transaction status */}
      <div
        ref={transactionStatusRef}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]">
        <div className="absolute overflow-hidden w-[360px] max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[48px] text-center rounded-[5px] flex flex-col gap-3 justify-center items-center">
          <img
            className="w-[95px] h-[95px]"
            src={`${orderStatus ? "/assets/tickmark-animation.gif" : "/assets/cross-failed-animation.gif"}`}
            alt="couponTick"
          />
          <p className="text-[16px] mt-[16px] font-bold">{orderStatusText}</p>
          {orderStatus ? (
            <Link
              className="bg-[rgb(219,69,69)] mt-[20px] rounded-md p-3 w-[250px] text-center text-white text-[16px]"
              href={"/myorders"}>
              My Orders
            </Link>
          ) : (
            <button
              onClick={() => {
                console.log(transactionStatusRef.current);
                transactionStatusRef.current?.classList.add("hidden");
              }}
              className="bg-[rgb(219,69,69)] disabled:cursor-not-allowed disabled:bg-[rgb(219,69,69)] border-none rounded-[5px] text-[#fff] text-[16px] uppercase p-[16px_0] block w-[100%] mt-[20px] cursor-pointer"
              type="submit">
              CLOSE
            </button>
          )}
        </div>
      </div>
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
