import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCartDataHandler,
  AddToCartDataHandler,
} from "@/redux/actions/CartApi";
import {
  AddWishlistDataHandler,
  DeleteWishlistDataHandler,
} from "@/redux/actions/WishlistApi";
import { useTranslation } from "next-i18next";
import { LocalKeys } from "@/helpers/Config";
import { useRouter } from "next/router";
import ShareProduct from "./ShareProduct";
import ProductQuantity from "./ProductQuantity";
import { toast } from "react-toastify";

const ProductContent = ({ content }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("product");
  const { CartData } = useSelector((state) => state.cartsData);
  const weightUnit = router.locale === "ar" ? "جم" : "g";

  const [state, setState] = useState({
    product_id: content?.id,
    quantity: content?.prod_type === "weight" ? content?.min_weight : 1,
  });

  useEffect(() => {
    if (content?.id) {
      setState({
        product_id: content.id,
        quantity: content.prod_type === "weight" ? content.min_weight : 1,
      });
    }
  }, [content?.id]);

  const [loader, setLoader] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favLoader, setFavLoader] = useState(false);

  let PriceFormat = new Intl.NumberFormat();

  useEffect(() => {
    if (router.isReady && localStorage.getItem(LocalKeys.TOKEN)) {
      setIsFav(!!content?.hasFavorite);
    }
  }, [router, content?.hasFavorite]);

  const HandelChangeQTY = (QTY) => {
    setState((old) => ({ ...old, quantity: QTY }));
  };

  const getDisplayPrice = () => {
    if (content?.prod_type === "weight") {
      const pricePerKg =
        content.discount > 0 ? content.discount : content.unit_price;
      return ((pricePerKg / 1000) * state.quantity).toFixed(2);
    }

    return content?.discount > 0
      ? content.discount.toFixed(2)
      : content?.unit_price?.toFixed(2);
  };

  return (
    <div className="flex flex-col w-full font-sans text-gray-800 product-content">
      {/* Top Brand & Header Actions */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <Link
          href={`/categories/${content?.category?.slug}`}
          className="text-[#1D3E73] font-semibold text-xs sm:text-sm hover:underline"
        >
          {content?.category?.name || content?.brand}
        </Link>

        <div className="flex items-center gap-3 text-gray-400">
          <ShareProduct seoTitle={content?.meta_seo?.title} />

          <button
            onClick={() => {
              if (!localStorage.getItem(LocalKeys.TOKEN)) {
                router.push("/login");
              } else {
                setFavLoader(true);
                isFav
                  ? dispatch(
                      DeleteWishlistDataHandler(content.slug, () => {
                        setFavLoader(false);
                        setIsFav(false);
                      }),
                    )
                  : dispatch(
                      AddWishlistDataHandler(content.slug, () => {
                        setFavLoader(false);
                        setIsFav(true);
                      }),
                    );
              }
            }}
            className="hover:text-[#1D3E73] transition-colors"
            disabled={favLoader}
          >
            {isFav ? (
              <i className="text-base text-red-500 fi fi-sr-heart sm:text-lg"></i>
            ) : (
              <i className="text-base fi fi-rs-heart sm:text-lg"></i>
            )}
          </button>
        </div>
      </div>

      {/* Product Title */}
      <h1 className="mb-2 text-base font-bold leading-snug tracking-tight text-gray-900 uppercase sm:text-lg sm:mb-3">
        {content?.name}
      </h1>

      {/* Price Line */}
      <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
        <span className="text-[#1D3E73] font-bold text-base sm:text-lg">
          {content?.prod_type === "weight" ? (
            <>
              {PriceFormat.format(getDisplayPrice())} {t("egp")} /{" "}
              {state.quantity} {weightUnit}
            </>
          ) : (
            <>
              {PriceFormat.format(
                content?.discount > 0 ? content?.discount : content?.unit_price,
              )}{" "}
              {t("egp")}
            </>
          )}
        </span>

        {content?.discount > 0 && (
          <span className="text-xs text-gray-400 line-through sm:text-sm">
            {content?.prod_type === "weight"
              ? PriceFormat.format(
                  ((content.unit_price / 1000) * state.quantity).toFixed(2),
                )
              : PriceFormat.format(content?.unit_price)}{" "}
            {t("egp")}
          </span>
        )}
      </div>

      {/* Quantity Controls & Add to Cart */}
      {content?.stock !== undefined &&
      content?.stock !== null &&
      Number(content?.stock) === 0 ? (
        <div className="bg-red-50 text-red-600 font-medium py-2.5 w-[200px] rounded-full text-center text-xs sm:text-sm mb-4 sm:mb-6">
          {t("out_of_stock")}
        </div>
      ) : (
        <div className="flex flex-col w-full gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-6">
          <div className="flex justify-center flex-shrink-0 w-full sm:w-auto sm:block">
            <ProductQuantity
              type={content?.prod_type}
              stock={content?.stock}
              minStock={content?.min_weight}
              initialQuantity={state.quantity}
              HandelChange={HandelChangeQTY}
            />
          </div>

          <button
            onClick={() => {
              setLoader(true);
              if (!localStorage.getItem(LocalKeys.TOKEN)) {
                router.push("/login");
                setLoader(false);
              } else {
                dispatch(
                  AddToCartDataHandler(
                    state,
                    () => {
                      dispatch(
                        GetCartDataHandler(() => {
                          setLoader(false);
                          toast.success(
                            i18n.language === "ar"
                              ? "تمت الإضافة إلى السلة"
                              : "Added to cart",
                          );
                        }),
                      );
                    },
                    (error) => {
                      setLoader(false);
                      if (error?.response?.status === 422) {
                        toast(t("already_in_cart"), {
                          style: { color: "#007bff" },
                          icon: "ℹ️",
                        });
                      } else {
                        toast.error(
                          i18n.language === "ar"
                            ? "حدث خطأ ما"
                            : "Something went wrong",
                        );
                      }
                    },
                  ),
                );
              }
            }}
            disabled={loader}
            className="w-full sm:flex-1 bg-[#1D3E73] hover:bg-[#34619E] text-white font-medium py-2.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm h-[40px] sm:h-[42px]"
          >
            {loader ? (
              <>
                <span>{t("add_to_cart")}</span>
                <span className="w-4 h-4 border-2 border-white rounded-full loader border-t-transparent animate-spin"></span>
              </>
            ) : (
              t("add_to_cart")
            )}
          </button>
        </div>
      )}

      {/* Note Container */}
      {/* <div className="bg-[#EEF2F1] rounded-xl p-3 sm:p-3.5 mb-4 sm:mb-6 text-[11px] sm:text-xs leading-relaxed text-gray-700">
                <span className="font-bold text-gray-900">Please Note:</span> Weights for scalable items may vary slightly. Packaging may change based on availability.
            </div> */}

      {/* Specifications Section */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-900">
          <span> {t("specifications")}</span>
          <span className="font-normal text-gray-400">—</span>
        </div>

        <div className="text-[11px] sm:text-xs text-gray-600 space-y-1.5 sm:space-y-2 mt-1">
          {content?.category?.name && (
            <div className="flex justify-between py-1 sm:py-1.5 border-b border-gray-50">
              <span className="text-gray-400"> {t("brand")}</span>
              <span className="font-medium text-gray-800">
                {content?.category?.name}
              </span>
            </div>
          )}
          {content?.sku && (
            <div className="flex justify-between py-1 sm:py-1.5 bg-[#F9FAFB] px-2.5 sm:px-3 rounded">
              <span className="text-gray-400"> {t("sku")}</span>
              <span className="font-medium text-gray-800">{content?.sku}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
