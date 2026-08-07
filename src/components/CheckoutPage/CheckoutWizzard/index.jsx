import { useTranslation } from "next-i18next";

const CheckoutWizzard = ({handelSteps}) => {

    const { t } = useTranslation('checkout');

    return(
        <div className="checkout-wizzard">
            <div className={handelSteps === 0 ? "wizzard-label active" : "wizzard-label"}>
                <span className="num">1</span>
                <span className="text">{t('my_details')}</span>
            </div>
            <div className="wizzard-line"></div>
            <div className={handelSteps === 1 ? "wizzard-label active" : "wizzard-label"}>
                <span className="num">2</span>
                <span className="text">{t('payment')}</span>
            </div>
        </div>
    )
}

export default CheckoutWizzard;