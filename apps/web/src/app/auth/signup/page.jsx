import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import SignupForm from "../../../components/Auth/SignupForm";

export default function Page() {
  return (
    <>
      <main className="flex m-[20px_0] sm:items-center min-h-[80vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="grid grid-col-1 max-sm:block md:grid-cols-3 h-fill w-[100%] justify-center">
          {/* <div className="bg-[#CBE4E8] bg-[url(/assets/cart_mobile.png)] bg-no-repeat bg-contain h-[100%]"></div> */}
          <SignupForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

// calc(100vh-)
