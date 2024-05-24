"use server";

import { getBackendUrl } from "@/helpter/utils";

export async function fetchWishlist({ page = 0, limit = 50 } = {}) {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL("/api/v1/wishlist/list", backendUrl);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);

    console.log("Wishlist url", url.href);

    const res = await fetch(url.href, {
      next: { tags: ["Cart"] },
    });
    const body = await res.json();

    console.log("Wishlist response fetch", body);

    return body;
  } catch (error) {
    console.error(error);
  }
}

export const addProductToWishlist = async ({
  variant = undefined,
  productId,
  rentDays = undefined,
  productType = "buy",
  quantity = 1,
}) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL("/api/v1/wishlist/create", backendUrl);

    await fetch(url.href, {
      headers: {
        method: "POST",
      },
      body: JSON.stringify({
        productId: productId,
        variant: variant,
        quantity: quantity,
        rentDays: rentDays,
        productType: productType,
      }),
    });

    revalidateTag("Wishlist");

    // return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateWishlistItem = async ({
  id = undefined,
  updatedItem = {},
}) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL(`/api/v1/wishlist/update/${id}`, backendUrl);

    await fetch(url.href, {
      headers: {
        method: "PATCH",
      },
      body: JSON.stringify(updatedItem),
    });

    revalidateTag("Wishlist");

    // return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteWishlistItem = async ({ id = undefined }) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL(`/api/v1/wishlist/delete/${id}`, backendUrl);

    await fetch(url.href, {
      headers: {
        method: "DELETE",
      },
    });

    revalidateTag("Wishlist");
  } catch (error) {
    console.error(error);
  }
};
