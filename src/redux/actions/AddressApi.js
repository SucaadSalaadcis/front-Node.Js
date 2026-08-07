import { axiosApi } from "@/helpers/Config";

// Handel Add New Address

const AddAddressData = (payload) => ({
    type : "ADD_NEW_ADDRESS",
    payload
})

export const AddAddressDataHandler = (FormData, cb, CbError) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("address/create", FormData);

            if(data.success) {
                dispatch(AddAddressData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
            CbError && CbError();
        }
    }
}

// Handel Edit Address

const EditAddressData = (payload) => ({
    type : "ADD_NEW_ADDRESS",
    payload
})

export const EditAddressDataHandler = (EditFormData, cb, CbError) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("address/update", EditFormData);

            if(data.success) {
                dispatch(EditAddressData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
            CbError && CbError();
        }
    }
}

// Handel Delete Address

const DeleteAddressData = (payload) => ({
    type : "DELETE_ADDRESS",
    payload
})

export const DeleteAddressDataHandler = (id, CbError) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get(`address/delete/${id}`);

            if(data.success) {
                dispatch(DeleteAddressData(data.data));
                window.location.reload();
            }

        }catch(error) {
            console.log(error.response);
            CbError && CbError();
        }
    }
}

// Handel Get User Address

const GetUserAddressData = (payload) => ({
    type : "GET_USER_ADDRESS",
    payload
})

export const GetUserAddressDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("address/all");

            if(data.success) {
                dispatch(GetUserAddressData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get User Address

const SetAddressDefault = (payload) => ({
    type : "SET_ADDRESS_DEFAULT",
    payload
})

export const SetAddressDefaultHandler = (formData, cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("address/set-default", formData);

            if(data.success) {
                dispatch(SetAddressDefault(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}