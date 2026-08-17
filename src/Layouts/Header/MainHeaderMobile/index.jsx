import Image from "next/image";
import Link from "next/link";
import Logo from '../../../../public/images/general/logo.png';
import AuthHeader from "../MainHeader/AuthHeader";
import SearchHeader from "../MainHeader/SearchHeader";
import MenuIcon from '../../../../public/images/icons/menus.png';
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
import { useTranslation } from 'next-i18next';

const MainHeaderMobile = () => {
    const { t, i18n } = useTranslation('menu');
    const dispatch = useDispatch();
    const { AllCatsData = [] } = useSelector(state => state.categoriesData || {});
    const [showMenu, setShowMenu] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        dispatch(AllCategoriesDataHandler());
    }, [dispatch]);

    const filteredCats = useMemo(() => {
        if (!searchTerm) return AllCatsData;
        const term = searchTerm.toLowerCase();
        return AllCatsData.filter(cat =>
            cat.name.toLowerCase().includes(term) ||
            cat.sub_category?.some(sub => sub.name.toLowerCase().includes(term))
        );
    }, [AllCatsData, searchTerm]);

    const toggleCategory = (catId) => {
        setOpenCategory(openCategory === catId ? null : catId);
    };

    const closeMenu = () => {
        setShowMenu(false);
        setOpenCategory(null);
        setSearchTerm('');
    };

    return (
        <div className="main-header-mobile">
            <div className="container">
                <div className="row align-items-center">
                    {isRTL ? (
                        <>
                            <div className="col-4 d-flex justify-content-start">
                                <div className="mobile-buger-menu" onClick={() => setShowMenu(true)}>
                                    <span className="mobile-cats-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                                        {t('all_categories')}
                                    </span>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                <Link href="/">
                                    <Image src={Logo} alt="Elfergany" width={55} height={55} priority style={{ width: 'auto', height: 'auto' }} />
                                </Link>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <AuthHeader />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-4 d-flex">
                                <AuthHeader />
                            </div>
                            <div className="text-center col-4 d-flex justify-content-center">
                                <Link href="/">
                                    <Image src={Logo} alt="Elfergany" width={55} height={55} priority style={{ width: 'auto', height: 'auto' }} />
                                </Link>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <div className="mobile-buger-menu" onClick={() => setShowMenu(true)}>
                                    <span className="mobile-cats-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                                        {t('all_categories')}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <SearchHeader />
            </div>

            <div className={`mobile-sheet-overlay ${showMenu ? 'open' : ''}`} onClick={closeMenu} />

            <div className={`mobile-sheet-panel ${showMenu ? 'open' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="mobile-sheet-header">
                    <div className="mobile-sheet-handle" />
                    <div className="mobile-sheet-title-row">
                        <h3>{t('all_categories')}</h3>
                        <button className="mobile-sheet-close" onClick={closeMenu}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>

                <div className="mobile-sheet-search">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input
                        type="text"
                        placeholder={isRTL ? 'بحث عن قسم...' : 'Search categories...'}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm('')}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    )}
                </div>

                <div className="mobile-sheet-quick-links">
                    <Link href="/elfergany-magazine" className="mobile-sheet-quick-link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        <span>{isRTL ? 'مجلة الفرجاني' : 'El Fergany Magazine'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="quick-link-arrow">{isRTL ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}</svg>
                    </Link>
                    <Link href="/hot-offers" className="mobile-sheet-quick-link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        <span>{isRTL ? 'أقوي العروض' : 'Hot Offers'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="quick-link-arrow">{isRTL ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}</svg>
                    </Link>
                </div>

                <div className="mobile-sheet-body">
                    {filteredCats.length === 0 ? (
                        <div className="sheet-no-results">{isRTL ? 'لا توجد نتائج' : 'No categories found'}</div>
                    ) : (
                        <ul className="mobile-sheet-cats">
                            {filteredCats.map(cat => (
                                <li key={cat.id}>
                                    <div className="sheet-cat-card">
                                        <div
                                            className={`sheet-cat-header ${openCategory === cat.id ? 'active' : ''}`}
                                            onClick={() => toggleCategory(cat.id)}
                                        >
                                            <Link href={`/categories/${cat.slug}`} onClick={closeMenu} className="sheet-cat-link">
                                                {cat.icon && <Image src={cat.icon} alt={cat.name} width={24} height={24} />}
                                                <span className="sheet-cat-name">{cat.name}</span>
                                            </Link>
                                            {cat.sub_category?.length > 0 && (
                                                <span className={`sheet-cat-toggle ${openCategory === cat.id ? 'open' : ''}`}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                                </span>
                                            )}
                                        </div>

                                        {cat.sub_category?.length > 0 && (
                                            <div className={`sheet-subcat-wrap ${openCategory === cat.id ? 'open' : ''}`}>
                                                <ul className="sheet-subcat-list">
                                                    {cat.sub_category.map(sub => (
                                                        <li key={sub.id}>
                                                            <Link href={`/categories/${sub.slug}`} onClick={closeMenu}>
                                                                {sub.icon && <Image src={sub.icon} alt={sub.name} width={20} height={20} />}
                                                                <span>{sub.name}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainHeaderMobile;


// import Link from "next/link";
// import Logo from "../../../../public/images/general/logo.png";
// import AuthHeader from "../MainHeader/AuthHeader";
// import SearchHeader from "../MainHeader/SearchHeader";
// import { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
// import { useTranslation } from "next-i18next";

// const MainHeaderMobile = () => {
//   const { t, i18n } = useTranslation("menu");
//   const dispatch = useDispatch();
//   const { AllCatsData = [] } = useSelector((state) => state.categoriesData || {});
//   const [showMenu, setShowMenu] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const isRTL = i18n?.language === "ar";

//   useEffect(() => {
//     dispatch(AllCategoriesDataHandler());
//   }, [dispatch]);

//   // Lock body scroll when the mobile category sheet is open
//   useEffect(() => {
//     if (showMenu) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [showMenu]);

//   const filteredCats = useMemo(() => {
//     if (!searchTerm) return AllCatsData;
//     const term = searchTerm.toLowerCase();
//     return AllCatsData.filter(
//       (cat) =>
//         cat.name?.toLowerCase().includes(term) ||
//         cat.sub_category?.some((sub) => sub.name?.toLowerCase().includes(term))
//     );
//   }, [AllCatsData, searchTerm]);

//   const closeMenu = () => {
//     setShowMenu(false);
//     setSearchTerm("");
//   };

//   return (
//     <div className="w-full font-sans bg-white border-b border-slate-100 lg:hidden">
//       {/* Top Header Row */}
//       <div className="container px-4 py-2 mx-auto">
//         <div className="flex items-center justify-between gap-2">
//           {isRTL ? (
//             <>
//               {/* RTL Layout: Burger Menu (Right) | Logo (Center) | Auth (Left) */}
//               <div className="flex justify-start flex-1">
//                 <button
//                   type="button"
//                   onClick={() => setShowMenu(true)}
//                   className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
//                     <line x1="3" y1="6" x2="21" y2="6" />
//                     <line x1="3" y1="12" x2="21" y2="12" />
//                     <line x1="3" y1="18" x2="21" y2="18" />
//                   </svg>
//                   <span>{t("all_categories") || "الأقسام"}</span>
//                 </button>
//               </div>

//               <div className="flex justify-center flex-shrink-0">
//                 <Link href="/">
//                   <Image src={Logo} alt="Elfergany" width={50} height={50} priority className="object-contain w-auto h-10" />
//                 </Link>
//               </div>

//               <div className="flex justify-end flex-1">
//                 <AuthHeader />
//               </div>
//             </>
//           ) : (
//             <>
//               {/* LTR Layout: Auth (Left) | Logo (Center) | Burger Menu (Right) */}
//               <div className="flex justify-start flex-1">
//                 <AuthHeader />
//               </div>

//               <div className="flex justify-center flex-shrink-0">
//                 <Link href="/">
//                   <Image src={Logo} alt="Elfergany" width={50} height={50} priority className="object-contain w-auto h-10" />
//                 </Link>
//               </div>

//               <div className="flex justify-end flex-1">
//                 <button
//                   type="button"
//                   onClick={() => setShowMenu(true)}
//                   className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
//                     <line x1="3" y1="6" x2="21" y2="6" />
//                     <line x1="3" y1="12" x2="21" y2="12" />
//                     <line x1="3" y1="18" x2="21" y2="18" />
//                   </svg>
//                   <span>{t("all_categories") || "Categories"}</span>
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Embedded Search Header */}
//         <div className="mt-2">
//           <SearchHeader />
//         </div>
//       </div>

//       {/* --- HYPERONE-STYLE CATEGORY SHEET MODAL --- */}
//       {showMenu && (
//         <div className="fixed inset-0 z-50 flex flex-col justify-end" dir={isRTL ? "rtl" : "ltr"}>
//           {/* Backdrop Overlay */}
//           <div
//             className="fixed inset-0 transition-opacity duration-300 bg-black/60 backdrop-blur-sm"
//             onClick={closeMenu}
//           />

//           {/* Bottom Sheet Container */}
//           <div className="relative z-10 w-full bg-white rounded-t-[32px] max-h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            
//             {/* Handle & Header */}
//             <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-white border-b border-slate-100">
//               <div className="w-12 h-1.5 mx-auto mb-3 bg-slate-200 rounded-full" />
//               <div className="flex items-center justify-between">
//                 <h3 className="text-base font-black text-slate-800">
//                   {isRTL ? "تسوق حسب القسم" : "Shop by Category"}
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={closeMenu}
//                   className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 active:scale-90 transition-transform"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <line x1="18" y1="6" x2="6" y2="18" />
//                     <line x1="6" y1="6" x2="18" y2="18" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Search Bar inside Sheet */}
//               <div className="relative flex items-center mt-3">
//                 <svg
//                   className={`absolute ${isRTL ? "right-3" : "left-3"} text-slate-400`}
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="11" cy="11" r="8" />
//                   <line x1="21" y1="21" x2="16.65" y2="16.65" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder={isRTL ? "بحث عن قسم..." : "Search categories..."}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className={`w-full py-2.5 text-xs font-semibold bg-slate-100 rounded-xl outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1D3E73]/20 ${
//                     isRTL ? "pr-9 pl-8" : "pl-9 pr-8"
//                   }`}
//                 />
//                 {searchTerm && (
//                   <button
//                     type="button"
//                     onClick={() => setSearchTerm("")}
//                     className={`absolute ${isRTL ? "left-3" : "right-3"} text-slate-400 hover:text-slate-600`}
//                   >
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                       <line x1="18" y1="6" x2="6" y2="18" />
//                       <line x1="6" y1="6" x2="18" y2="18" />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Quick Links (Magazine & Hot Offers) */}
//             <div className="grid grid-cols-2 gap-2 px-4 py-3 border-b bg-slate-50 border-slate-100">
//               <Link
//                 href="/elfergany-magazine"
//                 onClick={closeMenu}
//                 className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-sm active:scale-95 transition-transform"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="p-1.5 text-blue-600 rounded-lg bg-blue-50">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//                       <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] font-bold text-slate-700 truncate">
//                     {isRTL ? "مجلة الفرجاني" : "Magazine"}
//                   </span>
//                 </div>
//               </Link>

//               <Link
//                 href="/hot-offers"
//                 onClick={closeMenu}
//                 className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-sm active:scale-95 transition-transform"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="p-1.5 text-amber-500 rounded-lg bg-amber-50">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] font-bold text-slate-700 truncate">
//                     {isRTL ? "أقوي العروض" : "Hot Offers"}
//                   </span>
//                 </div>
//               </Link>
//             </div>

//             {/* HyperOne-Style 4-Column Category Cards Grid */}
//             <div className="flex-1 p-4 overflow-y-auto scrollbar-none">
//               {filteredCats.length === 0 ? (
//                 <div className="py-12 text-xs font-semibold text-center text-slate-400">
//                   {isRTL ? "لا توجد نتائج" : "No categories found"}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-4 gap-3 text-center">
//                   {filteredCats.map((cat) => (
//                     <Link
//                       key={cat.id}
//                       href={`/categories/${cat.slug}`}
//                       onClick={closeMenu}
//                       className="flex flex-col items-center gap-1.5 group"
//                     >
//                       {/* Icon Card Container */}
//                       <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2.5 shadow-sm group-active:scale-95 group-hover:bg-[#1D3E73]/5 transition-all">
//                         {cat.icon ? (
//                           <Image
//                             src={cat.icon}
//                             alt={cat.name}
//                             width={44}
//                             height={44}
//                             className="object-contain w-full h-full transition-transform group-hover:scale-110"
//                           />
//                         ) : (
//                           <span className="text-base font-black text-[#1D3E73]">
//                             {cat.name?.charAt(0)}
//                           </span>
//                         )}
//                       </div>

//                       {/* Category Label */}
//                       <span className="text-[11px] font-bold text-slate-700 leading-tight line-clamp-2 group-hover:text-[#1D3E73] transition-colors">
//                         {cat.name}
//                       </span>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainHeaderMobile;