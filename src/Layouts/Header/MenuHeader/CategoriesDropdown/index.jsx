
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";

const MAIN_COLOR = "#1D3E73";

const CategoriesDropdown = () => {
  const router = useRouter();
  const isRtl = router.locale === "ar";

  const { t } = useTranslation("menu");
  const dispatch = useDispatch();
  const { AllCatsData = [] } = useSelector((state) => state.categoriesData || {});

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(AllCategoriesDataHandler());
  }, [dispatch]);

  useEffect(() => {
    if (AllCatsData.length && !activeCategory) {
      setActiveCategory(AllCatsData[0]);
    }
  }, [AllCatsData, activeCategory]);

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
    <div className="relative inline-block text-left rtl:text-right" ref={dropdownRef}>
      {/* Categories Trigger Button */}
      <button
        type="button"
        onClick={() => setShowDropdown((prev) => !prev)}
        aria-expanded={showDropdown}
        style={{
          backgroundColor: showDropdown ? MAIN_COLOR : undefined,
          borderColor: showDropdown ? MAIN_COLOR : undefined,
        }}
        className={`group flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm font-semibold shadow-sm focus:outline-none whitespace-nowrap ${
          showDropdown
            ? "text-white shadow-md"
            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              showDropdown ? "text-white" : "group-hover:scale-110"
            }`}
            style={{ color: !showDropdown ? MAIN_COLOR : undefined }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="whitespace-nowrap">{t("all_categories")}</span>
        </div>

        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            showDropdown ? "rotate-180 text-white" : "text-slate-400 group-hover:text-slate-600"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu Overlay */}
      {showDropdown && (
        <div
          className={`absolute top-full mt-2.5 w-[92vw] sm:w-[540px] md:w-[720px] lg:w-[860px] max-w-[90vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-200 z-50 ${
            isRtl ? "right-0 left-auto" : "left-0 right-auto"
          }`}
        >
          <div className="flex flex-col md:flex-row h-full min-h-[380px] max-h-[75vh]">
            
            {/* Left/Right Column: Categories List */}
            <div className={`w-full p-2 overflow-y-auto border-b md:w-2/5 md:border-b-0 border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 custom-scrollbar ${
              isRtl ? "md:border-l" : "md:border-r"
            }`}>
              <div className="px-3 py-2 text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                {t("categories")}
              </div>
              <ul className="space-y-1">
                {AllCatsData.map((cat) => {
                  const isActive = activeCategory?.id === cat.id;
                  return (
                    <li key={cat.id}>
                      <div
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                          backgroundColor: isActive ? "rgba(29, 62, 115, 0.08)" : undefined,
                          color: isActive ? MAIN_COLOR : undefined,
                        }}
                        className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                          isActive
                            ? "font-semibold shadow-sm"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <Link
                          href={`/categories/${cat.slug}`}
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center flex-1 min-w-0 gap-3"
                        >
                          {cat.icon ? (
                            <div
                              style={{
                                backgroundColor: isActive ? "rgba(29, 62, 115, 0.15)" : undefined,
                              }}
                              className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                                !isActive && "bg-slate-200/50 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                              }`}
                            >
                              <Image
                                src={cat.icon}
                                alt={cat.name}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 shrink-0">
                              {cat.name?.charAt(0)}
                            </div>
                          )}
                          <span className="text-sm truncate whitespace-nowrap">{cat.name}</span>
                        </Link>

                        <svg
                          className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                            isRtl ? "rotate-180" : ""
                          } ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "text-slate-300 dark:text-slate-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                          style={{ color: isActive ? MAIN_COLOR : undefined }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Subcategories Grid */}
            <div className="flex flex-col justify-between w-full p-5 overflow-y-auto bg-white md:w-3/5 dark:bg-slate-900 custom-scrollbar">
              {activeCategory ? (
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {activeCategory.icon && (
                        <Image
                          src={activeCategory.icon}
                          alt={activeCategory.name}
                          width={24}
                          height={24}
                          className="shrink-0"
                        />
                      )}
                      <h3 className="text-base font-bold truncate text-slate-800 dark:text-slate-100">
                        {activeCategory.name}
                      </h3>
                    </div>
                    <Link
                      href={`/categories/${activeCategory.slug}`}
                      onClick={() => setShowDropdown(false)}
                      style={{ color: MAIN_COLOR }}
                      className="flex items-center gap-1 text-xs font-semibold hover:underline shrink-0 whitespace-nowrap"
                    >
                      {t("view_all")}
                      <svg className={`w-3 h-3 ${isRtl ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {activeCategory.sub_category?.length > 0 ? (
                    <div>
                      <span className="block mb-3 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {t("shop_by_subcategory")}
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {activeCategory.sub_category.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/categories/${sub.slug}`}
                            onClick={() => setShowDropdown(false)}
                            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all duration-150"
                          >
                            {sub.icon ? (
                              <Image
                                src={sub.icon}
                                alt={sub.name}
                                width={20}
                                height={20}
                                className="object-contain transition-opacity opacity-75 group-hover:opacity-100 shrink-0"
                              />
                            ) : (
                              <div
                                style={{ backgroundColor: MAIN_COLOR }}
                                className="w-2 h-2 transition-all rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-125 shrink-0"
                              />
                            )}
                            <span className="text-sm font-medium truncate whitespace-nowrap transition-colors text-slate-600 dark:text-slate-300 group-hover:text-[#1D3E73] dark:group-hover:text-slate-100">
                              {sub.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-sm text-center text-slate-400 dark:text-slate-500">
                      {t("no_subcategories")}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-sm text-center text-slate-400 dark:text-slate-500">
                  {t("select_category") || "Hover over a category to view items"}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;