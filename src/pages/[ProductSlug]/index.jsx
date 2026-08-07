import { useState, useEffect } from "react";
import SingleProductPage from "@/components/SingleProductPage";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductDataDataHandler } from "@/redux/actions/ProductsApi";
import { useRouter } from "next/router";
import PageLoader from "@/utils/PageLoader";
import ErrorPage from "@/utils/ErrorPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const SingleProduct = () => {

    const router = useRouter();

    const { t } = useTranslation();

    const { ProductSlug } = router.query;

    const dispatch = useDispatch();

    const { SingleProductData } = useSelector(state => state.productsData);

    const [ loader, setLoader ] = useState(true);

    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(router.isReady) {
            dispatch(SingleProductDataDataHandler(ProductSlug, () => {
                setLoader(false);
            }, () => {
                setError(true);
            }
            ));
        }
    },[router])

    return(
        error ? 
        <>
            <Head>
                <title>{`${SingleProductData.name} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <ErrorPage />
        </>
        :
        <>
            <Head>
                <title>{`${SingleProductData.name} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            {
                loader ? <PageLoader /> : <SingleProductPage data={SingleProductData} />
            }
            
        </>
    )
}

export default SingleProduct;

export async function getServerSideProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["menu", "common", "header", "product"])), 
      },
    };
}