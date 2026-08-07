import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHeader from "@/utils/PageHeader";
import Link from "next/link";

const branches = [
  { name: "حلوان", url: "https://www.google.com/maps/place/29%C2%B050'34.7%22N+31%C2%B020'09.0%22E/@29.8429695,31.3332617,17z/data=!3m1!4b1!4m4!3m3!8m2!3d29.8429695!4d31.3358366?hl=en&entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D" },
  { name: "عين شمس", url: "https://www.google.com/maps/place/30%C2%B007'35.2%22N+31%C2%B019'47.6%22E/@30.1264454,31.3273192,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1264454!4d31.3298941?hl=en&entry=tts&shorturl=1" },
  { name: "النزهه الجديدة", url: "https://www.google.com/maps/place/30%C2%B007'29.5%22N+31%C2%B022'01.6%22E/@30.1248513,31.3645218,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1248513!4d31.3670967?q=30.1248513,31.3670967&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "العبور - الحي الأول", url: "https://www.google.com/maps/place/30%C2%B014'04.5%22N+31%C2%B028'05.7%22E/@30.2345809,31.4656869,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.2345809!4d31.4682618?q=30.2345809,31.4682618&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "العروبة - الهرم", url: "https://www.google.com/maps/place/29%C2%B059'07.4%22N+31%C2%B010'05.4%22E/@29.985393,31.1655864,17z/data=!3m1!4b1!4m4!3m3!8m2!3d29.985393!4d31.1681613?q=29.985393,31.1681613&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "النعام - عين شمس", url: "https://www.google.com/maps/place/30%C2%B007'03.3%22N+31%C2%B019'02.8%22E/@30.1175921,31.3148736,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1175921!4d31.3174485?q=30.1175921,31.3174485&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "تريومف - مصر الجديدة", url: "https://www.google.com/maps/place/30%C2%B006'06.3%22N+31%C2%B020'42.1%22E/@30.1017588,31.3424524,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1017588!4d31.3450273?hl=en&entry=tts&shorturl=1" },
  { name: "عباس العقاد - مدينة نصر", url: "https://www.google.com/maps/place/30%C2%B003'33.6%22N+31%C2%B020'12.7%22E/@30.0593455,31.3342754,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.0593455!4d31.3368503?q=30.0593455,31.3368503&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "زهراء عين شمس", url: "https://www.google.com/maps/place/30%C2%B007'54.0%22N+31%C2%B020'03.6%22E/@30.1316667,31.3343333,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1316667!4d31.3343333?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" },
  { name: "منشية التحرير - عين شمس", url: "https://www.google.com/maps/place/30%C2%B007'22.0%22N+31%C2%B019'19.1%22E/@30.1227801,31.3194094,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1227801!4d31.3219843?q=30.1227801,31.3219843&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "أحمد اسماعيل - الف مسكن", url: "https://www.google.com/maps/place/30%C2%B007'06.8%22N+31%C2%B019'53.3%22E/@30.118557,31.3288889,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.118557!4d31.3314638?q=30.118557,31.3314638&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "فيصل - كلية تربية رياضية", url: "https://www.google.com/maps/place/29%C2%B059'42.4%22N+31%C2%B011'19.1%22E/@30.0117709,31.1860632,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.0117709!4d31.1886381?q=30.0117709,31.1886381&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "فيصل - العشرين", url: "https://www.google.com/maps/place/30%C2%B001'09.4%22N+31%C2%B011'09.2%22E/@30.0192712,31.1833176,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.0192712!4d31.1858925?q=30.019271200000006,31.185892499999994&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "المهندسين - أحمد عرابي", url: "https://www.google.com/maps/place/30%C2%B004'07.5%22N+31%C2%B011'53.7%22E/@30.0687401,31.1956609,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.0687401!4d31.1982358?q=30.0687401,31.1982358&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "شبرا - روض الفرج", url: "https://www.google.com/maps/place/30%C2%B004'52.7%22N+31%C2%B014'16.9%22E/@30.0812915,31.2354464,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.0812915!4d31.2380213?q=30.0812915,31.2380213&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "أكتوبر - جلوريا مول", url: "https://www.google.com/maps/place/29%C2%B057'36.2%22N+30%C2%B055'14.7%22E/@29.9600548,30.9181747,17z/data=!3m1!4b1!4m4!3m3!8m2!3d29.9600548!4d30.9207496?q=29.9600548,30.9207496&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "أحمد عصمت", url: "https://www.google.com/maps/place/30%C2%B007'35.2%22N+31%C2%B019'47.6%22E/@30.1264454,31.3273192,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1264454!4d31.3298941?q=30.12644538033098,31.329894103109837&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "الحرفيين - جمال عبد الناصر", url: "https://www.google.com/maps/place/30%C2%B008'45.9%22N+31%C2%B023'43.5%22E/@30.1460876,31.3928359,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1460876!4d31.3954108?q=30.1460876,31.3954108&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "الزيتون - ترعة الجبل", url: "https://www.google.com/maps/place/30%C2%B006'27.0%22N+31%C2%B018'27.9%22E/@30.1075102,31.3051605,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1075102!4d31.3077354?q=30.1075102,31.3077354&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "المطريه", url: "https://www.google.com/maps/place/30%C2%B006'40.6%22N+31%C2%B018'16.2%22E/@30.1112632,31.3019279,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.1112632!4d31.3045028?q=30.1112632,31.3045028&z=17&hl=en&entry=tts&shorturl=1" },
  { name: "شبرا الخيمة", url: "https://www.google.com/maps/place/El-Shabrawy,+Bahtim,+Shubra+El+Kheima+2,+Al+Qalyubia+Governorate+6222252/data=!4m6!3m5!1s0x1458153c705fda0f:0x8a14f3e8eac746ed!7e2!8m2!3d30.1326266!4d31.2803361?utm_source=mstt_1&entry=gps&lucs=47068615&g_ep=CAESCTExLjk0LjMwMxgAIIgnKgg0NzA2ODYxNUICRUc%3D" },
];

const Branches = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t('common:branches')} - ${t('common:site_name')}`}</title>
        <meta name="description" content={t('common:branches')} />
        <meta property="og:title" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <PageHeader title={t('common:branches')} subTitle={t('common:branches')} />
      <section className="py-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch, i) => (
              <a
                key={i}
                href={branch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1D3E73] hover:shadow-md transition-all duration-200 bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1D3E73"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
                <span className="text-[#1D3E73] font-medium text-base">{branch.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Branches;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["menu", "common", "header", "cart", "payment"])),
    },
  };
}
