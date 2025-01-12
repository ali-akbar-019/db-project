import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const PopularCategories = ({ className }: { className?: string }) => {
  return (
    <section className={cn("", className)}>
      <strong className="text-base md:text-lg lg:text-xl xl:text-2xl">
        Popular Categories
      </strong>

      <div className="mt-5" />

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
        <Link
          className="md:col-span-2 overflow-hidden rounded-xl relative"
          to={"/categories/cat"}
        >
          <img
            src="/categories/shoes_03.webp"
            alt="Clothes and Shoes"
            className="w-full object-cover h-full"
          />
          <div className="absolute top-5 left-5 flex flex-col">
            <strong className="text-base md:text-lg">Clothes and Shoes</strong>
            <small className="text-gray-500">254 items</small>
          </div>
        </Link>
        <div className="md:col-span-1 flex flex-col gap-3">
          <Link
            className="overflow-hidden rounded-xl relative h-[200px] md:h-full"
            to={"/categories/cat"}
          >
            <img
              src="/categories/laptop_01.webp"
              alt="Electronics"
              className="w-full object-cover h-full"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <strong className="text-base md:text-lg">Electronics</strong>
              <small className="text-gray-500">173 items</small>
            </div>
          </Link>
          <Link
            className="overflow-hidden rounded-xl relative h-[200px] md:h-full"
            to={"/categories/cat"}
          >
            <img
              src="/categories/tennis_01.jpg"
              alt="Sports Goods"
              className="w-full object-cover h-full"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <strong className="text-base md:text-lg">Sports Goods</strong>
              <small className="text-gray-500">123 items</small>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-5" />

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
        <div className="md:col-span-1 flex flex-col gap-3">
          <Link
            className="overflow-hidden rounded-xl relative h-[200px] md:h-full"
            to={"/categories/cat"}
          >
            <img
              src="/categories/toys_03.jpg"
              alt="Children's Goods"
              className="w-full object-cover h-full"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <strong className="text-base md:text-lg">Children's Goods</strong>
              <small className="text-gray-500">84 items</small>
            </div>
          </Link>
          <Link
            className="overflow-hidden rounded-xl relative h-[200px] md:h-full"
            to={"/categories/cat"}
          >
            <img
              src="/categories/beauty_02.png"
              alt="Beauty"
              className="w-full object-cover h-full"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <strong className="text-base md:text-lg">Beauty</strong>
              <small className="text-gray-500">321 items</small>
            </div>
          </Link>
        </div>
        <Link
          className="md:col-span-2 overflow-hidden rounded-xl relative"
          to={"/categories/cat"}
        >
          <img
            src="/categories/sofa_05.jfif"
            alt="Furniture"
            className="w-full object-cover h-full"
          />
          <div className="absolute top-5 left-5 flex flex-col">
            <strong className="text-base md:text-lg">Furniture</strong>
            <small className="text-gray-500">123 items</small>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PopularCategories;
