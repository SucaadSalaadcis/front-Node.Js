import { LocalKeys } from "./Config";
import { toast } from "react-toastify";

export const ShowTostHandler = (notfiction, type) => {
  toast(notfiction, {
    position: "top-right",
    type: type,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    rtl: false,
  });
};

export const SwitchLanghandler = (e) => {
  if (e) e.preventDefault();

  if (typeof window === "undefined") return;

  const currentPath = window.location.pathname;
  const searchParams = window.location.search || "";
  const isArabic = currentPath.startsWith("/ar");

  if (isArabic) {
    // Switching AR -> EN
    localStorage.setItem(LocalKeys.LANG, "en");
    const newPath = currentPath.replace(/^\/ar(\/|$)/, "/") || "/";
    window.location.href = `${newPath}${searchParams}`;
  } else {
    // Switching EN -> AR
    localStorage.setItem(LocalKeys.LANG, "ar");
    const cleanPath = currentPath === "/" ? "" : currentPath;
    window.location.href = `/ar${cleanPath}${searchParams}`;
  }
};

export const getDirection = (locale) => {
  if (!locale) return "ltr";
  const rtlLanguages = ["ar"];
  return rtlLanguages.includes(locale) ? "rtl" : "ltr";
};