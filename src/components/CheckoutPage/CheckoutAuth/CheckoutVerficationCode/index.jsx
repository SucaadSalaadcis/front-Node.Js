import { useState } from "react";
import OtpInput from 'react-otp-input';

const CheckoutVerficationCode = () => {

    const [ state, setState ] = useState({
        otp : "",
        mobile : ""
    })

    const [ errors, setErrors ] = useState({
        otp : "",
        mobile : ""
    })

    const [ showLoader, setShowLoader ] = useState(false);

    const HandelChange = (code) => {
        setState((old) => ({...old, otp : code}))
        setErrors((old) => ({...old, otp : ""}))
    }

    const HandelValidation = () => {

        let Valid = true;

        if(state.otp.length !== 4) {

            setErrors((old) => ({...old, otp : 'Verification Code Is Required'}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {

            setShowLoader(true);
        }
    }

    return(
        <form className="checkout-auth-form" onSubmit={HandelSubmit}>
            <div className="form-header">
                <h4 className="title">Verify Account</h4>
            </div>
            <div className="form-group">
                <div className="otp">
                    <OtpInput
                        value={state.otp}
                        onChange={HandelChange}
                        numInputs={4}
                        className="otp-input"
                    />
                </div>
                {
                    errors.otp && <div className="form-text text-danger">{errors.otp}</div>
                }
            </div>
            <div className="form-group">
                Please Enter The Verification Code You Received in Your Phone Number.
            </div>
            <div className="form-group mb-0">
                {
                    showLoader ? 
                        <div className="submit-loader">Verify <span className="loader"></span></div> 
                        : 
                        <button type="submit" className="submit">Verify</button>
                }
            </div>
        </form>
    )
}

export default CheckoutVerficationCode;