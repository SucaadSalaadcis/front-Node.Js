import React, { Fragment } from "react";
import ProductContent from "./ProductContent";
import ProductInfo from "./ProductInfo";
import ProductSlider from "./ProductSlider";
import ProductBoxTwo from "@/utils/ProductBoxTwo";
import { useTranslation } from "next-i18next";

const SingleProductPage = ({ data }) => {
  const { t } = useTranslation("product");

  return (
    <section className="single-product">
      <div className="container">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 sm:py-10">
          <div className="bg-white rounded-[20px] sm:rounded-[28px] p-4 sm:p-8 shadow-sm border border-gray-100 max-w-6xl mx-auto">
            <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="w-full md:col-span-5">
                <ProductSlider
                  image={data?.thumbnail_img}
                  photos={data?.photos}
                  discountPercentage={
                    data?.discount > 0 && data?.unit_price > data?.discount
                      ? ((data.unit_price - data.discount) / data.unit_price) *
                        100
                      : 0
                  }
                />
              </div>

              {/* Right Column */}
              <div className="w-full md:col-span-7">
                <ProductContent content={data} />
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        <ProductInfo data={data} />
        <div className="related-products">
          <h3 className="mb-5 related-title">{t("maybe_interested")}</h3>
          <div className="row">
            {data.related.map((item) => (
              <Fragment key={item.id}>
                <ProductBoxTwo
                  wrapperClass="col-lg-3 col-md-4 col-6"
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
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
