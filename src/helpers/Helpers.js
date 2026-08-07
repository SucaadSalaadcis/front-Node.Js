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
        rtl : false
    });
};

export const SwitchLanghandler = (e) => {
    e.preventDefault();
    const currentLang = localStorage.getItem(LocalKeys.LANG) || "ar";
    const newLang = currentLang === "en" ? "ar" : "en";

    localStorage.setItem(LocalKeys.LANG, newLang);

    const { pathname, search } = window.location;
    let newPath;

    if (currentLang === "en") {
        newPath = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    } else {
        newPath = pathname === '/' ? '/en' : '/en' + pathname;
    }

    window.location.href = newPath + search;
};

export const getDirection = (locale) => {
    if (!locale) return "ltr";
    const rtlLanguages = ["ar"];
    return rtlLanguages.includes(locale) ? "rtl" : "ltr";
}