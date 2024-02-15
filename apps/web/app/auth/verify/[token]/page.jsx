import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import axios from "axios";
import { getBackendUrl } from "../../../../helpter/utils";

const TAG = "/auth/verify/page.js:-";

const verifyWithToken = async (token) => {
  try {
    const backendUrl = getBackendUrl();

    const reponse = await axios.post(`${backendUrl}api/v1/users/verify`, {
      token: token,
    });
    const { data } = reponse;
    if (data.status == true) return { success: true, message: data.message };
  } catch (error) {
    console.error("Error:->", error.response.data.message);
    return { success: false, message: error.response.data.message };
  }
};

async function page({ params }) {
  const token = params.token || null;

  if (!token) redirect("/auth/signup");
  const response = await verifyWithToken(token);

  return (
    <main className="flex m-[20px_0] sm:items-center min-h-[80vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
      <div className="grid grid-col-1 md:grid-cols-3 h-fill w-[100%] justify-center">
        <div className="flex flex-col items-center justify-center col-start-1 md:col-start-2 gap-[20px] w-[100%]">
          {response.success ? (
            <div className="flex flex-col items-center justify-center w-fill h-fill gap-4 ">
              <Image
                className=""
                src={"/assets/tickmark-animation.gif"}
                width={130}
                height={130}
                alt="Verfied Tickmark"
              />
              <h3 className="text-3xl font-semibold font-andika text-center">
                Account verified
              </h3>
              <p className="text-xl font-andika text-center">
                Your account has been verified you can{" "}
                <Link className="font-semibold underline" href={"/auth/login"}>
                  Login Now
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-fill h-fill gap-4 ">
              <Image
                className=""
                src={"/assets/cross-failed-animation.gif"}
                width={150}
                height={150}
                alt="Cross"
              />
              <h3 className="text-3xl font-semibold font-andika  text-center">
                Account verification failed
              </h3>
              <p className="text-xl font-andika text-center  text-center">
                Token may be invalid or the account has already been verified
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
