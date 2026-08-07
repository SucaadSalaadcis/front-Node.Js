import { useState, useEffect } from "react";
import CartProductBox from "@/utils/CartProductBox";
import PaymentSummary from "@/utils/PaymentSummary";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GetCartDataHandler, SummryCartDataHandler } from "@/redux/actions/CartApi";
import AccountLoader from "@/utils/AccountLoader";
import EmptyWidget from "@/utils/EmptyWidget";
import { useTranslation } from 'next-i18next';

const OnlineCart = () => {

    const { t } = useTranslation('cart');

    const dispatch = useDispatch();

    const { CartData, SummryData } = useSelector(state => state.cartsData);

    const [ updateCart, setUpdateCart ] = useState('');

    const [ updateQTYCart, setUpdateQTYCart ] = useState('');

    const [ loader, setLoader ] = useState(true);

    const [ updateLoader, setUpdateLoader ] = useState(false);

    const HandelUpdate = (update, loader, updatQTY) => {

        setUpdateCart(update);
        setUpdateLoader(loader);
        setUpdateQTYCart(updatQTY);
    }

    useEffect(() => {
        dispatch(GetCartDataHandler(() => {
            setLoader(false);
            setUpdateLoader(false);
        }));
        dispatch(SummryCartDataHandler());
    },[updateCart, updateQTYCart]);

    return(
        <div className="cart-page">
            {
                loader ? <AccountLoader /> : 
                <div className="container">
                    <h1 className="cart-title">{t('my_cart')}</h1>
                    {
                        CartData.length === 0 ?
                        <p className="cart-subtitle">{t('Your_shopping_cart_is_currently_empty')}</p>
                        :
                        <p className="cart-subtitle">{t('you_have')}  { CartData.length === 0 ? "No" : CartData.length } {t('product_in_your_cart')}</p>
                    }
                    {
                        CartData.length === 0 ? <EmptyWidget link="order" /> :
                        <div className="row">
                            <div className="col-md-8">
                                {
                                    updateLoader && <div className="update-cart-loader"><span className="loader"></span></div>
                                }
                                {
                                    CartData.map(item => (
                                        <CartProductBox key={item.id} data={item} CartUpdate={HandelUpdate} />
                                    ))
                                }
                                <div className="continue-shopping">
                                    <Link href="/search">
                                        {t('continue_shopping')}
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <PaymentSummary 
                                    type="cart" 
                                    total={SummryData.grand_total} 
                                    shipping={SummryData.shipping_cost} 
                                    updateFees={HandelUpdate} 
                                />
                                <section className="payment-summary mt-3">
                                    <h3 className="title">{t("additional_notes")}</h3>
                                    <div className="pay-order">
                                        <form className="apply-coupon" id="Discount">
                                            <div className="form-group">
                                                <textarea className="form-control" defaultValue={localStorage.getItem('notes')} placeholder={t("notes_placeholder")} onChange={
                                                    (e) => {
                                                        localStorage.setItem('notes', e.target.value);
                                                    }
                                                }></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default OnlineCart;