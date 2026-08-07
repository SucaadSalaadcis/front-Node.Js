import { useEffect, useState } from "react";
import PageHeader from "@/utils/PageHeader";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductBoxTwo from "@/utils/ProductBoxTwo";
import { useDispatch, useSelector } from "react-redux";
import { MagazineProductsHandler } from "@/redux/actions/ProductsApi";
import PageLoader from "@/utils/PageLoader";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";

const safeSlice = (val, start = 0, end = 50) => {
  if (val === null || val === undefined) return "";
  return typeof val === "string"
    ? val.slice(start, end)
    : String(val).slice(start, end);
};

const ElferganyMagazinePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { MagazineProductsData, pagesMagazineProducts } = useSelector(
    (state) => state.productsData,
  );
  console.log(MagazineProductsData);
  const [loader, setLoader] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  const myPage = parseInt(router.query.page || "1", 10);

  useEffect(() => {
    setLoader(true);
    dispatch(MagazineProductsHandler(myPage, () => setLoader(false)));
  }, [router.query.page]);

  const meta = pagesMagazineProducts?.meta || {
    total: 0,
    last_page: 1,
    links: [],
  };

  const links = Array.isArray(meta.links) ? meta.links : [];
  const categoryOrder = [
    138, 139, 140, 141, 136, 110, 131, 111, 133, 114, 106, 107, 178, 109, 180,
    112, 116, 118, 115, 113, 143, 181, 179, 182, 183, 108, 117, 119, 122, 129,
    121, 123, 124, 126, 127, 159, 120, 125, 132, 134, 135, 137, 130, 145, 148,
    149, 151, 152, 153, 166, 168, 175, 174, 173, 172, 171, 170, 169, 167, 165,
    164, 162, 160, 157, 155, 150, 161, 103, 146, 147, 142, 156, 154, 128, 163,
    158,
  ];
  const groupedMap = new Map();

  (MagazineProductsData || []).forEach((item) => {
    const categoryId = item.category_id;

    if (!groupedMap.has(categoryId)) {
      groupedMap.set(categoryId, {
        id: categoryId,
        name: item.category?.name || "N/A",
        products: [],
      });
    }

    groupedMap.get(categoryId).products.push(item);
  });

  const locale = router.locale || "ar";

  groupedMap.forEach((group) => {
    group.products.sort((a, b) => {
      const nameA =
        a.translations?.find((t) => t.locale === locale)?.name ||
        a.name ||
        "";
      const nameB =
        b.translations?.find((t) => t.locale === locale)?.name ||
        b.name ||
        "";
      return nameA.localeCompare(nameB, locale);
    });
  });

  const groupedProducts = Array.from(groupedMap.values()).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.id);
    const bIndex = categoryOrder.indexOf(b.id);

    return (aIndex === -1 ? 99999 : aIndex) - (bIndex === -1 ? 99999 : bIndex);
  });

  const filteredGroupedProducts = activeCategory
    ? groupedProducts.filter((cat) => cat.id === activeCategory)
    : groupedProducts;

  const flatProducts = filteredGroupedProducts.flatMap((cat) => cat.products);
  const visibleProducts = flatProducts.slice(0, visibleCount);
  const hasMore = visibleCount < flatProducts.length;

  const catNameMap = new Map();
  filteredGroupedProducts.forEach((cat) => {
    cat.products.forEach((p) => catNameMap.set(p.id, cat.name));
  });

  return (
    <>
      <Head>
        <title>
          {`${t("menu:magazine_products")} - ${t("common:site_name")}`}
        </title>
        <meta name="description" content="Magazine Products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <PageHeader
        title={t("menu:magazine_products")}
        subTitle={t("menu:magazine_products")}
      />

      <section className="page-wrapper">
        <div className="container">
          {loader ? (
            <PageLoader />
          ) : (
            <>
              {groupedProducts.length > 0 && (
                <div className="magazine-categories mb-4">
                  <select
                    className="form-select form-select-lg w-auto mx-auto"
                    style={{ maxWidth: "400px" }}
                    value={activeCategory || ""}
                    onChange={(e) => {
                      setActiveCategory(e.target.value ? Number(e.target.value) : null);
                      setVisibleCount(20);
                    }}
                  >
                    <option value="">{locale === "en" ? "All Magazine Categories" : "كل أقسام المجلة"}</option>
                    {groupedProducts.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="row">
                {visibleProducts.map((item) => {
                  const translation = item.translations?.find(
                    (x) => x.locale === (router.locale || "ar"),
                  );
                  const categoryName = catNameMap.get(item.id) || "N/A";

                  return (
                    <ProductBoxTwo
                      key={item.id}
                      wrapperClass="col-md-3"
                      id={item.id}
                      name={safeSlice(translation?.name || item.name, 0, 50)}
                      slug={item.slug}
                      price={item.unit_price}
                      priceAfterDiscount={item.price_after_discount}
                      discount={item.discount}
                      discountType={item.discount_type}
                      image={item.thumbnail_img}
                      rate={item.rating}
                      cat={safeSlice(categoryName, 0, 30)}
                      isMagazine={true}
                      prodType={item.prod_type}
                      minWeight={item.min_weight}
                      stock={item.stock}
                    />
                  );
                })}
              </div>

              {hasMore && (
                <div className="text-center mt-4 mb-5">
                  <button
                    className="btn btn-primary btn-lg rounded-pill px-5"
                    onClick={() => setVisibleCount((prev) => prev + 20)}
                  >
                    {t("common:load_more")}
                  </button>
                </div>
              )}
            </>
          )}

          {meta.total > 12 && (
            <div className="pagination">
              <ul className="pagination-list">
                <li>
                  <Link
                    href="#"
                    className={myPage === 1 ? "disabled" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      if (myPage > 1) {
                        router.push({
                          query: { ...router.query, page: myPage - 1 },
                        });
                      }
                    }}
                  >
                    <i className="fi fi-rr-arrow-left" />
                  </Link>
                </li>

                {links.slice(1, -1).map((item) => (
                  <li key={item.label}>
                    <Link
                      href="#"
                      className={myPage == item.label ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push({
                          query: { ...router.query, page: item.label },
                        });
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    href="#"
                    className={myPage === meta.last_page ? "disabled" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      if (myPage < meta.last_page) {
                        router.push({
                          query: { ...router.query, page: myPage + 1 },
                        });
                      }
                    }}
                  >
                    <i className="fi fi-rr-arrow-right" />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ElferganyMagazinePage;

export async function getStaticProps({ locale }) {
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
