import { useState, useEffect, useRef, Fragment } from "react";
import ProductLoader from "@/utils/ProductLoader";
import { useDispatch, useSelector } from "react-redux";
import { TopDealsDataHandler } from "@/redux/actions/ProductsApi";
import { useTranslation } from 'next-i18next';
import ProductBoxTwo from "@/utils/ProductBoxTwo";

const HomeProducts = () => {

    const { t } = useTranslation('common');

    const dispatch = useDispatch();

    const { TopDealsData } = useSelector(state => state.productsData);

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        dispatch(TopDealsDataHandler("?page=1", () => {
            setLoader(false);
        }));
    }, [])

    return (
        <section className="top-deals">
            <div className="container">
                {/* <h3 className="section-main-title">{t('top_deals')}</h3> */}
                {/* Hello */}
                {
                    loader ?
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductLoader />
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductLoader />
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductLoader />
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductLoader />
                            </div>
                        </div> :
                        <div className="top-deals-slider">
                            <div className="row">
                                {
                                    TopDealsData.map(item => (
                                        <Fragment key={item.id}>
                                        <ProductBoxTwo
                                            wrapperClass="col-lg-3 col-md-4 col-6"
                                            id={item.id}
                                            name={item.name}
                                            slug={item.slug}
                                            price={item.unit_price}
                                            priceAfterDiscount={item.price_after_discount}
                                            discount={item.discount}
                                            discountType={item.discount_type}
                                            image={item.thumbnail_img}
                                            rate={item.rating}
                                            cat={item.category.name}
                                            stock={item.stock}
                                            prodType={item.prod_type}
                                            minWeight={item.min_weight}
                                        />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                }
            </div>
        </section>
    )
}

export default HomeProducts;