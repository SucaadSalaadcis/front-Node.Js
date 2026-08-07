import { useState } from "react";
import Link from "next/link";
import VerficationCode from "../VerficationCode";
import { useTranslation } from 'next-i18next';
import { useDispatch } from "react-redux";
import AuthTitle from "../AuthTitle";
import { SignUpDataHandler } from "@/redux/actions/AuthApi";

const SignUpForm = () => {

    const { t } = useTranslation('auth');

    const dispatch = useDispatch();

    const [ showPass, setShowPass ] = useState(false);

    const [ showConfirmPass, setConfirmShowPass ] = useState(false);

    const [ showCode, setShowCode ] = useState(false);

    const [ state, setState ] = useState({
        first_name : "",
        last_name : "",
        email : "",
        mobile : "",
        password : "",
        confirm_password : ""
    })

    const [ errors, setErrors ] = useState({
        first_name : "",
        last_name : "",
        email : "",
        mobile : "",
        password : "",
        confirm_password : ""
    })

    const [ showLoader, setShowLoader ] = useState(false);

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

        if(state.email === "") {

            setErrors((old) => ({...old, email : t('email_is_required')}));
            Valid = false;
        }

        if(state.mobile === "") {

            setErrors((old) => ({...old, mobile : t('phone_number_is_required')}));
            Valid = false;
        }

        if(state.password === "") {

            setErrors((old) => ({...old, password : t('password_is_required')}));
            Valid = false;
        }

        if(state.password !== state.confirm_password) {

            setErrors((old) => ({...old, confirm_password : t('please_make_sure_your_passwords_match')}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {
            setShowLoader(true);
            dispatch(SignUpDataHandler(state, () => {
                setShowCode(true);
            }, () => {
                setShowLoader(false);
            }))
        }
    }

    return(
        showCode ? <VerficationCode mobile={state.mobile} />
        :
        <form className="auth-form" onSubmit={HandelSubmit}>
            <AuthTitle title={t('sign_up')} text={t('login_text')} />
            <div className="row">
                <div className="col-md-6">
                    <div className={`form-group ${errors.first_name ? "error" : ""}`}>
                        <label className="right-icon" htmlFor="FirstName"><i className="fi fi-rr-user"></i></label>
                        <input type="text" className="form-control" id="FirstName" placeholder={t('first_name')} onChange={
                            (e) => {
                                const Text = e.target.value;
                                setState((old) => ({...old, first_name : Text}));
                                setErrors((old) => ({...old, first_name : ""}))
                            }
                        }/>
                        {
                            errors.first_name && <div className="form-text text-danger">{errors.first_name}</div>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={`form-group ${errors.last_name ? "error" : ""}`}>
                        <label className="right-icon" htmlFor="LastName"><i className="fi fi-rr-user"></i></label>
                        <input type="text" className="form-control" id="LastName" placeholder={t('last_name')} onChange={
                            (e) => {
                                const Text = e.target.value;
                                setState((old) => ({...old, last_name : Text}));
                                setErrors((old) => ({...old, last_name : ""}))
                            }
                        }/>
                        {
                            errors.last_name && <div className="form-text text-danger">{errors.last_name}</div>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={`form-group ${errors.email ? "error" : ""}`}>
                        <label className="right-icon" htmlFor="Email"><i className="fi fi-rr-envelope"></i></label>
                        <input type="email" className="form-control" id="Email" placeholder={t('email')} onChange={
                            (e) => {
                                const Text = e.target.value;
                                setState((old) => ({...old, email : Text}));
                                setErrors((old) => ({...old, email : ""}))
                            }
                        }/>
                        {
                            errors.email && <div className="form-text text-danger">{errors.email}</div>
                        }
                    </div>
                </div>
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
            </div>
            <div className="form-group">
                <div className="auth-feats">
                    {t('once_registered_i_agree_to_the')}  <Link href="/terms-conditions" className="forget-pass">{t('terms_of_use')}</Link>
                </div>
            </div>
            <div className="form-group">
                {
                    showLoader ? 
                        <div className="submit-loader">{t('submit_sign_up')} <span className="loader"></span></div> 
                        : 
                        <button type="submit" className="submit">{t('submit_sign_up')}</button>
                }
            </div>
            <div className="form-group">
                <div className="auth-feats">{t('already_have_account?')} <Link href="/login">{t('login')}</Link></div>
            </div>
        </form>
    )
}

export default SignUpForm;