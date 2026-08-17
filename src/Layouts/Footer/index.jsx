import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Logo from "../../../public/images/general/logo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n?.language === "ar";

  return (
    <footer className="w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Outer Card Container */}
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="relative mx-auto w-full max-w-[1280px] rounded-[24px] bg-[#033778] px-6 py-10 text-white sm:px-10 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {/* ================= COLUMN 1: BRAND & SOCIALS ================= */}
          <div className="flex flex-col items-center px-4 text-center lg:border-r lg:border-white/10 lg:rtl:border-l lg:rtl:border-r-0">
            {/* Logo */}
            <Link
              href="/"
              className="inline-block mb-4 transition-transform hover:scale-105"
            >
              <Image
                src={Logo}
                alt="Elfergany"
                width={100}
                height={100}
                className="object-contain w-auto h-auto"
                priority
              />
            </Link>

            {/* Social Media Heading */}
            <p className="mb-4 text-sm font-semibold text-gray-200">
              {t("common:follow_us")}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3"> 

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@ElFerganyhypermarket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-colors rounded-full h-9 w-9 bg-white/10 hover:bg-white/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/marketelfergany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-colors rounded-full h-9 w-9 bg-white/10 hover:bg-white/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/elferganymarket/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white transition-colors rounded-full h-9 w-9 bg-white/10 hover:bg-white/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ================= COLUMN 2: ABOUT COMPANY ================= */}
          <div className="flex flex-col items-center px-4 text-center lg:border-r lg:border-white/10 lg:rtl:border-l lg:rtl:border-r-0">
            <h5 className="mb-5 text-lg font-bold text-white">
              {t("menu:company", "عن الفرجاني")}
            </h5>
            <ul className="space-y-3 text-sm text-gray-200">
              <li>
                <Link
                  href="/about-us"
                  className="transition-opacity hover:opacity-75"
                >
                  {t("menu:about_us", "عن نحن")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-opacity hover:opacity-75"
                >
                  {t("menu:contact_us", "تواصل معنا")}
                </Link>
              </li>
              <li>
                <Link
                  href="/branches"
                  className="transition-opacity hover:opacity-75"
                >
                  {t("common:branches")}
                </Link>
              </li>
              <li></li>
            </ul>
          </div>

          {/* ================= COLUMN 3: HELP & SUPPORT ================= */}
          <div className="flex flex-col items-center px-4 text-center lg:border-r lg:border-white/10 lg:rtl:border-l lg:rtl:border-r-0">
            <h5 className="mb-5 text-lg font-bold text-white">
              {t("menu:help_support", "المساعدة والدعم")}
            </h5>
            <ul className="space-y-3 text-sm text-gray-200">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-opacity hover:opacity-75"
                >
                  {t("menu:privacy_policy", "سياسة الخصوصية")}
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="transition-opacity hover:opacity-75"
                >
                  {t("menu:return_policy", "سياسة الاسترجاع والاستبدال")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="transition-opacity hover:opacity-75"
                >
                  {t("menu:terms_conditions", "الشروط والأحكام")}
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4: DOWNLOAD APP ================= */}
          <div className="flex flex-col items-center px-4 text-center">
            <h5 className="mb-2 text-lg font-bold text-white">
              {t("menu:download_mobile_app", "حمل التطبيق")}
            </h5>
            <p className="mb-4 max-w-[220px] text-xs leading-5 text-gray-300">
              {t(
                "common:footer_intro",
              )}
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Google Play */}
              <Link
                href="https://play.google.com/store/apps/details?id=com.trading.go.ElFergany"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                {/* Standard HTML img to prevent domain whitelist errors in next.config.js */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-[42px] w-[140px] object-contain"
                  loading="lazy"
                />
              </Link>

              {/* App Store */}
              <Link
                href="https://apps.apple.com/app/idYOUR_APP_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-[42px] w-[140px] object-contain"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT BAR ================= */}
        <div className="pt-6 mt-10 text-center border-t border-white/10">
          <p className="text-xs text-gray-300">
            {t("common:copyright", )} 
            <span className="font-semibold text-yellow-300">
              
              {t("common:site_name", "Elfergany Market")}
              
            </span>
            
             {t("common:all_rights_reserved_designed_by")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
