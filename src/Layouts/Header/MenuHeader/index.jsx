// import CategoriesDropdown from "./CategoriesDropdown";
// import MainMenu from "./MainMenu";
// import SupportIcon from "../../../../public/images/icons/icon-headphone.svg";
// import { useTranslation } from "next-i18next";
// import Image from "next/image";
// import Link from "next/link";

// const MenuHeader = () => {
//   const { i18n } = useTranslation();
//   const isRtl = i18n?.language === "ar";

//   return (
//     <div
//       className="relative z-30 hidden w-full py-2 font-sans bg-white border-b lg:block border-slate-100"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       {/* Container */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
//         <div className="flex items-center justify-between gap-3 xl:gap-6">
          
//           {/* 1. Categories Trigger */}
//           <div className="shrink-0">
//             <CategoriesDropdown />
//           </div>

//           {/* 2. Main Navigation Menu (Added overflow prevention) */}
//           <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar py-0.5">
//             <MainMenu />
//           </div>

//           {/* 3. Support Call Center Block */}
//           <div className="flex items-center gap-2 pl-3 border-l rtl:pl-0 rtl:pr-3 rtl:border-l-0 rtl:border-r border-slate-200 shrink-0 whitespace-nowrap">
//             <Link
//               href="tel:19631"
//               aria-label="Call Support"
//               className="flex items-center justify-center w-8 h-8 transition-colors border rounded-full bg-slate-50 shrink-0 border-slate-100 hover:bg-slate-100"
//             >
//               <Image
//                 src={SupportIcon}
//                 alt="Support"
//                 width={18}
//                 height={18}
//                 className="object-contain"
//               />
//             </Link>

//             <div className="flex flex-col">
//               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5 whitespace-nowrap">
//                 {isRtl ? "خدمة العملاء" : "SUPPORT"}
//               </span>
//               <Link
//                 href="tel:19631"
//                 className="text-xs sm:text-sm font-black text-[#1D3E73] hover:opacity-80 transition-opacity leading-none whitespace-nowrap"
//               >
//                 19631
//               </Link>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuHeader;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import CategoriesDropdown from "./CategoriesDropdown";
import MainMenu from "./MainMenu";
import SupportIcon from "../../../../public/images/icons/icon-headphone.svg";

const MenuHeader = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n?.language === "ar";

  return (
    <div
      className="relative z-20 hidden w-full py-2 font-sans bg-white border-b lg:block border-slate-100"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-10 gap-3 xl:gap-6">
          
          {/* 1. Categories Trigger */}
          <div className="flex items-center shrink-0">
            <CategoriesDropdown />
          </div>

          {/* 2. Main Navigation Menu Wrapper */}
          <div className="flex items-center flex-1 min-w-0 overflow-x-auto no-scrollbar">
            <MainMenu />
          </div>

          {/* 3. Support Call Center Block */}
          <div className="flex items-center gap-2 pl-3 border-l rtl:pl-0 rtl:pr-3 rtl:border-l-0 rtl:border-r border-slate-200 shrink-0 whitespace-nowrap">
            <Link
              href="tel:19631"
              aria-label="Call Support"
              className="flex items-center justify-center w-8 h-8 transition-colors border rounded-full bg-slate-50 shrink-0 border-slate-100 hover:bg-slate-100"
            >
              <Image
                src={SupportIcon}
                alt="Support"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>

            <div className="flex flex-col justify-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5 whitespace-nowrap">
                {isRtl ? "خدمة العملاء" : "SUPPORT"}
              </span>
              <Link
                href="tel:19631"
                className="text-xs sm:text-sm font-black text-[#1D3E73] hover:opacity-80 transition-opacity leading-none whitespace-nowrap"
              >
                19631
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuHeader;