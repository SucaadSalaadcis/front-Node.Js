import { useState, useEffect } from "react";
import OtpInput from 'react-otp-input';
import { useTranslation } from 'next-i18next';
import { useDispatch } from "react-redux";
import { VerificationOtpDataHandler, ResendOtpDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import AuthTitle from "../AuthTitle";
import { ShowTostHandler } from "@/helpers/Helpers";

const VerficationCode = ({mobile, autoSendOtp = false}) => {

    const router = useRouter();

    const { t } = useTranslation('auth');

    const dispatch = useDispatch();

    const [ state, setState ] = useState({
        otp : "",
        mobile : mobile
    })

    const [ errors, setErrors ] = useState({
        otp : "",
        mobile : ""
    })

    const [ showLoader, setShowLoader ] = useState(false);
    const [ resendLoading, setResendLoading ] = useState(false);
    const [ resendMessage, setResendMessage ] = useState("");

    useEffect(() => {
        if (autoSendOtp) {
            handleResend();
        }
    }, []);

    const HandelChange = (code) => {
        setState((old) => ({...old, otp : code}))
        setErrors((old) => ({...old, otp : ""}))
    }

    const HandelValidation = () => {

        let Valid = true;

        if(state.otp.length !== 4) {

            setErrors((old) => ({...old, otp : t('verification_code_is_required')}));
            Valid = false;
        }

        return Valid;
    }

    const handleResend = () => {
        setResendLoading(true);
        setResendMessage("");
        dispatch(ResendOtpDataHandler(mobile, (data) => {
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
            dispatch(VerificationOtpDataHandler(state, () => {
                ShowTostHandler(t('account_verified'), "success");
                router.push('/overview');
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
            <AuthTitle title={t('verify_account')} text={t('please_enter_the_verification_code_you_received_in_your_phone_number.')} />
            <div className="form-group">
                <div className="whatsapp-notice">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>{t('otp_resent')}</span>
                </div>
                <div className="otp">
                    <OtpInput
                        value={state.otp}
                        onChange={HandelChange}
                        numInputs={4}
                        inputType="tel"
                        renderInput={(val) => <input dir="ltr" inputMode={"numeric"} {...val} />}
                    />
                </div>
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
            <div className="form-group">
                {
                    showLoader ? 
                        <div className="submit-loader">{t('verify')} <span className="loader"></span></div> 
                        : 
                        <button type="submit" className="submit">{t('verify')}</button>
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

export default VerficationCode;