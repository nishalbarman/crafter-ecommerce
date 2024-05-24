"use client";

import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const params = useParams();
  useEffect(() => {
    if (params.product_id) {
      console.log("I am the befault param");
    }
  }, []);

  return (
    <>
      <main className="min-h-[100vh] ml-[3%] mr-[3%] lg:ml-[10%] lg:mr-[10%]">
        <div className="h-fill w-fill m-[40px_0]">
          <div className="flex flex-row">
            <div className="basis-1/2 flex justify-center">
              <div>
                <Image
                  width={60}
                  height={50}
                  objectFit="contain"
                  objectPosition="center"
                  className="w-[200px] h-[150px]"
                  src={
                    "https://n3.sdlcdn.com/imgs/k/i/a/Keycase-Leather-Car-Key-Cover-SDL130594340-1-a1f24.jpg"
                  }
                />
              </div>
            </div>
            <div className="basis-1/2">
              <p>interior</p>
              <h3 className="text-2xl">
                Keycase Leather Car Key Cover for Maruti Suzuki
                Swift/WagonR/Celerio/Swift Dzire/Breza/Ciaz/Scross Button Key
                Cover (Dark Brown)
              </h3>
              <div className="flex flex-row gap-2">
                <i
                  className="fa-regular fa-star fa-sm"
                  style={{ color: "rgb(0, 0, 0, 0.6)" }}
                />
                <i
                  className="fa-regular fa-star fa-sm"
                  style={{ color: "rgb(0, 0, 0, 0.6)" }}
                />
                <i
                  className="fa-regular fa-star fa-sm"
                  style={{ color: "rgb(0, 0, 0, 0.6)" }}
                />
                <i
                  className="fa-regular fa-star fa-sm"
                  style={{ color: "rgb(0, 0, 0, 0.6)" }}
                />
                <i
                  className="fa-regular fa-star fa-sm"
                  style={{ color: "rgb(0, 0, 0, 0.6)" }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <p>
                  MRP <span className="line-through">Rs. 999</span>
                </p>
                <div>
                  <span>Rs. 399</span>
                  <span className="text-sm border-[1px_solid_rgb(0,0,0,0.2)] rounded-sm p-2 text-[rgb(124,124,124)]">
                    60% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;
