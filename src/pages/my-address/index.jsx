import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import AddressBox from "@/utils/AddressBox";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { UserDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import AccountLoader from "@/utils/AccountLoader";
import EmptyWidget from "@/utils/EmptyWidget";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";

const MyAddress = () => {

    const router = useRouter();

    const { t } = useTranslation('common');

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(true);

    const { UserAddresses } = useSelector(state => state.userProfile);

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
                <title>{`${t('address:my_address')} - ${t('common:site_name')}`}</title>
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
                            <AccountTitle title={t('address:my_address')} />
                            {
                                loader ? <AccountLoader /> :
                                <div className="row">
                                    {
                                        UserAddresses.length === 0 ?
                                        <EmptyWidget link="address" /> :
                                        <>
                                            {
                                                UserAddresses.map(item => (
                                                    <div className="col-md-6" key={item.id}>
                                                        <AddressBox data={item} />
                                                    </div>
                                                ))
                                            }
                                            <div className="col-md-12">
                                                <Link href="/my-address/add" className="add-btn">{t('address:add_new_address')}</Link>
                                            </div>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyAddress;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "sidbar", "address"])),
      },
    };
}