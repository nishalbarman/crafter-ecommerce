import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartProduct,
  updateSingleCartItem,
} from "@store/redux/cartLocal";
import { useUpdateCartMutation } from "@store/redux/cart";
import { addWishlistProduct } from "@store/redux/wishlistLocal";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import Link from "next/link";

function CartItem({
  item,
  cartItems,
  wishlistItems,
  addNewWishlist,
  removeOneFromCart,
}) {
  const {
    _id,
    _cartProductId,
    previewUrl,
    title,
    category,
    discountedPrice,
    originalPrice,
    showPictures,
    description,
    stars,
    totalFeedbacks,
    shippingPrice,
    availableStocks,
    isSizeVaries,
    isColorVaries,
    availableSizes,
    availableColors,
    quantity = 1,
    size,
    color,
  } = item;

  const dispatch = useDispatch();
  const cookiesStore = useCookies();

  const token = cookiesStore?.get("token") || null;

  const [updateCart] = useUpdateCartMutation();

  const [productSize, setProductSize] = useState(item.size);
  const [productQuantity, setProductQuantity] = useState(quantity);

  useEffect(() => {
    if (productQuantity > 0) {
      updateCart({
        id: _id,
        updatedItem: { quantity: productQuantity },
      });

      dispatch(
        updateSingleCartItem({
          id: _id,
          updatedCartItem: {
            _id,
            _cartProductId,
            previewUrl,
            title,
            category,
            discountedPrice,
            originalPrice,
            showPictures,
            description,
            stars,
            totalFeedbacks,
            shippingPrice,
            availableStocks,
            isSizeVaries,
            isColorVaries,
            availableSizes,
            availableColors,
            size,
            color,
            quantity: productQuantity,
          },
        })
      );
    }
  }, [productQuantity]);

  useEffect(() => {
    if (productSize?._id) {
      updateCart({
        id: _id,
        updatedItem: { size: productSize._id },
      });

      dispatch(
        updateSingleCartItem({
          id: _id,
          updatedCartItem: {
            _id,
            _cartProductId,
            previewUrl,
            title,
            category,
            discountedPrice,
            originalPrice,
            showPictures,
            description,
            stars,
            totalFeedbacks,
            shippingPrice,
            availableStocks,
            isSizeVaries,
            isColorVaries,
            availableSizes,
            availableColors,
            color,
            size: productSize,
          },
        })
      );
    }
  }, [productSize]);

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
          _cartProductId,
          previewUrl,
          title,
          category,
          discountedPrice,
          originalPrice,
          showPictures,
          description,
          stars,
          totalFeedbacks,
          shippingPrice,
          availableStocks,
          isSizeVaries,
          isColorVaries,
          availableSizes,
          availableColors,
          quantity,
          size,
          color,
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

  const handleOnQuanityChangeClick = (e) => {
    quantityModalRef.current?.classList.remove("hidden");
  };

  const handleOnSizeChangeClick = () => {
    sizeModalRef.current?.classList.remove("hidden");
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
              {!!originalPrice && (
                <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px] line-through">
                  ₹{originalPrice}
                </span>
              )}
            </p>
            {!!originalPrice && (
              <p className="text-[rgb(50,140,91)] text-[16px] mb-[10px]">
                You saved <span>₹{originalPrice - discountedPrice} INR</span>
              </p>
            )}
            {/* max-[961px]:flex-col max-[961px]:gap-2 */}
            <div className="qp flex justify-start mt-[20px] mb-[30px]  w-fit">
              {isSizeVaries && item.availableSizes && (
                <div
                  onClick={handleOnSizeChangeClick}
                  className="mr-[16px] cursor-pointer p-[8px_12px] border-[1px] border-[rgba(0,0,0,0.12)] rounded-[5px]"
                  id="sizeButton">
                  <span>Size:</span>{" "}
                  <b>
                    {" "}
                    <span id="size">{productSize?.name}</span>{" "}
                  </b>{" "}
                  <i className="fa-solid fa-angle-down mr-[3px]" />
                </div>
              )}
              <div
                onClick={handleOnQuanityChangeClick}
                className="mr-[16px] cursor-pointer p-[8px_12px] border-[1px] border-[rgba(0,0,0,0.12)] rounded-[5px]"
                id="qtyButton">
                <span>Qty:</span>{" "}
                <b>
                  {" "}
                  <span id="qty">{productQuantity}</span>{" "}
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
        onClick={() => {
          sizeModalRef.current?.classList.add("hidden");
        }}
        className="hidden bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="size_modal">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="size_model_container absolute overflow-hidden w-fit max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[20px] rounded-[5px]">
          <p className="text-center mb-[15px] text-[14px] opacity-[0.7] block">
            Select Size
          </p>

          {item?.availableSizes?.map((size) => {
            return (
              <p
                key={size._id}
                onClick={() => {
                  setProductSize(size);
                  sizeModalRef.current?.classList.add("hidden");
                }}
                className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika">
                {size.name}
              </p>
            );
          })}
          {/* <p
            onClick={() => {
              setProductSize("S");
              sizeModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="S">
            S
          </p>
          <p
            onClick={() => {
              setProductSize("M");
              sizeModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="M">
            M
          </p>
          <p
            onClick={() => {
              setProductSize("L");
              sizeModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="L">
            L
          </p>
          <p
            onClick={() => {
              setProductSize("XL");
              sizeModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="XL">
            XL
          </p>
          <p
            onClick={() => {
              setProductSize("2XL");
              sizeModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="2XL">
            2XL
          </p>
          <p
            onClick={() => {
              setProductSize("3XL");
              sizeModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika"
            id="3XL">
            3XL
          </p> */}
        </div>
      </div>

      {/* quantity modal  */}
      <div
        ref={quantityModalRef}
        onClick={() => {
          quantityModalRef.current?.classList.add("hidden");
        }}
        className="hidden bg-[rgb(0,0,0,0.5)] fixed top-0 left-0 w-[100%] h-[100%] z-[1]"
        id="qty_modal">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="qty_model_container absolute overflow-hidden w-fit max-h-[100%] top-[50%] left-[50%] bg-[#fff] transform translate-x-[-50%] translate-y-[-50%] p-[20px] text-center rounded-[5px]">
          <p className="mb-[15px] text-[14px] opacity-[0.7] block">
            Select Quantity
          </p>
          <p
            onClick={() => {
              setProductQuantity(1);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="1">
            1
          </p>
          <p
            onClick={() => {
              setProductQuantity(2);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="2">
            2
          </p>
          <p
            onClick={() => {
              setProductQuantity(3);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="3">
            3
          </p>
          <p
            onClick={() => {
              setProductQuantity(4);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="4">
            4
          </p>
          <p
            onClick={() => {
              setProductQuantity(4);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="5">
            5
          </p>
          <p
            onClick={() => {
              setProductQuantity(6);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="6">
            6
          </p>
          <p
            onClick={() => {
              setProductQuantity(7);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="7">
            7
          </p>
          <p
            onClick={() => {
              setProductQuantity(8);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="8">
            8
          </p>
          <p
            onClick={() => {
              setProductQuantity(9);
              quantityModalRef.current?.classList.add("hidden");
            }}
            className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded"
            id="9">
            9
          </p>
          <p
            onClick={() => {
              setProductQuantity(10);
              quantityModalRef.current?.classList.add("hidden");
            }}
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
