import {
  useGetCategoryWiseProducts,
  useGetSingleProduct,
} from "@/api/productsApi";
import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { HOST } from "@/utils/constant";
import { Clipboard, Minus, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import LoadingProductCard from "@/components/LoadingProductCard";
import ProductCard from "@/components/ProductCard";
import { useCreateMyCartItem } from "@/api/cartApi";
import LoadingButton from "@/components/LoadingButton";

const SingleProductPage = () => {
  //
  const { id } = useParams();
  const { isLoading, singleProduct } = useGetSingleProduct(id as string);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  console.log("single products :: ", singleProduct);
  //
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  // similar prodcs
  const { data: similarProducts, isLoading: isCategoryProdsLoading } =
    useGetCategoryWiseProducts(singleProduct?.category as string);
  //
  const colors = [
    { value: "warm beige", bgColor: "bg-beige-500" },
    { value: "charcoal gray", bgColor: "bg-gray-800" },
    { value: "deep navy", bgColor: "bg-blue-900" },
    { value: "soft olive", bgColor: "bg-green-400" },
  ];
  //
  //
  // @ts-ignore
  const { addToCart, isLoading: isAddingToCart } = useCreateMyCartItem();
  const addToCartFunc = async () => {
    await addToCart({
      productId: id,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[100vh]">
          <img src="/loading.gif" alt="loading gif" />
        </div>
      ) : (
        <Container className="min-h-[100vh] py-10">
          <div className="space-x-5 pb-3 capitalize ">
            <Link to={"/categories/id"}>
              <small className="text-gray-500">{singleProduct?.category}</small>
            </Link>
            <small className="text-gray-500 bold cursor-pointer capitalize">
              {singleProduct?.name}
            </small>
          </div>
          {/*  */}
          <section className="grid grid-cols-2 gap-5">
            <div className="space-y-3">
              {/* imgs */}

              <div className="h-[600px] overflow-hidden rounded-xl ">
                <img
                  src={`${HOST}/${singleProduct?.images[selectedImage].url}`}
                  alt={singleProduct?.name}
                  className="w-full  object-cover cursor-pointer "
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {singleProduct?.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${HOST}/${img.url}`}
                    alt="main image of the product"
                    className="w-full h-[150px] object-cover rounded-xl cursor-pointer"
                    //
                    onClick={() => setSelectedImage(idx)}
                  />
                ))}
              </div>
            </div>
            {/*  */}
            <div className="ps-10 pt-5">
              <div>
                {/* content */}
                <h2 className="xl:text-5xl lg:text-4xl md:text-2xl text-2xl capitalize font-bold tracking-wide">
                  {singleProduct?.name}
                </h2>
                <p className="text-gray-600 font-semibold max-w-xl xl:text-base text-sm">
                  {singleProduct?.description}
                </p>
                <div className="flex items-center mt-2">
                  <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                  <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                  <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                  <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                  <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                  <span className="text-sm text-gray-400 ms-2">
                    ({singleProduct?.rating})
                  </span>
                </div>
                <Separator className="my-5" />
                <p className="text-3xl font-bold">
                  ${singleProduct?.discountPrice?.toFixed(2) || "0.00"}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet.
                </p>
                <Separator className="my-5" />
                <div>
                  <p className="text-2xl font-semibold mb-2">Choose a Color</p>
                  <div className="flex items-center gap-4">
                    {colors.map((color) => (
                      <div key={color.value} className="flex items-center">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value={color.value}
                            checked={selectedColor === color.value}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="hidden"
                          />
                          <div
                            className={`w-8 h-8 rounded-full border-2 ${
                              selectedColor === color.value
                                ? "border-black"
                                : "border-gray-300"
                            } ${
                              color.bgColor
                            } transition-all transform hover:scale-110`}
                          ></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/*  */}
                <Separator className="my-5" />
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 text-gray-800 font-bold flex items-center gap-6 py-3 px-5 rounded-full">
                    <span
                      onClick={() =>
                        setQuantity((prev) => {
                          return prev > 1 ? prev - 1 : prev;
                        })
                      }
                      className="transition hover:text-gray-700 cursor-pointer "
                    >
                      <Minus className="w-5 h-5 transition hover:text-gray-700 cursor-pointer " />
                    </span>
                    <span>{quantity}</span>
                    <span
                      onClick={() =>
                        setQuantity((prev) => {
                          // @ts-ignore
                          return prev < singleProduct?.stock ? prev + 1 : prev;
                        })
                      }
                      className="transition hover:text-gray-700 cursor-pointer "
                    >
                      <Plus className="w-5 h-5 transition hover:text-gray-700 cursor-pointer " />
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 font-bold max-w-md">
                    Only{" "}
                    <span className="text-orange-500">
                      {singleProduct?.stock} items
                    </span>{" "}
                    left Don't miss it
                  </div>
                </div>
              </div>
              <div className="my-5 space-x-4">
                <button
                  className="py-2 px-12 border-2 rounded-full bg-green-800 font-bold text-white border-green-800 transition hover:bg-green-900 "
                  onClick={addToCartFunc}
                >
                  Buy Now
                </button>

                {isAddingToCart ? (
                  <LoadingButton />
                ) : (
                  <button
                    className="py-2 px-12 border-2 rounded-full font-bold text-green-800 border-green-800 transition hover:bg-green-900 hover:text-white"
                    onClick={addToCartFunc}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              {/*  */}
              <div className="border p-5 max-w-[500px]">
                <div className="flex items-start gap-2 ">
                  <Truck className="text-orange-500" />
                  <div>
                    <strong className="font-bold text-gray-800">
                      Free Delivery
                    </strong>
                    <p className="text-sm underline text-gray-500 font-bold">
                      Enter your Postal code for Delivery Availablitiy
                    </p>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex items-start gap-2 ">
                  <Clipboard className="text-orange-500" />
                  <div>
                    <strong className="font-bold text-gray-800">
                      Return Delivery
                    </strong>
                    <p className="text-sm underline text-gray-500 font-bold">
                      Free 30 Days Delivery Returns. Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Similar products */}
          <div className="mt-20">
            <strong className="text-3xl block mb-4">
              Similar Items You Might Like
            </strong>
            {/* products */}
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
            >
              <CarouselContent>
                {isCategoryProdsLoading ? (
                  <>
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <LoadingProductCard />
                    </CarouselItem>
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <LoadingProductCard />
                    </CarouselItem>
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <LoadingProductCard />
                    </CarouselItem>
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <LoadingProductCard />
                    </CarouselItem>
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <LoadingProductCard />
                    </CarouselItem>
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <LoadingProductCard />
                    </CarouselItem>
                  </>
                ) : (
                  similarProducts &&
                  similarProducts?.products &&
                  similarProducts?.products?.length > 0 &&
                  // @ts-ignore
                  similarProducts?.products?.map((prod, idx) => (
                    <CarouselItem
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                      key={idx}
                    >
                      <ProductCard product={prod} />
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
            </Carousel>
          </div>
        </Container>
      )}
    </>
  );
};

export default SingleProductPage;
