import { useState, useEffect } from "react";
import Link from "next/link";
import { SwitchLanghandler } from "@/helpers/Helpers";
import { useTranslation } from "next-i18next";
import RegionsBox from "@/Layouts/Header/RegionsBox";
import { LocalKeys } from "@/helpers/Config";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [state, setState] = useState({ city: "", region: "", branch: "" });

  useEffect(() => {
    if (
      !localStorage.getItem(LocalKeys.CITY_NAME) &&
      !localStorage.getItem(LocalKeys.REGION_NAME)
    ) {
      setShow(true);
    }
    setState({
      city: localStorage.getItem(LocalKeys.CITY_NAME) || "",
      region: localStorage.getItem(LocalKeys.REGION_NAME) || "",
      branch: localStorage.getItem(LocalKeys.BRANCH_NAME) || "",
    });
  }, []);

  const locationText =
    state.city && state.region
      ? state.branch
        ? `${state.city} - ${state.region} (${state.branch})`
        : `${state.city} - ${state.region}`
      : t("header:city_region");

  return (
    <>
      <div className="hidden text-white border-b md:block bg-brand-navy border-white/10">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-[40px] text-xs font-medium">
            {/* Left Nav */}
            <ul className="flex items-center gap-6 rtl:gap-6 ltr:gap-6">
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors duration-200 text-white/80 hover:text-white"
                >
                  {t("menu:about_us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-colors duration-200 text-white/80 hover:text-white"
                >
                  {t("menu:customer_suppourt")}
                </Link>
              </li>
            </ul>

            {/* Right Nav */}
            <ul className="flex items-center gap-5 rtl:gap-5 ltr:gap-5">
              <li>
                <button
                  onClick={() => setShow(true)}
                  className="flex items-center gap-2 px-3 py-1 transition-all duration-200 rounded-full bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
                  aria-label="Change delivery location"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-primary"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="hidden text-white/70 lg:inline">
                    {t("menu:delivery_from")}
                  </span>
                  <span className="font-semibold text-white max-w-[220px] truncate">
                    {locationText}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/60"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </li>

              <li className="w-px h-3.5 bg-white/20" />

              <li>
                <button
                  onClick={SwitchLanghandler}
                  className="px-2 py-1 transition-colors duration-200 rounded text-white/80 hover:bg-white/10 hover:text-white"
                  aria-label={
                    router.locale === "ar" ? "Switch to English" : "Switch to Arabic"
                  }
                >
                  {router.locale === "ar" ? "English" : "عربي"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {show && (
        <RegionsBox
          onClose={() => setShow(false)}
          hasSaved={!!(state.city && state.region)}
        />
      )}
    </>
  );
};

export default TopBar;