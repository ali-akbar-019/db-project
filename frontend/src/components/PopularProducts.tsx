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
    }
  }, [products, selected]);

  return (
    <section className={cn(className, "px-4 md:px-6 lg:px-8 xl:px-12")}>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <strong className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 md:mb-0">
          Popular Products
        </strong>
        <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 py-2 px-4 text-sm rounded-full font-semibold tracking-tight transition-all
                ${
                  selected === cat.value
                    ? "bg-gray-950 text-white border-gray-950 border-2"
                    : "text-gray-950 border-gray-950 border-2"
                } hover:bg-black hover:text-white/70`}
              onClick={() => setSelected(cat.value)}
            >
              {cat.text}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-5 mb-10">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
          </div>
        ) : categoryWiseProducts && categoryWiseProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
            {categoryWiseProducts.slice(0, 5).map((prod, idx) => (
              <PopularProductCard key={idx} product={prod} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-lg md:text-xl lg:text-2xl italic font-bold">
              No products Found
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm sm:text-base max-w-lg">
              {categoryWiseProducts?.length || 0} trending products in{" "}
              {categories.length} categories
            </p>
          </div>
          <Link to={`/categories/${selected}`}>
            <button className="flex items-center justify-center gap-3 bg-orange-600 py-3 px-6 w-full sm:w-auto text-sm rounded-full text-white font-semibold tracking-tight transition-all hover:bg-orange-500 hover:text-white/70 mt-4 md:mt-0">
              See all <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
