
const initialState = {
    TopDealsData : [],
    NewArrivals : [],
    FeaturedData : [],
    SingleProductData : [],
    MagazineProductsData: [],        // added for magazine
    pagesTopDealsData : {},
    pagesMagazineProducts: {}        // added for pagination
}

const ProductsApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "TOP_DEALS":
            return {
                ...state, 
                TopDealsData : action.payload.data, 
                pagesTopDealsData : action.payload.meta
            }
        case "NEW_ARRIVALS":
            return {...state, NewArrivals : action.payload}
        case "FEATURED_PRODUCTS":
            return {...state, FeaturedData : action.payload}
        case "GET_SINGLE_PRODUCT":
            return {...state, SingleProductData : action.payload}
        case "MAGAZINE_PRODUCTS":     // new case
            return {
                ...state, 
                MagazineProductsData: action.payload.data,
                pagesMagazineProducts: action.payload.meta
            }
        default:
           return state;
    }
}

export default ProductsApi;
