import { cn } from "@/lib/utils";

const PopularBrands = ({ className }: { className?: string }) => {
  return (
    <>
      <div
        className={cn(
          "popular_brands flex items-center justify-between overflow-hidden gap-10",
          className
        )}
      >
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c629beb03c426110996eba_nexa-contact-logo02.png"
          loading="lazy"
          srcSet="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c629beb03c426110996eba_nexa-contact-logo02-p-500.png 500w, https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c629beb03c426110996eba_nexa-contact-logo02-p-800.png 800w, https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c629beb03c426110996eba_nexa-contact-logo02-p-1080.png 1080w, https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c629beb03c426110996eba_nexa-contact-logo02.png 1280w"
          alt=""
          className="contact-logo_image"
        />
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1dcc527cbc78ca1fa4_nexa-contact-logo05.png"
          loading="lazy"
          alt=""
          className="contact-logo_image"
        />
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1dc5cb1117349baf16_nexa-contact-logo03.png"
          loading="lazy"
          alt=""
          className="contact-logo_image"
        />
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1d6dade94cf53026ba_nexa-contact-logo04.png"
          loading="lazy"
          srcSet="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1d6dade94cf53026ba_nexa-contact-logo04-p-500.png 500w, https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1d6dade94cf53026ba_nexa-contact-logo04-p-800.png 800w, https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1d6dade94cf53026ba_nexa-contact-logo04-p-1080.png 1080w, https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62a1d6dade94cf53026ba_nexa-contact-logo04.png 1448w"
          alt=""
          className="contact-logo_image"
        />
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62acdcc527c204bca24aa_nexa-contact-logo06.png"
          loading="lazy"
          alt=""
          className="contact-logo_image"
        />
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62acd9233fd73b19cdfa8_nexa-contact-logo07.png"
          loading="lazy"
          alt=""
          className="contact-logo_image"
        />
        <img
          src="https://cdn.prod.website-files.com/60bfb4136a9eb67f0c225ed8/61c62acdf8220dc787cdccc5_nexa-contact-logo08.png"
          loading="lazy"
          alt=""
          className="contact-logo_image"
        />
      </div>
    </>
  );
};

export default PopularBrands;
