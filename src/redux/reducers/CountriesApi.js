
const initialState = {
    CountriesData : [],
    CitiesData : [],
    StatesData : [],
    branchesData : [],
    CitiesByGovernorate : []
}

const CountriesApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "GET_COUNTRIES":
            return {...state, CountriesData : action.payload}
        case "GET_CITIES":
            return {...state, CitiesData : action.payload}
        case "GET_STATES":
            return {...state, StatesData : action.payload}
        case "GET_BRANCHES":
            return {...state, branchesData : action.payload}
        case "GET_CITIS_BY_GOVERNORATE":
            return {...state, CitiesByGovernorate : action.payload}
        default:
           return state;
    }
}

export default CountriesApi;