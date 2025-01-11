import { CloudLightning } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[540px] gap-3">
      {/* Left Section */}
      <div className="left col-span-2 rounded-xl overflow-hidden w-full h-full relative">
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
            <CarouselItem>
              <img
                src="/imgs/horizontal_01.jpg"
                alt="banner image"
                className="w-full h-full object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/imgs/horizontal_04.jpg"
                alt="banner image"
                className="w-full h-full object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/imgs/horizontal_03.jpg"
                alt="banner image"
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Top Content */}
        <div className="absolute flex items-center gap-3 top-5 left-5">
          <span className="p-5 bg-gray-300 rounded-xl">
            <CloudLightning className="text-white" />
          </span>
          <p className="text-white max-w-lg font-bold text-sm sm:text-base md:text-lg">
            Your one-stop solution for effortless shopping, anytime, anywhere!
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right rounded-xl overflow-hidden w-full h-full relative">
        <img
          src="/imgs/horizontal_02.jpg"
          alt="banner image"
          className="w-full h-full object-cover"
        />
        {/* Color Swatches */}
        <div className="absolute top-5 left-4 flex items-center">
          <span className="border-2 border-white w-8 h-8 md:w-10 md:h-10 bg-white rounded-full"></span>
          <span className="border-2 border-white w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full -ms-3"></span>
          <span className="border-2 border-white w-8 h-8 md:w-10 md:h-10 bg-cyan-800 rounded-full -ms-3"></span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-5 px-4 sm:px-10 flex flex-col sm:flex-row items-center sm:justify-between w-full">
          <div className="flex flex-col text-center sm:text-left">
            <strong className="text-lg sm:text-xl">Rings X</strong>
            <small className="text-gray-800 font-bold text-sm sm:text-base">
              Shope Ease
            </small>
          </div>
          <div className="mt-3 sm:mt-0">
            <Link to={"/products"}>
              <button className="flex items-center gap-3 bg-gray-950 py-2 px-4 sm:py-3 sm:px-5 text-sm rounded-full text-white font-semibold tracking-tight transition-all hover:bg-black hover:text-white/70">
                Add to cart <span className="text-white/70">$45.23</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
