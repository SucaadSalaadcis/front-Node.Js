import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleOrderDataHandler } from "@/redux/actions/SingleOrderApi";
import { LocalKeys } from "@/helpers/Config";
import OrderContent from "@/components/SingleOrder/OrderContent";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const CheckoutSummary = () => {

    const router = useRouter();

    const { t } = useTranslation('common');

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(true);

    const { SingleOrderData } = useSelector(state => state.orderData);

    const [ orderId, setOrderID ] = useState('');

    useEffect(() => {
        dispatch(SingleOrderDataHandler(parseInt(localStorage.getItem(LocalKeys.ORDER_ID)), () => {
            setLoader(false);
            setOrderID(parseInt(localStorage.getItem(LocalKeys.ORDER_ID)));
        }));
    },[])

    return(
        <div className="checkout-summary">
            <OrderContent data={SingleOrderData} />
            <Link href="#" className="track" onClick={
                (e) => {
                    e.preventDefault();
                    localStorage.removeItem(LocalKeys.ORDER_ID);
                    router.push(`/my-orders`);
                }
            }>{t('track_order')}</Link>
        </div>
    )
}

export default CheckoutSummary;