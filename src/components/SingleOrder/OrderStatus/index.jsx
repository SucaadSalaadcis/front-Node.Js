import { useTranslation } from "next-i18next";

const OrderStatus = ({status}) => {

    const { t } = useTranslation('order');

    return(
        <div className="order-status">
            <div className="status active">
                <div className="icon">
                    <i className="fi fi-br-check"></i>
                </div>
                <div className="title">{t('placed')}</div>
            </div>
            <div className={`shap ${(status === "confirmed" || status === "shipped" || status === "delivered") && "active"}`}></div>
            <div className={(status === "confirmed" || status === "shipped" || status === "delivered") ? "status active" : "status"}>
                <div className="icon">
                    <i className="fi fi-br-check"></i>
                </div>
                <div className="title">{t('confirmed')}</div>
            </div>
            <div className={`shap ${(status === "shipped" || status === "delivered") && "active"}`}></div>
            <div className={(status === "shipped" || status === "delivered") ? "status active" : "status"}>
                <div className="icon">
                    <i className="fi fi-br-check"></i>
                </div>
                <div className="title">{t('shipped')}</div>
            </div>
            <div className={`shap ${(status === "delivered") && "active"}`}></div>
            <div className={status === "delivered" ? "status active" : "status"}>
                <div className="icon">
                    <i className="fi fi-br-check"></i>
                </div>
                <div className="title">{t('delivered')}</div>
            </div>
        </div>
    )
}

export default OrderStatus;