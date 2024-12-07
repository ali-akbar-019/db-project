import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import PopularBrands from "@/components/PopularBrands";
import PopularCategories from "@/components/PopularCategories";
import PopularProductCard from "@/components/PopularProductCard";
import PopularProducts from "@/components/PopularProducts";

const HomePage = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-20 h-[550px]">
          <div className="h-full overflow-hidden rounded-xl">
            <img
              src="/imgs/horizontal_05.jpg"
              alt="image of the product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex  gap-2">
              <div>
                <PopularProductCard />
              </div>
              <div>
                <PopularProductCard />
              </div>
            </div>
            <div className="max-w-lg">
              <strong>S/S 2024 collection</strong>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laudantium aut doloribus molestias mollitia possimus
                exercitationem, nulla ipsum placeat error consequuntur.
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
