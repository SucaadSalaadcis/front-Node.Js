import { useState, useEffect } from "react";
import Link from "next/link";
import { LocalKeys } from "@/helpers/Config";
import { useDispatch, useSelector } from "react-redux";
import { GetCartDataHandler } from "@/redux/actions/CartApi";

const AuthHeader = () => {

    const dispatch = useDispatch();

    const { CartData } = useSelector(state => state.cartsData);

    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        if(localStorage.getItem(LocalKeys.TOKEN)) {
            setLoggedIn(true);
            dispatch(GetCartDataHandler());
        }else {
            setLoggedIn(false);
        }
    },[typeof window !== 'undefined' && localStorage.getItem(LocalKeys.TOKEN)])

    return(
        <ul className="flex items-center gap-1 auth-header">
            <li>
                <Link href={loggedIn ? "/overview" : "/login"} className="header-auth-img" aria-label={loggedIn ? 'My Account' : 'Login'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D3E73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </Link>
            </li>
            <li>
                <Link href="/cart" className="relative header-auth-img" aria-label="Cart">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D3E73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    {
                        CartData.length === 0 ? null : <span className="custom-badge absolute -top-1.5 -right-1.5 rtl:-left-1.5 rtl:-right-auto bg-red-600 text-white text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md border border-white">{CartData.length > 99 ? '99+' : CartData.length}</span>
                    }
                </Link>
            </li>
        </ul>
    )
}

export default AuthHeader;
