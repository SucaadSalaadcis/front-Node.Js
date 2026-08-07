
const initialState = {
    WishlistData : [],
}

const WishlistApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "GET_WISHLISTS":
            return {...state, WishlistData : action.payload}
        default:
           return state;
    }
}

export default WishlistApi;