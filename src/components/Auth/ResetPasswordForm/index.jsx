import { useState } from "react";
import { useTranslation } from 'next-i18next';
import { useDispatch } from "react-redux";
import { ResetPasswordDataHandler, ForgetPasswordDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import AuthTitle from "../AuthTitle";

const ResetPasswordForm = ({mobile}) => {

    const router = useRouter();

    const { t } = useTranslation('auth');

    const dispatch = useDispatch();

    const [ showPass, setShowPass ] = useState(false);

    const [ showConfirmPass, setConfirmShowPass ] = useState(false);

    const [ state, setState ] = useState({
        mobile : mobile,
        otp : "",
        new_password : "",
        confirm_password : ""
    })

    const [ errors, setErrors ] = useState({
        otp : "",
        new_password : "",
        confirm_password : ""
    })

    const [ showLoader, setShowLoader ] = useState(false);
    const [ resendLoading, setResendLoading ] = useState(false);
    const [ resendMessage, setResendMessage ] = useState("");

    const HandelValidation = () => {

        let Valid = true;

        if(state.otp === "") {

            setErrors((old) => ({...old, otp : t('otp_is_required')}));
            Valid = false;
        }

        if(state.new_password === "") {

            setErrors((old) => ({...old, new_password : t('password_is_required')}));
            Valid = false;
        }

        if(state.new_password !== state.confirm_password) {

            setErrors((old) => ({...old, confirm_password : t('please_make_sure_your_passwords_match')}));
            Valid = false;
        }

        return Valid;
    }

    const handleResend = () => {
        setResendLoading(true);
        setResendMessage("");
        dispatch(ForgetPasswordDataHandler({ mobile }, () => {
            setResendLoading(false);
            setResendMessage(t('otp_resent'));
        }, (errorData) => {
            setResendLoading(false);
            if (errorData?.message) {
                setResendMessage(errorData.message);
            }
        }))
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {

            setShowLoader(true);

            dispatch(ResetPasswordDataHandler(state, () => {
                router.push('/login');
            }, (errorData) => {
                setShowLoader(false);
                if (errorData?.message) {
                    setErrors((old) => ({...old, otp : errorData.message}));
                }
            }))
        }
    }

    return(
        <form className="auth-form" onSubmit={HandelSubmit}>
            <AuthTitle title={t('reset')} text={t('login_text')} />
            <div className={`form-group ${errors.otp ? "error" : ""}`}>
                <label className="right-icon" htmlFor="OTP"><i className="fi fi-br-mobile-notch"></i></label>
                <input type="text" className="form-control" id="OTP" placeholder={t('otp')} onChange={
                    (e) => {
                        const Text = e.target.value;
                        setState((old) => ({...old, otp : Text}));
                        setErrors((old) => ({...old, otp : ""}))
                    }
                }/>
                {
                    errors.otp && <div className="form-text text-danger">{errors.otp}</div>
                }
                {resendMessage && <div className="form-text text-info">{resendMessage}</div>}
            </div>
            <div className="form-group">
                <div className="auth-feats">
                    {t('otp_valid_10min_limit')}
                </div>
            </div>
            <div className={`form-group ${errors.password ? "error" : ""}`}>
                <label className="right-icon" htmlFor="Password"><i className="fi fi-rr-lock"></i></label>
                <input type={showPass ? "text" : "password"} className="form-control" id="Password" placeholder={t('password')}  onChange={
                    (e) => {
                        const Text = e.target.value;
                        setState((old) => ({...old, new_password : Text}));
                        setErrors((old) => ({...old, new_password : ""}))
                    }
                }/>
                <span className="left-icon" onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ?  <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rs-eye"></i>
                    }
                    
                </span>
                {
                    errors.new_password && <div className="form-text text-danger">{errors.new_password}</div>
                }
            </div>
            <div className={`form-group ${errors.confirm_password ? "error" : ""}`}>
                <label className="right-icon" htmlFor="ConfirmPassword"><i className="fi fi-rr-lock"></i></label>
                <input type={showConfirmPass ? "text" : "password"} className="form-control" id="ConfirmPassword" placeholder={t('confirm_password')}  onChange={
                    (e) => {
                        const Text = e.target.value;
                        setState((old) => ({...old, confirm_password : Text}));
                        setErrors((old) => ({...old, confirm_password : ""}))
                    }
                }/>
                <span className="left-icon" onClick={() => setConfirmShowPass(!showConfirmPass)}>
                    {
                        showConfirmPass ?  <i className="fi fi-rr-eye-crossed"></i> : <i className="fi fi-rs-eye"></i>
                    }
                    
                </span>
                {
                    errors.confirm_password && <div className="form-text text-danger">{errors.confirm_password}</div>
                }
            </div>
            <div className="form-group">
                {
                    showLoader ? 
                        <div className="submit-loader">{t('change_password')} <span className="loader"></span></div> 
                        : 
                        <button type="submit" className="submit">{t('change_password')}</button>
                }
            </div>
            <div className="form-group">
                <div className="auth-feats">
                    {resendLoading ? <span className="loader"></span> : <button type="button" className="resend-link" onClick={handleResend}>{t('resend_code')}</button>}
                </div>
            </div>
        </form>
    )
}

export default ResetPasswordForm;
