import { cn } from "@/lib/utils";
import { Heart, Star } from "lucide-react";

const ProductCard = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => {
  return (
    <div className={cn("", className)}>
      {/* image */}
      <div className="relative  ">
        <img
          src="/imgs/horizontal_06.jpg"
          alt={title ? title : "image of the product "}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
        />

        <span className="bg-gray-100 absolute top-3 right-5 p-2 rounded-full flex items-center justify-center cursor-pointer">
          <Heart className="w-5 h-5 text-gray-600" />
        </span>
      </div>
      {/*  */}
      <div className="pt-2 ">
        <div className="text-sm space-x-3 font-semibold">
          <span>$935.90</span>
          <span className="text-gray-500 line-through">$1000.00</span>
        </div>
        <p className="font-bold text-gray-900">Ringa Ringa Roses</p>
        <div className="flex items-center justify-between">
          <small className="text-gray-500">Apple</small>
          <small className="text-gray-500 flex gap-1 items-center cursor-auto">
            <Star className="w-4 h-4 " /> 3.4
          </small>
        </div>
      </div>
      <div className="pt-2">
        <button className="rounded-full border text-sm py-1 px-4 text-gray-600 cursor-pointer transition hover:bg-gray-950 hover:text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
