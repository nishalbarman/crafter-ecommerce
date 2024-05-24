import checkRole from "@/helpter/checkRole";
import { NextResponse } from "next/server";

const checkAdminRole = checkRole(1);

const checkProductHasError = ({
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

  const ObjectId = mongoose.Types.ObjectId;
  if (
    !category ||
    !(ObjectId.isValid(category) && String(new ObjectId(category)) === category)
  ) {
    error.push("Category is not valid");
  }

  if (!discountedPrice && !rentingPrice) {
    error.push("Discounted price and Renting Price needs to be given");
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
    +originalPrice < +discountedPrice
  ) {
    error.push(
      "Discounted price should be lesser than Original price if given"
    );
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
      if (Object.keys(variant).length !== 9) {
        return error.push(
          "Variant +" +
            (index + 1) +
            ": " +
            "Does not contain all the required keys"
        );
      }

      const localError = [];

      // if (!isValidUrl(variant?.previewImage)) {
      //   localError.push("Preview Image is not valid");
      // }

      if (
        !variant?.previewImage ||
        !Array.isArray(variant.previewImage) ||
        !variant.previewImage[0]?.base64String ||
        !variant.previewImage[0]?.type
      ) {
        localError.push(
          "Variant +" + (index + 1) + ": " + "Preview Image is not valid"
        );
      }

      if (!variant?.discountedPrice && !variant?.originalPrice) {
        localError.push(
          "Original price and Discounted price needs to be given"
        );
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
        !!variant?.discountedPrice &&
        !!variant?.originalPrice &&
        variant?.originalPrice < variant?.discountedPrice
      ) {
        localError.push(
          "Discounted price should be lesser than original price"
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
        localError.push("Color is not vallid");
      }

      if (!variant?.size) {
        localError.push("Size is not vallid");
      }

      if (localError.length > 0) {
        error.push(
          `Variant: ${index + 1}, has errors. Message: ${localError.join(",\n")}`
        );
      }
    });
  }

  return error;
};

export async function POST(req) {
  try {
    // check for admin role
    const roleCheckResult = checkAdminRole(req);

    if (roleCheckResult) {
      return roleCheckResult;
    }

    const reqBody = await req.json();

    const productData = reqBody?.productData;

    if (!productData) {
      return NextResponse.json(
        {
          message: "Invalid request: Product data is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!productData.originalPrice) {
      productData.originalPrice = productData.discountedPrice;
    }

    productData.productVariant = Object.values(productData.productVariant);

    if (Array.isArray(productData?.productVariant)) {
      const new_Variant_With_Size_Included = [];

      productData.productVariant.forEach((variant) => {
        if (!variant.originalPrice) {
          variant.originalPrice = variant.discountedPrice;
        }

        const sizes = variant?.size?.replace(/ /g, "");
        if (!!sizes) {
          sizes.split(",")?.forEach((eachSize) => {
            new_Variant_With_Size_Included.push({
              ...variant,
              size: eachSize,
            });
          });
        }
      });

      productData.productVariant = new_Variant_With_Size_Included;
    }

    const error = checkProductHasError(productData);

    if (error.length > 0) {
      return NextResponse.json(
        { message: error.join(", ") },
        {
          status: 400,
        }
      );
    }

    try {
      productData.previewImage = await ImageUploadHelper.uploadBulkImages(
        productData.previewImage
      );

      if (productData.slideImages.length > 0) {
        const slideImages = await ImageUploadHelper.uploadBulkImages(
          productData.slideImages
        );
        productData.slideImages = slideImages;
      }

      const variants = productData.productVariant;

      for (let i = 0; i < variants.length; i++) {
        variants[i].previewImage = await ImageUploadHelper.uploadBulkImages(
          variants[i].previewImage
        );
        if (variants[i].slideImages.length > 0) {
          const slideImages = await ImageUploadHelper.uploadBulkImages(
            variants[i].slideImages
          );
          variants[i].slideImages = slideImages;
        }
      }

      // console.log("Variants --> is object or array -->", variants);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "File upload error" },
        {
          status: 400,
        }
      );
    }

    // Now here till this point we have uploaded all the images in firebase storage.. (previewImage, slideImages, variant.previewImage, variant.slideImages ...)

    // Now we are going to save the product to our database

    // Create a new product document
    const newProduct = new Product({
      previewImage: productData.previewImage[0],
      title: productData.title,
      category: productData.category,

      slideImages: productData.slideImages,
      description: productData.description,
      productType: productData.productType,
      shippingPrice: +productData.shippingPrice,
      availableStocks: +productData.availableStocks,
      rentingPrice: !!productData.variant
        ? +productData.variant[0].rentingPrice
        : +productData.rentingPrice,
      discountedPrice: !!productData.variant
        ? +productData.variant[0].discountedPrice
        : +productData.discountedPrice,
      originalPrice: !!productData.variant
        ? +productData.variant[0].originalPrice
        : +productData.originalPrice,
      isVariantAvailable: !!productData.isVariantAvailable,
    });

    if (productData?.isVariantAvailable) {
      const variantPromises = Object.entries(productData.productVariant).map(
        async ([key, value]) => {
          const variantData = {
            product: newProduct._id,

            previewImage: value.previewImage[0],
            slideImages: value.slideImages,

            size: value.size,
            color: value.color,
            availableStocks: +value.availableStocks,
            shippingPrice: +value.shippingPrice,
            rentingPrice: +value.rentingPrice,
            discountedPrice: +value.discountedPrice,
            originalPrice: +value.originalPrice,
          };

          return ProductVariant.create(variantData);
        }
      );
      const variants = await Promise.all(variantPromises);
      newProduct.productVariant = variants.map((variant) => variant._id);
    }

    console.log(newProduct);

    await newProduct.save();

    return NextResponse.json(
      {
        message: `Product created`,
        product: productData,
      },
      {
        status: 200,
      }
    );
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
