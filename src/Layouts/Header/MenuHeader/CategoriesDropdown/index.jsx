// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useTranslation } from "next-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";

// const CategoriesDropdown = () => {
//   const { t, i18n } = useTranslation("menu");
//   const isRtl = i18n?.language === "ar";
//   const dispatch = useDispatch();
//   const { AllCatsData = [] } = useSelector((state) => state.categoriesData || {});

//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     dispatch(AllCategoriesDataHandler());
//   }, [dispatch]);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") setShowDropdown(false);
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div
//       /* Hidden on smaller screens, displayed as inline-block starting at lg (1024px+) */
//       className="relative z-50 hidden font-sans text-left lg:inline-block whitespace-nowrap"
//       ref={dropdownRef}
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       {/* Trigger Button */}
//       <button
//         type="button"
//         onClick={() => setShowDropdown((prev) => !prev)}
//         className="flex items-center gap-2.5 text-[#1D3E73] hover:opacity-80 transition-opacity focus:outline-none group py-1"
//       >
//         {/* 4-Square Icon */}
//         <svg
//           width="22"
//           height="22"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="transition-transform shrink-0 group-hover:scale-105"
//         >
//           <rect x="3" y="3" width="7" height="7" rx="2.5" />
//           <rect x="14" y="3" width="7" height="7" rx="2.5" />
//           <rect x="14" y="14" width="7" height="7" rx="2.5" />
//           <rect x="3" y="14" width="7" height="7" rx="2.5" />
//         </svg>

//         <span className="text-sm font-extrabold tracking-tight whitespace-nowrap">
//           {t("shop_all_categories") === "shop_all_categories"
//             ? isRtl
//               ? "تسوق كل الأقسام"
//               : "Shop All Categories"
//             : t("shop_all_categories")}
//         </span>

//         {/* Chevron */}
//         <svg
//           className={`w-4 h-4 transition-transform duration-200 ${
//             showDropdown ? "rotate-180" : ""
//           }`}
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2.5"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {/* Dropdown Menu Panel */}
//       {showDropdown && (
//         <div
//           className={`absolute top-full mt-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 transition-all duration-200 ${
//             isRtl ? "right-0 text-right" : "left-0 text-left"
//           }`}
//         >
//           <div className="max-h-[70vh] overflow-y-auto space-y-1 scrollbar-none">
//             {AllCatsData.map((cat) => (
//               <Link
//                 key={cat.id}
//                 href={`/categories/${cat.slug}`}
//                 onClick={() => setShowDropdown(false)}
//                 className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-150"
//               >
//                 <div className="flex items-center min-w-0 gap-3">
//                   <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#1D3E73]/10 transition-colors">
//                     {cat.icon ? (
//                       <Image
//                         src={cat.icon}
//                         alt={cat.name}
//                         width={22}
//                         height={22}
//                         className="object-contain transition-transform group-hover:scale-110"
//                       />
//                     ) : (
//                       <span className="text-xs font-black text-[#1D3E73]">
//                         {cat.name?.charAt(0)}
//                       </span>
//                     )}
//                   </div>

//                   <span className="text-sm font-bold text-slate-700 group-hover:text-[#1D3E73] truncate transition-colors">
//                     {cat.name}
//                   </span>
//                 </div>

//                 <svg
//                   className={`w-4 h-4 text-slate-300 group-hover:text-[#1D3E73] transition-all ${
//                     isRtl
//                       ? "rotate-180 group-hover:-translate-x-1"
//                       : "group-hover:translate-x-1"
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoriesDropdown;


import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";

const CategoriesDropdown = () => {
  const { t, i18n } = useTranslation("menu");
  const isRtl = i18n?.language === "ar";
  const dispatch = useDispatch();
  const { AllCatsData = [] } = useSelector(
    (state) => state.categoriesData || {}
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(AllCategoriesDataHandler());
  }, [dispatch]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      /* Standard relative wrapper so it scrolls gracefully UNDER sticky headers */
      className="relative items-center hidden font-sans text-left lg:inline-flex whitespace-nowrap"
      ref={dropdownRef}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setShowDropdown((prev) => !prev)}
        className="flex items-center gap-2.5 text-[#1D3E73] hover:opacity-80 transition-opacity focus:outline-none group py-1"
      >
        {/* 4-Square Icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform shrink-0 group-hover:scale-105"
        >
          <rect x="3" y="3" width="7" height="7" rx="2.5" />
          <rect x="14" y="3" width="7" height="7" rx="2.5" />
          <rect x="14" y="14" width="7" height="7" rx="2.5" />
          <rect x="3" y="14" width="7" height="7" rx="2.5" />
        </svg>

        <span className="text-sm font-extrabold tracking-tight select-none whitespace-nowrap">
          {t("shop_all_categories") === "shop_all_categories"
            ? isRtl
              ? "تسوق كل الأقسام"
              : "Shop All Categories"
            : t("shop_all_categories")}
        </span>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu Panel (High Z-Index only when open) */}
      {showDropdown && (
        <div
          className={`absolute top-full mt-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 transition-all duration-200 ${
            isRtl ? "right-0 text-right" : "left-0 text-left"
          }`}
        >
          <div className="max-h-[70vh] overflow-y-auto space-y-1 scrollbar-none">
            {AllCatsData.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                onClick={() => setShowDropdown(false)}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-150"
              >
                <div className="flex items-center min-w-0 gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#1D3E73]/10 transition-colors">
                    {cat.icon ? (
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        width={22}
                        height={22}
                        className="object-contain transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-xs font-black text-[#1D3E73]">
                        {cat.name?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-bold text-slate-700 group-hover:text-[#1D3E73] truncate transition-colors">
                    {cat.name}
                  </span>
                </div>

                <svg
                  className={`w-4 h-4 text-slate-300 group-hover:text-[#1D3E73] transition-all ${
                    isRtl
                      ? "rotate-180 group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;