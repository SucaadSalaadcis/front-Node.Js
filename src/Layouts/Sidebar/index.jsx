import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { LogoutDataHandler } from "@/redux/actions/AuthApi";
import { useTranslation } from 'next-i18next';

const Sidebar = () => {

    const router = useRouter();

    const { t } = useTranslation('sidbar');

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggleModel = () => setModal(!modal);

    const [ showLoader, setShowLoader ] = useState(false);

    return(
        <>
        <ul className="side-bar">
            <li>
                <Link href="/overview" className={router.pathname === "/overview" ? "active" : ""}>
                    <i className="fi fi-rr-user"></i> 
                    <span className="sidbar-label">{t('overview')}</span>
                </Link>
            </li>
            <li>
                <Link href="/my-orders" className={router.pathname.includes("/my-orders") ? "active" : ""}>
                    <i className="fi fi-rr-shopping-bag"></i> 
                    <span className="sidbar-label">{t('my_orders')}</span>
                </Link>
            </li>
            <li>
                <Link href="/my-wishlist" className={router.pathname === "/my-wishlist" ? "active" : ""}>
                    <i className="fi fi-rs-heart"></i> 
                    <span className="sidbar-label">{t('my_wishlist')}</span>
                </Link>
            </li>
            <li>
                <Link href="/my-address" className={router.pathname.includes("/my-address") ? "active" : ""}>
                    <i className="fi fi-rs-marker"></i> 
                    <span className="sidbar-label">{t('my_address')}</span>
                </Link>
            </li>
            <li>
                <Link href="/account-setting" className={router.pathname.includes("/account-setting") ? "active" : ""}>
                    <i className="fi fi-rr-settings"></i> 
                    <span className="sidbar-label">{t('account_setting')}</span>
                </Link>
            </li>
            <li>
                <Link href="#" onClick={
                    (e) => {
                        e.preventDefault();
                        setModal(true);
                    }
                }>
                    <i className="fi fi-rs-sign-out-alt"></i> 
                    <span className="sidbar-label">{t('logout')}</span>
                </Link>
            </li>
        </ul>
        <Modal isOpen={modal} toggle={toggleModel} className="modal-dialog-centered delete-address">
                <ModalHeader toggle={toggleModel}></ModalHeader>
                <ModalBody>
                    <h3 className="delete-title">{t('are_you_sure_to_logout')}</h3>
                    <div className="delet-btns">
                        {
                            showLoader ? <span className="submit-loader mt-3">{t('yes_logout')} <span className="loader"></span></span>
                            :
                            <>
                                <Link href="#" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        setShowLoader(true);
                                        dispatch(LogoutDataHandler(() => {
                                            router.push('/');
                                        },() => {
                                            setShowLoader(false);
                                        }))
                                    }
                                }>{t('yes_logout')}</Link>
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
        </>
    )
}

export default Sidebar;