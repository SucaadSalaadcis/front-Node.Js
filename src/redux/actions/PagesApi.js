import { axiosApi } from "@/helpers/Config";

// Handel Get Pages Data

const PagesData = (payload) => ({
    type : "PAGES_DATA",
    payload
})

export const PagesDataHandler = (slug, cb) => {
    
        return async (dispatch) => {
    
            try {
    
                const { data } = await axiosApi.get(`pages/view/${slug}`);
                // console.log(data);
    
                if(data.success) {
                    dispatch(PagesData(data.data));
                    cb && cb();
                }
    
            }catch(error) {
                console.log(error.response);
            }
        }
    }