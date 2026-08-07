import { axiosApi } from "@/helpers/Config";

// Action creator
const setPromoBannerData = (payload) => ({
  type: "PROMO_BANNER_DATA",
  payload,
});

// Thunk to fetch banners
export const PromoBannerDataHandler = (cb, cbError) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosApi.get("banners/promo-banners/all");
    //   console.log("PromoBanner API Response:", data);

      // Get the correct array from the backend
      const banners = Array.isArray(data?.data) ? data.data : [];

      dispatch(setPromoBannerData(banners));

      cb && cb();
    } catch (error) {
      console.error("PromoBanner API Error:", error);
      cbError && cbError();
    }
  };
};
