
const initialState = {
    UserAddressData : []
}

const AddressApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "GET_USER_ADDRESS":
            return {...state, UserAddressData : action.payload}
        default:
           return state;
    }
}

export default AddressApi;