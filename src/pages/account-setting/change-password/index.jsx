import { useState } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { UpdatePasswordDataHandler } from "@/redux/actions/AuthApi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";

const ChangePassword = () => {

    const { t } = useTranslation('accountSetting');

    const [ showCurrentPass, setShowCurrentPass ] = useState(false);

    const [ showNewPass, setShowNewPass ] = useState(false);

    const [ showConfirmPass, setShowConfirmPass ] = useState(false);

    const [ showLoader, setShowLoader ] = useState(false);

    const [ state, setState ] = useState({
        current_password : "",
        password : "",
        confirm_password : ""
    })

    const [ errors, setErrors ] = useState({
        current_password : "",
        password : "",
        confirm_password : ""
    })

    const HandelValidation = () => {

        let Valid = true;

        if(state.current_password === "") {

            setErrors((old) => ({...old, current_password : t('current_password_is_required')}));
            Valid = false;
        }

        if(state.password === "") {

            setErrors((old) => ({...old, password : t('new_password_is_required')}));
            Valid = false;
        }

        if(state.password !== state.confirm_password) {

            setErrors((old) => ({...old, confirm_password : t('please_make_sure_your_passwords_match')}));
            Valid = false;
        }

        return Valid;
    }

    const dispatch = useDispatch();

    const HandelSubmit = (e) => {
        e.preventDefault();
        if(HandelValidation()) {
            setShowLoader(true);
            dispatch(UpdatePasswordDataHandler(state, () => {
                setShowLoader(false);
            }))
        }
    }

    return(
        <>
            <Head>
                <title>{`${t('accountSetting:change_password')} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <section className="overview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <AccountTitle title={t('change_password')} />
                            <form className="user-form" onSubmit={HandelSubmit}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="CurrentPassword">{t('current_password')}</label>
                                            <input type={showCurrentPass ? "text" : "password"} className="form-control" id="CurrentPassword" placeholder="********" onChange={
                                                (e) => {
                                                    const Text = e.target.value;
                                                    setState((old) => ({...old, current_password : Text}));
                                                    setErrors((old) => ({...old, current_password : ""}));
                                                }
                                            }/>
                                            <span className="left-icon" onClick={() => setShowCurrentPass(!showCurrentPass)}>
                                                {
                                                    showCurrentPass ?  <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rs-eye"></i>
                                                }
                                            </span>
                                            {
                                                errors.current_password && <div className="form-text text-danger">{errors.current_password}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="NewPassword">{t('new_password')}</label>
                                            <input type={showNewPass ? "text" : "password"} className="form-control" id="NewPassword" placeholder="********" onChange={
                                                (e) => {
                                                    const Text = e.target.value;
                                                    setState((old) => ({...old, password : Text}));
                                                    setErrors((old) => ({...old, password : ""}));
                                                }
                                            }/>
                                            <span className="left-icon" onClick={() => setShowNewPass(!showNewPass)}>
                                                {
                                                    showNewPass ?  <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rs-eye"></i>
                                                }
                                            </span>
                                            {
                                                errors.password && <div className="form-text text-danger">{errors.password}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="ConfirmNewPassword">{t('confirm_new_password')}</label>
                                            <input type={showConfirmPass ? "text" : "password"} className="form-control" id="ConfirmNewPassword" placeholder="********" onChange={
                                                (e) => {
                                                    const Text = e.target.value;
                                                    setState((old) => ({...old, confirm_password : Text}));
                                                    setErrors((old) => ({...old, confirm_password : ""}));
                                                }
                                            }/>
                                            <span className="left-icon" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                                {
                                                    showConfirmPass ?  <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rs-eye"></i>
                                                }
                                            </span>
                                            {
                                                errors.confirm_password && <div className="form-text text-danger">{errors.confirm_password}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                        {
                                            showLoader ? 
                                                <div className="submit-loader-account">{t('save_password')} <span className="loader"></span></div> 
                                                : 
                                                <button type="submit" className="form-btn">{t('save_password')}</button>
                                        }
                                    <Link href="/account-setting" className="cancel">{t('cancel')}</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChangePassword;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "sidbar", "accountSetting"])),
      },
    };
}