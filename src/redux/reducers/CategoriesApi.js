
const initialState = {
    TopCatsData : [],
    AllCatsData : [],
    TopSubCategories : [],
    SingleCatData : {}
}

const CategoriesApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "TOP_CATEGORIES":
            return {...state,   TopCatsData : action.payload,
                                TopSubCategories : action.payload.sub_category
            }
        case "ALL_CATEGORIES":
            return {...state, AllCatsData : action.payload}
        case "SINGLE_CATEGORY":
            return {...state, SingleCatData : action.payload}
        default:
           return state;
    }
}

export default CategoriesApi;