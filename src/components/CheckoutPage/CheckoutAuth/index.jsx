import Link from 'next/link';
import { useState, useEffect } from 'react';
import CheckoutLogin from './CheckoutLogin';
import CheckoutSignUp from './CheckoutSignUp';

const CheckoutAuth = ({auth}) => {

    const [ authType, setAuthType ] = useState(true);

    const [ isLogin, setIsLogin ] = useState(false);

    useEffect(() => {
        auth(isLogin)
    }, [isLogin])

    const HandelLogin = (login) => {
        setIsLogin(login)
    }
    

    return(
        <div className="checkout-auth">
            <div className="form-header">
                <h4 className="title">{authType ? "Login" : "Sign Up"}</h4>
                <div className="feats">{authType ? "You Don't Have Account ?" : "Already Have An Account ?"} <Link href="#" onClick={
                    (e) => {
                        e.preventDefault();
                        setAuthType(!authType);
                    }
                }>{authType ? "Sign Up" : "Login"}</Link></div>
            </div>
            {
                authType ? <CheckoutLogin log={HandelLogin} /> : <CheckoutSignUp />
            }
        </div>
    )
}

export default CheckoutAuth;