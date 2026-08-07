import { useState, useEffect } from "react";
import SingleOrder from "@/components/SingleOrder";
import Sidebar from "@/Layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { SingleOrderDataHandler } from "@/redux/actions/SingleOrderApi";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import AccountLoader from "@/utils/AccountLoader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const SingleOrderPage = () => {

    const router = useRouter();

    const { t } = useTranslation();

    const { OrderID } = router.query;

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(true);

    const { SingleOrderData } = useSelector(state => state.orderData);

    useEffect(() => {
        if(!localStorage.getItem(LocalKeys.TOKEN)) {
            router.push('/login');
        }else {

            if(router.isReady) {
                dispatch(SingleOrderDataHandler(OrderID, () => {
                    setLoader(false);
                }));
            }
        }
    },[router])

    return(
        <>
            <Head>
                <title>{`${t('order:order_num')}: ${SingleOrderData.orderNumber} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <div className="overview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            {
                                loader ? <AccountLoader /> : <SingleOrder data={SingleOrderData} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleOrderPage;

export async function getServerSideProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "sidbar", "order", "payment"])),
      },
    };
}