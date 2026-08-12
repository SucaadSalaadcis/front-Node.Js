import { useState, useEffect } from "react";
import SingleCategory from "@/components/SingleCategory";
import { useDispatch, useSelector } from "react-redux";
import { SingleCategoryDataHandler } from "@/redux/actions/CategoriesApi";
import { useRouter } from "next/router";
import PageLoader from "@/utils/PageLoader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import PageHeader from "@/utils/PageHeader";
import { useTranslation } from "next-i18next";

const PER_PAGE = 8;

const SingleCategoryPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { CatSlug } = router.query;

  const dispatch = useDispatch();

  const { SingleCatData } = useSelector(
    (state) => state.categoriesData
  );

  const [loader, setLoader] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Currently selected subcategory
  // null = All
  const [activeSubCat, setActiveSubCat] = useState(null);

  // Keep parent category information separate
  const [categoryInfo, setCategoryInfo] = useState(null);

  // Products currently displayed
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isRTL = i18n.language === "ar";

 
  // Load category / subcategory product
  const loadCategory = (pageNumber = 1, subCatSlug = null) => {
    if (pageNumber === 1) {
      setLoader(true);
    } else {
      setLoadingMore(true);
    }

    // Parent category when subCatSlug is null
    // Subcategory when subCatSlug has a value
    const targetSlug = subCatSlug || CatSlug;

    dispatch(
      SingleCategoryDataHandler(
        targetSlug,
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


  // Initial category load
  useEffect(() => {
    if (!router.isReady) return;

    setActiveSubCat(null);
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setCategoryInfo(null);

    loadCategory(1, null);
  }, [router.isReady, CatSlug, i18n.language]);


  // Sync Redux data with local products
  useEffect(() => {
    if (!SingleCatData) return;

    const productsArray = SingleCatData.products || [];

    // Save parent category info when loading "All" (activeSubCat === null),
    // or if categoryInfo was locked earlier without sub_categories populated.
    const hasSubCategories =
      Array.isArray(SingleCatData.sub_category) &&
      SingleCatData.sub_category.length > 0;

    if (activeSubCat === null || !categoryInfo?.sub_category?.length) {
      if (hasSubCategories || activeSubCat === null) {
        setCategoryInfo(SingleCatData);
      }
    }

    // Update displayed products
    setProducts((prev) =>
      page === 1
        ? productsArray
        : [...prev, ...productsArray]
    );

    // Check if there are more products
    if (productsArray.length < PER_PAGE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [SingleCatData]);

 
  // Change subcategory
  const handleSubCategoryChange = (subSlug) => {
    if (activeSubCat === subSlug) return;

    setActiveSubCat(subSlug);
    setPage(1);
    setProducts([]);
    setHasMore(true);

    // Fetch only the products.
    // The page/URL does NOT change.
    loadCategory(1, subSlug);
  };


  // Load more products
  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;

    setPage(nextPage);

    loadCategory(nextPage, activeSubCat);
  };


  // Parent category information
  const parentCategoryName =
    categoryInfo?.parent_name || categoryInfo?.name;

  const subCategories =
    categoryInfo?.sub_category || [];

  return (
    <>
      <Head>
        <title>
          {parentCategoryName} - {t("common:site_name")}
        </title>
      </Head>

      {/* Parent category header always stays */}
      <PageHeader
        title={parentCategoryName}
        subTitle={parentCategoryName}
        banner={categoryInfo?.banner}
      />

      <section className="py-6 page-wrapper">
        <div className="container px-4 mx-auto">

          {loader && page === 1 ? (
            <PageLoader />
          ) : (
            <div className="w-full">  
              {/* Subcategory Tabs */}
              {Array.isArray(subCategories) &&
                subCategories.length > 0 && (
                  <div className="w-full mb-8 border-b border-slate-200">

                    <div
                      className="flex items-center gap-6 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100 whitespace-nowrap"
                      dir={isRTL ? "rtl" : "ltr"}
                    >

                      {/* ALL */}
                      <button
                        type="button"
                        onClick={() =>
                          handleSubCategoryChange(null)
                        }
                        className={`relative pb-2 text-sm font-semibold transition-colors duration-200 ${
                          activeSubCat === null
                            ? "text-[#1D3E73] font-bold border-b-2 border-[#1D3E73]"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {isRTL ? "الكل" : "All"}
                      </button>

                      {/* SUBCATEGORIES */}
                      {subCategories.map((sub) => {
                        const isActive =
                          activeSubCat === sub.slug;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() =>
                              handleSubCategoryChange(sub.slug)
                            }
                            className={`relative pb-2 text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                              isActive
                                ? "text-[#1D3E73] font-bold border-b-2 border-[#1D3E73]"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span>{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

            
              {/* Empty State */}

              {!loader && products.length === 0 && (
                <div className="py-16 text-sm font-medium text-center text-slate-400">
                  {isRTL
                    ? "لا توجد منتجات في هذا القسم حالياً"
                    : "No products found in this category."}
                </div>
              )}

              {/* Products */}
              <SingleCategory
                data={{
                  ...categoryInfo,
                  name: parentCategoryName,
                  products,
                }}
                hideSubCategories
              />

          
              {/* Load More */}
              {hasMore && products.length > 0 && (
                <div className="flex justify-center my-10">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-2.5 bg-[#1D3E73] text-white text-sm rounded-lg font-bold hover:bg-[#335C99] transition disabled:opacity-60 shadow-sm active:scale-95"
                  >
                    {loadingMore
                      ? t("common:loading")
                      : t("common:load_more")}
                  </button>
                </div>
              )}
            </div>
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
      ...(await serverSideTranslations(locale, [
        "menu",
        "common",
        "header",
        "product",
      ])),
    },
  };
}