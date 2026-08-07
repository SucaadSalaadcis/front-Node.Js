import { useState, useEffect } from "react";
 import SectionTitle from "@/utils/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { TopBrandsDataHandler } from "@/redux/actions/BrandsApi";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";
import BrandBox from "@/utils/BrandBox";

/* Skeleton */
const BrandSkeleton = () => (
  <div className="flex flex-col items-center p-3 w-32 animate-pulse">
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-2" />
  </div>
);

/* Arrow */
const Arrow = ({ onClick, disabled, direction }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`absolute ${direction === "right" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 z-10`}
  >
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition
        ${disabled
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : "border-blue-500 bg-white hover:bg-blue-50 shadow-md cursor-pointer"
        }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {direction === "right" ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
      </svg>
    </div>
  </div>
);

/* Helper */
const getSlidesCount = () => {
  if (typeof window === "undefined") return 9;
  if (window.innerWidth < 640) return 3;
  if (window.innerWidth < 768) return 4;
  if (window.innerWidth < 1024) return 5;
  if (window.innerWidth < 1280) return 7;
  return 9;
};

/* TopBrands Component */
const TopBrands = () => {
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();
  const { BrandsData } = useSelector((state) => state.brandsData);

  const [loading, setLoading] = useState(true);
  const [slidesCount, setSlidesCount] = useState(9);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isRTL = i18n.language === "ar";
  const totalSlides = BrandsData?.length || 0;

  useEffect(() => {
    dispatch(TopBrandsDataHandler(() => setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    const update = () => setSlidesCount(getSlidesCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesCount,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (_, next) => {
      const maxIndex = Math.max(totalSlides - slidesCount, 0);
      setCurrentSlide(next > maxIndex ? maxIndex : next);
    },
    nextArrow: <Arrow direction="right" disabled={currentSlide >= totalSlides - slidesCount} />,
    prevArrow: <Arrow direction="left" disabled={currentSlide === 0} />,
  };

  return (
    <section className="home-brands mt-top-brands py-8">
      <div className="container mx-auto relative" dir={isRTL ? "rtl" : "ltr"}>
        {/* Keep your original title untouched */}
        <SectionTitle title={t("top_brands")} />

        {/* Skeleton while loading */}
        {loading && (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: slidesCount }).map((_, i) => (
              <BrandSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Brands slider */}
        {!loading && totalSlides > 0 && (
          <Slider {...settings}>
            {BrandsData.map((item) => (
              <div key={item.id} className="flex flex-col items-center p-3 w-32">
                <BrandBox slug={item.id} image={item.logo} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default TopBrands;
