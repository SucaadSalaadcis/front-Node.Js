import PlacedIcon from '../../../../public/images/icons/pending.png';
import ConfirmedIcon from '../../../../public/images/icons/confirmed.png';
import ShippedIcon from '../../../../public/images/icons/tracking.png';
import DeliveredIcon from '../../../../public/images/icons/received.png';
import CanceledIcon from '../../../../public/images/icons/cancel.png';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const OrderContent = ({data}) => {

    const { t } = useTranslation('order');

    return(
        <div className="order-content">
            {
                (data.delivery_status !== "canceled" && data.delivery_status !== 'delivered' ) &&
                <div className='delivery-date'>{t("delivery_within_3_hours_from_the_moment_the_order_is_confirmed")}</div>
            }
            <div className="content-icon">
                {
                    data.delivery_status === "pending" && <Image src={PlacedIcon} alt="Order Placed" width={120} height={120} />
                }
                {
                    data.delivery_status === "confirmed" && <Image src={ConfirmedIcon} alt="Order Placed" width={120} height={120} />
                }
                {
                    data.delivery_status === "shipped" && <Image src={ShippedIcon} alt="Order Placed" width={120} height={120} />
                }
                {
                    data.delivery_status === "delivered" && <Image src={DeliveredIcon} alt="Order Placed" width={120} height={120} />
                }
                {
                    data.delivery_status === "canceled" && <Image src={CanceledIcon} alt="Order Placed" width={120} height={120} />
                }
            </div>
            {
                data.delivery_status === "pending" && 
                    <div className="order-text">
                        <h4 className='status-title'>{t('pending_text')}</h4>
                        <p className='status-text'>{t('you’ll_receive_an_email_at')} {t('once_your_order_is_confirmed')}</p>
                    </div>
            }
            {
                data.delivery_status === "confirmed" && 
                    <div className="order-text">
                        <h4 className='status-title'>{t('your_order_has_been_confirmed')}</h4>
                        <p className='status-text'>{t('you’ll_receive_an_email_at')} {t('once_your_order_is_confirmed')}</p>
                    </div>
            }
            {
                data.delivery_status === "shipped" && 
                    <div className="order-text">
                        <h4 className='status-title'>{t('thank_you_for_shopping_with_us')}</h4>
                        <p className='status-text'>{t('your_order_are_on_it’s_way')}</p>
                    </div>
            }
            {
                data.delivery_status === "delivered" && 
                    <div className="order-text">
                        <h4 className='status-title'>{t('thank_you_for_shopping_with_us')}</h4>
                    </div>
            }
            {
                data.delivery_status === "canceled" && 
                    <div className="order-text">
                        <h4 className='status-title'>{t('your_order_has_been_cancelled')}</h4>
                    </div>
            }
            <div className="shipping-details">
                <h3 className='shipping-details-title'>{t('order_num')}. : {data.orderNumber}</h3>
                <h6 className='shipping-details-subtitle'>{t('shipping_details')}</h6>
                <div className="details-box">
                    <span>{t('name')} : </span>
                    <span>{data.user?.first_name} {data.user?.last_name}</span>
                </div>
                <div className="details-box">
                    <span>{t('phone_number')} : </span>
                    <span>{data.user?.mobile}</span>
                </div>
                <div className="details-box">
                    <span>{t('email')} : </span>
                    <span>{data.user?.email}</span>
                </div>
                {/* <div className="details-box">
                    <span>{t('ship_to')} : </span>
                    <span>{data.orderDetails[0]?.country},{data.user?.state},{data.user?.city},{data.user?.street},{data.user?.building_number}</span>
                </div> */}
                <div className="details-box">
                    <span>{t('payment_method')} : </span>
                    <span>{t(data.payment_type)}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderContent;
