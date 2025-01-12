import { cn } from "@/lib/utils";
import { HOST } from "@/utils/constant";
import { Product } from "@/utils/Types";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PopularProductCard = ({
  className,
  product,
}: {
  className?: string;
  product: Product;
}) => {
  console.log("pop prod :: ", product);
  return (
    <div className={cn("", className)}>
      {/* image */}
      <div className="relative  h-[400px] object-cover">
        {product.images[0] && product.images[0]?.url && (
          <Link to={`/products/${product.id}`}>
            <img
              src={`${HOST}/${product.images[0].url}`}
              alt={product.name ? product.name : "image of the product "}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          </Link>
        )}

        <span className="bg-gray-100 absolute top-3 right-5 p-2 rounded-full flex items-center justify-center cursor-pointer">
          <Heart className="w-5 h-5 text-gray-600" />
        </span>
      </div>
      {/*  */}
      <div className="pt-2 ">
        <div className="text-sm space-x-3 font-semibold">
          <span>${product.discountPrice}</span>
          <span className="text-gray-500 line-through">${product.price}</span>
        </div>
        <p className="font-bold text-gray-900">{product.name}</p>
        <small className="text-gray-500">{product.brand}</small>
      </div>
    </div>
  );
};

export default PopularProductCard;
