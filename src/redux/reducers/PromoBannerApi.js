
const initialState = {
  PromoBannerData: [], // start with empty array
};

const PromoBannerApi = (state = initialState, action) => {
  switch (action.type) {
    case "PROMO_BANNER_DATA":
      return { ...state, PromoBannerData: action.payload };
    default:
      return state;
  }
};

export default PromoBannerApi;
