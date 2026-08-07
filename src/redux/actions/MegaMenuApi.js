import { axiosApi } from "@/helpers/Config";

// Handel Get Mega Menu Data

const MegaMenuData = (payload) => ({
    type : "GET_MEGA_MENU",
    payload
})

export const MegaMenuDataHandler = (cb, CbError) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("mega-menus/all");

            if(data.success) {
                dispatch(MegaMenuData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
            CbError && CbError();
        }
    }
}