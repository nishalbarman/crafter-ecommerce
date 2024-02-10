"use client";

import React, { useState } from "react";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "../../helpter/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const validateInputs = (name, value) => {
  switch (name) {
    case "email":
      return isValidEmail(value);
    case "password":
      return isValidPassword(value);
  }
};

function LoginForm() {
  const [formData, setFormData] = useState({
    email: { value: "", isTouched: false, isError: null },
    password: { value: "", isTouched: false, isError: null },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigator = useRouter();

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
    const loadingToast = toast.loading("Logging in...");
    try {
      const response = await axios.post(`/api/v1/users/login`, {
        email: formData.email.value,
        password: formData.password.value,
      });
      toast.dismiss(loadingToast);
      toast.success(response?.data?.message || "Unknown error occured");
      if (response?.data?.status) navigator.push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.dismiss(loadingToast);
      if (error?.response?.status === 403) {
        toast(error?.response?.data?.message, {
          icon: "😒",
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-[40px] mt-[20px]">
      <input
        onKeyUp={handleOnChange}
        id="email"
        className="h-[32px] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
        type="email"
        placeholder="Email"
        name="email"
      />
      {formData.email.isError && (
        <span className="mt-[-25px] text-[red] text-sm">
          Enter a valid email
        </span>
      )}

      <div className="flex items-center justify-between h-[32px] w-[100%] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0 focus-within:border-[black]">
        <input
          onKeyUp={handleOnChange}
          id="password"
          className="h-[32px] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          name="password"
        />
        <Image
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
          characters, at least one uppercase letter, and at least one lowercase
          letter:
        </span>
      )}
      <button
        type="submit"
        disabled={
          isLoading ||
          !formData.email.isTouched ||
          formData.email.isError ||
          formData.password.isError ||
          !formData.password.isTouched
        }
        className={`cursor-${isLoading || !formData.email.isTouched || formData.email.isError || formData.password.isError || !formData.password.isTouched ? "not-allowed" : "pointer"} h-[56px] font-andika bg-[#DA4544] disabled:bg-[gray] text-white text-lg p-[0px_15px] rounded-[5px]`}>
        Log In
      </button>
      {/* <button className="flex items-center gap-2 justify-center h-[56px] font-andika text-black text-lg p-[0px_15px] rounded-[5px] bg-white border-[2px] border-[#98998] mt-[-15px]">
                <Image src="/assets/google.svg" width={20} height={20} />
                Sign in with Google
              </button> */}

      <div className="mt-[8px] flex justify-center gap-3">
        <span className="text-lg text-center">
          New here, create an account?{" "}
          <Link
            className="text-md font-andika font-semibold underline"
            href={"/auth/signup"}>
            Create an account?
          </Link>
        </span>
      </div>

      <div className="mt-[-15px] flex justify-center gap-3">
        <span className="text-lg">
          Forgot password?{" "}
          <Link
            className="text-md font-andika font-semibold underline"
            href={"/auth/login"}>
            Reset
          </Link>
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
