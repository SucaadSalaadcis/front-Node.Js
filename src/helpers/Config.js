// import axios from "axios";

// export const LocalKeys = {
//     LANG: "LANG",
//     TOKEN: "TOKEN",
//     USER_ID: "USER_ID",
//     CART_COUNT: "CART_COUNT",
//     ORDER_ID: "ORDER_ID",
//     PRDUCTS: "PRDUCTS",
//     BRANCH_ID: "BRANCH_ID",
//     BRANCH_NAME: "BRANCH_NAME",
//     CITY_NAME: "CITY_NAME",
//     REGION_NAME: "REGION_NAME"
// }

// export const axiosApi = axios.create({
//     // baseURL: "https://control-dev.el-fergany.com/api/v2/",
//      baseURL: "http://localhost:8000/api/v2/",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Accept-Language": (typeof window !== 'undefined' && localStorage.getItem(LocalKeys.LANG)) || "ar",
//         "branchid": (typeof window !== 'undefined' && localStorage.getItem(LocalKeys.BRANCH_ID)) || 112,
//     }

// })

// axiosApi.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem(LocalKeys.TOKEN);
//         if (token) {
//             config.headers["Authorization"] = 'Bearer ' + token;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

// import axios from "axios";

// export const LocalKeys = {
//   LANG: "LANG",
//   TOKEN: "TOKEN",
//   USER_ID: "USER_ID",
//   CART_COUNT: "CART_COUNT",
//   ORDER_ID: "ORDER_ID",
//   PRDUCTS: "PRDUCTS",
//   BRANCH_ID: "BRANCH_ID",
//   CITY_NAME: "CITY_NAME",
//   REGION_NAME: "REGION_NAME",
// };

// export const axiosApi = axios.create({

//   baseURL: "https://el-fergany.com/api/v2/",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "Accept-Language":
//       (typeof window !== "undefined" && localStorage.getItem(LocalKeys.LANG)) ||
//       "en",
//     branchid:
//       (typeof window !== "undefined" &&
//         localStorage.getItem(LocalKeys.BRANCH_ID)) ||
//       112,
//     "x-api-key":
//       "gUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-Ja",
//   },
// });

// axiosApi.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem(LocalKeys.TOKEN);
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

//
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
  // baseURL: "http://127.0.0.1:8000/api/v2/",
  // baseURL: "http://localhost/admin/public/api/v2/", // Local Laravel backend
  // baseURL: "https://control-panel.el-fergany.com/api/v2/",
  baseURL: "https://control-dev.el-fergany.com/api/v2/",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language":
      (typeof window !== "undefined" && localStorage.getItem(LocalKeys.LANG)) ||
      "en",
    branchid:
      (typeof window !== "undefined" &&
        localStorage.getItem(LocalKeys.BRANCH_ID)) ||
      112,
    "x-api-key":
      "gUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-Ja",
  },
});

axiosApi.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(LocalKeys.TOKEN);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
