import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from "react-redux";
import { ReviewProductDataHandler } from "@/redux/actions/SingleOrderApi";

const ProductsSummary = ({data}) => {

    const { t } = useTranslation('payment');

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggleModel = () => setModal(!modal);

    const [ showLoader, setShowLoader ] = useState(false);

    const [ state, setState ] = useState({
        product_id : "",
        rating : "",
        comment : ""
    })

    const isWeight = (item) => item.product?.prod_type === 'weight';
    const linePrice = (item, overrideBase) => {
        const base = overrideBase !== undefined ? overrideBase : (item.product.discount > 0 ? item.product.discount : item.product.unit_price);
        const qty = Number(item.quantity) || 0;
        return isWeight(item) ? ((base / 1000) * qty).toFixed(2) : Number(base).toFixed(2);
    };

    const replacementMap = {};
    (data || []).forEach(item => {
        if (item.replacement_for) {
            replacementMap[item.replacement_for] = item;
        }
    });

    const itemsToShow = (data || []).filter(item => !item.replacement_for);

    return(
        <section className="products-summary">
            <h3 className="title">{t('products_summary')}</h3> 
            <div className="order-products">
                {
                    itemsToShow.map(item => {
                        const _replacement = replacementMap[item.id];
                        return (
                        <div key={item.id}>
                            <div className={`product-order-box ${_replacement ? 'product-order-box--replaced' : ''}`}>
                                {_replacement && <span className="badge badge-replaced">مستبدل</span>}
                                <div className="product-img">
                                    <Image src={item.product.thumbnail_img} alt={item.product.name} width={60} height={60} />
                                </div>
                                <div className="product-content">
                                    <h6 className="title">
                                        <Link href={`/${item.product.slug}`} className={_replacement ? 'text-decoration-line-through' : ''}>{item.product.name}</Link>
                                    </h6>
                                    <div className="qty">{isWeight(item) ? `${t('weight')}: ${item.quantity} ${t('gm')}` : `${t('qty')}: ${item.quantity}`}</div>
                                    <div className="price">
                                        <span>{linePrice(item)} {t('egp')}</span>
                                        {
                                            item.product.discount > 0 && <span className="sale">{linePrice(item, item.product.unit_price)} {t('egp')}</span>
                                        }
                                    </div>
                                    {
                                        !_replacement && item.delivery_status == 'delivered' && 
                                        <div className="rate-btn">
                                            <Link href="#" onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    setModal(true);
                                                    setState({...state, product_id : item.product.id})
                                                }
                                            }>{t('rate_this_product')}</Link>
                                        </div>
                                    }
                                </div>
                            </div>
                            {_replacement && (
                                <div className="product-order-box product-order-box--replacement">
                                    <span className="badge badge-replacement">بديل</span>
                                    <div className="product-img">
                                        <Image src={_replacement.product.thumbnail_img} alt={_replacement.product.name} width={60} height={60} />
                                    </div>
                                    <div className="product-content">
                                        <h6 className="title">
                                            <Link href={`/${_replacement.product.slug}`}>{_replacement.product.name}</Link>
                                        </h6>
                                        <div className="qty">{isWeight(_replacement) ? `${t('weight')}: ${_replacement.quantity} ${t('gm')}` : `${t('qty')}: ${_replacement.quantity}`}</div>
                                        <div className="price">
                                            <span>{linePrice(_replacement)} {t('egp')}</span>
                                            {
                                                _replacement.product.discount > 0 && <span className="sale">{linePrice(_replacement, _replacement.product.unit_price)} {t('egp')}</span>
                                            }
                                        </div>
                                        {
                                            _replacement.delivery_status == 'delivered' && 
                                            <div className="rate-btn">
                                                <Link href="#" onClick={
                                                    (e) => {
                                                        e.preventDefault();
                                                        setModal(true);
                                                        setState({...state, product_id : _replacement.product.id})
                                                    }
                                                }>{t('rate_this_product')}</Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    )})
                }
            </div>
            <Modal isOpen={modal} toggle={toggleModel} className="modal-dialog-centered delete-address">
                <ModalHeader toggle={toggleModel}></ModalHeader>
                <ModalBody>
                    <div className="rate-body">
                        <h3 className="rate-title">{t('do_you_want_to_leave_your_rating_for_this_product')}</h3>
                        <div className="rate-number">
                            <Rating 
                                readonly={false} 
                                initialValue={5} 
                                size={50} 
                                allowFraction={true}
                                onClick={(value) => setState({...state, rating : value})}
                            />
                        </div>
                        <form className="rate-form" onSubmit={
                            (e) => {
                                e.preventDefault();
                                setShowLoader(true);
                                dispatch(ReviewProductDataHandler(state, toggleModel, () => setShowLoader(false)));
                            }
                        }>
                            <div className="form-group">
                                <textarea className="form-control" rows={5} placeholder={t('leave_comment')} onChange={(e) => setState({...state, comment : e.target.value})}></textarea>
                                <div className="form-btns">
                                    {
                                        showLoader ? <span className="submit-loader mt-3">{t('send')} <span className="loader"></span></span>
                                        :
                                        <>
                                        <button type="submit" className="btn  mt-3">{t('send')}</button>
                                        <Link href="#" onClick={
                                            (e) => {
                                                e.preventDefault();
                                            }
                                        } className="btn cancel mt-3">{t('cancel')}</Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </section>
    )
}

export default ProductsSummary;
