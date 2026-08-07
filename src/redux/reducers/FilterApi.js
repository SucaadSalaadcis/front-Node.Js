
const initialState = {
    FilterData : [],
    PagesData : {}
}

const FilterApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "FILTER_SEARCH":
            return {...state,   FilterData : action.payload.data,
                                PagesData : action.payload.meta}
        default:
           return state;
    }
}

export default FilterApi;