import { axiosApi } from "@/helpers/Config";

// Handel Get Top Deals Products

const TopDealsData = (payload) => ({
  type: "TOP_DEALS",
  payload
})

export const TopDealsDataHandler = (page, cb) => {

  return async (dispatch) => {

    try {

      const { data } = await axiosApi.get(`products/deals${page}`);
      // console.log(data);

      if (data.success) {
        dispatch(TopDealsData(data));
        cb && cb();
      }

    } catch (error) {
      console.log(error.response);
    }
  }
}

// Handel Get New Arrivals Products

const NewArrivalsData = (payload) => ({
  type: "NEW_ARRIVALS",
  payload
})

export const NewArrivalsDataHandler = (cb) => {

  return async (dispatch) => {

    try {

      const { data } = await axiosApi.get("products/new-arrivals");

      if (data.success) {
        dispatch(NewArrivalsData(data.data));
        cb && cb();
      }

    } catch (error) {
      console.log(error.response);
    }
  }
}

// Handel Get Featured Products

const FeaturedProductsData = (payload) => ({
  type: "FEATURED_PRODUCTS",
  payload
})

export const FeaturedProductsDataHandler = (cb) => {

  return async (dispatch) => {

    try {

      const { data } = await axiosApi.get("products/featured");
      // console.log(data);

      if (data.success) {
        dispatch(FeaturedProductsData(data.data));
        cb && cb();
      }

    } catch (error) {
      console.log(error.response);
    }
  }
}


// // Handle Magazine Products
// const MagazineProductsData = (payload) => ({
//     type: "MAGAZINE_PRODUCTS",
//     payload
// })

// export const MagazineProductsHandler = (page = 1, cb) => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axiosApi.get(`products/magazine?page=${page}`);
//             // console.log(data);
//             if (data.success) {
//                 dispatch(MagazineProductsData(data));
//             } else {
//                 // if backend sends success: false
//                 dispatch(MagazineProductsData({ data: [], meta: {} }));
//             }

//             cb && cb();
//         } catch (error) {
//             console.log("Magazine Products Error:", error.response?.data || error.message);
//             // stop loader even if error
//             dispatch(MagazineProductsData({ data: [], meta: {} }));
//             cb && cb();
//         }
//     }
// }

// Handle Magazine Products
const MagazineProductsData = (payload) => ({
  type: "MAGAZINE_PRODUCTS",
  payload
})

export const MagazineProductsHandler = (page = 1, cb) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosApi.get(`products/magazine?page=${page}`);

      if (data?.success) {
        // Normalize data and meta to always be safe
        const safeData = Array.isArray(data.data) ? data.data : [];
        const safeMeta = data.meta || {};

        // Ensure meta.links is always an array
        safeMeta.links = Array.isArray(safeMeta.links) ? safeMeta.links : [];

        dispatch(MagazineProductsData({
          data: safeData,
          meta: safeMeta
        }));
      } else {
        // Fallback for unsuccessful response
        dispatch(MagazineProductsData({ data: [], meta: { links: [] } }));
      }

      cb && cb();
    } catch (error) {
      console.log("Magazine Products Error:", error.response?.data || error.message);
      // safe fallback
      dispatch(MagazineProductsData({ data: [], meta: { links: [] } }));
      cb && cb();
    }
  }
}


const SingleProductData = (payload) => ({
  type: "GET_SINGLE_PRODUCT",
  payload
})

export const SingleProductDataDataHandler = (slug, cb, errorCb) => {

  return async (dispatch) => {

    try {

      const { data } = await axiosApi.get(`products/${slug}`);

      if (data.success) {
        dispatch(SingleProductData(data.data));
        cb && cb();
      }

    } catch (error) {
      console.log(error.response);
      errorCb && errorCb();
    }
  }
}


