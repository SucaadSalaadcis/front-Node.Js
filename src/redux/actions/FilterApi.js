import { axiosApi } from "@/helpers/Config";

// Handel Filter

const FilterData = (payload) => ({
    type : "FILTER_SEARCH",
    payload
})

export const FilterDataHandler = (keyword, brand_id, category_id, min_price, max_price, page, cb, CbError) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post(`search${page}`, {
                keyword,
                brand_id,
                category_id,
                min_price,
                max_price
            });

            if(data.success) {
                dispatch(FilterData(data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
            CbError && CbError();
        }
    }
}