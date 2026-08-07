import { useState, useEffect, Fragment } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import SeoHead from "@/utils/SeoHead";
import { useDispatch, useSelector } from "react-redux";
import { WishlistDataHandler } from "@/redux/actions/WishlistApi";
import AccountLoader from "@/utils/AccountLoader";
import EmptyWidget from "@/utils/EmptyWidget";
import { LocalKeys } from "@/helpers/Config";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import ProductBoxTwo from "@/utils/ProductBoxTwo";
import Head from "next/head";

const MyWishlist = () => {

    const router = useRouter();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { WishlistData } = useSelector(state => state.wishlistData);

    const [ loader, setLoader ] = useState(true);

    useEffect(() => {
        if(!localStorage.getItem(LocalKeys.TOKEN)) {
            router.push('/login');
        } else {
            dispatch(WishlistDataHandler(() => {
                setLoader(false);
            }));
        }
    },[])

    return(
        <>
            <Head>
                <title>{`${t('sidbar:my_wishlist')} - ${t('common:site_name')}`}</title>
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
                            <AccountTitle title={t('sidbar:my_wishlist')} />
                            {
                                loader ? <AccountLoader /> :
                                <div className="row">
                                    {
                                        WishlistData.length === 0 ? 
                                        <div className="col-12">
                                            <EmptyWidget link="wishlist" /> 
                                        </div> :
                                        <>
                                            {
                                                    WishlistData.map(item => (
                                                            <Fragment key={item.id}>
                                                            <ProductBoxTwo
                                                                wrapperClass="col-md-4"
                                                                id={item.id}
                                                                name={item.name}
                                                                slug={item.slug}
                                                                price={item.unit_price}
                                                                discount={item.discount}
                                                                image={item.thumbnail_img}
                                                                rate={item.rating}
                                                                page="wishlist"
                                                                prodType={item.prod_type}
                                                                minWeight={item.min_weight}
                                                                stock={item.stock}
                                                            />
                                                            </Fragment>
                                                        ))
                                                }
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

export default MyWishlist;

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale,["auth", "menu", "common", "header", "sidbar", "overview", "product"])),
      },
    };
}