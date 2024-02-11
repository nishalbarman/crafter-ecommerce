import React from "react";
import Cart from "../../components/Cart/Cart";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function page() {
  return (
    <>
      <Navbar title={"Crafter"} logo={""} />
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="h-fill w-fill m-[40px_0]">
          <Cart />
        </div>
      </main>
      <Footer />
    </>
  );
}
