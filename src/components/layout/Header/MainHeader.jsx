// import Image from "next/image";
// import Link from "next/link";
// import { useTranslation } from "next-i18next";
// import Logo from "../../../../public/images/general/logo.png";
// import SearchBar from "./SearchBar";
// import HeaderIcons from "./HeaderIcons";

// const MainHeader = () => {
//   const { i18n } = useTranslation();
//   const isAr = i18n?.language === "ar";

//   return (
//     <div className="hidden w-full bg-white border-b border-gray-100 md:block">
//       <div className="container px-4 mx-auto">
//         <div className="flex items-center justify-between h-[100px]">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-4 min-w-[280px]">
//             <div className="flex items-center justify-center w-24 h-24 transition duration-300 bg-white border border-black shadow-md rounded-3xl border-1 hover:scale-105 shrink-0">
//               <Image
//                 src={Logo}
//                 alt="ElFergany"
//                 width={88}
//                 height={88}
//                 priority
//                 className="object-contain"
//               />
//             </div>

//             <div>
//               <h2 className="text-[34px] font-extrabold leading-none text-[#21407A] whitespace-nowrap">
//                 {isAr ? "الفرجاني" : "ElFergany"}
//               </h2>
//             </div>
//           </Link>

//           {/* Search */}
//           <div className="flex justify-center flex-1 px-10">
//             <div className="w-full max-w-[560px]">
//               <SearchBar />
//             </div>
//           </div>

//           {/* Icons */}
//           <div className="flex justify-end min-w-[260px] shrink-0">
//             <div className="flex items-center justify-center px-5 py-3 bg-white border border-gray-100 shadow-sm rounded-2xl">
//               <HeaderIcons />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainHeader;

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "../../../../public/images/general/logo.png";
import SearchBar from "./SearchBar";
import HeaderIcons from "./HeaderIcons";

const MAIN_COLOR = "#1D3E73";

const MainHeader = () => {
  const { i18n } = useTranslation();
  const isAr = i18n?.language === "ar";

  return (
    <div className="relative z-30 hidden w-full bg-white border-b border-slate-100 md:block">
      <div className="container px-6 mx-auto max-w-[1920px]">
        <div className="flex items-center justify-between h-[110px] gap-8">
          
          {/* 1. Large Brand Logo (No Background Box) */}
          <Link 
            href="/" 
            className="flex items-center gap-4 py-2 shrink-0 group"
          >
            {/* Raw Image without border/background */}
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src={Logo}
                alt="ElFergany"
                width={95}
                height={95}
                priority
                className="object-contain drop-shadow-sm"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <h1 
                className="text-3xl lg:text-[38px] font-black tracking-tight leading-none"
                style={{ color: MAIN_COLOR }}
              >
                {isAr ? "الفرجاني" : "ElFergany"}
              </h1>
              <span className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mt-1">
                {isAr ? "سوبر ماركت" : "SUPERMARKET"}
              </span>
            </div>
          </Link>

          {/* 2. Modern Center Command Search Bar */}
          <div className="flex-1 max-w-[680px] px-4">
            <div className="relative w-full">
              <SearchBar />
            </div>
          </div>

          {/* 3. Sleek Action Icons Bar */}
          <div className="flex items-center justify-end shrink-0">
            <div 
              className="flex items-center gap-3 px-6 py-3 transition-all duration-200 bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md"
            >
              <HeaderIcons />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainHeader;