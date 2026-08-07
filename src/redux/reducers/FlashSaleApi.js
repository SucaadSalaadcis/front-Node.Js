
const initialState = {
  FlashSaleData: null, // single flash sale
};

const FlashSaleApi = (state = initialState, action) => {
  switch (action.type) {
    case "FLASH_SALE_DATA":
      return { ...state, FlashSaleData: action.payload };
    default:
      return state;
  }
};

export default FlashSaleApi;
