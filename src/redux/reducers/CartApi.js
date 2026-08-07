
const initialState = {
    CartData : [],
    SummryData : {}
}

const CartApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "GET_CART":
            return {...state, CartData : action.payload}
        case "SUMMRY_CART":
            return {...state, SummryData : action.payload}
        default:
           return state;
    }
}

export default CartApi;