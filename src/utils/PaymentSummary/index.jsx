
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ApplyCouponDataHandler } from "@/redux/actions/CartApi";
import { useTranslation } from "next-i18next";

const PaymentSummary = ({ type, total, subTotal, shipping }) => {
  const { t } = useTranslation("payment");
  const dispatch = useDispatch();
  const { CartData } = useSelector((state) => state.cartsData);

  const [showLoader, setShowLoader] = useState(false);
  const [code, setCode] = useState("");
  const [erorrCode, setErrorCode] = useState("");

  const shippingFees = shipping ?? 30;

  const formatPrice = (num) => { const v = parseFloat(num); return isNaN(v) ? "0.00" : v.toFixed(2); };

  const calcSubTotal = type === "order"
    ? Number(subTotal)
    : CartData.reduce((sum, item) => {
        let itemTotal = 0;
        if (item.product_type === "unit") {
          itemTotal = item.price * item.quantity;
        } else {
          itemTotal = (item.price / 1000) * item.quantity;
        }
        return sum + Number(itemTotal.toFixed(3));
      }, 0);

  const finalTotal = calcSubTotal + shippingFees;

  const HandelValidation = () => {
    if (code === "") {
      setErrorCode(t("please_enter_discount_code"));
      return false;
    }
    return true;
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (HandelValidation()) {
      setShowLoader(true);
      dispatch(
        ApplyCouponDataHandler(
          code,
          () => {
            document.getElementById("Discount").reset();
            setShowLoader(false);
          },
          () => {
            setShowLoader(false);
          }
        )
      );
    }
  };

  return (
    <section className="payment-summary">
      <h3 className="title">{t("payment_summary")}</h3>

      <ul className="fees-list">
        <li>
          <span className="label">{t("subtotal_exclusive_of_vat")}</span>
          <span className="text">
            {formatPrice(calcSubTotal)} {t("egp")}
          </span>
        </li>

        <li>
          <span className="label">{t("shipping_fees")}</span>
          <span className="text">
            {formatPrice(shippingFees)} {t("egp")}
          </span>
        </li>
      </ul>

      <div className="total">
        <span className="label">{t("total_inclusive_of_vat")}</span>
        <span className="text">
          {formatPrice(finalTotal)} {t("egp")}
        </span>
      </div>

      {type === "checkout" && (
        <div className="pay-order">
          <form className="apply-coupon" id="Discount" onSubmit={HandelSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder={t("enter_discount_code")}
                onChange={(e) => {
                  setCode(e.target.value);
                  setErrorCode("");
                }}
              />
              {showLoader ? (
                <span className="coupon-btn-loader">
                  {t("apply_discount")} <span className="loader"></span>
                </span>
              ) : (
                <button type="submit" className="coupon-btn">
                  {t("apply_discount")}
                </button>
              )}
            </div>

            {erorrCode && (
              <div className="form-text text-danger">{erorrCode}</div>
            )}
          </form>

          <Link href="/checkout" className="proceed">
            {t("proceed")}
          </Link>
        </div>
      )}

      {type === "cart" && (
        <div className="pay-order">
          <Link href="/checkout" className="proceed">
            {t("proceed")}
          </Link>
        </div>
      )}
    </section>
  );
};

export default PaymentSummary;