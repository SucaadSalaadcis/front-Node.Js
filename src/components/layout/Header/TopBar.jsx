import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { SwitchLanghandler } from "@/helpers/Helpers";
import { LocalKeys } from "@/helpers/Config";
import RegionsBox from "@/Layouts/Header/RegionsBox";
import DeliveryIcon from "../../../../public/images/icons/fast-delivery.png";

const TopBar = () => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation(["common", "menu", "header"]);

  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    city: "",
    region: "",
  });

  // Helper function to read from localStorage safely
  const loadLocationFromStorage = () => {
    if (typeof window !== "undefined") {
      const city = localStorage.getItem(LocalKeys.CITY_NAME) || "";
      const region = localStorage.getItem(LocalKeys.REGION_NAME) || "";

      setState({ city, region });

      // Automatically pop modal if location is not selected
      if (!city && !region) {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    loadLocationFromStorage();
  }, [locale]);

  // Handle modal close & re-sync stored region immediately
  const handleCloseModal = () => {
    setShow(false);
    loadLocationFromStorage();
  };

  return (
    <>
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="hidden text-white border-b md:block bg-brand-navy border-white/10"
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-[40px] text-xs font-medium">
            {/* Left Nav */}
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors duration-200 text-white/80 hover:text-white"
                >
                  {t("menu:about_us", locale === "ar" ? "من نحن" : "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-colors duration-200 text-white/80 hover:text-white"
                >
                  {t(
                    "menu:customer_suppourt",
                    locale === "ar" ? "الدعم الفني" : "Customer Support",
                  )}
                </Link>
              </li>
            </ul>

            {/* Right Nav */}
            <ul className="flex items-center gap-5">
              {/* Location Picker Button */}
              <li>
                <button
                  type="button"
                  onClick={() => setShow(true)}
                  className="flex items-center gap-2 px-3 py-1 transition-all duration-200 rounded-full bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
                  aria-label="Change delivery location"
                >
                  <Image
                    src={DeliveryIcon}
                    alt="Fast Delivery"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  <span className="hidden text-white/70 lg:inline">
                    {t(
                      "header:delivery_to",
                      locale === "ar" ? "التوصيل من:" : "Delivery to:",
                    )}
                  </span>
                  <span className="font-semibold text-white max-w-[220px] truncate">
                    {state.city && state.region
                      ? `${state.city} - ${state.region}`
                      : t("header:city_region", "Select Location")}
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

              {/* Language Switch Button */}
              <li>
                <button
                  type="button"
                  onClick={SwitchLanghandler}
                  className="px-2 py-1 font-bold transition-colors duration-200 rounded text-white/80 hover:bg-white/10 hover:text-white"
                  aria-label={
                    locale === "ar" ? "Switch to English" : "Switch to Arabic"
                  }
                >
                  {locale === "ar" ? "English" : "عربي"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {show && (
        <RegionsBox
          onClose={handleCloseModal}
          hasSaved={Boolean(state.city && state.region)}
        />
      )}
    </>
  );
};

export default TopBar;


