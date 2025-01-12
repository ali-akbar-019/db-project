import { useGetNewProducts } from "@/api/productsApi";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import LoadingProductCard from "@/components/LoadingProductCard";
import PopularBrands from "@/components/PopularBrands";
import PopularCategories from "@/components/PopularCategories";
import PopularProducts from "@/components/PopularProducts";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const { data: newProducts, isLoading: isNewProductsLoading } =
    useGetNewProducts();
  return (
    <>
      <Container className="pt-5">
        {/* hero section */}
        <HeroSection />

        {/*popular products  */}
        <PopularProducts className="pt-10" />
        {/* popular categories */}
        <PopularCategories />
        {/* single product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-20 h-auto lg:h-[550px]">
          {/* Left Image Section */}
          <div className="h-[250px] lg:h-full overflow-hidden rounded-xl">
            <img
              src="/imgs/horizontal_05.jpg"
              alt="image of the product"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content Section */}
          <div className="flex flex-col justify-between gap-6">
            {/* Product Cards */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {isNewProductsLoading ? (
                <>
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <LoadingProductCard />
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <LoadingProductCard />
                  </div>
                </>
              ) : (
                newProducts &&
                newProducts.length > 0 && (
                  <>
                    {newProducts.slice(0, 2).map((prod, idx) => (
                      <div key={idx} className="w-full sm:w-1/2 lg:w-1/3">
                        <ProductCard product={prod} />
                      </div>
                    ))}
                  </>
                )
              )}
            </div>

            {/* Collection Info */}
            <div className="px-4 lg:px-0">
              <strong className="block text-lg lg:text-xl">
                S/S 2024 Collection
              </strong>
              <p className="text-sm lg:text-base text-gray-600 mt-2">
                Discover the latest trends with our S/S 2024 Collection,
                thoughtfully designed for elegance and comfort. Each piece
                embodies exceptional craftsmanship, ensuring you stand out
                wherever you go.
              </p>
            </div>
          </div>
        </div>

        <PopularBrands className="mt-32 mb-32" />
      </Container>
    </>
  );
};

export default HomePage;
