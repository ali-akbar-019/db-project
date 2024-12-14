import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Clipboard, Minus, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const colors = [
    { value: "red", bgColor: "bg-red-500" },
    { value: "blue", bgColor: "bg-blue-500" },
    { value: "green", bgColor: "bg-green-500" },
  ];

  return (
    <>
      <Container className="min-h-[100vh] py-10">
        <div className="space-x-5 pb-3 capitalize ">
          <Link to={"/categories/id"}>
            <small className="text-gray-500">category</small>
          </Link>
          <small className="text-gray-500 bold cursor-pointer capitalize">
            product name
          </small>
        </div>
        {/*  */}
        <section className="grid grid-cols-2 gap-5">
          <div className="space-y-3">
            {/* imgs */}
            <div>
              <img
                src="/imgs/horizontal_01.jpg"
                alt="main image of the product"
                className="w-full  object-cover rounded-xl cursor-pointer "
                onClick={() => console.log("clicked on the image")}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <img
                src="/imgs/horizontal_01.jpg"
                alt="main image of the product"
                className="w-full h-full object-cover rounded-xl cursor-pointer"
                onClick={() => console.log("clicked on the image")}
              />
              <img
                src="/imgs/horizontal_02.jpg"
                alt="main image of the product"
                className="w-full h-full object-cover rounded-xl cursor-pointer"
                onClick={() => console.log("clicked on the image")}
              />
              <img
                src="/imgs/horizontal_03.jpg"
                alt="main image of the product"
                className="w-full h-full object-cover rounded-xl cursor-pointer"
                onClick={() => console.log("clicked on the image")}
              />
              <img
                src="/imgs/horizontal_04.jpg"
                alt="main image of the product"
                className="w-full h-full object-cover rounded-xl cursor-pointer"
                onClick={() => console.log("clicked on the image")}
              />
            </div>
          </div>
          {/*  */}
          <div className="ps-10 pt-5">
            <div>
              {/* content */}
              <h2 className="xl:text-5xl lg:text-4xl md:text-2xl text-2xl capitalize font-bold tracking-wide">
                title
              </h2>
              <p className="text-gray-600 font-semibold max-w-xl xl:text-base text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                temporibus dignissimos voluptatibus maiores optio nam
                exercitationem quisquam quis. Beatae, voluptate.
              </p>
              <div className="flex items-center mt-2">
                <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                <Star fill="yellow" className="text-yellow-200 w-5 h-5" />
                <span className="text-sm text-gray-400 ms-2">(20)</span>
              </div>
              <Separator className="my-5" />
              <p className="text-3xl font-bold">$539.00</p>
              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet.
              </p>
              <Separator className="my-5" />
              <div>
                <p className="text-2xl font-semibold">Choose a Color</p>
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
                    onClick={() => setQuantity((prev) => prev - 1)}
                    className="transition hover:text-gray-700 cursor-pointer "
                  >
                    <Minus className="w-5 h-5 transition hover:text-gray-700 cursor-pointer " />
                  </span>
                  <span>{quantity}</span>
                  <span
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="transition hover:text-gray-700 cursor-pointer "
                  >
                    <Plus className="w-5 h-5 transition hover:text-gray-700 cursor-pointer " />
                  </span>
                </div>
                <div className="text-sm text-gray-800 font-bold max-w-md">
                  Only <span className="text-orange-500">12 items</span> left
                  Don't miss it
                </div>
              </div>
            </div>
            <div className="my-5 space-x-4">
              <button className="py-2 px-12 border-2 rounded-full bg-green-800 font-bold text-white border-green-800 transition hover:bg-green-900 ">
                Buy Now
              </button>
              <button className="py-2 px-12 border-2 rounded-full font-bold text-green-800 border-green-800 transition hover:bg-green-900 hover:text-white">
                Add to Cart
              </button>
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
      </Container>
    </>
  );
};

export default SingleProductPage;
