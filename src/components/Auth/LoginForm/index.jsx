import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { LoginDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import AuthTitle from "../AuthTitle";
import VerficationCode from "../VerficationCode";

const LoginForm = () => {

    const router = useRouter();

    const { t } = useTranslation('auth');

    const dispatch = useDispatch();

    const [ showPass, setShowPass ] = useState(false);

    const [ state, setState ] = useState({
        mobile : "",
        password : ""
    })

    const [ errors, setErrors ] = useState({
        mobile : "",
        password : ""
    })

    const [ showLoader, setShowLoader ] = useState(false);
    const [ showVerify, setShowVerify ] = useState(false);
    const [ verifyMobile, setVerifyMobile ] = useState("");

    const HandelValidation = () => {

        let Valid = true;

        if(state.mobile === "") {

            setErrors((old) => ({...old, mobile : t('phone_number_is_required')}));
            Valid = false;
        }

        if(state.password === "") {

            setErrors((old) => ({...old, password : t('password_is_required')}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {

            setShowLoader(true);
            dispatch(LoginDataHandler(state, () => {
                router.push('/overview');
            }, (errorData) => {
                setShowLoader(false);
                if (errorData?.data?.code === 'account_not_verified') {
                    setVerifyMobile(state.mobile);
                    setShowVerify(true);
                }
            }))
        }
    }

    return(
        showVerify ? <VerficationCode mobile={verifyMobile} autoSendOtp={true} /> :
        <form className="auth-form" onSubmit={HandelSubmit}>
            <AuthTitle title={t('login')} text={t('login_text')} />
            <div className={`form-group ${errors.mobile ? "error" : ""}`}>
                <label className="right-icon" htmlFor="PhoneNumber"><i className="fi fi-br-mobile-notch"></i></label>
                <input type="text" className="form-control" id="PhoneNumber" placeholder={t('phone_number')} onChange={
                    (e) => {
                        const Text = e.target.value;
                        setState((old) => ({...old, mobile : Text}));
                        setErrors((old) => ({...old, mobile : ""}))
                    }
                }/>
                {
                    errors.mobile && <div className="form-text text-danger">{errors.mobile}</div>
                }
            </div>
            <div className={`form-group ${errors.password ? "error" : ""}`}>
                <label className="right-icon" htmlFor="Password"><i className="fi fi-rr-lock"></i></label>
                <input type={showPass ? "text" : "password"} className="form-control" id="Password" placeholder={t('password')}  onChange={
                    (e) => {
                        const Text = e.target.value;
                        setState((old) => ({...old, password : Text}));
                        setErrors((old) => ({...old, password : ""}))
                    }
                }/>
                <span className="left-icon" onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ?  <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rs-eye"></i>
                    }
                </span>
                {
                    errors.password && <div className="form-text text-danger">{errors.password}</div>
                }
            </div>
            <div className="form-group">
                <div className="forget-pass">
                    <Link href="/forgot-password">{t('forgot_password')}</Link>
                </div>
            </div>
            <div className="form-group">
                {
                    showLoader ? 
                        <div className="submit-loader"><span className="loader-text">{t('login')}</span> <span className="loader"></span></div> 
                        : 
                        <button type="submit" className="submit">{t('login')}</button>
                }
            </div>
            <div className="form-group">
                <div className="auth-feats">{t('you_dont_have_an_account')} <Link href="/sign-up">{t('sign_up')}</Link></div>
            </div>
        </form>
    )
}

export default LoginForm;
