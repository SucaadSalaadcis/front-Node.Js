//
// import Link from "next/link";
// import Logo from "../../../public/images/general/logo.png";
// import MobileImage from "../../../public/images/general/mobile.png";
// import { useTranslation } from "next-i18next";
// import Image from "next/image";

// const Footer = () => {
//   const { t } = useTranslation();

//   return (
//     <footer className="relative footer">
    
//       <div className="container">
//         <div className="main-footer">
//           <div className="row">
//             <div className="col-md-3" style={{ paddingInlineStart: 0 }}>
//               <div className="flex flex-col items-center identity md:translate-x-5">
//                 <div className="mt-5 brand">
//                   <Link href="/">
//                     <Image
//                       src={Logo}
//                       alt="Elfergany"
//                       width={103}
//                       height={102}
//                       style={{ width: "auto", height: "auto" }}
//                     />
//                   </Link>
//                 </div>
//                 <ul className="social-media">
//                   <li>
//                     <Link
//                       href="https://www.facebook.com/marketelfergany"
//                       target="_blank"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//                       </svg>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="https://www.instagram.com/elferganymarket/"
//                       target="_blank"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <rect
//                           x="2"
//                           y="2"
//                           width="20"
//                           height="20"
//                           rx="5"
//                           ry="5"
//                         />
//                         <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//                         <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
//                       </svg>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#" target="_self">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
//                       </svg>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#" target="_self">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//                         <rect x="2" y="9" width="4" height="12" />
//                         <circle cx="4" cy="4" r="2" />
//                       </svg>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             {/*  */}
//             <div className="col-md-9 md:mt-20">
//               <div className="row">
//                 <div className="col-md-4">
//                   <h5 className="menu-title">{t("menu:company")}</h5>
//                   <ul className="footer-list">
//                     <li>
//                       <Link href="/about-us">{t("menu:about_us")}</Link>
//                     </li>
//                     <li>
//                       <Link href="/contact-us">{t("menu:contact_us")}</Link>
//                     </li>
//                     <li>
//                       <Link href="/branches">فروعنا</Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="col-md-4">
//                   <h5 className="menu-title">{t("menu:help_support")}</h5>
//                   <ul className="footer-list">
//                     <li>
//                       <Link href="/terms-conditions">
//                         {t("menu:terms_conditions")}
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/privacy-policy">
//                         {t("menu:privacy_policy")}
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/return-policy">
//                         {t("menu:return_policy")}
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//                 {/*  */}
//                 <div className="text-center col-md-4 position-relative">
                 

//                   <h5 className="menu-title">
//                     {t("menu:download_mobile_app")}
//                   </h5>

//                   <ul className="flex flex-col items-center gap-1 mt-4 footer-list">
//                     <li>
//                       <Link
//                         href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
//                         target="_blank"
//                         className="inline-block transition-transform transform hover:scale-105"
//                       >
//                         <img
//                           src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                           alt="Get it on Google Play"
//                           width={150}
//                           loading="lazy"
//                         />
//                       </Link>
//                     </li>

//                     <li>
//                       <Link
//                         href="https://apps.apple.com/app/idYOUR_APP_ID"
//                         target="_blank"
//                         className="inline-block transition-transform transform hover:scale-105"
//                       >
//                         <img
//                           src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                           alt="Download on the App Store"
//                           width={150}
//                           loading="lazy"
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/*  */}
//         <div className="copy-right">
//           <div className="row align-items-center">
//             <div className="text-center col-md-12">
//               <p className="footer-text">
//                 © 2026, <span className="focus">{t("common:site_name")}</span>{" "}
//                 {t("common:all_rights_reserved_designed_by")}{" "}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


/////////
import Link from "next/link";
import Logo from "../../../public/images/general/logo.png";
import MobileImage from "../../../public/images/general/mobile.PNG";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative pt-10 pb-6 text-white border-t footer border-white/20">
      <div className="container max-w-6xl px-4 mx-auto">
        
        {/* Main Columns Grid */}
        <div className="grid items-start grid-cols-1 gap-8 mt-10 md:grid-cols-12">
          
          {/* Column 1: Logo & Socials */}
          <div className="flex flex-col items-center text-center md:col-span-3 md:items-start md:text-left">
            <Link href="/" className="inline-block mb-4 transition-transform hover:scale-105">
              <Image
                src={Logo}
                alt="Elfergany"
                width={85}
                height={85}
                className="object-contain w-16 h-auto filter drop-shadow-md"
              />
            </Link>

            <ul className="flex items-center gap-2 mt-1 social-media">
              <li>
                <Link
                  href="https://www.facebook.com/marketelfergany"
                  target="_blank"
                  className="flex items-center justify-center text-white transition-all border rounded-lg w-9 h-9 bg-white/10 hover:bg-white/20 border-white/20 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/elferganymarket/"
                  target="_blank"
                  className="flex items-center justify-center text-white transition-all border rounded-lg w-9 h-9 bg-white/10 hover:bg-white/20 border-white/20 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  target="_self"
                  className="flex items-center justify-center text-white transition-all border rounded-lg w-9 h-9 bg-white/10 hover:bg-white/20 border-white/20 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  target="_self"
                  className="flex items-center justify-center text-white transition-all border rounded-lg w-9 h-9 bg-white/10 hover:bg-white/20 border-white/20 hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company Links */}
          <div className="text-center md:col-span-3 md:text-left">
            <h5 className="font-semibold text-base mb-3 text-white border-b border-white/20 pb-1.5 inline-block md:block">
              {t("menu:company")}
            </h5>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/about-us" className="hover:text-white hover:underline transition-colors block py-0.5">
                  {t("menu:about_us")}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white hover:underline transition-colors block py-0.5">
                  {t("menu:contact_us")}
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-white hover:underline transition-colors block py-0.5">
                  فروعنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="text-center md:col-span-3 md:text-left">
            <h5 className="font-semibold text-base mb-3 text-white border-b border-white/20 pb-1.5 inline-block md:block">
              {t("menu:help_support")}
            </h5>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/terms-conditions" className="hover:text-white hover:underline transition-colors block py-0.5">
                  {t("menu:terms_conditions")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors block py-0.5">
                  {t("menu:privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white hover:underline transition-colors block py-0.5">
                  {t("menu:return_policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: App Download Card (Vertical Display) */}
          <div className="flex flex-col items-center p-4 text-center border md:col-span-3 bg-white/10 rounded-2xl border-white/20 backdrop-blur-sm">
            <div className="relative mb-2 w-36 h-36">
              <Image
                src={MobileImage}
                alt="App Showcase"
                fill
                sizes="64px"
                className="object-contain filter drop-shadow-md"
              />
            </div>

            <h5 className="mb-2 text-xs font-semibold text-white">
              {t("menu:download_mobile_app")}
            </h5>

            <div className="flex flex-col gap-1.5 w-full items-center">
              <Link
                href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
                target="_blank"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Play Store"
                  width={110}
                  className="object-contain h-7"
                />
              </Link>
              <Link
                href="https://apps.apple.com/app/idYOUR_APP_ID"
                target="_blank"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  width={110}
                  className="object-contain h-7"
                />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-4 pb-3 text-lg text-center border-t border-white/15 text-white/80">
          © 2026, <span className="font-bold text-yellow-300">{t("common:site_name")}</span>.{" "}
          {t("common:all_rights_reserved_designed_by")}
        </div>

      </div>
    </footer>
  );
};

export default Footer;