import { useState } from "react";
import SeoHead from "@/utils/SeoHead";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PageHeader from "@/utils/PageHeader";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../../public/images/general/logo.png";
import Image from "next/image";

const ContactUsPage = () => {
  const router = useRouter();
  const { t } = useTranslation("contact");
  const dispatch = useDispatch();

  const [state, setState] = useState({
    full_name: "",
    phone_number: "",
    message: "",
  });

  const [error, setError] = useState({
    full_name: "",
    phone_number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    let valid = true;

    if (state.full_name.trim() === "") {
      setError((old) => ({
        ...old,
        full_name: t("your_full_name_is_required"),
      }));
      valid = false;
    }
    if (state.phone_number.trim() === "") {
      setError((old) => ({
        ...old,
        phone_number: t("your_phone_number_is_required"),
      }));
      valid = false;
    }
    if (state.message.trim() === "") {
      setError((old) => ({
        ...old,
        message: t("your_message_is_required"),
      }));
      valid = false;
    }

    return valid;
  };

  const HandelSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setLoading(true);

      // Simulate sending data / API call
      setTimeout(() => {
        setLoading(false);

        // Reset state & form
        setState({ full_name: "", phone_number: "", message: "" });
        const el = document.getElementById("ContactForm");
        if (el) el.reset();

        // Trigger React Toast Notification
        toast.success(t("thank_you_message"), {
          duration: 4000,
          position: "top-center",
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
            padding: "12px 20px",
            fontWeight: "600",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
        });
      }, 600);
    } else {
      // Trigger Toast warning if fields are missing
      toast.error(t("fill_required_fields"), {
        position: "top-center",
        style: {
          borderRadius: "12px",
          background: "#ef4444",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    }
  };

  return (
    <>
      <SeoHead title={t("contact_us")} />
      <PageHeader title={t("contact_us")} />

      {/* React Hot Toast Container */}
      <Toaster />

      <section className="py-8 md:py-16">
        <div className="container max-w-6xl px-4 mx-auto">
          {/* Main Split Container */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* LEFT SIDE: Supermarket Image & Visual Highlights */}
            <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 text-white overflow-hidden">
              {/* Background Image with Dark Gradient Overlay */}
              <div
                className="absolute inset-0 transition-transform duration-700 bg-center bg-cover hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30" />

              {/* Top Floating Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <Image
                  src={Logo}
                  alt="ElFergany"
                  width={88}
                  height={88}
                  priority
                  className="object-contain"
                />
              </div>

              {/* Bottom Info Stack over Image */}
              <div className="relative z-10 pt-20 space-y-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {t("always_ready_to_serve_you")}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow-sm">
                    {t("contact_description")}
                  </p>
                </div>

                {/* Quick Interactive Contact Pills */}
                <div className="space-y-2.5 pt-2">
                  {/* Hotline */}
                  <a
                    href="tel:19631"
                    className="flex items-center gap-3 p-3 transition-all border rounded-2xl bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 text-white transition-transform shadow-md shrink-0 rounded-xl bg-brand-navy group-hover:scale-110">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {t("hotline")}
                      </p>
                      <p className="text-base font-extrabold text-white">
                        19631
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:Support@el-fergany.com"
                    className="flex items-center gap-3 p-3 transition-all border rounded-2xl bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 text-white transition-transform shadow-md shrink-0 rounded-xl bg-emerald-500 group-hover:scale-110">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {t("email_support")}
                      </p>
                      <p className="text-xs font-bold text-white truncate">
                       info@el-fergany.com
                      </p>
                    </div>
                  </a>
                </div>

                {/* Coverage Banner */}
                <div className="flex items-center justify-between pt-2 text-xs border-t border-white/15 text-slate-300">
                  <span>{t("check_branch_coverage")}</span>
                  <a
                    href="https://linktr.ee/elfergany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:underline"
                  >
                    {t("view_linktree")}
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Clean Contact Form */}
            <div className="flex flex-col justify-center p-6 bg-white lg:col-span-7 sm:p-10 md:p-12">
              <div className="w-full max-w-lg mx-auto">
                {/* Form Heading */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    {t("contact_us")}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    {t("form_description")}
                  </p>
                </div>

                {/* Contact Form */}
                <form
                  className="space-y-5"
                  id="ContactForm"
                  onSubmit={HandelSubmit}
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="Name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {t("full_name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="Name"
                      className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                        error.full_name
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-brand-navy focus:ring-brand-navy/15"
                      }`}
                      placeholder={t("enter_your_full_name")}
                      onChange={(e) => {
                        setState((old) => ({
                          ...old,
                          full_name: e.target.value,
                        }));
                        setError((old) => ({ ...old, full_name: "" }));
                      }}
                    />
                    {error.full_name && (
                      <p className="mt-1 text-xs font-semibold text-red-500">
                        {error.full_name}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="Phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {t("phone_number")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="Phone"
                      className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 ${
                        error.phone_number
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-brand-navy focus:ring-brand-navy/15"
                      }`}
                      placeholder={t("enter_your_phone_number")}
                      onChange={(e) => {
                        setState((old) => ({
                          ...old,
                          phone_number: e.target.value,
                        }));
                        setError((old) => ({ ...old, phone_number: "" }));
                      }}
                    />
                    {error.phone_number && (
                      <p className="mt-1 text-xs font-semibold text-red-500">
                        {error.phone_number}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="Message"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      {t("message")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      id="Message"
                      className={`w-full rounded-xl border bg-slate-50/60 p-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 resize-none ${
                        error.message
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-brand-navy focus:ring-brand-navy/15"
                      }`}
                      placeholder={t("write_your_message")}
                      onChange={(e) => {
                        setState((old) => ({
                          ...old,
                          message: e.target.value,
                        }));
                        setError((old) => ({ ...old, message: "" }));
                      }}
                    />
                    {error.message && (
                      <p className="mt-1 text-xs font-semibold text-red-500">
                        {error.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    {loading ? (
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-300 py-3.5 text-sm font-bold text-slate-500 cursor-not-allowed"
                      >
                        <svg
                          className="w-4 h-4 animate-spin text-slate-500"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t("send")}...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-brand-navy py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-navy/20 transition-all hover:bg-slate-800 active:scale-[0.99]"
                      >
                        {t("send")}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "auth",
        "menu",
        "common",
        "header",
        "contact",
      ])),
    },
  };
}
