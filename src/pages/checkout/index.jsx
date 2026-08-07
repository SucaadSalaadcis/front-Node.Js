import { useState, useEffect } from "react";
import CheckoutPage from "@/components/CheckoutPage";
import { useDispatch, useSelector } from "react-redux";
import { GetCartDataHandler, SummryCartDataHandler } from "@/redux/actions/CartApi";
import CheckoutProductsSummary from "@/components/CheckoutPage/CheckoutProductsSummary";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";
import CheckoutPaymentSummary from "@/utils/CheckoutPaymentSummary";

const Checkout = () => {

    const { t } = useTranslation('common');

    const dispatch = useDispatch();

    const { CartData, SummryData } = useSelector(state => state.cartsData);

    const [ copoun, setCopoun ] = useState("");
    const [ steps, setSteps ] = useState(0);

    const HandelUpdate = (copounData) => {
        setCopoun(copounData);
    }

    useEffect(() => {
        dispatch(GetCartDataHandler());
        dispatch(SummryCartDataHandler());
    },[copoun]);

    const handleProceed = () => {
        if (steps === 0) {
            const el = document.querySelector('.checkout-page-wrapper a.checkout-submit');
            if (el) el.click();
        } else if (steps === 1) {
            const el = document.querySelector('.checkout-info-wrapper button[type="submit"]');
            if (el) el.click();
        }
    };

    return(
        <>
            <Head>
                <title>{`${t('checkout:checkout')} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <section className="checkout">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <CheckoutPage steps={steps} setSteps={setSteps} />
                        </div>
                        <div className="col-md-4">
                            <CheckoutProductsSummary data={CartData} />
                            <CheckoutPaymentSummary 
                                total={SummryData.grand_total} 
                                subTotal={SummryData.sub_total} 
                                shipping={SummryData.shipping_cost} 
                                updateFees={HandelUpdate} 
                                onProceed={handleProceed}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["menu", "common", "header", "payment", "address", "checkout"])),
      },
    };
}
