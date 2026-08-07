import { useState, useEffect } from "react";
import Link from "next/link";
import BackToCart from "../../BackToCart";
import CheckoutVerficationCode from "../CheckoutVerficationCode";

const CheckoutSignUp = ({auth}) => {

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

            setErrors((old) => ({...old, first_name : 'First Name Is Required'}));
            Valid = false;
        }

        if(state.last_name === "") {

            setErrors((old) => ({...old, last_name : 'Last Name Is Required'}));
            Valid = false;
        }

        if(state.email === "") {

            setErrors((old) => ({...old, email : 'Email Is Required'}));
            Valid = false;
        }

        if(state.mobile === "") {

            setErrors((old) => ({...old, mobile : 'Phone Number Is Required'}));
            Valid = false;
        }

        if(state.password === "") {

            setErrors((old) => ({...old, password : 'Password Is Required'}));
            Valid = false;
        }

        if(state.password !== state.confirm_password) {

            setErrors((old) => ({...old, confirm_password : 'Please Make Sure Your Passwords Match'}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {

            setShowLoader(true);
            setShowCode(true);
        }
    }

    return(
        showCode ? <CheckoutVerficationCode /> :
        <form className="checkout-auth-form" onSubmit={HandelSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="First Name" onChange={
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
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Last Name" onChange={
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
            </div>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" onChange={
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
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Phone Number" onChange={
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
                <input type={showPass ? "text" : "password"} className="form-control" placeholder="Password"  onChange={
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
                <input type={showConfirmPass ? "text" : "password"} className="form-control" placeholder="Confirm Password"  onChange={
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
                <div className="agree">Once Registered, I Agree to the  <Link href="/" className="forget-pass">Terms and Conditions</Link></div>
            </div>
            <div className="form-btns">
                <BackToCart />
                {
                    showLoader ? <div className="submit-loader-checkout">Sign Up <span className="loader"></span></div> :
                    <button className="checkout-submit" type="submit">Sign Up</button>
                }
            </div>
        </form>
    )
}

export default CheckoutSignUp;