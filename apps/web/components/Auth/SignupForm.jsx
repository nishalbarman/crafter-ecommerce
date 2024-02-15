"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

import {
  hasOneSpaceBetweenNames,
  isValidEmail,
  isValidIndianMobileNumber,
  isValidPassword,
} from "../../helpter/utils";

const validateInputs = (name, value) => {
  switch (name) {
    case "name":
      return hasOneSpaceBetweenNames(value);
    case "email":
      return isValidEmail(value);
    case "mobileNo":
      return isValidIndianMobileNumber(value);
    case "password":
      return isValidPassword(value);
  }
};

function SignupForm() {
  const [formData, setFormData] = useState({
    name: { value: "", isTouched: false, isError: null },
    email: { value: "", isTouched: false, isError: null },
    mobileNo: { value: "", isTouched: false, isError: null },
    password: { value: "", isTouched: false, isError: null },
    confirmpassword: { value: "", isTouched: false },
  });

  const [isVerifyScreenVisible, setIsVerifyScreenVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const validation = validateInputs(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...formData[name],
        value: value,
        isTouched: true,
        isError: !validation,
      },
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Signing up...");
    try {
      const response = await axios.post(`/api/v1/users/signup`, {
        name: formData.name.value,
        email: formData.email.value,
        mobileNo: formData.mobileNo.value,
        password: formData.password.value,
        confirmpassword: formData.confirmpassword.value,
      });
      toast.dismiss(loadingToast);
      toast.success(response?.data?.message || "Unknown error occured");
      toast.success(
        "A verficiation link sent to your mobile no, please verify by clicking on the link.",
        {
          duration: 20000,
        }
      );
      setIsVerifyScreenVisible(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.dismiss(loadingToast);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {isVerifyScreenVisible ? (
        <>
          <div className="flex flex-col items-center justify-center  col-start-1 md:col-start-2 gap-[20px] w-[100%]">
            <div className="flex flex-col items-center justify-center w-fill h-fill gap-5">
              <Image src={"/assets/email.svg"} width={60} height={60} />
              <h3 className="text-3xl font-semibold font-andika text-center">
                Check your SMS inbox
              </h3>
              <p className="text-xl text-center font-andika">
                We sent a verficiation link to your mobile no, please verify by
                clicking on the link.
              </p>
              <div className="mt-[8px] flex justify-center gap-3">
                <span className="text-lg">
                  You can continue to login{" "}
                  <Link
                    className="text-md font-andika font-semibold underline"
                    href={"/auth/login"}>
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex rounded-md flex-col max-md:shadow-lg p-5 pt-8 pb-8 min-md:p-8 col-start-1 md:col-start-2 gap-[20px]">
          {/* max-sm:mt-[10%] */}
          <h3 className="text-3xl font-semibold font-andika">
            Create an account
          </h3>
          <p className="text-xl font-andika max-sm:mt-[-6px]">
            Enter your details below
          </p>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-[40px] mt-[20px] w-[100%]">
            <input
              onKeyUp={handleOnChange}
              id="name"
              className="h-[32px] w-[100%] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] rounded-none border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
              type="text"
              placeholder="Name"
              name="name"
            />
            {formData.name.isError && (
              <span className="mt-[-25px] text-[red] text-sm">
                Full name should be of two words containing only one space.
              </span>
            )}
            <input
              onKeyUp={handleOnChange}
              id="email"
              className="h-[32px] w-[100%] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] rounded-none border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
              type="email"
              placeholder="Email"
              name="email"
            />
            {formData.email.isError && (
              <span className="mt-[-25px] text-[red] text-sm">
                Enter a valid email address
              </span>
            )}
            <input
              onKeyUp={handleOnChange}
              id="mobileNo"
              className="h-[32px] w-[100%] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] rounded-none border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
              type="number"
              placeholder="Phone Number"
              name="mobileNo"
            />
            {formData.mobileNo.isError && (
              <span className="mt-[-25px] text-[red] text-sm">
                Enter a valid 10 digit mobile number
              </span>
            )}
            <div className="flex items-center justify-between h-[32px] w-[100%] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0 focus-within:border-[black]">
              <input
                onKeyUp={handleOnChange}
                id="password"
                className="w-[100%] h-[100%] outline-none border-none"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
              />
              <Image
                className="cursor-pointer"
                onClick={() => {
                  setIsPasswordVisible((prev) => !prev);
                }}
                src={"/assets/eye.svg"}
                width={25}
                height={25}
              />
            </div>
            {formData.password.isError && (
              <span className="mt-[-25px] text-[red] text-sm">
                Enter a valid password. Password should have a minimum of 8
                characters, at least one uppercase letter, and at least one
                lowercase letter:
              </span>
            )}

            <input
              onKeyUp={handleOnChange}
              id="confirmpassword"
              className="h-[32px] w-[100%] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] rounded-none border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmpassword"
            />
            {!(
              formData?.password?.value === formData?.confirmpassword?.value
            ) && (
              <span className="mt-[-25px] text-[red] text-sm">
                Password and confirm password should match
              </span>
            )}

            <button
              type="submit"
              disabled={
                isLoading ||
                !formData.confirmpassword.isTouched ||
                formData.password.value !== formData.confirmpassword.value ||
                !formData.name.isTouched ||
                formData.name.isError ||
                !formData.email.isTouched ||
                formData.email.isError ||
                !formData.mobileNo.isTouched ||
                formData.mobileNo.isError ||
                formData.password.isError ||
                !formData.password.isTouched
              }
              className={`cursor-${
                isLoading ||
                formData.password.value !== formData.confirmpassword.value ||
                !formData.confirmpassword.isTouched ||
                !formData.name.isTouched ||
                formData.name.isError ||
                !formData.email.isTouched ||
                formData.email.isError ||
                !formData.mobileNo.isTouched ||
                formData.mobileNo.isError ||
                formData.password.isError ||
                !formData.password.isTouched
                  ? "not-allowed"
                  : "pointer"
              } h-[56px] font-andika bg-[#DA4544] disabled:bg-[gray] text-white text-lg p-[0px_15px] rounded-[5px]`}>
              Create Account
            </button>
            {/* <button className="flex items-center gap-2 justify-center h-[56px] font-andika text-black text-lg p-[0px_15px] rounded-[5px] bg-white border-[2px] border-[#98998] mt-[-15px]">
        <Image src="/assets/google.svg" width={20} height={20} />
        Sign up with Google
      </button> */}
            <div className="mt-[8px] flex justify-center gap-3">
              <span className="text-lg">
                Already have an account?{" "}
                <Link
                  className="text-md font-andika font-semibold underline"
                  href={"/auth/login"}>
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupForm;
