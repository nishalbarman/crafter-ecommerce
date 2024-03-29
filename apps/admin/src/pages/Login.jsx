import React from "react";
import Navbar from "../components/Navbar/Navbar";
import LoginForm from "../components/Auth/LoginForm";

function Login() {
  return (
    <>
      <Navbar />
      <main className="flex m-[20px_0] sm:items-center min-h-[80vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="grid grid-col-1 max-sm:block md:grid-cols-3 h-fill w-[100%] justify-center">
          <div className="flex rounded-md flex-col max-md:shadow-lg p-5 pt-8 pb-8 min-md:p-8 col-start-1 md:col-start-2 gap-[20px]">
            <h3 className="text-3xl font-semibold font-andika">
              Login to Crafter Admin
            </h3>
            <p className="text-xl font-andika">Enter your details below</p>
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
