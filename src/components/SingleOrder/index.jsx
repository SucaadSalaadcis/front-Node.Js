import { useState } from "react";
import PaymentSummary from "@/utils/PaymentSummary";
import Link from "next/link";
import OrderContent from "./OrderContent";
import OrderStatus from "./OrderStatus";
import ProductsSummary from "./ProductsSummary";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from 'react-redux';
import { CancelOrderDataHandler } from '@/redux/actions/SingleOrderApi';
import { useTranslation } from "next-i18next";

const isWeight = (item) => item.product?.prod_type === "weight";

const SingleOrder = ({data}) => {

    const { t } = useTranslation('order');

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggleModel = () => setModal(!modal);

    const [ showLoader, setShowLoader ] = useState(false);

    const [ orderId, setOrderId ] = useState('');

    const calcSubTotal = (data.order_details || []).reduce((sum, item) => {
        if (item.has_replacement) return sum;
        const effPrice = item.product.discount > 0 ? Number(item.product.discount) : Number(item.product.unit_price);
        const lineTotal = isWeight(item) ? ((effPrice / 1000) * item.quantity) : (effPrice * item.quantity);
        return sum + lineTotal;
    }, 0);
    const calcShipping = Number(data.shipping_cost) || 30;
    const calcTotal = calcSubTotal + calcShipping;

    return(
        <section className="single-order">
            {
                data.delivery_status !== "canceled" && <OrderStatus status={data.delivery_status} />
            }
            <div className="row">
                <div className="col-md-7">
                    <OrderContent data={data} />
                </div>
                <div className="col-md-5">
                    <ProductsSummary data={data.order_details} />
                    <PaymentSummary 
                        type="order" 
                        total={calcTotal} 
                        subTotal={calcSubTotal} 
                        shipping={calcShipping} 
                    />
                    {
                        (data.delivery_status === "pending" || data.delivery_status === "confirmed") && 
                        <div className="cancel-order">
                            <Link href="#" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setModal(true);
                                    setOrderId(data.id)
                                }
                            } >{t('cancel_order')}</Link>
                        </div>
                    }
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggleModel} className="modal-dialog-centered delete-address">
                <ModalHeader toggle={toggleModel}></ModalHeader>
                <ModalBody>
                    <h3 className="delete-title">{t('are_you_sure_to_cancel_order')}</h3>
                    <div className="delet-btns">
                        {
                            showLoader ? <span className="submit-loader mt-3">{t('yes_cancel_order')} <span className="loader"></span></span>
                            :
                            <>
                                <Link href="#" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        setShowLoader(true);
                                        dispatch(CancelOrderDataHandler(orderId, () => {
                                            setShowLoader(false);
                                        }))
                                    }
                                }>{t('yes_cancel_order')}</Link>
                                <Link href="#" className="cancel" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        setModal(false);
                                    }
                                }>{t('cancel')}</Link>
                            </>
                        }
                    </div>
                </ModalBody>
            </Modal>
        </section>
    )
}

export default SingleOrder;