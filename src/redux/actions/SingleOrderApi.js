import { axiosApi, LocalKeys } from "@/helpers/Config";

// Handel Get Single Order Data

const SingleOrderData = (payload) => ({
    type : "SINGLE_ORDER_DATA",
    payload
})

export const SingleOrderDataHandler = (orderId, cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("order/get-single-order", {
                order_id : orderId
            });

            if(data.success) {
                dispatch(SingleOrderData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Cancel Order

const CancelOrderData = (payload) => ({
    type : "CANCEL_ORDER",
    payload
})

export const CancelOrderDataHandler = (orderId, ErrorCB) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("order/cancel-order", {
                order_id : orderId
            });

            if(data.success) {
                dispatch(CancelOrderData(data.data));
                window.location.reload();
            }

        }catch(error) {
            console.log(error.response);
            ErrorCB && ErrorCB();
        }
    }
}

// Handel Create New Order

const CreateOrderData = (payload) => ({
    type : "CREATE_NEW_ORDER",
    payload
})

export const CreateOrderDataHandler = (formData,Cb ,ErrorCB) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("order/create", formData);

            if(data.success) {
                dispatch(CreateOrderData(data.data));
                Cb && Cb();
            }

        }catch(error) {
            console.log(error.response);
            ErrorCB && ErrorCB();
        }
    }
}

// Handel Review Product

const ReviewProductData = (payload) => ({
    type : "REVIEW_PRODUCT",
    payload
})

export const ReviewProductDataHandler = (formData, Cb, ErrorCB) => {
            
    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("reviews/store", formData);

            if(data.success) {
                dispatch(ReviewProductData(data.data));
                Cb && Cb();
            }

        }catch(error) {
            console.log(error.response);
            ErrorCB && ErrorCB();
        }
    }
}