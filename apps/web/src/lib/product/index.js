import { getBackendUrl } from "@/helpter/utils";

export async function fetchProducts({
  page = 0,
  limit = 25,
  searchParams = {},
  filter = undefined,
  sort = undefined,
}) {
  try {
    const backendUrl = getBackendUrl();

    const url = new URL("/api/v1/products/list", backendUrl);

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);

    if (!!searchParams.category) {
      url.searchParams.append("category", searchParams.category);
    }

    if (!!searchParams.searchValue) {
      url.searchParams.append("query", searchParams.searchValue);
    }

    if (!!searchParams.defaultSort) {
      url.searchParams.append("sort", searchParams.defaultSort);
    } else if (!!sort) {
      url.searchParams.append("sort", sort);
    }

    if (!!filter) {
      url.searchParams.append(
        "filter",
        encodeURIComponent(JSON.stringify(filter))
      );
    }

    console.log("BACKENDURL", url.href);

    const res = await fetch(url.href, {
      headers: {
        method: "GET",
      },
    });
    return res.json();
  } catch (error) {
    console.error(error.message);
  }
}
