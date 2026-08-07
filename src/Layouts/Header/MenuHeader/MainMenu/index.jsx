import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";

const CATEGORY_ICONS = [
  {
    keywords: ["مجمدة", "frozen"],
    bg: "bg-cyan-50", color: "text-cyan-600",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>
  },
  {
    keywords: ["طازجة", "طازج", "fresh"],
    bg: "bg-emerald-50", color: "text-emerald-600",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7c-2 0-4 2-4 5s2 6 4 7c2-1 4-4 4-7s-2-5-4-5z"/><path d="M12 7V3"/><path d="M10 5h4"/></svg>
  },
  {
    keywords: ["منظفات", "ورقيات", "clean", "paper"],
    bg: "bg-teal-50", color: "text-teal-600",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v1h6V5a3 3 0 0 0-3-3z"/><path d="M8 8l-1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2L16 8"/><path d="M9 12l1 6"/><path d="M15 12l-1 6"/></svg>
  },
  {
    keywords: ["صحة", "جمال", "health", "beauty"],
    bg: "bg-pink-50", color: "text-pink-600",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M5 22a7 7 0 0 1 14 0"/><path d="M9 11l3-2 3 2"/></svg>
  },
];

const FALLBACK = { bg: "bg-gray-50", color: "text-gray-400", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> };

const matchIcon = (name) => {
  const n = name?.toLowerCase() || "";
  return CATEGORY_ICONS.find((ci) => ci.keywords.some((kw) => n.includes(kw))) || FALLBACK;
};

const MainMenu = () => {
  const { t } = useTranslation("menu");
  const dispatch = useDispatch();
  const router = useRouter();

  const { AllCatsData } = useSelector((state) => state.categoriesData);

  useEffect(() => {
    dispatch(AllCategoriesDataHandler());
  }, [dispatch]);

  const categoriesLoaded = AllCatsData && AllCatsData.length > 0;

  const linkClass = (isActive) =>
    `flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-brand-navy bg-brand-navy/5"
        : "text-gray-600 hover:text-brand-navy hover:bg-brand-navy/5"
    }`;

  return (
    <ul className="main-menu flex items-center gap-0.5">
      <li>
        <Link href="/hot-offers" className={linkClass(router.pathname === "/hot-offers")}>
          <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </span>
          {t("hot_offers")}
        </Link>
      </li>

      <li>
        <Link href="/elfergany-magazine" className={linkClass(router.pathname === "/elfergany-magazine")}>
          <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              <line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </span>
          {t("el_fergany_magazine")}
        </Link>
      </li>

      {categoriesLoaded
        ? AllCatsData.slice(1, 5).map((cat) => {
            const icon = matchIcon(cat.name);
            return (
              <li key={cat.id}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className={linkClass(router.asPath === `/categories/${cat.slug}`)}
                >
                  <span className={`w-6 h-6 flex items-center justify-center rounded-lg ${icon.bg} ${icon.color}`}>
                    {icon.svg}
                  </span>
                  {cat.name}
                </Link>
              </li>
            );
          })
        : [...Array(4)].map((_, i) => (
            <li key={i} className="h-9 w-28 rounded-lg bg-gray-200 animate-pulse" />
          ))}
    </ul>
  );
};

export default MainMenu;
