import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Wishlist from "../../components/Wishlist/Wishlist";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const cookiesStore = cookies();
  const token = cookiesStore?.get("token") || null;

  if (!token) {
    redirect("/auth/login?redirect=cart");
  }

  return (
    <>
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="h-fill w-fill m-[40px_0]">
          <Wishlist />
        </div>
      </main>
      <Footer />
    </>
  );
}
