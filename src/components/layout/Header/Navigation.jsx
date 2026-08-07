import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";

const Navigation = () => {
  const { t } = useTranslation("menu");
  const dispatch = useDispatch();
  const router = useRouter();
  const { AllCatsData } = useSelector((state) => state.categoriesData);

  useEffect(() => { dispatch(AllCategoriesDataHandler()); }, [dispatch]);

  const categoriesLoaded = AllCatsData && AllCatsData.length > 0;

  const navLink = (href, label, isActive) => (
    <Link
      href={href}
      className={`relative text-sm font-medium px-1 py-1.5 transition-all duration-200 group ${
        isActive ? 'text-brand-navy' : 'text-gray-700 hover:text-brand-navy'
      }`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 h-[2px] bg-brand-navy rounded-full transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </Link>
  );

  return (
    <nav className="flex items-center gap-4 rtl:gap-4 ltr:gap-4 overflow-x-auto scrollbar-none" aria-label="Main navigation">
      {navLink("/hot-offers", t("hot_offers"), router.pathname === "/hot-offers")}
      {navLink("/elfergany-magazine", t("el_fergany_magazine"), router.pathname === "/elfergany-magazine")}
      {categoriesLoaded
        ? AllCatsData.slice(1, 5).map((cat) =>
            navLink(`/categories/${cat.slug}`, cat.name, router.asPath === `/categories/${cat.slug}`)
          )
        : [...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
          ))}
    </nav>
  );
};

export default Navigation;
