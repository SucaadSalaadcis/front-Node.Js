import { useState, useEffect } from "react";
import Image from "next/image";
import BackToCart from "../BackToCart";
import CachIcon from '../../../../public/images/icons/cach.svg';
import OnlineIcon from '../../../../public/images/icons/credit-card.svg';
import { useDispatch } from "react-redux";
import { CreateOrderDataHandler } from "@/redux/actions/SingleOrderApi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const CheckoutPayment = () => {

    const router = useRouter();

    const { t } = useTranslation('checkout');

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(false);

    const [ state, setState ] = useState({
        payment_method : "cash",
        additional_info : localStorage.getItem('notes') ? localStorage.getItem('notes') : ''
    })

    const HandelSubmit = (e) => {

        e.preventDefault();
        setLoader(true);
        dispatch(CreateOrderDataHandler(state, () => {
            router.push('/my-orders');

        }, () => {
            setLoader(false);
        }))
    }

    return(
        <form className="checkout-info-wrapper" onSubmit={HandelSubmit}>
            <div className="form-header">
                <h4 className="title">{t('payment_method')}</h4>
            </div>
            <div className="chekout-shipping-list">
                <div className="form-check" style={{cursor:"pointer"}} onClick={() => document.getElementById('cash').click()}>
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="cash" defaultChecked onChange={
                        () => {
                            setState({payment_method : "cash"})
                        }
                    }/>
                    <label className="form-check-label" htmlFor="cash">
                        <p className="label-text payment"><Image src={CachIcon} alt="Cash On Delivery" width={19.7} height={17.9} /> {t('cash_on_delivery')}</p>
                    </label>
                </div>
                <div className="form-check" style={{cursor:"pointer"}} onClick={() => document.getElementById('card_on_delivery').click()}>
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="card_on_delivery" onChange={
                        () => {
                            setState({payment_method : "card_on_delivery"})
                        }
                    }/>
                    <label className="form-check-label" htmlFor="card_on_delivery">
                        <p className="label-text payment"><Image src={OnlineIcon} alt="Card On Delivery" width={19.7} height={17.9} /> {t('card_on_delivery')}</p>
                    </label>
                </div>
            </div>
            <div className="form-btns">
                <BackToCart />
                {
                    loader ?   <div className="submit-loader-checkout">{t('place_order')} <span className="loader"></span></div> :
                                <button type="submit" className="checkout-submit">{t('place_order')}</button>
                }
                
            </div>
        </form>
    )
}

export default CheckoutPayment;