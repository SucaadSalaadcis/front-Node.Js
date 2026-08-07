import Auth from "@/components/Auth";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ForgotPassword = () => {

    return(
        <>
            <Head>
                <title>Forgot Password - El Fergany </title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <Auth page="forget" />
        </>
    )
}

export default ForgotPassword;

export async function getStaticProps({ locale }) {
    return {
        props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header"])),
        },
    };
}