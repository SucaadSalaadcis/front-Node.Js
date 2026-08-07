import { axiosApi } from "@/helpers/Config";

// Action
const setFlashSaleData = (payload) => ({
  type: "FLASH_SALE_DATA",
  payload,
});

// Fetch single flash sale
export const fetchFlashSale = (cb, cbError, locale = 'en') => {
  return async (dispatch) => {
    try {
      const { data } = await axiosApi.get(`flash-sale?locale=${locale}`);
      dispatch(setFlashSaleData(data?.data || null));
      cb && cb();
    } catch (error) {
      console.error("FlashSale API Error:", error);
      cbError && cbError();
    }
  };
};
