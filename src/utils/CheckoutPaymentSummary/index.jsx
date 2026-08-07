import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ApplyCouponDataHandler } from "@/redux/actions/CartApi";
import { useTranslation } from "next-i18next";

const CheckoutPaymentSummary = ({total, subTotal, shipping, updateFees, onProceed}) => {

    const { t } = useTranslation('payment');

    const formatPrice = (num) => { const v = parseFloat(num); return isNaN(v) ? "0.00" : v.toFixed(2); };

    const dispatch = useDispatch();

    const [ showLoader, setShowLoader ] = useState(false);

    const [ code, setCode ] = useState('');

    const [ erorrCode, setErrorCode ] = useState('');

    const HandelValidation = () => {

        let Valid = true;

        if(code === '') {
            setErrorCode(t('please_enter_discount_code'));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {
            setShowLoader(true);
            dispatch(ApplyCouponDataHandler(code, () => {

                const ele = document.getElementById('Discount');
                ele.reset();
                setCopoun(code);
                setShowLoader(false);
            }, () => {
                setShowLoader(false);
            }));
        } 
    }

    const [ copoun, setCopoun ] = useState('');

    useEffect(() => {
        updateFees(copoun)
    },[copoun])

    return(
        <section className="payment-summary">
            <h3 className="title">{t('payment_summary')}</h3> 
            <ul className="fees-list">
                <li>
                    <span className="label">{t('subtotal_exclusive_of_vat')}</span>
                    <span className="text">{formatPrice(subTotal)} {t('egp')}</span>
                </li>
                <li>
                    <span className="label">{t('shipping_fees')}</span>
                    <span className="text">{formatPrice(shipping)} {t('egp')}</span>
                </li>
            </ul>
            <div className="total">
                <span className="label">{t('total_inclusive_of_vat')}</span>
                <span className="text">{formatPrice(total)} {t('egp')}</span>
            </div>
            <div className="pay-order">
                <form className="apply-coupon" id="Discount" onSubmit={HandelSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder={t('enter_discount_code')} onChange={
                            (e) => {
                                setCode(e.target.value);
                                setErrorCode('');
                            }
                        }/>
                        {
                            showLoader ? <span className="coupon-btn-loader">{t('apply_discount')} <span className="loader"></span></span> :
                            <button type="submit" className="coupon-btn">{t('apply_discount')}</button>
                        }
                    </div>
                    {
                        erorrCode && <div className="form-text text-danger">{erorrCode}</div>
                    }
                </form>
                <Link href="#" className="proceed" onClick={(e) => { e.preventDefault(); if (onProceed) onProceed(); }}>{t('proceed')}</Link>
            </div>
        </section>
    )
}

export default CheckoutPaymentSummary;