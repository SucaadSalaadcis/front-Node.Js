import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";

const Layouts = ({children}) => {

    const router = useRouter();
    const [routeLoading, setRouteLoading] = useState(false);

    useEffect(() => {
        const start = () => setRouteLoading(true);
        const end = () => setRouteLoading(false);
        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);
        return () => {
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", end);
            router.events.off("routeChangeError", end);
        };
    }, []);

    return(
        <>
            {routeLoading && (
                <div className="route-loader-overlay">
                    <div className="route-loader-spinner" />
                </div>
            )}
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layouts;