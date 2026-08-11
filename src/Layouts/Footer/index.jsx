"use client";

import Link from "next/link";
import Image from "next/image";
import QRCode from "react-qr-code";
import { useTranslation } from "next-i18next";
import { Gift, ShoppingBag, TicketPercent, ChevronUp } from "lucide-react";

import Logo from "../../../public/images/general/logo.png";

export default function Footer() {
  const { t } = useTranslation("common");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative pt-8 sm:pt-10 pb-6 mt-16 sm:mt-20 font-sans bg-[#1D3E73] text-blue-100 border-t border-white/10">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ==================== 1. RESPONSIVE APP BANNER ==================== */}
        <section className="relative p-5 mb-10 overflow-hidden border shadow-xl sm:p-6 bg-white/10 backdrop-blur-md border-white/15 shadow-black/10 rounded-2xl sm:rounded-3xl">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-blue-400/10" />

          <div className="relative grid items-center grid-cols-1 gap-6 lg:grid-cols-12">
            {/* LEFT / START */}
            <div className="text-center lg:col-span-5 lg:text-start">
              <h2 className="text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
                {t("groceries_delivered_title")}
              </h2>

              <p className="mt-1.5 text-xs text-blue-100/80 max-w-md lg:max-w-sm leading-relaxed mx-auto lg:mx-0">
                {t("groceries_delivered_description")}
              </p>

              <div className="flex items-center justify-center gap-3 mt-4 lg:justify-start">
                <div className="rounded-xl bg-white p-1.5 shadow-sm shrink-0">
                  <QRCode value="https://yourdomain.com/app" size={44} />
                </div>

                <div className="text-start">
                  <p className="text-xs font-semibold text-white">
                    {t("scan_to_download")}
                  </p>
                  <p className="text-[11px] text-blue-200">
                    {t("our_mobile_app")}
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER - MOCKUP */}
            <div className="relative flex justify-center py-2 lg:col-span-3 lg:py-0">
              <Image
                src="/images/general/mobile.png"
                alt={t("mobile_app")}
                width={110}
                height={220}
                priority
                className="object-contain w-auto drop-shadow-2xl h-28 sm:h-36"
              />

              <div className="hidden xl:flex absolute start-0 top-10 items-center gap-1.5 rounded-full bg-white text-[#1D3E73] px-3 py-1 shadow-lg font-medium">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1D3E73] text-white shrink-0">
                  <Gift size={11} />
                </div>
                <span className="text-[11px] whitespace-nowrap">
                  {t("earn_shopping_points")}
                </span>
              </div>
            </div>

            {/* RIGHT / END - FEATURE PILLS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 lg:col-span-4">
              <CompactFeatureCard
                icon={<ShoppingBag size={14} />}
                title={t("track_your_orders")}
              />
              <CompactFeatureCard
                icon={<Gift size={14} />}
                title={t("collect_reward_points")}
              />
              <CompactFeatureCard
                icon={<TicketPercent size={14} />}
                title={t("exclusive_offers")}
              />
            </div>
          </div>
        </section>

        {/* ==================== 2. FOOTER LINKS & BRAND ==================== */}
        <div className="relative grid grid-cols-2 gap-8 pb-8 border-b sm:grid-cols-2 lg:grid-cols-4 border-white/10">
          {/* BRAND & SOCIALS */}
          <div className="flex flex-col items-start col-span-2 gap-3 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block p-2 transition-transform border bg-white/10 rounded-xl hover:bg-white/20 border-white/10 backdrop-blur-sm"
            >
              <Image
                src={Logo}
                alt="Elfergany"
                width={80}
                height={80}
                className="object-contain w-16 h-auto"
              />
            </Link>

            <p className="text-xs text-blue-200/80">{t("cairo_egypt")}</p>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <SocialIcon href="https://www.facebook.com/marketelfergany">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </SocialIcon>

              <SocialIcon
                href="https://www.instagram.com/elferganymarket/"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                  strokeWidth="2"
                />
                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  strokeWidth="2"
                />
                <line
                  x1="17.5"
                  y1="6.5"
                  x2="17.51"
                  y2="6.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </SocialIcon>

              <SocialIcon href="#">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </SocialIcon>

              <SocialIcon href="#">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </SocialIcon>
            </div>
          </div>

          {/* COLUMN 1: COMPANY */}
          <div className="col-span-1">
            <h5 className="mb-3 text-xs font-bold tracking-wider text-white uppercase">
              {t("menu:company")}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors text-blue-100/80 hover:text-white"
                >
                  {t("menu:about_us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-colors text-blue-100/80 hover:text-white"
                >
                  {t("menu:contact_us")}
                </Link>
              </li>
              <li>
                <Link
                  href="/branches"
                  className="transition-colors text-blue-100/80 hover:text-white"
                >
                  {t("menu:our_branches")}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: HELP & SUPPORT */}
          <div className="col-span-1">
            <h5 className="mb-3 text-xs font-bold tracking-wider text-white uppercase">
              {t("menu:help_support")}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/terms-conditions"
                  className="transition-colors text-blue-100/80 hover:text-white"
                >
                  {t("menu:terms_conditions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors text-blue-100/80 hover:text-white"
                >
                  {t("menu:privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="transition-colors text-blue-100/80 hover:text-white"
                >
                  {t("menu:return_policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: APP BADGES */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h5 className="mb-3 text-xs font-bold tracking-wider text-white uppercase">
              {t("menu:download_mobile_app")}
            </h5>
            <div className="flex flex-row flex-wrap items-center gap-3 lg:flex-col lg:items-start">
              <Link
                href="https://play.google.com/store/apps/details?id=com.trading.go.ElFergany&pcampaignid=web_share"
                target="_blank"
                className="inline-block transition-transform hover:opacity-80 shrink-0"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={110}
                  loading="lazy"
                  className="w-auto h-8 sm:h-9"
                />
              </Link>

              <Link
                href="https://apps.apple.com/app/idYOUR_APP_ID"
                target="_blank"
                className="inline-block transition-transform hover:opacity-80 shrink-0"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={110}
                  loading="lazy"
                  className="w-auto h-8 sm:h-9"
                />
              </Link>
            </div>
          </div>

          {/* DYNAMIC BACK TO TOP BUTTON */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed lg:absolute bottom-5 lg:bottom-4 z-40 ltr:right-4 ltr:lg:right-0 rtl:left-4 rtl:lg:left-0 flex items-center justify-center w-10 h-10 lg:w-9 lg:h-9 rounded-xl bg-[#1D3E73]/90 lg:bg-white/10  hover:text-[#1D3E73] text-white border border-white/20 transition-all duration-200 shadow-xl lg:shadow-md backdrop-blur-md group"
          >
            <ChevronUp
              size={18}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        {/* ==================== 3. COPYRIGHT ==================== */}
        <div className="pt-4 text-xs text-center text-blue-200/60">
          <p>
            © {new Date().getFullYear()},{" "}
            <span className="font-semibold text-white">{t("site_name")}</span>.{" "}
            {t("all_rights_reserved_designed_by")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function CompactFeatureCard({ icon, title }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm px-3 py-2 sm:py-1.5 border border-white/10">
      <div className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-white text-[#1D3E73]">
        {icon}
      </div>
      <span className="text-xs font-medium leading-tight text-white">{title}</span>
    </div>
  );
}

function SocialIcon({
  href,
  children,
  fill = "currentColor",
  stroke = "none",
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center justify-center transition-all bg-white/10 border rounded-lg w-8 h-8 border-white/20 text-white hover:text-[#1D3E73] hover:border-white shadow-sm shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
      >
        {children}
      </svg>
    </Link>
  );
}