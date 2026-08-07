import { useState, useEffect } from "react";
import CartProductBox from "@/utils/CartProductBox";
import PaymentSummary from "@/utils/PaymentSummary";
import Image from "next/image";
import Link from "next/link";
import AccountLoader from "@/utils/AccountLoader";
import EmptyWidget from "@/utils/EmptyWidget";
import { useTranslation } from 'next-i18next';
import { LocalKeys } from "@/helpers/Config";

const OfflineCart = () => {

    const { t } = useTranslation('cart');

    const [ data, setData ] = useState([]);

    useEffect(() => {
        if(localStorage.getItem(LocalKeys.PRDUCTS)) {
            setData(JSON.parse(localStorage.getItem(LocalKeys.PRDUCTS)));
        }
    },[])

    return(
        
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">{t('my_cart')}</h1>
                <p className="cart-subtitle">{t('you_have')}  { data.length === 0 ? "No" : data.length } {t('product_in_your_cart')}</p>
                {
                    data.length === 0 ? <EmptyWidget className="center-widget" link="order" /> :
                    <div className="row">
                        <div className="col-md-8">
                            {
                                data.map(item => (
                                    <CartProductBox key={item.id} data={item} CartUpdate={HandelUpdate} />
                                ))
                            }
                            <div className="continue-shopping">
                                <Link href="#">
                                    {t('continue_shopping')}
                                </Link>
                            </div>
                        </div>
                        {/* <div className="col-md-4">
                            <PaymentSummary type="checkout" total={SummryData.grand_total} shipping={SummryData.shipping_cost} updateFees={HandelUpdate} />
                        </div> */}
                    </div>
                }
            </div>
        </div>
    )
}

export default OfflineCart;