import { useState, useEffect } from "react";
import SingleCategory from "@/components/SingleCategory";
import { useDispatch, useSelector } from "react-redux";
import { SingleCategoryDataHandler } from "@/redux/actions/CategoriesApi";
import { useRouter } from "next/router";
import PageLoader from "@/utils/PageLoader";
import FilterBox from "@/utils/FilterBox";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import PageHeader from "@/utils/PageHeader";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

// Slider arrow
const Arrow = ({ onClick, disabled, direction }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`absolute ${direction === "right" ? "right-0" : "left-0"
      } top-1/2 -translate-y-1/2 z-10 cursor-pointer`}
  >
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition
        ${disabled
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : "border-blue-500 bg-white hover:bg-blue-50 shadow-md"
        }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {direction === "right" ? (
          <path d="M9 18l6-6-6-6" />
        ) : (
          <path d="M15 18l-6-6 6-6" />
        )}
      </svg>
    </div>
  </div>
);

const getSlidesCount = () => {
  if (typeof window === "undefined") return 5;
  if (window.innerWidth < 640) return 2;
  if (window.innerWidth < 768) return 3;
  if (window.innerWidth < 1024) return 4;
  if (window.innerWidth < 1280) return 5;
  return 6;
};

const PER_PAGE = 10;

const SingleCategoryPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { CatSlug } = router.query;
  const dispatch = useDispatch();
  const { SingleCatData } = useSelector((state) => state.categoriesData);

  const [loader, setLoader] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [slidesCount, setSlidesCount] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isRTL = i18n.language === "ar";
  const totalSlides = SingleCatData?.sub_category?.length || 0;

  const loadCategory = (pageNumber = 1) => {
    if (pageNumber === 1) setLoader(true);
    else setLoadingMore(true);

    dispatch(
      SingleCategoryDataHandler(
        CatSlug,
        () => {
          setLoader(false);
          setLoadingMore(false);
        },
        {
          page: pageNumber,
          per_page: PER_PAGE,
        }
      )
    );
  };
  useEffect(() => {
    if (!router.isReady) return;

    // Reset state
    setPage(1);
    setProducts([]);
    setHasMore(true);

    // Reload category data
    loadCategory(1);
  }, [router.isReady, CatSlug, i18n.language]);

  useEffect(() => {
    const productsArray = SingleCatData?.products || []; // safe fallback

    setProducts(prev =>
      page === 1 ? productsArray : [...prev, ...productsArray]
    );

    // Update hasMore based on API returned products
    if (productsArray.length < PER_PAGE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [SingleCatData]);


  useEffect(() => {
    if (SingleCatData?.products) {
      setProducts((prev) =>
        page === 1 ? SingleCatData.products : [...prev, ...SingleCatData.products]
      );

      if (SingleCatData.products.length < PER_PAGE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [SingleCatData]);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;

    const next = page + 1;
    setPage(next);
    loadCategory(next);
  };

  useEffect(() => {
    const updateSlides = () => setSlidesCount(getSlidesCount());
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
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
    <>
      <Head>
        <title>{SingleCatData?.name} - {t("common:site_name")}</title>
      </Head>

      <PageHeader
        title={SingleCatData?.name}
        subTitle={SingleCatData?.name}
        banner={SingleCatData?.banner}
      />

      <section className="page-wrapper">
        <div className="container">
          {loader ? (
            <PageLoader />
          ) : (
            <>
              <div className="filter-icon" onClick={() => setShowFilter(true)}>
                <span className="filter-label">{t('filter')}</span>
                <i className="fi fi-rr-settings-sliders"></i>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <FilterBox mobClass={showFilter} FilterHide={() => setShowFilter(false)} />
                </div>
                <div className="col-md-9">
                  {Array.isArray(SingleCatData?.sub_category) &&
                    SingleCatData.sub_category.length > 0 && (
                      <div className="mb-8">
                        <Slider {...settings} dir={isRTL ? "rtl" : "ltr"}>
                          {SingleCatData.sub_category.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/categories/${sub.slug}`}
                              className="flex flex-col items-center p-3 w-32"
                            >
                              <div className="w-28 h-28 mb-2 flex items-center justify-center rounded-lg border bg-white shadow">
                                <Image
                                  src={sub.icon}
                                  alt={sub.name}
                                  width={112}
                                  height={112}
                                  unoptimized
                                />
                              </div>
                              <div className="h-6 w-28 text-center font-medium truncate">
                                {sub.name}
                              </div>
                            </Link>
                          ))}
                        </Slider>
                      </div>
                    )}

                  {products.length === 0 && (
                    <div className="text-center py-16 text-gray-500 text-lg">
                      {/* No products found in this category. */}
                    </div>
                  )}

                  <SingleCategory
                    data={{ ...SingleCatData, products }}
                    hideSubCategories
                  />

                  {hasMore && (
                    <div className="flex justify-center my-10">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore || products.length === 0}
                        className="px-8 py-3 bg-[#1D3E73] text-white rounded-lg font-semibold hover:bg-[#335C99] transition disabled:opacity-60"
                      >
                        {loadingMore ? t("common:loading") : t("common:load_more")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SingleCategoryPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["menu", "common", "header", "product"])),
    },
  };
}
