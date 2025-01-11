import { useGetCategoryWiseProducts } from "@/api/productsApi";
import { cn } from "@/lib/utils";
import { categories } from "@/utils/constant";
import { Product } from "@/utils/Types";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingProductCard from "./LoadingProductCard";
import PopularProductCard from "./PopularProductCard";
import { Link } from "react-router-dom";

const PopularProducts = ({ className }: { className?: string }) => {
  const [categoryWiseProducts, setCategoryWiseProducts] = useState<Product[]>();
  const [selected, setSelected] = useState("clothes-and-shoes");
  const { data: products, isLoading } = useGetCategoryWiseProducts(selected);
  useEffect(() => {
    if (products && products.products) {
      setCategoryWiseProducts(products.products);
      // console.log(products.products);
    }
  }, [products, selected]);
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
              onClick={() => setSelected(cat.value)}
            >
              {cat.text}
            </button>
          ))}
        </div>
      </div>

      {/* products */}
      <div className="mt-5 mb-10">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-hidden mb-5">
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
          </div>
        ) : categoryWiseProducts && categoryWiseProducts?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-hidden mb-5">
            {categoryWiseProducts.slice(0, 5).map((prod, idx) => (
              <PopularProductCard key={idx} product={prod} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-2xl italic font-bold">No products Found</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 max-w-lg">
              {categoryWiseProducts?.length} trending products in{" "}
              {categories.length} categories
            </p>
          </div>
          <Link to={`/categories/${selected}`}>
            <button className=" gap-3 bg-orange-600 py-3 w-[200px] text-sm rounded-full  text-white font-semibold tracking-tight transition-all hover:bg-orange-600 hover:text-white/70 flex items-center justify-center">
              See all <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
