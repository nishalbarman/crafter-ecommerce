"use server";

import { revalidateTag } from "next/cache";

import { getBackendUrl } from "@/helpter/utils";

export const fetchCart = async ({ page = 0, limit = 0 } = {}) => {
  try {
    const url = new URL("/api/v1/cart/list");
    url.searchParams.append("productType", "buy");
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);

    console.log(url.href);

    const res = await fetch(url.href, {
      next: { tags: ["Cart"] },
    });
    const data = await res.json();
    console.log("Cart items", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addProductToCart = async ({
  variant = undefined,
  productId,
  rentDays = undefined,
  productType = "buy",
  quantity = 1,
}) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL("/api/v1/cart/create", backendUrl);

    const res = await fetch(url.href, {
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

    revalidateTag("Cart");

    // return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItem = async ({ id = undefined, updatedItem = {} }) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL(`/api/cart/update/${id}`, backendUrl);

    const res = await fetch(url.href, {
      headers: {
        method: "PATCH",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedItem),
    });

    revalidateTag("Cart");

    // return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItemQuantity = async ({
  id = undefined,
  productType = undefined,
  quantity = 1,
}) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL(`/api/v1/cart/update`, backendUrl);
    url.searchParams.append(cart, id);

    const res = await fetch(url.href, {
      headers: {
        method: "PATCH",
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });

    revalidateTag("Cart");

    // return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = async ({ id = undefined, token = undefined }) => {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL(`/api/v1/cart/delete/${id}`, backendUrl);

    await fetch(url.href, {
      headers: {
        method: "DELETE",
      },
    });

    revalidateTag("Cart");

    // return res.json();
  } catch (error) {
    console.error(error);
  }
};
