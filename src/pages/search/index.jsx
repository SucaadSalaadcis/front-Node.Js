import { useState, useEffect, useRef } from "react";
import FilterBox from "@/utils/FilterBox";
import SeoHead from "@/utils/SeoHead";
import { useDispatch, useSelector } from "react-redux";
import { FilterDataHandler } from "@/redux/actions/FilterApi";
import { useRouter } from "next/router";
import ProductBoxTwo from "@/utils/ProductBoxTwo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import EmptyIcon from '../../../public/images/icons/empty-order.svg'
import Image from "next/image";

const PER_PAGE = 12;

const SearchPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { FilterData, PagesData } = useSelector(state => state.dataFilter);

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const lastParams = useRef('');

    const getParams = () => {
        const s = typeof window !== 'undefined' ? window.location.search : '';
        return new URLSearchParams(s);
    };

    const fetchProducts = (pageNum, append = false) => {
        const p = getParams();
        const params = {
            keyword: p.get('keyword') || '',
            brand: p.get('BrandId') || '',
            cat: p.get('CatId') || '',
            minPrice: p.get('minPrice') || '',
            maxPrice: p.get('maxPrice') || '',
        };
        const paramKey = JSON.stringify(params);
        lastParams.current = paramKey;

        if (append) setLoadingMore(true);
        else setInitialLoading(true);

        dispatch(FilterDataHandler(
            params.keyword, params.brand, params.cat,
            params.minPrice, params.maxPrice,
            `?page=${pageNum}`,
            () => {
                setInitialLoading(false);
                setLoadingMore(false);
            }
        ));
    };

    useEffect(() => {
        if (!router.isReady) return;
        setPage(1);
        setProducts([]);
        setHasMore(true);
        fetchProducts(1);
    }, [router.isReady, router.asPath]);

    useEffect(() => {
        if (page === 1) {
            setProducts(FilterData);
        } else {
            setProducts(prev => [...prev, ...FilterData]);
        }
        const lastPage = PagesData?.last_page || 1;
        setHasMore(page < lastPage);
    }, [FilterData]);

    const handleLoadMore = () => {
        if (!hasMore || loadingMore) return;
        const next = page + 1;
        setPage(next);
        fetchProducts(next, true);
    };

    return (
        <>
            <SeoHead title="Serach Result For" />
            <section className="page-wrapper">
                <div className="container">
                    <div className="filter-icon" onClick={() => setShowFilter(true)}>
                        <span className="filter-label">{t('filter')}</span>
                        <i className="fi fi-rr-settings-sliders"></i>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <FilterBox mobClass={showFilter} FilterHide={() => setShowFilter(false)} />
                        </div>
                        <div className="col-md-9">
                            {products.length === 0 && !initialLoading ? (
                                <div className="empty-search">
                                    <Image src={EmptyIcon} alt="Empty Icon" />
                                    <h3 className="result-title">{t('common:there_are_no_results_of_your_search')}</h3>
                                </div>
                            ) : (
                                <>
                                    <div className="row">
                                        {products.map(item => (
                                            <ProductBoxTwo
                                                key={item.id}
                                                wrapperClass="col-md-4"
                                                id={item.id}
                                                name={item.name}
                                                slug={item.slug}
                                                price={item.unit_price}
                                                discount={item.discount}
                                                image={item.thumbnail_img}
                                                rate={item.rating}
                                                offer={item.price_after_discount}
                                                stock={item.stock}
                                                prodType={item.prod_type}
                                                minWeight={item.min_weight}
                                            />
                                        ))}
                                    </div>
                                    {hasMore && (
                                        <div className="flex justify-center my-10">
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={loadingMore}
                                                className="px-8 py-3 bg-[#1D3E73] text-white rounded-lg font-semibold hover:bg-[#335C99] transition disabled:opacity-60"
                                            >
                                                {loadingMore ? t('common:loading') : t('common:load_more')}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["menu", "common", "header", "product"])),
        },
    };
}
