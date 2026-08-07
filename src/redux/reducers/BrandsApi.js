
const initialState = {
    BrandsData : [],
    AllBrands : [],
    SingleBrand : {}
}

const BrandsApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "TOP_BRANDS":
            return {...state, BrandsData : action.payload}
        case "ALL_BRANDS":
            return {...state, AllBrands : action.payload}
        case "GET_SINGLE_BRAND":
            return {...state, SingleBrand : action.payload}
        default:
           return state;
    }
}

export default BrandsApi;