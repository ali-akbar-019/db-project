const HeroSection = ({
    title = "   Your Beauty, Our Priority", desc = "   At Beauty By Zainab, we believe that beauty is more than skin deep. Our expert team is dedicated to helping you look and feel your best through personalized beauty treatments and premium products that enhance your natural radiance.", image = "/imgs/banner_image.jpg", buttonText = "Contact" }: { title?: string, desc?: string, image?: string, buttonText?: string }) => {
    return (
        <section className="relative min-h-[500px]">
            <img src={image} alt={"about us"} className="absolute w-full h-full object-cover" id="scrollLeft" />
            <div className="absolute  h-full flex items-center " id="scrollRight">
                <div className="px-10 md:px-20 lg:px-32 space-y-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white max-w-lg">
                        {title}
                    </h2>
                    <p className="max-w-xl text-base text-white/90">
                        {desc}
                    </p>
                    <button className="border border-[#A88755] text-sm transition-all text-[#A88755] px-10 py-1 rounded-full cursor-pointer hover:bg-[#A88755] hover:text-white">
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
