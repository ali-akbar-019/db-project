import { CloudLightning } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  return (
    <>
      <section className="grid grid-cols-3 h-[540px] overflow-hidden gap-3">
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
                  className="w-full h-full object-cover "
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/imgs/horizontal_04.jpg"
                  alt="banner image"
                  className="w-full h-full object-cover "
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/imgs/horizontal_03.jpg"
                  alt="banner image"
                  className="w-full h-full object-cover "
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/*top */}
          <div className="absolute flex items-center gap-3 top-5 left-5">
            <span className="p-5 bg-gray-300 rounded-xl">
              <CloudLightning className="text-white " />
            </span>
            <p className="text-white max-w-lg font-bold ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Provident, doloribus?
            </p>
          </div>
        </div>
        <div className="right rounded-xl overflow-hidden w-full h-full relative">
          <img
            src="/imgs/horizontal_02.jpg"
            alt="banner image"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-5 left-4 flex items-center ">
            <span className="border-2 border-white w-10 h-10 bg-white rounded-full  block "></span>
            <span className="border-2 border-white w-10 h-10 bg-gray-800 rounded-full  block -ms-4"></span>

            <span className="border-2 border-white w-10 h-10 bg-cyan-800 rounded-full  block -ms-4"></span>
          </div>
          <div className="absolute bottom-5 px-10 flex items-center justify-between w-full">
            <div className="flex flex-col">
              <strong className="text-xl ">Rings X</strong>
              <small className="text-gray-800 font-bold text-base">
                Cryptic
              </small>
            </div>
            <div>
              <button className="flex items-center gap-3 bg-gray-950 py-3 px-5 text-sm rounded-full  text-white font-semibold tracking-tight transition-all hover:bg-black hover:text-white/70">
                Add to cart <span className="text-white/70">$45.23</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
