
const initialState = {
    SinglePageData : {}
}

const PagesApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "PAGES_DATA":
            return {...state, SinglePageData : action.payload}
        default:
           return state;
    }
}

export default PagesApi;