import { axiosApi } from "@/helpers/Config";

// Handel Get Top Brands

const TopBrandsData = (payload) => ({
    type : "TOP_BRANDS",
    payload
})

export const TopBrandsDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("brands/top");

            if(data.success) {
                dispatch(TopBrandsData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get All Brands

const AllBrandsData = (payload) => ({
    type : "ALL_BRANDS",
    payload
})

export const AllBrandsDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("brands");

            if(data.success) {
                dispatch(AllBrandsData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get Single Brand

const SingleBrandData = (payload) => ({
    type : "GET_SINGLE_BRAND",
    payload
})

export const SingleBrandDataHandler = (slug, cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get(`brands/${slug}`);

            if(data.success) {
                dispatch(SingleBrandData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}