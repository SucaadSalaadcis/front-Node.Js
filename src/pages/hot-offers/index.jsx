import { useEffect, useState, Fragment } from "react";
import PageHeader from "@/utils/PageHeader";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductBoxTwo from "@/utils/ProductBoxTwo";
import { axiosApi } from "@/helpers/Config";
import PageLoader from "@/utils/PageLoader";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const HotOffers = () => {

    const router = useRouter();
    const { t } = useTranslation();

    const [allProducts, setAllProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loader, setLoader] = useState(true);
    const [loadMoreLoader, setLoadMoreLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        axiosApi.get("products/deals?page=1").then(({ data }) => {
            if (data.success) {
                setAllProducts(data.data || []);
                setHasMore((data.meta?.current_page || 1) < (data.meta?.last_page || 1));
                setPage(1);
            }
            setLoader(false);
        });
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setLoadMoreLoader(true);
        axiosApi.get(`products/deals?page=${nextPage}`).then(({ data }) => {
            if (data.success) {
                setAllProducts(prev => [...prev, ...(data.data || [])]);
                setPage(nextPage);
                setHasMore(nextPage < (data.meta?.last_page || 1));
            }
            setLoadMoreLoader(false);
        });
    };

    return (
        <>
            <Head>
                <title>{`${t('menu:hot_offers')} - ${t('common:site_name')}`}</title>
                <meta name="description" content="Hot Offers" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <PageHeader title={t('menu:hot_offers')} subTitle={t('menu:hot_offers')} />
            <section className="page-wrapper">
                <div className="container">
                    {
                        loader ? <PageLoader /> :
                            <div className="row">
                                {
                                    allProducts.map((item) => (
                                        <Fragment key={item.id}>
                                            <ProductBoxTwo
                                                wrapperClass="col-lg-3 col-md-4 col-6"
                                                id={item.id}
                                                image={item.thumbnail_img}
                                                name={item.name}
                                                slug={item.slug}
                                                price={item.unit_price}
                                                priceAfterDiscount={item.price_after_discount}
                                                discount={item.discount}
                                                discountType={item.discount_type}
                                                rate={item.rating}
                                                cat={item.category?.name || "N/A"}
                                                hasOffer={true}
                                                prodType={item.prod_type}
                                                minWeight={item.min_weight}
                                                stock={item.stock}
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                    }
                    {hasMore && !loader && (
                        <div className="text-center mt-4 mb-5">
                            <button
                                className="btn btn-primary btn-lg rounded-pill px-5"
                                onClick={handleLoadMore}
                                disabled={loadMoreLoader}
                            >
                                {loadMoreLoader
                                    ? (t('common:loading') || 'جارٍ التحميل...')
                                    : (t('common:load_more') || 'تحميل المزيد')
                                }
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default HotOffers;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["menu", "common", "header", "product"])),
        },
    };
}