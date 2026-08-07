import { axiosApi } from "@/helpers/Config";

// Handel Get Settings Data

const SettingsData = (payload) => ({
    type : "SETTINGS_DATA",
    payload
})

export const SettingsDataHandler = (cb) => {
    
    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post(`app-settings`);

            if(data.success) {
                dispatch(SettingsData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}