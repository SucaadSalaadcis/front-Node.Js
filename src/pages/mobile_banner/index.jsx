// import React from "react";
// import Image from "next/image";
// import { useTranslation } from "next-i18next";
// import { QRCodeSVG } from "qrcode.react";
// import {
//   ShoppingCart,
//   Zap,
//   ShieldCheck,
//   Truck,
//   CreditCard,
// } from "lucide-react";

// const MobileAppBanner = () => {
//   const { t, i18n } = useTranslation("common");

//   const isRtl = i18n.language === "ar";

//   const appUrl =
//     "https://play.google.com/store/apps/details?id=com.trading.go.ElFergany";

//   return (
//     <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
//       <div
//         dir={isRtl ? "rtl" : "ltr"}
//         className="
//           relative mx-auto
//           w-full max-w-[1200px]
//           rounded-[24px]
//           bg-[#f3f6fb]
//           px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-8
//           grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4
//         "
//       >
//         {/* ================= COLUMN 1: LEFT CONTENT ================= */}
//         <div className="flex flex-col items-center order-1 space-y-3 text-center lg:col-span-4 lg:items-start lg:text-start">
//           {/* Cart Icon */}
//           <div
//             className="
//               flex
//               h-[46px]
//               w-[46px]
//               items-center
//               justify-center
//               rounded-[12px]
//               bg-white
//               shadow-sm
//             "
//           >
//             <ShoppingCart
//               size={22}
//               strokeWidth={2}
//               className="text-[#1261c9]"
//             />
//           </div>

//           {/* Main Heading */}
//           <h2
//             className="
//               text-[24px]
//               sm:text-[28px]
//               lg:text-[32px]
//               xl:text-[36px]
//               font-extrabold
//               leading-[1.2]
//               text-gray-950
//             "
//           >
//             {t("mobile_app_title_1")}
//             <br />
//             {t("mobile_app_title_2")}
//           </h2>

//           {/* Red Curved Accent */}
//           <div
//             className={`
//               mt-[-2px]
//               h-[10px]
//               w-[55px]
//               ${isRtl ? "mr-[60px]" : "ml-[60px]"}
//             `}
//           >
//             <svg
//               viewBox="0 0 60 15"
//               className="w-full h-full"
//               fill="none"
//             >
//               <path
//                 d="M3 3C15 14 39 16 56 4"
//                 stroke="#e33434"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </div>

//           {/* Description */}
//           <p
//             className="
//               max-w-[340px]
//               text-[12px]
//               sm:text-[13px]
//               lg:text-[14px]
//               leading-6
//               text-gray-500
//             "
//           >
//             {t("mobile_app_description_1")}
//             <br />
//             {t("mobile_app_description_2")}
//           </p>
//         </div>

//         {/* ================= COLUMN 2: CENTER PHONE IMAGE ================= */}
//         <div className="flex items-center justify-center order-2 lg:col-span-4">
//           <div
//             className="
//               relative
//               h-[360px]
//               sm:h-[430px]
//               lg:h-[490px]
//               w-[190px]
//               sm:w-[230px]
//               lg:w-[260px]
//               -my-4 sm:-my-6 lg:-my-8
//               shrink-0
//               z-10
//             "
//           >
//             <Image
//               src="/images/mobile-app.png"
//               alt="El Fergany Mobile App"
//               fill
//               priority
//               className="object-contain drop-shadow-xl"
//               sizes="(max-width: 768px) 230px, 260px"
//             />
//           </div>
//         </div>

//         {/* ================= COLUMN 3: RIGHT FEATURES & QR ================= */}
//         <div className="flex flex-col items-center order-3 space-y-4 text-center lg:col-span-4 lg:items-start lg:text-start">
//           {/* Intro */}
//           <p
//             className="
//               text-[11px]
//               sm:text-[12px]
//               lg:text-[13px]
//               font-medium
//               leading-5
//               text-gray-500
//             "
//           >
//             {t("mobile_app_intro")}
//           </p>

//           {/* Feature List */}
//           <div className="space-y-2.5 sm:space-y-3 w-full">
//             {/* Feature 1 */}
//             <div className="flex items-center justify-center gap-3 lg:justify-start">
//               <span
//                 className="
//                   flex
//                   h-[26px]
//                   w-[26px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-gray-400
//                   text-gray-700
//                 "
//               >
//                 <Zap size={13} />
//               </span>

//               <span
//                 className="
//                   text-[12px]
//                   sm:text-[13px]
//                   lg:text-[14px]
//                   font-semibold
//                   text-gray-800
//                 "
//               >
//                 {t("mobile_app_fast_easy")}
//               </span>
//             </div>

//             {/* Feature 2 */}
//             <div className="flex items-center justify-center gap-3 lg:justify-start">
//               <span
//                 className="
//                   flex
//                   h-[26px]
//                   w-[26px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-gray-400
//                   text-gray-700
//                 "
//               >
//                 <ShieldCheck size={13} />
//               </span>

//               <span
//                 className="
//                   text-[12px]
//                   sm:text-[13px]
//                   lg:text-[14px]
//                   font-semibold
//                   text-gray-800
//                 "
//               >
//                 {t("mobile_app_exclusive_offers")}
//               </span>
//             </div>

//             {/* Feature 3 */}
//             <div className="flex items-center justify-center gap-3 lg:justify-start">
//               <span
//                 className="
//                   flex
//                   h-[26px]
//                   w-[26px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-gray-400
//                   text-gray-700
//                 "
//               >
//                 <Truck size={13} />
//               </span>

//               <span
//                 className="
//                   text-[12px]
//                   sm:text-[13px]
//                   lg:text-[14px]
//                   font-semibold
//                   text-gray-800
//                 "
//               >
//                 {t("mobile_app_order_tracking")}
//               </span>
//             </div>

//             {/* Feature 4 */}
//             <div className="flex items-center justify-center gap-3 lg:justify-start">
//               <span
//                 className="
//                   flex
//                   h-[26px]
//                   w-[26px]
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-gray-400
//                   text-gray-700
//                 "
//               >
//                 <CreditCard size={13} />
//               </span>

//               <span
//                 className="
//                   text-[12px]
//                   sm:text-[13px]
//                   lg:text-[14px]
//                   font-semibold
//                   text-gray-800
//                 "
//               >
//                 {t("mobile_app_secure_payment")}
//               </span>
//             </div>
//           </div>

//           {/* QR Code */}
//           <div
//             className={`
//               pt-1
//               flex
//               items-center
//               justify-center
//               lg:justify-start
//               gap-3
//               ${
//                 isRtl
//                   ? "flex-row"
//                   : "flex-row-reverse justify-end"
//               }
//             `}
//           >
//             {/* QR Container */}
//             <div
//               className="
//                 flex
//                 h-[78px]
//                 w-[78px]
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-lg
//                 bg-white
//                 p-2
//                 shadow-sm
//               "
//             >
//               <QRCodeSVG
//                 value={appUrl}
//                 size={62}
//                 level="M"
//                 includeMargin={true}
//                 bgColor="#ffffff"
//                 fgColor="#000000"
//                 className="w-full h-full"
//               />
//             </div>

//             {/* QR Text */}
//             <p
//               className="
//                 text-[10px]
//                 sm:text-[11px]
//                 leading-4
//                 text-gray-500
//                 text-start
//               "
//             >
//               {t("mobile_app_qr_scan")}
//               <br />
//               {t("mobile_app_qr_available")}
//               <br />
//               {t("app_stores")}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MobileAppBanner;

import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { QRCodeSVG } from "qrcode.react";
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

const MobileAppBanner = () => {
  const { t, i18n } = useTranslation("common");

  const isRtl = i18n.language === "ar";

  const appUrl =
    "https://play.google.com/store/apps/details?id=com.trading.go.ElFergany";

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="
          relative mx-auto
          w-full max-w-[1200px]
          rounded-[24px]
          bg-[#f3f6fb]
          px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-8
          grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4
        "
      >
        {/* ================= COLUMN 1: LEFT CONTENT (STRICTLY CENTERED) ================= */}
        <div className="flex flex-col items-center order-1 space-y-3 text-center lg:col-span-4">
          {/* Cart Icon */}
          <div
            className="
              flex
              h-[46px]
              w-[46px]
              items-center
              justify-center
              rounded-[12px]
              bg-white
              shadow-sm
            "
          >
            <ShoppingCart
              size={22}
              strokeWidth={2}
              className="text-[#1261c9]"
            />
          </div>

          {/* Main Heading */}
          <h2
            className="
              text-[24px]
              font-extrabold
              leading-[1.2]
              text-gray-950
              sm:text-[28px]
              lg:text-[32px]
              xl:text-[36px]
            "
          >
            {t("mobile_app_title_1")}
            <br />
            {t("mobile_app_title_2")}
          </h2>

          {/* Description */}
          <p
            className="
              max-w-[340px]
              text-[12px]
              leading-6
              text-gray-500
              sm:text-[13px]
              lg:text-[14px]
            "
          >
            {t("mobile_app_description_1")}
            <br />
            {t("mobile_app_description_2")}
          </p>
        </div>

        {/* ================= COLUMN 2: CENTER PHONE IMAGE ================= */}
        <div className="flex items-center justify-center order-2 lg:col-span-4">
          <div
            className="
              relative
              h-[360px]
              w-[190px]
              shrink-0
              z-10
              -my-4
              sm:h-[430px] sm:w-[230px] sm:-my-6
              lg:h-[490px] lg:w-[260px] lg:-my-8
            "
          >
            <Image
              src="/images/mobile-app.png"
              alt="El Fergany Mobile App"
              fill
              priority
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 230px, 260px"
            />
          </div>
        </div>

        {/* ================= COLUMN 3: RIGHT FEATURES & QR ================= */}
        <div className="flex flex-col items-center order-3 space-y-4 text-center lg:col-span-4 lg:items-start lg:text-start">
          {/* Intro */}
          <p
            className="
              text-[11px]
              font-medium
              leading-5
              text-gray-500
              sm:text-[12px]
              lg:text-[13px]
            "
          >
            {t("mobile_app_intro")}
          </p>

          {/* Feature List */}
          <div className="w-full space-y-2.5 sm:space-y-3">
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-400
                  text-gray-700
                "
              >
                <Zap size={13} />
              </span>

              <span
                className="
                  text-[12px]
                  font-semibold
                  text-gray-800
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                {t("mobile_app_fast_easy")}
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-400
                  text-gray-700
                "
              >
                <ShieldCheck size={13} />
              </span>

              <span
                className="
                  text-[12px]
                  font-semibold
                  text-gray-800
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                {t("mobile_app_exclusive_offers")}
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-400
                  text-gray-700
                "
              >
                <Truck size={13} />
              </span>

              <span
                className="
                  text-[12px]
                  font-semibold
                  text-gray-800
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                {t("mobile_app_order_tracking")}
              </span>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-400
                  text-gray-700
                "
              >
                <CreditCard size={13} />
              </span>

              <span
                className="
                  text-[12px]
                  font-semibold
                  text-gray-800
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                {t("mobile_app_secure_payment")}
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div
            className={`
              flex
              items-center
              justify-center
              gap-3
              pt-1
              lg:justify-start
              ${
                isRtl
                  ? "flex-row"
                  : "flex-row-reverse justify-end"
              }
            `}
          >
            {/* QR Container */}
            <div
              className="
                flex
                h-[78px]
                w-[78px]
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
                p-2
                shadow-sm
              "
            >
              <QRCodeSVG
                value={appUrl}
                size={62}
                level="M"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#000000"
                className="w-full h-full"
              />
            </div>

            {/* QR Text */}
            <p
              className="
                text-start
                text-[10px]
                leading-4
                text-gray-500
                sm:text-[11px]
              "
            >
              {t("mobile_app_qr_scan")}
              <br />
              {t("mobile_app_qr_available")}
              <br />
              {t("app_stores")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppBanner;