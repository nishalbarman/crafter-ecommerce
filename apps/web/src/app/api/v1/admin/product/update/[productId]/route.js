import checkRole from "@/helpter/checkRole";
import { Product, ProductVariant } from "@/models/product.model";
import { NextResponse } from "next/server";

const checkUpdatedProductHasError = ({
  previewImage,
  title,
  category,
  discountedPrice,
  originalPrice,
  slideImages,
  description,
  shippingPrice,
  availableStocks,
  isVariantAvailable,
  productVariant,
  rentingPrice,
}) => {
  const error = [];
  // if (!Array.isArray(previewImage)) {
  //   error.push("Preview Image should be a non empty array");
  // }

  if (!title || title?.length < 5) {
    error.push("Title should be of minimum 5 characters");
  }

  if (!discountedPrice && !originalPrice && !rentingPrice) {
    error.push("Original price and Discounted price needs to be given");
  }

  if (
    isNaN(Number(rentingPrice)) ||
    isNaN(Number(discountedPrice)) ||
    isNaN(Number(originalPrice))
  ) {
    error.push(
      "Original price, Discounted price and Renting price should be numbers"
    );
  }

  if (
    !!discountedPrice &&
    !!originalPrice &&
    +originalPrice <= +discountedPrice
  ) {
    error.push("Discounted price should be lesser than Original price");
  }

  // if (!Array.isArray(slideImages)) {
  //   error.push("Slide images should be an non empty array");
  // }

  try {
    const html = cheerio.load(description);
  } catch (err) {
    error.push("Description is not valid html");
  }

  if (!!shippingPrice && isNaN(parseInt(shippingPrice))) {
    error.push("Shipping price must be a valid number");
  }

  if (!!availableStocks && isNaN(parseInt(availableStocks))) {
    error.push("Stock mube be a valid non zero number");
  }

  if (!!isVariantAvailable) {
    productVariant.forEach((variant, index) => {
      if (Object.keys(variant).length !== 14) {
        return error.push("Variant does not contain all the required keys");
      }

      const localError = [];

      // if (!isValidUrl(variant?.previewImage)) {
      //   localError.push("Preview Image is not valid");
      // }

      if (!variant?.discountedPrice && !variant?.originalPrice) {
        localError.push(
          "Original price and Discounted price needs to be given"
        );
      }

      if (
        !!variant?.discountedPrice &&
        !!variant?.originalPrice &&
        variant?.originalPrice <= variant?.discountedPrice
      ) {
        localError.push(
          "Discounted price should be lesser than Original price"
        );
      }

      // if (!Array.isArray(variant?.slideImages)) {
      //   localError.push("Slide images should be an non empty array");
      // }

      if (!!variant?.shippingPrice && isNaN(parseInt(variant?.shippingPrice))) {
        localError.push("Shipping price must be a valid number");
      }

      if (
        !!variant?.availableStocks &&
        isNaN(parseInt(variant?.availableStocks))
      ) {
        localError.push("Stock mube be a valid non zero number");
      }

      if (!variant?.color) {
        localError.push(
          "Variant +" + (index + 1) + ": " + "Color is not vallid"
        );
      }

      if (!variant?.size) {
        localError.push(
          "Variant +" + (index + 1) + ": " + "Size is not vallid"
        );
      }

      if (localError.length > 0) {
        error.push(
          `Variant: ${index + 1}, has errors. Message: ${localError.join(", ")}`
        );
      }
    });
  }

  return error;
};

const checkAdminRole = checkRole(1);

export async function PATCH(req, { params }) {
  try {
    // check admin role available or not
    const roleCheckResult = checkAdminRole(req);
    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const productId = params.productId;
    const productData = reqBody.productData;

    if (!productId) {
      return NextResponse.json(
        { message: "Invalid request: Product ID is required." },
        {
          status: 400,
        }
      );
    }

    if (!productData) {
      return NextResponse.json(
        { message: "Invalid request: Product data is required." },
        {
          status: 400,
        }
      );
    }

    // TODO: Need to validate the incoming key values so that it fits the required formate

    productData.productVariant = Object.values(productData.productVariant);

    const error = checkUpdatedProductHasError(productData);

    if (error.length > 0) {
      return NextResponse.status(400).json({ message: error.join(", ") });
    }

    try {
      if (productData.previewImage.length > 0) {
        productData.previewImage = await ImageUploadHelper.uploadBulkImages(
          productData.previewImage
        );
      }

      if (productData.slideImages.length > 0) {
        const slideImages = await ImageUploadHelper.uploadBulkImages(
          productData.slideImages
        );
        productData.slideImages = slideImages;
      }

      const variants = productData?.productVariant;

      for (let i = 0; i < variants.length; i++) {
        console.log(variants[i]);

        if (variants[i].previewImage.length > 0) {
          variants[i].previewImage = await ImageUploadHelper.uploadBulkImages(
            variants[i].previewImage
          );
        }

        if (variants[i].slideImages.length > 0) {
          const slideImages = await ImageUploadHelper.uploadBulkImages(
            variants[i].slideImages
          );
          variants[i].slideImages = slideImages;
        }
      }
    } catch (error) {
      console.error(error);
      return NextResponse.status(400).json({ message: "File upload error" });
    }

    // Now here till this point we have uploaded all the images in firebase storage.. (previewImage, slideImages, variant.previewImage, variant.slideImages ...)

    // Now we are going to update the product

    // Update product document

    const productUpdatedData = {
      title: productData.title,
      category: productData.category,
      description: productData.description,
      productType: productData.productType,
      shippingPrice: +productData.shippingPrice,
      availableStocks: +productData.availableStocks,
      rentingPrice: +productData.rentingPrice,
      discountedPrice: +productData.discountedPrice,
      originalPrice: +productData.originalPrice,
    };

    if (productData.previewImage.length > 0) {
      productUpdatedData.previewImage = productData.previewImage[0];
    }

    if (productData.slideImages.length > 0) {
      productUpdatedData.slideImages = productData.slideImages;
    }

    console.log(productId);

    await Product.findByIdAndUpdate(productId, productUpdatedData);

    if (productData?.isVariantAvailable) {
      // variants structure ==> [{key: value},{...}, {...}]
      const variantPromises = Object.entries(productData.productVariant).map(
        async ([key, value]) => {
          const variantData = {
            size: value.size,
            color: value.color,
            availableStocks: +value.availableStocks,
            shippingPrice: +value.shippingPrice,
            rentingPrice: +value.rentingPrice,
            discountedPrice: +value.discountedPrice,
            originalPrice: +value.originalPrice,
          };

          if (value.previewImage.length) {
            variantData.previewImage = value.previewImage[0];
          }

          if (value.slideImages.length) {
            variantData.slideImages = value.slideImages;
          }

          return ProductVariant.findByIdAndUpdate(value._id, variantData);
        }
      );
      await Promise.all(variantPromises);
    }

    return res.status(200).json({
      message: `Product Updated`,
    });
  } catch (error) {
    console.error(TAG, error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
