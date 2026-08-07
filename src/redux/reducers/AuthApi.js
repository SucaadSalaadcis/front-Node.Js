
const initialState = {
    UserData : {},
    UserOrders : [],
    UserAddresses : []
}

const AuthApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "USER_DATA":
            return {...state,   UserData : action.payload,
                                UserOrders : action.payload.orders,
                                UserAddresses : action.payload.addresses
            }
        default:
           return state;
    }
}

export default AuthApi;