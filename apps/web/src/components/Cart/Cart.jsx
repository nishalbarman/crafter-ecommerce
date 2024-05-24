"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useRazorpay from "react-razorpay";

import "../../app/scrollbar.css";
import "./spinner.css";

import CartItem from "./CartItem";

function Cart({ userCartItems, userWishlistItems }) {
  const [Razorpay] = useRazorpay();

  const [couponCode, setCouponCode] = useState({
    value: "",
    isTouched: false,
    isError: false,
    error: "Coupon invalid",
  });

  const [couponSubmitLoading, setCouponSubmitLoading] = useState(false);

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [gatewayOption, setGatewayOption] = useState(null);

  const [paymentGatewayList, setPaymentGatewaysList] = useState([]);

  const [appliedCoupon, setAppliedCoupon] = useState(null); // coupon which needs to be sent to server, coupon will be stored here after applying. // id of the coupon

  const [subtotalPrice, setSubtotalPrice] = useState(0); // purchase price
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // original price without the discounts
  const [couponDiscountPrice, setCouponDiscountPrice] = useState(0); // discount of the applied coupon/if any

  const [orderStatus, setOrderStatus] = useState(true);
  const [orderStatusText, setOrderStatusText] = useState("");

  const dispatch = useDispatch();
  const navigation = useRouter();

  const couponApplyModalRef = useRef();
  const couponThankYouRef = useRef();
  const transactionLoadingRef = useRef();
  const transactionStatusRef = useRef();

  const handleCouponCodeKeyUp = (e) => {
    setCouponCode((prev) => ({
      ...prev,
      isTouched: true,
      isError: !!!e.target.value,
      value: e.target.value,
    }));
  };

  const handleCouponFormSubmit = async (e) => {
    try {
      e.preventDefault();

      setCouponSubmitLoading(true);

      if (couponCode.value === "") {
        return setCouponCode((prev) => ({ ...prev, isError: true }));
      }

      if (
        !!appliedCoupon &&
        couponCode.value.toLowerCase() === appliedCoupon.code.toLowerCase()
      ) {
        return setCouponCode((prev) => ({
          ...prev,
          isError: true,
          error: "Coupon already applied!",
        }));
      }

      const response = await axios.get(
        `/api/v1/coupon?code=${couponCode.value}`
      );

      const data = response.data;

      if (!data.status) {
        return setCouponCode((prev) => ({
          ...prev,
          isError: true,
          error: data.message,
        }));
      }

      const couponDiscountPrice = data.coupon.isPercentage
        ? (subtotalPrice / 100) * (parseInt(data.coupon.off) || 0)
        : subtotalPrice > (data.coupon.minimumPayAmount || subtotalPrice + 100)
          ? data.coupon.off
          : 0;
      setCouponDiscountPrice(couponDiscountPrice);
      setAppliedCoupon(couponDiscountPrice > 0 ? data.coupon : null);
      setSubtotalPrice((prev) => prev - couponDiscountPrice);

      couponApplyModalRef.current?.classList.add("hidden");
      couponThankYouRef.current?.classList.remove("hidden");

      setCouponCode((prev) => ({
        value: "",
        isError: false,
        isTouched: false,
      }));

      setTimeout(() => {
        couponThankYouRef.current?.classList.add("hidden");
      }, 800);
    } catch (error) {
      console.log(error);
    } finally {
      setCouponSubmitLoading(false);
    }
  };

  const handleCouponRemove = (e) => {
    setAppliedCoupon(null);
    setCouponDiscountPrice(0);
  };

  const initiatePayment = (pay) => {
    const form = document.createElement("form");
    form.method = "POST";
    // form.action = "https://test.payu.in/_payment"; // URL of your payment page
    form.action = "https://secure.payu.in/_payment"; // URL of your payment page
    form.target = "CARFTER_PaymentPopup";

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

    const popup = window.open("", "_blank");
    if (popup) {
      // Submit the form when the popup is allowed
      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();

      // Clean up the form after submission
      document.body.removeChild(form);
      popup?.close();
    } else {
      // Inform the user if the popup was blocked
      alert("Please enable pop-ups to proceed with payment.");
    }
  };

  const handlePayUContinue = useCallback(async () => {
    if (!gatewayOption) return;
    const isAddressAvailble = true || localStorage.getItem("isAddressAvailble");
    if (isAddressAvailble) {
      try {
        setIsPaymentLoading(true);
        const response = await axios.get(
          `/api/v1/payment/payu/cart-hash${!!appliedCoupon && appliedCoupon._id ? "?coupon=" + appliedCoupon._id : ""}`
        ); // generate hash with coupon

        const pay = response.data.paymentDetails;

        initiatePayment(pay);

        transactionLoadingRef.current?.classList.remove("hidden");

        // Define a function to handle custom events from the popup
        function handlePopupEvent(event) {
          // Handle the event from the popup
          var data = event.detail;

          // Close loading indicator or perform any other actions

          if (data?.success) {
            transactionLoadingRef.current?.classList.add("hidden");
            transactionStatusRef.current?.classList.remove("hidden");
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
      } catch (err) {
        console.log(err);
      } finally {
        setIsPaymentLoading(false);
      }
    } else {
      navigation.push("/billing?redirect=payment-cart");
    }
  }, [appliedCoupon, gatewayOption]);

  const handleRazorPayContinue = useCallback(async () => {
    if (!gatewayOption) return;

    if (true) {
      try {
        setIsPaymentLoading(true);
        const response = await axios.get(
          `/api/v1/payment/razorpay/create-cart-order${!!appliedCoupon && appliedCoupon._id ? "?coupon=" + appliedCoupon._id : ""}`
        ); // generate razor pay order id and also apply coupon if applicable

        const config = {
          key: "***REMOVED***",
          amount: response.data.payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Crafter Ecommerce", //your business name
          description: response.data.payment.productinfo,
          // image: "https://example.com/your_logo",
          order_id: response.data.payment.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            console.log(response);
            dispatch(updateCart({ totalCount: 0, cartItems: {} }));
            setOrderStatus(true);
            setOrderStatusText("Order successful");
            transactionStatusRef.current?.classList.remove("hidden");
            setIsPaymentLoading(false);
            window.scrollTo(0);
          },
          prefill: {
            name: response.data.payment.name, //your customer's name
            email: response.data.payment.email,
            contact: response.data.payment.mobileNo, //Provide the customer's phone number for better conversion rates
          },
          theme: {
            color: "#DB4545",
          },
        };

        const razorPay = new Razorpay(config);

        razorPay.on("payment.failed", function (response) {
          setIsPaymentLoading(false);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
        });

        razorPay.on("payment.dispute.lost", function (response) {
          setIsPaymentLoading(false);
          console.log("Disput closed");
        });

        razorPay.on("payment.dispute.created", function (response) {
          console.log("payment.dispute.created");
        });

        razorPay.on("payment.dispute.closed", function (response) {
          setIsPaymentLoading(false);
          console.log("payment.dispute.closed");
        });

        razorPay.open();
      } catch (error) {
        console.error(error.message);
      }
    } else {
      navigation.push("/billing?redirect=cart&form=submit");
    }
  }, [Razorpay, appliedCoupon, gatewayOption]);

  const handlePayment = (e) => {
    switch (gatewayOption) {
      case "razorpay":
        return handleRazorPayContinue(e);
      case "payu":
        return handlePayUContinue(e);
      default:
        return handleRazorPayContinue(e);
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    let subtotalPrice = 0;
    let totalDiscountPrice = 0;

    userCartItems?.forEach((item) => {
      totalPrice +=
        (item.originalPrice || item.discountedPrice) * (item.quantity || 1);
      subtotalPrice += item.discountedPrice * (item.quantity || 1);
      totalDiscountPrice += !!item.originalPrice
        ? (item.quantity || 1) * (item.originalPrice - item.discountedPrice)
        : 0;
    });

    setTotalPrice(totalPrice);
    setTotalDiscountPrice(totalDiscountPrice);

    if (!!appliedCoupon && appliedCoupon._id) {
      let couponDiscountPrice = appliedCoupon?.isPercentage
        ? (subtotalPrice / 100) * (parseInt(appliedCoupon.off) || 0)
        : subtotalPrice >
            (appliedCoupon.minimumPayAmount || subtotalPrice + 100)
          ? appliedCoupon.off
          : 0;

      setCouponDiscountPrice(couponDiscountPrice);
      setSubtotalPrice(subtotalPrice - (couponDiscountPrice || 0));
    } else {
      setSubtotalPrice(subtotalPrice);
    }
  }, [userCartItems, appliedCoupon]);

  const getPaymentGateways = async () => {
    try {
      const response = await axios.get(`/api/v1/payment/gateways`);
      console.log(response.data.data);
      setPaymentGatewaysList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(paymentGatewayList);
    setGatewayOption(
      paymentGatewayList.length > 0 ? paymentGatewayList[0].title : null
    );
  }, [paymentGatewayList]);

  useEffect(() => {
    getPaymentGateways();
  }, []);

  return (
    <>
      {userCartItems?.length && (
        <div className="flex justify-between items-center mb-10">
          <p className="text-xl font-andika">Cart ({userCartItems?.length})</p>
          <button className="rounded-[4px] border-[1px] border-[black] h-[45px] w-[150px] p-[0px_20px]">
            Remove All
          </button>
        </div>
      )}
      {userCartItems?.length && (
        <div className="main-div">
          <p className="mb-2 pl-[5px] text-[17px] text-[#181818]">
            <b>My Bag </b>
            <span id="total-items">
              {userCartItems?.length}{" "}
              {userCartItems.length > 1 ? "items" : "item"}
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
              <div className="h-[100vh] classname">
                {Object.values(cartData)?.map((item) => {
                  return (
                    <CartItem
                      key={item._id}
                      item={item}
                      userWishlistItems={userWishlistItems}
                      userCartItems={userCartItems}
                    />
                  );
                })}
              </div>
            </div>

            {/* payments details and coupons */}
            <div className="w-[41.66666667%] max-[961px]:w-[100%]">
              <div id="coupons_text">
                {/* <div className="mb-[15px] rounded-[4px] border-[1px] border-[rgb(234,234,234)] bg-[rgb(255,255,255)] text-[rgb(45,45,45)] leading-[1.44] text-[14px] p-[5px_15px]">
                  <p className="text-[16px]">
                    Whistles! Get extra 20% Cashback on any orders. Coupon code
                    - MASAI20. Applicable for new/old customers!
                  </p>
                </div> */}
                <div className="mb-[15px] rounded-[4px] border-[1px] border-[rgb(234,234,234)] bg-[rgb(255,255,255)] text-[rgb(45,45,45)] leading-[1.44] text-[14px] p-[5px_15px]">
                  <p className="text-[16px]">
                    Whistles! Get extra 10% off on any orders. Coupon code:
                    NEW10. Applicable for new customers!
                  </p>
                </div>
              </div>
              <div className="apply_coupon_outer p-[6px] border-[1px] border-[#eaeaea] text-overflow-none overflow-none">
                <div
                  onClick={() => {
                    couponApplyModalRef.current?.classList.remove("hidden");
                  }}
                  className="flex items-center justify-between items-center cursor-pointer h-[32px] w-[100%] bg-[rgba(66,162,161,0.1)] rounded-[5px] p-[10px] text-overflow-none overflow-none"
                  id="couponApply">
                  <span className="font-bold text-[12px] text-[#42a2a2] w-auto text-center overflow-none text-nowrap text-overflow-none">
                    Apply Coupon / Gift Card
                  </span>

                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold text-[12px] text-[#42a2a2] text-left overflow-none text-nowrap text-overflow-none">
                      Redeem!
                    </span>
                    <img
                      className="inline"
                      src="/assets/coupon-redeem-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div id="couponApplied">
                {!!appliedCoupon && (
                  <div className="coupon_card mb-[15px] rounded-[4px] leading-[3px] p-[3px_15px_15px_15px] bg-[rgb(255,251,234)]">
                    <div className="cpn_title_flex flex justify-between items-center">
                      <div className="title_coupon_check flex justify-between items-center">
                        <img
                          className="inline-block w-[14px] h-[14px] mr-[5px]"
                          src="/assets/small-tickmark-checked.png"
                          alt="coupon_applied"
                        />
                        <p
                          className="font-bold text-[13px] text-[rgb(0,0,0)] leading-[1.9]"
                          id="cpn_title">
                          Coupon Applied{" "}
                          <span className="coupon_code p-[3px] text-[#000] border-[1px] border-[#51cccc] border-style-[dashed] text-[12px] uppercase text-nowrap overflow-hidden ml-[3px]">
                            {appliedCoupon?.code}
                          </span>
                        </p>
                      </div>
                      <span
                        onClick={handleCouponRemove}
                        className="p-[15px_10px] text-[rgb(230,17,17)] text-[11px] font-bold cursor-pointer"
                        id="removeBtn">
                        REMOVE
                      </span>
                    </div>
                    <p className="mt-[10px] text-[13px] text-[rgba(0,0,0,0.75)] leading-[1.4]">
                      {appliedCoupon?.description}
                    </p>
                  </div>
                )}
              </div>

              <div className=" border-[1px] border-[#e0e0e0] mb-[20px] pr-0">
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
                {totalDiscountPrice > 0 && (
                  <div className="flex p-[0px_20px] pb-[15px]">
                    <p className="text-left w-[100%] text-[14px]">
                      Bag Discount
                    </p>
                    <p
                      className="text-right w-[100%] text-[14px]"
                      id="bagdiscount">
                      - ₹{totalDiscountPrice}
                    </p>
                  </div>
                )}
                {couponDiscountPrice > 0 && (
                  <div className="flex p-[0px_20px] pb-[15px]">
                    <p className="text-left w-[100%] text-[14px]">
                      Coupon Discount
                    </p>
                    <p
                      className="text-right w-[100%] text-[14px]"
                      id="bagdiscount">
                      - ₹{couponDiscountPrice}
                    </p>
                  </div>
                )}
                <div className="flex p-[0px_20px] pb-[15px] font-bold">
                  <p className="text-left w-[100%] text-[14px]">Subtotal </p>
                  <p className="text-right w-[100%] text-[14px]" id="subtotal">
                    ₹{subtotalPrice}
                  </p>
                </div>

                {/* payment gateways */}
                <div className="flex flex-col font-bold border-t-[2px] border-t-[rgba(0,0,0,0.12)]">
                  <div className="text-[11px] uppercase bg-[rgb(235,235,235)] p-[13px_20px] font-bold mb-[20px]">
                    <p>SELECT Payment GATEWAY</p>
                  </div>
                  <div className="flex flex-col p-[0px_20px] mb-[-10px] font-bold justify-center gap-1">
                    {paymentGatewayList.map(({ title, imageUrl }, index) => {
                      return (
                        <label key={index} className="flex items-center gap-4">
                          <input
                            className="w-4 h-4"
                            type="checkbox"
                            name="gateway"
                            value={title}
                            checked={gatewayOption === title}
                            onChange={(e) => {
                              setGatewayOption(title);
                            }}
                          />{" "}
                          <img
                            src={imageUrl}
                            className="inline-block h-10 object-contain aspect-[3/1]"
                            alt={title}
                          />
                        </label>
                      );
                    })}
                  </div>
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
                    onClick={handlePayment}
                    disabled={isPaymentLoading || !gatewayOption}
                    className="text-white p-[15px] bg-[rgb(219,69,69)] rounded-[5px] text-[16px] leading-[18px] uppercase w-[100%] border-none cursor-pointer disabled:bg-[rgba(219,69,69,0.3)] disabled:cursor-not-allowed">
                    Continue{" "}
                    {isPaymentLoading && (
                      <div className="spinner max-lg:ml-5"></div>
                    )}
                  </button>
                </div>
                <div className="flex justify-around p-[15px]">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] mb-[6px] text-[#8f98a9]"
                      src="/assets/cart-badge-trust.svg"
                      alt="cart_100%_secure"
                    />
                    <p className="text-[8px] leading-[12px] text-center text-[#c7cbd4]">
                      100% SECURE PAYMENTS
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] mb-[6px] text-[#8f98a9]"
                      src="/assets/cart-easy-return.svg"
                      alt="quick_return"
                    />
                    <p className="text-[8px] leading-[12px] text-center text-[#c7cbd4]">
                      EASY RETURNS & QUICK REFUNDS
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-[40px] h-[40px] mb-[6px] text-[#8f98a9]"
                      src="/assets/quality-check.svg"
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
      {!userCartItems?.length && (
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
        </div>
      )}

      {/* modals section  */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          couponApplyModalRef.current?.classList.add("hidden");
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
              className={`${couponSubmitLoading ? "animate-pulse" : ""} bg-[#42a2a2] disabled:cursor-not-allowed disabled:bg-[#42a2a2]-200 border-none rounded-[5px] text-[#fff] text-[16px] uppercase p-[16px_0] block w-[100%] mt-[20px] cursor-pointer`}
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
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]">
        <div className="coupon_model_thank_container absolute overflow-hidden w-[360px] max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[48px] text-center rounded-[5px] flex flex-col gap-3 justify-center items-center">
          <div
            onClick={() => {
              transactionLoadingRef.current?.classList.add("hidden");
            }}
            className="absolute top-0 right-0 p-2 cursor-pointer">
            <Image
              className="w-8 h-8"
              src="/assets/close-window.png"
              width={20}
              height={20}
              title="Cancel"
              alt="close icon"
            />
          </div>

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
