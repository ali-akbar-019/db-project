import { cn } from "@/lib/utils";

const PopularCategories = ({ className }: { className?: string }) => {
  return (
    <>
      <section className={cn("", className)}>
        <strong className="text-base md:text-lg lg:text-xl xl:text-2xl">
          Popular Categories
        </strong>
        {/*  */}
        <div className="mt-5" />
        <div className="grid grid-cols-3 gap-2 h-[600px] overflow-hidden">
          <div className="col-span-2 overflow-hidden rounded-xl relative">
            <img
              src="/categories/shoes_03.webp"
              alt="shoes image"
              className=" w-full object-cover h-full"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <strong className="text-base lg:text-lg">
                Clothes and shoes
              </strong>
              <small className="text-gray-500">254 items</small>
            </div>
          </div>
          <div className="col-span-1  flex flex-col gap-2">
            <div className="overflow-hidden rounded-xl relative h-full">
              <img
                src="/categories/laptop_01.webp"
                alt="Electronics"
                className=" w-full object-cover h-full"
              />
              <div className="absolute top-5 left-5 flex flex-col">
                <strong className="text-base lg:text-lg">Electronics</strong>
                <small className="text-gray-500">173 items</small>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl relative h-full">
              <img
                src="/categories/tennis_01.jpg"
                alt="sports image"
                className=" w-full object-cover h-full"
              />
              <div className="absolute top-5 left-5 flex flex-col">
                <strong className="text-base lg:text-lg">Sports goods</strong>
                <small className="text-gray-500">123 items</small>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2" />
        {/* 2nd */}
        <div className="grid grid-cols-3 gap-2 h-[600px] overflow-hidden">
          <div className="col-span-1  flex flex-col gap-2 h-[600px]">
            <div className="overflow-hidden rounded-xl relative ">
              <img
                src="/categories/toys_03.jpg"
                alt="childrens goods"
                className=" w-full object-cover h-full"
              />
              <div className="absolute top-5 left-5 flex flex-col">
                <strong className="text-base lg:text-lg">
                  Children's goods
                </strong>
                <small className="text-gray-500">84 items</small>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl relative h-full">
              <img
                src="/categories/beauty_02.png"
                alt="Beauty"
                className=" w-full object-cover h-full"
              />
              <div className="absolute top-5 left-5 flex flex-col">
                <strong className="text-base lg:text-lg">Beauty</strong>
                <small className="text-gray-500">321 items</small>
              </div>
            </div>
          </div>
          <div className="col-span-2 overflow-hidden rounded-xl relative h-[600px]">
            <img
              src="/categories/sofa_05.jfif"
              alt="furniture image"
              className=" w-full object-cover h-full"
            />
            <div className="absolute top-5 left-5 flex flex-col">
              <strong className="text-base lg:text-lg">Furniture</strong>
              <small className="text-gray-500">123 items</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularCategories;
