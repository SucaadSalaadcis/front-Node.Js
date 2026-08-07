import { useState } from "react";
import Link from "next/link";
import ResetPasswordForm from "../ResetPasswordForm";
import { useTranslation } from 'next-i18next';
import { useDispatch } from "react-redux";
import AuthTitle from "../AuthTitle";
import { ForgetPasswordDataHandler } from "@/redux/actions/AuthApi";

const ForgotPasswordForm = () => {

    const { t } = useTranslation('auth');

    const dispatch = useDispatch();

    const [ state, setState ] = useState({
        mobile : ""
    })

    const [ errors, setErrors ] = useState({
        mobile : ""
    })

    const [ showLoader, setShowLoader ] = useState(false);

    const [ showPass, setShowPass ] = useState(false);

    const HandelValidation = () => {

        let Valid = true;

        if(state.mobile === "") {

            setErrors((old) => ({...old, mobile : t('phone_number_is_required')}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {
            setShowLoader(true);
            dispatch(ForgetPasswordDataHandler(state, () => {
                setShowPass(true);
            }))
        }
    }

    return(
        showPass ? <ResetPasswordForm mobile={state.mobile} /> :
        <form className="auth-form" onSubmit={HandelSubmit}>
            <AuthTitle title={t('forgot_password')} text={t('login_text')} />
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
            <div className="form-group">
                {
                    showLoader ? 
                        <div className="submit-loader">{t('reset')} <span className="loader"></span></div> 
                        : 
                        <button type="submit" className="submit">{t('reset')}</button>
                }
            </div>
            <div className="form-group">
                <div className="auth-feats">{t('back_to')} <Link href="/login">{t('login')}</Link></div>
            </div>
        </form>
    )
}

export default ForgotPasswordForm;