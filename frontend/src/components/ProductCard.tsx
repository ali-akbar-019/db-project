import { useCreateMyCartItem } from "@/api/cartApi";
import { cn } from "@/lib/utils";
import { HOST } from "@/utils/constant";
import { Product } from "@/utils/Types";
import { Heart, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { useCreateMyFavItem } from "@/api/favProductsApi";

const ProductCard = ({
  className,

  product,
}: {
  className?: string;
  product: Product;
}) => {
  const { addToCart, isLoading } = useCreateMyCartItem();
  //
  const addToCartFunc = async (id: any) => {
    await addToCart({
      productId: id,
    });
  };
  //

  const { addToFav, isLoading: addingToFav } = useCreateMyFavItem();
  return (
    <div className={cn("", className)}>
      {/* image */}
      <div className="relative  h-[250px]  overflow-hidden rounded-lg ">
        <Link to={`/products/${product?.id}`}>
          <img
            src={`${HOST}/${product.images[0].url}`}
            alt={product.name ? product.name : "image of the product "}
            className="w-full h-full object-cover cursor-pointer"
          />
        </Link>

        {addingToFav ? (
          <span className="bg-gray-100 absolute top-3 right-5 p-2 rounded-full flex items-center justify-center cursor-pointer">
            <Loader2 className="w-5 h-5 text-gray-600 animate-spin transition-all" />
          </span>
        ) : (
          <span
            className="bg-gray-100 absolute top-3 right-5 p-2 rounded-full flex items-center justify-center cursor-pointer"
            onClick={async () => await addToFav({ productId: product.id })}
          >
            <Heart className="w-5 h-5 text-gray-600" />
          </span>
        )}
      </div>
      {/*  */}
      <div className="pt-2 ">
        <div className="text-sm space-x-3 font-semibold">
          <span>${product.price}</span>
          <span className="text-gray-500 line-through">
            {" "}
            ${product.discountPrice}
          </span>
        </div>
        <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
        <div className="flex items-center justify-between">
          <small className="text-gray-500">{product.brand}</small>
          <small className="text-gray-500 flex gap-1 items-center cursor-auto">
            <Star className="w-4 h-4 " /> {product.rating}
          </small>
        </div>
      </div>
      <div className="pt-2">
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button
            className="rounded-full border text-sm py-1 px-4 text-gray-600 cursor-pointer transition hover:bg-gray-950 hover:text-white"
            onClick={() => addToCartFunc(product.id)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
