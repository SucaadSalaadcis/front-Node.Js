import { axiosApi } from "@/helpers/Config";

// Handel Get All Countries

const CountriesData = (payload) => ({
    type : "GET_COUNTRIES",
    payload
})

export const CountriesDataHandler = () => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("countries");

            if(data.success) {
                dispatch(CountriesData(data.data));
                console.log(data);
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get All Cities

const CitiesData = (payload) => ({
    type : "GET_CITIES",
    payload
})

export const CitiesDataHandler = () => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("states");

            if(data.success) {
                dispatch(CitiesData(data.data));
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get All States

const StatesData = (payload) => ({
    type : "GET_STATES",
    payload
})

export const StatesDataHandler = () => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("cities");

            if(data.success) {
                dispatch(StatesData(data.data));
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get Cities By Governorate

const CitiesByGovernateData = (payload) => ({
    type : "GET_CITIS_BY_GOVERNORATE",
    payload
})

export const CitiesByGovernateDataHandler = (id) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("get-cities-by-state", {
                state_id: id
            });

            if(data.success) {
                dispatch(CitiesByGovernateData(data.data));
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get Branches

const BranchesData = (payload) => ({
    type : "GET_BRANCHES",
    payload
})

export const BranchesDataHandler = (id) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("get-branches-by-city", {
                city_id: id
            });

            if(data.success) {
                dispatch(BranchesData(data.data));
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}