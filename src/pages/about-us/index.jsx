import { useEffect, useState } from "react";
import PageHeader from "@/utils/PageHeader";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PagesDataHandler } from "@/redux/actions/PagesApi";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const AboutUs = () => {
    const mainColor = "#1D3E73";
    const { t, i18n } = useTranslation("about");
    const dispatch = useDispatch();
    const { SinglePageData } = useSelector((state) => state.pagesData);
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    // Fetch backend page data
    useEffect(() => {
        dispatch(
            PagesDataHandler("about-us", () => {
                setLoading(false);
            })
        );
    }, []);

    // Timeline items dynamically from locale
    const timelineItems = [
        { year: "1947", title: t("1947") },
        { year: "1980s", title: t("1980s") },
        { year: "1990s", title: t("1990s") },
        { year: "2000s", title: t("2000s") },
        { year: "2010s", title: t("2010s") },
        { year: "2020", title: t("2020") },
        { year: "2023", title: t("2023") },
        { year: "2026", title: t("2026") },
    ];

    // Safely get values array from locale JSON
    let valuesRaw = t("values", { returnObjects: true });
    const values = Array.isArray(valuesRaw) ? valuesRaw : [];

    if (loading) {
        return (
            <div className="animate-pulse space-y-12 px-6 py-16 max-w-7xl mx-auto">
                <div className="bg-gray-300 h-[350px] rounded-3xl"></div>
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-6 bg-gray-300 rounded-lg w-full"></div>
                    ))}
                </div>
                <div className="flex gap-6 overflow-x-auto py-6">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-300 rounded-3xl min-w-[220px] h-48"
                        ></div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-gray-300 h-48 rounded-3xl"></div>
                    ))}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-300 h-40 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{`${t("menu:about_us")} - ${t("common:site_name")}`}</title>
                <meta name="description" content="About our supermarket brand" />
            </Head>

            <PageHeader title={t("menu:about_us")} subTitle={t("menu:about_us")} />

            {/* Backend content */}

            {SinglePageData?.content && (
                <section className="container mx-auto px-6 py-16">
                    <div
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                        className={`mx-auto max-w-none text-xl leading-relaxed
        ${i18n.language === "ar"
                                ? "text-right space-y-4 [&_*]:leading-loose"
                                : "text-left prose"}
      `}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(SinglePageData.content || '') }}
                    />
                </section>
            )}


            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center py-28 text-white"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative container mx-auto text-center">
                    <h1 className="text-5xl font-bold">{t("our_Story_Values")}</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto">{t("learn_who")}</p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="bg-gray-50 py-20 relative">
                <h2
                    className="text-4xl font-bold text-center mb-12"
                    style={{ color: mainColor }}
                >
                    {t("our_ourney")}
                </h2>
                <div className="flex overflow-x-auto gap-6 px-6 py-6">
                    {timelineItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-6 rounded-3xl min-w-[220px] shadow-xl hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <p className="text-[#1D3E73] font-bold text-2xl mb-2">
                                {item.year}
                            </p>
                            <p className="text-gray-600 text-center">{item.title}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="relative py-20 bg-[#1D3E73] text-white">
                <div className="absolute -top-12 left-0 w-full h-24 bg-white rounded-b-[50%]"></div>
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
                    <motion.div
                        className="p-12 bg-white/10 rounded-3xl shadow-lg hover:shadow-2xl transition"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h3 className="text-3xl font-bold mb-4">{t("our_Story_Values")}</h3>
                        <p className="text-lg">{t("to_be_the_leading")}</p>
                    </motion.div>

                    <motion.div
                        className="p-12 bg-white/10 rounded-3xl shadow-lg hover:shadow-2xl transition"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <h3 className="text-3xl font-bold mb-4">{t("our_mission")}</h3>
                        <p className="text-lg">{t("deliver_exceptional")}</p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8">{t("our_core_values")}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg"
                            >
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h4 className="font-semibold text-xl">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "menu",
                "common",
                "header",
                "about",
            ])),
        },
    };
}
