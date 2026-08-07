import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from 'react-redux';
import { CancelOrderDataHandler } from '@/redux/actions/SingleOrderApi';
import { useTranslation } from 'next-i18next';

const OrderBox = ({data}) => {

    const { t } = useTranslation('order');

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggleModel = () => setModal(!modal);

    const [ showLoader, setShowLoader ] = useState(false);

    const [ orderId, setOrderId ] = useState('');

    const isReplacement = (item) => !!item.replacement_for;
    const isWeight = (item) => item.product?.prod_type === 'weight';

    const lineTotal = (item) => {
        const base = item.product?.discount > 0 ? Number(item.product.discount) : Number(item.product.unit_price);
        const qty = Number(item.quantity) || 0;
        return isWeight(item) ? ((base / 1000) * qty) : (base * qty);
    };

    const replacementMap = {};
    (data?.order_details || []).forEach(item => {
        if (item.replacement_for) {
            replacementMap[item.replacement_for] = item;
        }
    });

    const itemsToShow = (data?.order_details || []).filter(item => !item.replacement_for);

    const visibleItems = itemsToShow.slice(0, 3);
    const hasMore = itemsToShow.length > 3;

    return (
        <div className="order-box">
            <div className="order-head-container">
                <div className="order-head">
                    <div className="order-label">
                        <h6 className="title">{t('order_placed')}</h6>
                        <p className="text">{data.order_date}</p>
                    </div>
                    <div className="order-label">
                        <h6 className="title">{t('order_num')} {data.orderNumber}</h6>
                        <p className="text">{t('order_status')} : <span className={data.delivery_status}>{t(data.delivery_status)}</span></p>
                    </div>
                    <div className="order-label">
                        <h6 className="title">{t('ship_to')}</h6>
                        <p className="text">{data.user.first_name} {data.user.last_name}</p>
                    </div>
                </div>
                {
                    (data.delivery_status !== "canceled" && data.delivery_status !== 'delivered' ) &&
                    <span className='delivery-date'>{t("delivery_within_3_hours_from_the_moment_the_order_is_confirmed")}</span>
                }
            </div>
            <div className="order-body">
                <div className="row">
                    {
                        visibleItems.map(item => {
                            const _replacement = replacementMap[item.id];
                            const colClass = itemsToShow.length === 1 ? "col-md-12" : itemsToShow.length === 2 ? "col-md-6" : "col-md-4";
                            return (
                            <div className={colClass} key={item.id}>
                                {_replacement ? (
                                    <>
                                    <div className="product-order product-order--replaced">
                                        <div className="product-img" style={{ opacity: 0.5 }}>
                                            <Image src={item.product.thumbnail_img} alt={item.product.name} width={60} height={60} />
                                        </div>
                                        <div className="product-content">
                                            <span className="badge badge-replaced-box">مستبدل</span>
                                            <h6 style={{ textDecoration: 'line-through', fontSize: '12px', opacity: 0.7 }}>{item.product.name}</h6>
                                            <div className='specs' style={{ fontSize: '11px' }}>{t('sku')} : {item.product.sku}</div>
                                            <div className='specs' style={{ fontSize: '11px' }}>{item.product?.prod_type === 'weight' ? `${t('weight')}: ${item.quantity} ${t('gm')}` : `${t('qty')} : ${item.quantity}`}</div>
                                        </div>
                                    </div>
                                    <div className="product-order product-order--replacement">
                                        <div className="product-img">
                                            <Image src={_replacement.product.thumbnail_img} alt={_replacement.product.name} width={113.6} height={111.8} />
                                        </div>
                                        <div className="product-content">
                                            <span className="badge badge-replacement-box">بديل</span>
                                            <h6>{_replacement.product.name}</h6>
                                            <div className='specs'>{t('sku')} : {_replacement.product.sku}</div>
                                            <div className='specs'>{_replacement.product?.prod_type === 'weight' ? `${t('weight')}: ${_replacement.quantity} ${t('gm')}` : `${t('qty')} : ${_replacement.quantity}`}</div>
                                            <div className="price">{lineTotal(_replacement).toFixed(3)} {t('egp')}</div>
                                        </div>
                                    </div>
                                    </>
                                ) : (
                                    <div className="product-order">
                                        <div className="product-img">
                                            <Image src={item.product.thumbnail_img} alt={item.product.name} width={113.6} height={111.8} />
                                        </div>
                                        <div className="product-content">
                                            <h6>{item.product.name}</h6>
                                            <div className='specs'>{t('sku')} : {item.product.sku}</div>
                                            <div className='specs'>{item.product?.prod_type === 'weight' ? `${t('weight')}: ${item.quantity} ${t('gm')}` : `${t('qty')} : ${item.quantity}`}</div>
                                            <div className="price">{lineTotal(item).toFixed(3)} {t('egp')}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )})
                    }
                </div>
            </div>
            <div className="order-footer">
                {
                    hasMore ? <Link href={`/my-orders/${data.id}`} className='view-products'>{t('view_all_proudct')}</Link> : <div></div>
                }
                <ul className='btns-list'>
                    <li>
                        <Link href={`/my-orders/${data.id}`}><i className="fi fi-rs-truck-container"></i> {t('track_order')}</Link>
                    </li>
                    {
                        (data.delivery_status === "pending" || data.delivery_status === "confirmed") && 
                        <li>
                            <Link href="#" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setModal(true);
                                    setOrderId(data.id);
                                }
                            }><i className="fi fi-bs-ban"></i> {t('cancel_order')}</Link>
                        </li>
                    }
                </ul>
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
        </div>
    )
}

export default OrderBox;