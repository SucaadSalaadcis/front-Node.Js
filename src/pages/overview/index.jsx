import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { UserDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import OrderBox from "@/utils/OrderBox";
import AddressBox from "@/utils/AddressBox";
import AccountLoader from "@/utils/AccountLoader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";

const Overview = () => {

    const router = useRouter();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(true);

    const { UserData, UserOrders, UserAddresses } = useSelector(state => state.userProfile);

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
                <title>{`${t('overview:overview')} - ${t('common:site_name')}`}</title>
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
                            <AccountTitle title={t('overview:account_overview')} />
                            {
                                loader ? <AccountLoader /> :
                                <>
                                    <div className="overview-box">
                                        <h3 className="box-title">{t('overview:account_details')}</h3>
                                        <div className="overview-setting">
                                            <div className="account-info">
                                                <div className="label">{t('overview:name')} :</div>
                                                <div className="account-text">{UserData.first_name} {UserData.last_name}</div>
                                            </div>
                                            <div className="account-info">
                                                <div className="label">{t('overview:phone_number')} :</div>
                                                <div className="account-text">{UserData.mobile}</div>
                                            </div>
                                            <div className="account-info">
                                                <div className="label">{t('overview:email')} :</div>
                                                <div className="account-text">{UserData.email}</div>
                                            </div>
                                        </div>
                                        <Link href="/account-setting" className="edit-btn"><i className="fi fi-rr-edit"></i> {t('overview:edit_account')}</Link>
                                    </div>
                                    <div className="overview-box">
                                        <h3 className="box-title">{t('overview:latest_order')}</h3>
                                        {
                                            UserOrders.length === 0 ?
                                            <div className="overview-setting">
                                                <div className="account-info">
                                                    <div className="account-text">{t('overview:empty_orders_text')}</div>
                                                </div>
                                            </div> :
                                            <div className="orders">
                                                {
                                                    UserOrders.slice(0,1).map(item => (
                                                        <OrderBox key={item.id}  data={item}/>
                                                    ))
                                                }
                                            </div>
                                        }
                                        <Link href="/search" className="browse-products-btn">
                                            {t('overview:browse_products')} 
                                        </Link>
                                    </div>
                                    <div className="overview-box">
                                        <h3 className="box-title">{t('overview:saved_addresses')}</h3>
                                        {
                                            UserAddresses.length === 0 ? 
                                            <div className="overview-setting">
                                                <div className="account-info">
                                                    <div className="account-text">{t('overview:empty_address_text')}</div>
                                                </div>
                                            </div> :
                                            <div className="row">
                                                {
                                                    UserAddresses.slice(0,2).map(item => (
                                                        <div className="col-md-6" key={item.id}>
                                                            <AddressBox data={item} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                        <Link href="/my-address/add" className="browse-products-btn">
                                            {t('overview:add_new_address')} 
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Overview;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "overview", "sidbar", "order", "address"])),
      },
    };
}