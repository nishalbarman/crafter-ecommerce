import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Order from "../../components/Order/Order";

export default function page() {
  const cookiesStore = cookies();
  const token = cookiesStore?.get("token") || null;

  if (!token) {
    redirect("/auth/login?redirect=cart");
  }

  return (
    <>
      <Navbar title={"Crafter"} logo={""} />
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="h-fill w-fill m-[40px_0]">
          <Order />
        </div>
      </main>
      <Footer />
    </>
  );
}
