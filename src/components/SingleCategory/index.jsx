import React from "react";
import MainCategoryBox from "@/utils/MainCategoryBox";
import ProductBoxTwo from "@/utils/ProductBoxTwo";

const SingleCategory = ({ data, hideSubCategories = false }) => {
  return (
    <div className="single-cat">
      {
        !hideSubCategories && data.number_of_children > 0 && (
          <div className="row">
            {data.sub_category?.map((item) => (
              <div className="col-lg-3 col-md-4 col-6" key={item.id}>
                <MainCategoryBox
                  name={item.name}
                  slug={item.id}
                  image={item.icon}
                />
              </div>
            ))}
          </div>
        )
      }

      <div className="row">
        {data.products?.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
