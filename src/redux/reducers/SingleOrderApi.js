
const initialState = {
    SingleOrderData : {}
}

const SingleOrderApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "SINGLE_ORDER_DATA":
            return {...state, SingleOrderData : action.payload}
        default:
           return state;
    }
}

export default SingleOrderApi;