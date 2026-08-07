import { axiosApi, LocalKeys } from "@/helpers/Config";
import { ShowTostHandler } from "@/helpers/Helpers";

// Handel Get Add Product To Cart

const AddToCartData = (payload) => ({
    type: "ADD_TO_CART",
    payload
})
export const AddToCartDataHandler = (CartData, cb, ErrorCb) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosApi.post("cart/add", CartData);

            if (data.success) {
                dispatch(AddToCartData(data.data));
                cb && cb();
            }

        } catch (error) {
            console.log(error.response);

            //  PASS ERROR HERE
            ErrorCb && ErrorCb(error);
        }
    }
}
// Handel Get Cart

const GetCartData = (payload) => ({
    type: "GET_CART",
    payload
})

export const GetCartDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("cart/all");

            if (data.success) {
                dispatch(GetCartData(data.data));
                cb && cb();
            }

        } catch (error) {
            console.log(error.response);
        }
    }
}

// Handel Remove Product From Cart

// const UpdateCartData = (payload) => ({
//     type: "REMOVE_FROM_CART",
//     payload
// })

// export const UpdateCartDataHandler = (formData, cb) => {

//     return async (dispatch) => {

//         try {

//             const { data } = await axiosApi.post("cart/update-qty", formData);

//             if (data.success) {
//                 dispatch(UpdateCartData(data.data));
//                 cb && cb();
//             }

//         } catch (error) {
//             console.log(error.response);
//         }
//     }
// }
const UpdateCartData = (payload) => ({
    type: "REMOVE_FROM_CART",
    payload
})

export const UpdateCartDataHandler = (formData, cb, errorCb) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosApi.post("cart/update-qty", formData);

            if (data.success) {
                dispatch(UpdateCartData(data.data));
                cb && cb(); // success callback
            } else {
                // API returned success=false
                if (errorCb) errorCb(new Error(data.message || "Unknown error"));
            }

        } catch (error) {
            // Axios error (like 422)
            if (errorCb) {
                if (error.response && error.response.data && error.response.data.message) {
                    errorCb(new Error(error.response.data.message));
                } else {
                    errorCb(error);
                }
            }
            console.log(error.response);
        }
    }
}

// Handel Remove Product From Cart

const RemoveCartData = (payload) => ({
    type: "REMOVE_FROM_CART",
    payload
})

export const RemoveCartDataHandler = (ProductId, cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("cart/remove", {
                product_id: ProductId
            });

            if (data.success) {
                dispatch(RemoveCartData(data.data));
                cb && cb();
            }

        } catch (error) {
            console.log(error.response);
        }
    }
}

// Handel Get Cart Summry

const SummryCartData = (payload) => ({
    type: "SUMMRY_CART",
    payload
})

export const SummryCartDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("cart/summary");

            if (data.success) {
                dispatch(SummryCartData(data.data));
                cb && cb();
            }

        } catch (error) {
            console.log(error.response);
        }
    }
}

// Handel Apply Coupon

const ApplyCouponData = (payload) => ({
    type: "APPLY_COUPON",
    payload
})

export const ApplyCouponDataHandler = (code, cb, cbError) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("coupon/apply", {
                coupon_code: code
            });

            if (data.success) {
                dispatch(ApplyCouponData(data.data));
                cb && cb();
            }

        } catch (error) {
            console.log(error.response);
            cbError && cbError();
            if (error.response.data.message === 'api.Coupon expired!') {
                if (localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("انتهت صلاحية كود الخصم", "error");
                } else {
                    ShowTostHandler("Discount Code is Expired", "error");
                }
            } else {
                if (localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("كود خصم خاطئ", "error");
                } else {
                    ShowTostHandler("Wrong Discount Code", "error");
                }
            }

        }
    }
}


