import Link from "next/link";

function OrderItem({ item }) {
  const {
    _id,
    txnid,
    user,
    previewUrl,
    title,
    discountedPrice,
    originalPrice,
    shippingPrice,
    orderStatus,
    paymentStatus,
    trackingLink,
  } = item;

  return (
    <>
      {/* cart item */}
      <div className="p-[2.5%_2.5%_0_2.5%] border-[1px] border-[rgb(204,204,204)] rounded-[5px] ">
        <div className="upper flex justify-between max-[588px]:flex-col-reverse">
          <div>
            <p className="text-[rgba(0,0,0,0.7)] font-semibold text-[16px] mb-[8px] cursor-pointer w-[100%] font-andika text-left">
              {" "}
              {/* hover:text-[rgba(0,0,0,0.9)]  */}
              TXN ID: {txnid}
            </p>

            <Link
              className="text-[rgba(0,0,0,0.7)] font-semibold text-[16px] mb-[8px] cursor-pointer w-[100%] hover:text-[rgba(0,0,0,0.9)] font-andika text-left"
              href={`/products/${_id}`}>
              <p className="text-[rgb(50,140,91)] text-[16px] mb-[10px]">
                {title}
              </p>
            </Link>

            <p className="mb-[5px]">
              <span className="text-[rgb(51,51,51)] text-[14px] font-bold">
                Payment:
              </span>{" "}
              <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px]">
                {paymentStatus ? "Successful" : "Failed"}
              </span>
            </p>

            <p className="mb-[5px]">
              <span className="text-[rgb(51,51,51)] text-[14px] font-bold">
                Order Status:
              </span>{" "}
              <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px]">
                {orderStatus}
              </span>
            </p>

            <p className="mb-[8px]">
              <span className="text-[rgb(51,51,51)] text-[14px] font-bold">
                Order Qty:
              </span>{" "}
              <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px]">
                {1}
              </span>
            </p>

            <p className="mb-[8px]">
              <span className="text-[rgb(51,51,51)] text-[18px] font-bold">
                ₹{discountedPrice} INR
              </span>{" "}
              {/* {!!originalPrice && (
                <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px] line-through">
                  ₹{originalPrice}
                </span>
              )} */}
            </p>
            <p className="mb-[8px]">
              <span className="text-[rgb(51,51,51)] text-[16px] font-bold">
                Address:
              </span>{" "}
              <span className="text-[rgb(94,99,107)] ml-[5px] text-[14px]">
                Vill./P.O. - Balikaria, Nalbari, 781341
              </span>
            </p>
            <div className="qp flex justify-start mt-[20px] mb-[10px] max-[961px]:flex-col max-[961px]:gap-2">
              <div className="mr-[16px] cursor-pointer p-[8px_12px] border-[1px] border-[rgba(0,0,0,0.12)] rounded-[5px] w-[100%] flex items-center justify-center">
                <span>Track</span>
              </div>

              {/* <div className="mr-[16px] cursor-pointer p-[8px_12px] border-[1px] border-[rgba(0,0,0,0.12)] rounded-[5px]">
                <span id="qty">Cancel</span>
              </div> */}
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

        <div className="bottom_section flex w-[100%] text-center text-[rgba(0,0,0,0.7)] border-t-[2px] border-t-[rgba(0,0,0,0.04)]  text-[12px] mt-[15px] mb-0">
          {/* m-[0px_10px] */}
          {/* <div className="flex justify-center items-center p-[18px_0px] w-[100%] border-r-[2px] border-r-[rgba(0,0,0,0.04)] cursor-pointer text-[14px]">
            Return
          </div> */}

          <div className="flex justify-center items-center p-[18px_0px] w-[100%] cursor-pointer text-[14px]">
            Cancel
          </div>
        </div>
      </div>

      {/* size modal */}
      {/* <div
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
                onClick={() => {
                  setProductSize(size);
                  sizeModalRef.current?.classList.add("hidden");
                }}
                className="text-center hover:bg-[rgb(230,230,230)] text-[18px] p-[19px_40px] border-none tracking-[2px] leading-[1.428571429px] bg-[#fff] cursor-pointer rounded font-andika">
                {size.name}
              </p>
            );
          })}
        </div>
      </div> */}

      {/* quantity modal  */}
      {/* <div
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
      </div> */}
    </>
  );
}

export default OrderItem;
