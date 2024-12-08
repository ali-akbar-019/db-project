import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection copy";
import PopularCategories from "@/components/PopularCategories";
import PopularProducts from "@/components/PopularProducts";

const Categories = () => {
  return (
    <>
      <HeroSection
        image="/imgs/horizontal_02.jpg"
        desc="Explore our curated collection of categories that cater to your unique style and preferences. From elegant rings to trendy chains, each category showcases our dedication to quality and design. Discover the perfect piece to express your individuality."
        title="Browse Our Categories"
        buttonText="Shop Now"
      />

      <Container>
        {/*  */}
        <PopularProducts className="pt-10" />
        {/* popular categories */}
        <PopularCategories className="mb-20" />
      </Container>
    </>
  );
};

export default Categories;
