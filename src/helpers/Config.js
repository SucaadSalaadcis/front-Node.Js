import axios from "axios";

export const LocalKeys = {
  LANG: "LANG",
  TOKEN: "TOKEN",
  USER_ID: "USER_ID",
  CART_COUNT: "CART_COUNT",
  ORDER_ID: "ORDER_ID",
  PRDUCTS: "PRDUCTS",
  BRANCH_ID: "BRANCH_ID",
  CITY_NAME: "CITY_NAME",
  REGION_NAME: "REGION_NAME",
};

export const axiosApi = axios.create({
  baseURL: "https://control-dev.el-fergany.com/api/v2/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key":
      "gUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-Ja",
  },
});

axiosApi.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined") {
      // Detect language directly from URL path first, fallback to localStorage
      const isArabicPath = window.location.pathname.startsWith("/ar");
      const currentLang = isArabicPath
        ? "ar"
        : localStorage.getItem(LocalKeys.LANG) || "en";

      // Dynamically attach Accept-Language header to every request
      config.headers["Accept-Language"] = currentLang;

      // Dynamically attach Branch ID
      const branchId = localStorage.getItem(LocalKeys.BRANCH_ID) || "112";
      config.headers["branchid"] = branchId;

      // Dynamically attach Auth Token
      const token = localStorage.getItem(LocalKeys.TOKEN);
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);