import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from "react-redux";
import { LocalKeys } from "@/helpers/Config";
import { GetCartDataHandler } from "@/redux/actions/CartApi";

const HeaderIcons = () => {
  const { t } = useTranslation('menu');
  const dispatch = useDispatch();
  const { CartData } = useSelector(state => state.cartsData);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LocalKeys.TOKEN)) {
      setLoggedIn(true);
      dispatch(GetCartDataHandler());
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="flex items-center gap-3 rtl:gap-3 ltr:gap-3">
      <Link
        href={loggedIn ? "/overview" : "/login"}
        className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
        aria-label={loggedIn ? t('my_account') : t('login')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D3E73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:scale-110">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span className="text-[10px] font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors duration-200 leading-none">
          {loggedIn ? t('my_account') : t('login')}
        </span>
      </Link>


      <Link
        href="/cart"
        className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group relative"
        aria-label={t('my_cart')}
      >
        <div className="relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D3E73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:scale-110">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {CartData?.length > 0 && (
            <span className="absolute -top-2 -right-2 rtl:-left-2 rtl:-right-auto min-w-[20px] h-[20px] flex items-center justify-center bg-red-600 text-white text-[10px] font-bold rounded-full px-1 leading-none shadow-lg border border-white">
              {CartData.length > 99 ? '99+' : CartData.length}
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold text-brand-navy group-hover:text-brand-navy/80 transition-colors duration-200 leading-none">
          {t('my_cart')}
        </span>
      </Link>
    </div>
   
  );
};

export default HeaderIcons;
