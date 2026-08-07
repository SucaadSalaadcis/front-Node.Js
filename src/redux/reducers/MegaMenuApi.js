
const initialState = {
    MenuData : []
}

const MegaMenuApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "GET_MEGA_MENU":
            return {...state, MenuData : action.payload}
        default:
           return state;
    }
}

export default MegaMenuApi;