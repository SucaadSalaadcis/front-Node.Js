import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { UserDataHandler, UpdateUserDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import AccountLoader from "@/utils/AccountLoader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";

const AccountSetting = () => {

    const router = useRouter();

    const { t } = useTranslation('accountSetting');

    const dispatch = useDispatch();

    const { UserData } = useSelector(state => state.userProfile);

    const [ loader, setLoader ] = useState(true);

    const [ showLoader, setShowLoader ] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem(LocalKeys.TOKEN)) {
            router.push('/login');
        } else {
            dispatch(UserDataHandler(() => {
                setLoader(false);
            }));
        }
    },[])

    const [ state, setState ] = useState({
        first_name : "",
        last_name : "",
        mobile : "",
        email : ""
    })

    useEffect(() => {
        setState({
            first_name : UserData.first_name,
            last_name : UserData.last_name,
            mobile : UserData.mobile,
            email : UserData.email
        })
    },[UserData])

    const [ errors, setErrors ] = useState({
        first_name : "",
        last_name : "",
        mobile : "",
        email : ""
    })

    const HandelValidation = () => {

        let Valid = true;

        if(state.first_name === "") {

            setErrors((old) => ({...old, first_name : t('first_name_is_required')}));
            Valid = false;
        }

        if(state.last_name === "") {

            setErrors((old) => ({...old, last_name : t('last_name_is_required')}));
            Valid = false;
        }

        if(state.mobile === "") {

            setErrors((old) => ({...old, mobile : t('phone_number_is_required')}));
            Valid = false;
        }

        if(state.email === "") {

            setErrors((old) => ({...old, email : t('email_is_required')}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {
        e.preventDefault();
        if(HandelValidation()) {
            setShowLoader(true);
            dispatch(UpdateUserDataHandler(state, () => {
                setShowLoader(false);
            }))
        }
    }

    return(
        <>
            <Head>
                <title>{`${t('sidbar:account_setting')} - ${t('common:site_name')}`}</title>
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
                            <AccountTitle title={t('account_information')} />
                            {
                                loader ? <AccountLoader /> :
                                <form className="user-form" onSubmit={HandelSubmit}>
                                    <h4 className="form-title">{t('personal_information')}</h4>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Fname">{t('first_name')}</label>
                                                <input type="text" className="form-control" id="Fname" defaultValue={state.first_name} placeholder={t('first_name')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, first_name : Text}));
                                                        setErrors((old) => ({...old, first_name : ""}));
                                                    }
                                                }/>
                                                {
                                                    errors.first_name && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.first_name}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Lname">{t('last_name')}</label>
                                                <input type="text" className="form-control" id="Lname" defaultValue={state.last_name} placeholder={t('last_name')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, last_name : Text}));
                                                        setErrors((old) => ({...old, last_name : ""}));
                                                    }
                                                }/>
                                                {
                                                    errors.last_name && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.last_name}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="form-title mt-5">{t('login_details')}</h4>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="Email">{t('email')}</label>
                                                <input type="email" className="form-control" id="Email" defaultValue={state.email} placeholder={t('email')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, email : Text}));
                                                        setErrors((old) => ({...old, email : ""}));
                                                    }
                                                }/>
                                                {
                                                    errors.email && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.email}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="PhoneNumber">{t('phone_number')}</label>
                                                <input type="phone" className="form-control" id="PhoneNumber" defaultValue={state.mobile} placeholder={t('phone_number')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, mobile : Text}));
                                                        setErrors((old) => ({...old, mobile : ""}));
                                                    }
                                                }/>
                                                {
                                                    errors.mobile && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.mobile}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="PhoneNumber" className="pass">
                                                    <span className="label">{t('password')}</span>
                                                    <Link href="/account-setting/change-password"><i className="fi fi-rr-edit"></i> {t('edit')}</Link>
                                                </label>
                                                <div type="password" className="form-control" id="PhoneNumber">**********</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        {
                                            showLoader ? 
                                                <div className="submit-loader-account">{t('save_changes')} <span className="loader"></span></div> 
                                                : 
                                                <button type="submit" className="form-btn">{t('save_changes')}</button>
                                        }
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountSetting;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "sidbar", "accountSetting"])),
      },
    };
}