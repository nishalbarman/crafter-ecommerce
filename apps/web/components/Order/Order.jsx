"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { getBackendUrl } from "../../helpter/utils";

import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";

export default function Order() {
  const getOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/order`);
      setOrderData(response.data.data);
    } catch (error) {
      console.log("Axios response orders-->", error.response.data);
    }
  };

  const [orderData, setOrderData] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    setOrderCount(orderData.length || 0);
  }, [orderData]);

  return (
    <>
      {orderCount !== 0 && (
        <div className="main-div">
          <p className="mb-2 pl-[5px] text-[17px] text-[#181818]">
            <b>My orders </b>
          </p>

          {/* Order items, price and coupon section  */}
          {/* <div className="flex max-[961px]:flex-col gap-[20px]"> */}
          {/* order items container  */}
          <div className="w-[100%] max-[961px]:w-[100%]">
            <div className="flex rounded-[5px] bg-[rgb(252,255,238)] items-center p-[20px] mb-[20px]">
              <img
                className="w-[19px] h-[12px] duration-2000 transition mr-[5px]"
                src="/assets/truck.svg"
                alt="truck"
              />
              <p className="text-black text-[15px]">
                {/* Yay! You get FREE delivery on this order */}
                Order details
              </p>
            </div>
            <div className="grid gap-3 grid-cols-2 max-[867px]:grid-cols-1 w-[100%]">
              {orderData?.map((item) => {
                return <OrderItem key={item._id} item={item} />;
              })}
            </div>
          </div>

          {/* payments details and coupons */}
          {/* <div className="w-[41.66666667%] max-[961px]:w-[100%]">
              <div id="coupons_text">
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
            </div> */}
          {/* </div> */}
        </div>
      )}

      {/* empty cart display */}
      {orderCount <= 0 && (
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
            No orders
          </p>
          <Link
            className="p-[12px_20px] border-[2opx] border-[black] inline-block mt-[15px] text-[white] mb-[20px] font-bold text-center bg-[rgb(219,68,68)] rounded"
            href="/products">
            Continue Shopping
          </Link>
        </div>
      )}

      {/* modals section  */}
      {/* <div
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
              className="bg-[#42a2a2] disabled:cursor-not-allowed disabled:bg-[#42a2a2]-200 border-none rounded-[5px] text-[#fff] text-[16px] uppercase p-[16px_0] block w-[100%] mt-[20px] cursor-pointer"
              type="submit">
              APPLY
            </button>
          </form>
        </div>
      </div> */}

      {/* coupon applied tick mark modal */}
      {/* <div
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
      </div> */}

      {/* transaction loading */}
      {/* <div
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
      </div> */}

      {/* transaction status */}
      {/* <div
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
      </div> */}
    </>
  );
}
