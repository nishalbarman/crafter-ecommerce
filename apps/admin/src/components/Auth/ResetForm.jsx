import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isValidEmail, isValidPassword } from "validators";
import toast from "react-hot-toast";
import axios from "axios";

function ResetForm() {
  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    email: { value: "", isTouched: false, isError: null },
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = (name, value) => {
    switch (name) {
      case "email":
        return isValidEmail(value);
    }
  };

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

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const loadingToast = toast.loading("Logging in...");
    // try {
    //   const response = await axios.post(`/api/v1/users/login`, {
    //     email: formData.email.value,
    //     password: formData.password.value,
    //   });
    //   toast.dismiss(loadingToast);
    //   toast.success(response?.data?.message || "Unknown error occured");
    //   if (response?.data?.status) {
    //     const redirectPath = searchParams?.get("redirect") || null;
    //     navigator(`/${redirectPath || ""}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setIsLoading(false);
    //   toast.dismiss(loadingToast);
    //   if (error?.response?.status === 403) {
    //     toast(error?.response?.data?.message, {
    //       icon: "😒",
    //     });
    //   } else {
    //     toast.error(error?.response?.data?.message);
    //   }
    // }
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-[40px] mt-[20px]">
      <input
        onKeyUp={handleOnChange}
        id="email"
        className="h-[32px] text-black text-lg font-andika placeholder:text-[#989998] outline-none border-[#818081] border-b-[1px] rounded-none focus:border-b-[black] transition duration-150 p-[0px_5px] pl-0"
        type="email"
        placeholder="Email"
        name="email"
      />
      {formData.email.isError && (
        <span className="mt-[-25px] text-[red] text-sm">
          Enter a valid email
        </span>
      )}

      <button
        type="submit"
        disabled={
          isLoading || !formData.email.isTouched || formData.email.isError
        }
        className={`${isLoading && "animate-pulse"} cursor-${isLoading || !formData.email.isTouched || formData.email.isError ? "not-allowed" : "pointer"} h-[56px] font-andika bg-[#DA4544] disabled:bg-[gray] text-white text-lg p-[0px_15px] rounded-[5px]`}>
        Send Reset Link
      </button>

      <div className="mt-[8px] flex justify-center gap-3">
        <span className="text-lg text-center">
          All done?{" "}
          <Link
            className="text-md font-andika font-semibold underline"
            to={"/auth/login"}>
            Login Now
          </Link>
        </span>
      </div>
    </form>
  );
}

export default ResetForm;
