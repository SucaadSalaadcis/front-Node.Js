import { useState, useEffect } from "react";
import BackToCart from "../../BackToCart";
import { useDispatch } from "react-redux";
import { LoginDataHandler } from "@/redux/actions/AuthApi";

const CheckoutLogin = ({log}) => {

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

    const HandelValidation = () => {

        let Valid = true;

        if(state.mobile === "") {

            setErrors((old) => ({...old, mobile : 'Phone Number Is Required'}));
            Valid = false;
        }

        if(state.password === "") {

            setErrors((old) => ({...old, password : 'Password Is Required'}));
            Valid = false;
        }

        return Valid;
    }

    const [ isLogin, setIsLogin ] = useState(false);

    useEffect(() => {
        log(isLogin);
    },[isLogin])

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(HandelValidation()) {

            setShowLoader(true);
            dispatch(LoginDataHandler(state, () => {
                setIsLogin(true);
            }, () => {
                setShowLoader(false);
            }))
        }
    }

    return(
        <form className="checkout-auth-form" onSubmit={HandelSubmit}>
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
                <input type={showPass ? "text" : "password"} className="form-control" placeholder="Password" onChange={
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
            <div className="form-btns">
                <BackToCart />
                {
                    showLoader ? <div className="submit-loader-checkout">Login <span className="loader"></span></div> :
                    <button className="checkout-submit" type="submit">Login</button>
                }
            </div>
        </form>
    )
}

export default CheckoutLogin;