// @ts-nocheck
import { useGetAllProducts } from "@/api/productsApi";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection copy";
import LoadingProductCard from "@/components/LoadingProductCard";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/constant";

const ProductsPage = () => {
  const { data: allProducts, isLoading } = useGetAllProducts();
  return (
    <>
      <HeroSection
        image="/imgs/men_03.jpg"
        desc="Welcome to ShopEase, your one-stop destination for the latest fashion and lifestyle products. Find everything from everyday essentials to special occasion pieces crafted for you."
        title="Our Exclusive Products"
        buttonText="Start Shopping"
      />
      {/*  */}

      {/* filter buttons */}
      <Container className="mb-20">
        {/* filters */}
        <div className="mt-10 flex flex-wrap gap-3 justify-between">
          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] rounded-full bg-gray-200">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-to-high">Low to High</SelectItem>
                <SelectItem value="high-to-low">High to Low</SelectItem>
                <SelectItem value="under-50">$50 & Below</SelectItem>
                <SelectItem value="under-100">$100 & Below</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] rounded-full bg-gray-200">
                <SelectValue placeholder="Customer Review" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-stars">5 Stars</SelectItem>
                <SelectItem value="4-stars-and-up">4 Stars & Up</SelectItem>
                <SelectItem value="3-stars-and-up">3 Stars & Up</SelectItem>
                <SelectItem value="2-stars-and-up">2 Stars & Up</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] rounded-full bg-gray-200">
                <SelectValue placeholder="Color Options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[100px] rounded-full bg-gray-200">
                <SelectValue placeholder="All Filters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">By Price</SelectItem>
                <SelectItem value="review">By Review</SelectItem>
                <SelectItem value="color">By Color</SelectItem>
                <SelectItem value="new-arrivals">New Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="w-full sm:w-auto">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] rounded-full bg-gray-200">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low-to-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-to-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="mt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-hidden mb-5">
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </div>
          </div>
        ) : (
          <div className="mt-10">
            {categories.map((cat, catIndex) => {
              // Filter products by category
              const filteredProducts = allProducts?.products?.filter(
                (prod) => prod.category === cat.value
              );

              return (
                <div key={catIndex}>
                  {/* Category name */}
                  <strong className="text-3xl block mb-4">
                    {cat.text} For You!
                  </strong>
                  {/* Products */}
                  {filteredProducts && filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-hidden mb-5">
                      {/* Render product cards */}
                      {filteredProducts.map((prod, idx) => (
                        <ProductCard key={idx} product={prod} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center">
                      <p className="text-2xl italic font-bold">
                        No products found for this category
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductsPage;
