import { useEffect } from "react";
import Layouts from "@/Layouts";
import "../styles/style.scss";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { appWithTranslation } from "next-i18next";
import { getDirection } from "@/helpers/Helpers";
import { useRouter } from "next/router";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const dir = getDirection(router.locale);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  useEffect(() => {
    document.title = "EL Fergany";
    const handleStart = () => {
      document.title = "EL Fergany";
    };
    router.events.on("routeChangeStart", handleStart);
    return () => {
      router.events.off("routeChangeStart", handleStart);
    };
  }, []);

  return (
    <>
      <Head>
        <title>EL Fergany</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Layouts>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
        </Layouts>
      </Provider>
    </>
  );
};

export default appWithTranslation(App);
