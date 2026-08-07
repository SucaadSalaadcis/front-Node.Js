// import { axiosApi } from "@/helpers/Config";
// 
// // Handel Get Slider Data

// const SliderData = (payload) => ({
//     type: "SLIDER_DATA",
//     payload
// })

// export const SliderDataHandler = (cb, CbError) => {

//     return async (dispatch) => {

//         try {

//             const { data } = await axiosApi.get("sliders/all");
//         //    console.log("Full API response:", data);
           
//             if (data.success) {
//                 dispatch(SliderData(data.data));
//                 cb && cb();
//             }

//         } catch (error) {
//             console.log(error.response);
//             CbError && CbError();
//         }
//     }
// }

import { axiosApi } from "@/helpers/Config";

// ------------------------
// Slider Data
// ------------------------
const SliderData = (payload) => ({
  type: "SLIDER_DATA",
  payload,
});

// Guard to prevent multiple calls
let sliderLoaded = false;

export const SliderDataHandler = (cb, CbError) => {
  return async (dispatch) => {
    // Prevent repeated calls
    if (sliderLoaded) return;
    sliderLoaded = true;

    try {
      const { data } = await axiosApi.get("sliders/all");

      // Validate response
      const sliderItems = data?.success && Array.isArray(data.data) ? data.data : [];

      dispatch(SliderData(sliderItems));
      cb && cb();
    } catch (error) {
      console.log("Slider API Error:", error.response?.data || error.message);
      dispatch(SliderData([])); // fallback empty array
      CbError && CbError();
    }
  };
};