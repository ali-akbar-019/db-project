import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection copy";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const AboutUsPage = () => {
  const [responsive, setResponsive] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setResponsive(window.innerWidth < 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //

  return (
    <>
      {/* banner image */}
      <HeroSection
        image="/imgs/horizontal_05.jpg"
        desc="Discover the story behind Shope Ease. From our humble beginnings to becoming a trusted name in timeless jewelry, our journey is rooted in a passion for exceptional craftsmanship and customer satisfaction. Explore our commitment to quality and the vision that drives us forward."
        title="About Shope Ease"
        buttonText="Learn More"
      />

      {/*  */}
      <Container>
        <div className="container mb-10 mt-20">
          <div className="flex items-center justify-between gap-5 flex-wrap ">
            <h1 className="md:text-5xl text-3xl max-w-md uppercase font-semibold reveal">
              Redefining Style: Welcome to Shope Ease.
            </h1>

            <div className="max-w-lg reveal-left">
              <h4 className="uppercase font-semibold text-muted-foreground">
                Our Journey
              </h4>
              <p className="text-sm font-semibold my-2">
                From a spark of inspiration to a global brand, Shope Ease stands
                as a testament to innovation and elegance.
              </p>
              <div>
                <p className="text-sm text-muted-foreground">
                  At Shope Ease, we curate timeless collections of rings and
                  chains that blend artisanal craftsmanship with modern trends.
                  Every piece we design embodies sophistication, ensuring you
                  make a statement that lasts.
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-10" />
          <div className="flex flex-col gap-10 reveal-right">
            <h4 className="uppercase font-semibold text-muted-foreground">
              Excellence in Every Detail
            </h4>
            <p className="md:text-5xl text-3xl capitalize font-medium italic">
              Your style deserves nothing less than perfection.
            </p>
            <div>
              <p>
                Every Shope Ease creation reflects our unwavering commitment to
                superior craftsmanship. Each piece is more than just an
                accessory; it's a story of meticulous attention to detail and a
                celebration of timeless elegance. From sourcing the finest
                materials to ensuring flawless designs, we leave no stone
                unturned in crafting jewelry that blends beauty and durability
                seamlessly. Our artisans pour their expertise and passion into
                every creation, ensuring that each ring and chain tells a unique
                story of sophistication. We believe that true quality is not
                just about aesthetics but also about functionality and
                longevity. That’s why our designs are tested to meet the highest
                standards of durability, so they not only look stunning but also
                stand the test of time. At Shope Ease, we aim to deliver more
                than just products; we aim to deliver confidence, pride, and a
                connection to something truly exceptional. Experience the Shope
                Ease promise—where quality is not just a standard, but a deeply
                held passion that defines everything we do.
              </p>
            </div>
          </div>
          {/*  */}
          <div className="relative my-10 mt-20 flex items-center justify-center reveal">
            <AspectRatio
              ratio={!responsive ? 16 / 7 : 10 / 10}
              className="overflow-hidden w-full"
            >
              <img
                src="/imgs/horizontal_02.jpg"
                alt="Quality Assurance"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            <div className="absolute inset-0 text-white bg-black/20 flex items-center justify-start px-4 md:px-10 lg:px-20">
              <div className="max-w-lg md:max-w-xl lg:max-w-2xl">
                <h4 className="uppercase font-semibold text-base sm:text-lg md:text-xl">
                  Beyond Fashion: A Personalized Experience
                </h4>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl capitalize font-medium italic mt-2 leading-snug md:leading-tight">
                  Celebrate Your Unique Style with Shope Ease
                </p>
                <div className="mt-4 line-clamp-3 lg:line-clamp-none">
                  <p className="text-sm sm:text-base md:text-lg">
                    At Shope Ease, fashion is more than adornment—it's a
                    reflection of your identity. With every piece, we merge
                    craftsmanship and individuality, ensuring you wear something
                    as unique as you. Our dedication to quality and
                    personalization transforms ordinary accessories into
                    extraordinary experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutUsPage;
