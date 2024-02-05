"use client";

import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductItem from "../../components/ProductItem/ProductItem";

export default function Page() {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistCount = useSelector((state) => state.wishlist.totalItems);

  return (
    <>
      {/* <Provider store={store}> */}
      <Navbar title={"Crafter"} logo={""} />
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="h-fill w-fill m-[40px_0]">
          <div className="flex justify-between items-center">
            <p className="text-xl font-andika">Wishlist ({wishlistCount})</p>
            <button className="rounded-[4px] border-[1px] border-[black] h-[56px] w-[223px] p-[0px_5px]">
              Move All to Bag
            </button>
          </div>

          <div className="flex flex-wrap gap-5 items-center m-[40px_0]">
            {Object.values(wishlist).map((item) => {
              return (
                <ProductItem
                  {...item}
                  isEyeVisible={false}
                  isWishlistIconVisible={false}
                  deleteWishlistIconVisible={true}
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      {/* </Provider> */}
    </>
  );
}
