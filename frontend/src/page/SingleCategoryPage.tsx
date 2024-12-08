import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection copy";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const SingleCategoryPage = () => {
  return (
    <>
      <HeroSection
        image="/imgs/men_03.jpg"
        desc="Discover our exquisite range of products designed to elevate your style and leave a lasting impression. From timeless classics to contemporary designs, every piece is crafted with care to meet your unique needs."
        title="Our Products"
        buttonText="Explore Now"
      />
      {/*  */}

      {/* filter buttons */}
      <Container className="mb-20">
        {/* filters */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-[180px] rounded-full bg-gray-200">
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
              <SelectTrigger className="w-[180px] rounded-full bg-gray-200">
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
              <SelectTrigger className="w-[180px] rounded-full bg-gray-200">
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
              <SelectTrigger className="w-[100px] rounded-full bg-gray-200">
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

          <div>
            <Select>
              <SelectTrigger className="w-[180px] rounded-full bg-gray-200">
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
        {/* products */}
        <div className="mt-10">
          <div>
            {/* category name */}
            <strong className="text-3xl block mb-4">Headphones For You!</strong>
            {/* products */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 overflow-hidden mb-5">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
        {/* similar products */}
        <div className="mt-10">
          <strong className="text-3xl block mb-4">
            Similar Items You Might Like
          </strong>
          {/* products */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </>
  );
};

export default SingleCategoryPage;
