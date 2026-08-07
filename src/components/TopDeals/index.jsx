import { useState, useEffect } from "react";
import ProductLoader from "@/utils/ProductLoader";
import { useDispatch, useSelector } from "react-redux";
import { FeaturedProductsDataHandler } from "@/redux/actions/ProductsApi";
import { useTranslation } from 'next-i18next';
import ProductBoxTwo from "@/utils/ProductBoxTwo";

const TopDeals = () => {

    const { t } = useTranslation('common');

    const dispatch = useDispatch();

    const { FeaturedData } = useSelector(state => state.productsData);
    // console.log(FeaturedData);

    const [ loader, setLoader ] = useState(true);

    useEffect(() => {
        dispatch(FeaturedProductsDataHandler(() => {
            setLoader(false);
        }));
    },[])

    return(
        <section className="top-deals mt-20 mb-24">
            <div className="container">
            <h3 className="section-main-title">{t('recommended_for_you')}</h3>
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
                                FeaturedData.map(item => (
                                        <ProductBoxTwo
                                            key={item.id}
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
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default TopDeals;