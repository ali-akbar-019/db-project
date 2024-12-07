import { cn } from "@/lib/utils";
import PopularProductCard from "./PopularProductCard";
import { ArrowRight } from "lucide-react";

const PopularProducts = ({ className }: { className?: string }) => {
  let selected = "electronics";
  const categories = [
    {
      name: "Clothes and shoes",
      value: "clothes-and-shoes",
    },
    {
      name: "Electronics",
      value: "electronics",
    },
    {
      name: "Sports goods",
      value: "sports-goods",
    },
    {
      name: "Children's goods",
      value: "childrens-goods",
    },
    {
      name: "Beauty",
      value: "beauty",
    },
    {
      name: "Furniture",
      value: "furniture",
    } as const,
  ];
  return (
    <section className={cn(className)}>
      {/* top */}
      <div className="flex items-center justify-between">
        <strong className="text-base md:text-lg lg:text-xl xl:text-2xl">
          Popular products
        </strong>
        <div className="flex items-center space-x-2">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 py-2 px-4 text-sm rounded-full  font-semibold tracking-tight transition-all  hover:bg-black hover:text-white/70 ${
                selected == cat.value
                  ? "bg-gray-950 text-white border-gray-950 border-2 "
                  : "text-gray-950 border-gray-950 border-2 "
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* products */}
      <div className="mt-5 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-hidden mb-5">
          <PopularProductCard />
          <PopularProductCard />
          <PopularProductCard />
          <PopularProductCard />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 max-w-lg">
              1603 trending products in 19 categories
            </p>
          </div>
          <button className=" gap-3 bg-orange-600 py-3 w-[200px] text-sm rounded-full  text-white font-semibold tracking-tight transition-all hover:bg-orange-600 hover:text-white/70 flex items-center justify-center">
            See all <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
