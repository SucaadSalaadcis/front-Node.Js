import { axiosApi } from "@/helpers/Config";

// Handel Get Top Categories

const TopCategoriesData = (payload) => ({
    type : "TOP_CATEGORIES",
    payload
})

export const TopCategoriesDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("categories/top");
            // console.log(data);

            if(data.success) {
                dispatch(TopCategoriesData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get All Categories

const AllCategoriesData = (payload) => ({
    type : "ALL_CATEGORIES",
    payload
})

export const AllCategoriesDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("categories");

            if(data.success) {
                dispatch(AllCategoriesData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get Single Category

const SingleCategoryData = (payload) => ({
  type: "SINGLE_CATEGORY",
  payload,
});

export const SingleCategoryDataHandler = (slug, cb, options = {}) => {
  return async (dispatch) => {
    try {
      // Send page and per_page for lazy loading
      const { data } = await axiosApi.get(`categories/${slug}`, {
        params: {
          light: options.light || false,
          page: options.page || 1,       // current page
          per_page: options.per_page || 10 // products per page
        },
      });

      if (data.success) {
        // If it's the first page, replace; otherwise, append
        if (options.append) {
          dispatch(SingleCategoryData({
            ...data.data,
            products: [...(options.prevProducts || []), ...(data.data.products || [])]
          }));
        } else {
          dispatch(SingleCategoryData(data.data));
        }
        cb && cb();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
