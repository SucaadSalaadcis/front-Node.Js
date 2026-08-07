import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";
import OnlineCart from "@/components/CartComponent/OnlineCart";
import { LocalKeys } from "@/helpers/Config";
import OfflineCart from "@/components/CartComponent/OfflineCart";

const Cart = () => {

    const { t } = useTranslation();

    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        if(localStorage.getItem(LocalKeys.TOKEN)) {
            setLoggedIn(true)
        }else {
            setLoggedIn(false)
        }
    },[])

    return(
        <>
            <Head>
                <title>{`${t('menu:my_cart')} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            {
                loggedIn ? <OnlineCart /> : <OfflineCart />
            }
        </>
    )
}

export default Cart;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["menu", "common", "header", "cart", "payment", "overview"])),
      },
    };
}