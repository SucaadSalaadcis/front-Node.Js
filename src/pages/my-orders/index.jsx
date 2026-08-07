import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import OrderBox from "@/utils/OrderBox";
import SeoHead from "@/utils/SeoHead";
import { useDispatch, useSelector } from "react-redux";
import { UserDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import EmptyWidget from "@/utils/EmptyWidget";
import AccountLoader from "@/utils/AccountLoader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";

const MyOrders = () => {

    const router = useRouter();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(true);

    const { UserOrders } = useSelector(state => state.userProfile);

    useEffect(() => {
        if(!localStorage.getItem(LocalKeys.TOKEN)) {

            router.push('/login');
        }else {
            dispatch(UserDataHandler(() => {
                setLoader(false);
            }));
        }
    },[])

    return(
        <>
            <Head>
                <title>{`${t('sidbar:my_orders')} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <section className="overview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <AccountTitle title={t('sidbar:my_orders')} />
                            {
                                loader ? <AccountLoader /> :
                                <>
                                    {
                                        UserOrders.length === 0 ?
                                        <EmptyWidget link="order" /> :
                                        <div className="orders">
                                            {
                                                UserOrders.map(item => (
                                                    <OrderBox key={item.id}  data={item}/>
                                                ))
                                            }
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyOrders;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "sidbar", "order", "product"])),
      },
    };
}