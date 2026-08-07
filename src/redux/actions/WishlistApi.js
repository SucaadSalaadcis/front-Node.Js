import { axiosApi } from "@/helpers/Config";

// Handel Get Add Product Wishlist

const AddWishlistData = (payload) => ({
    type : "ADD_WISHLISTS",
    payload
})

export const AddWishlistDataHandler = (slug,cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post(`wishlists/store/${slug}`);

            if(data.success) {
                dispatch(AddWishlistData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Delete Product Wishlist

const DeleteWishlist = (payload) => ({
    type : "DELETE_WISHLISTS",
    payload
})

export const DeleteWishlistHandler = (slug,cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.delete(`wishlists/remove/${slug}`);

            if(data.success) {
                dispatch(DeleteWishlist(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get Delete From Product Wishlist

const DeleteWishlistData = (payload) => ({
    type : "REMOVE_WISHLISTS",
    payload
})

export const DeleteWishlistDataHandler = (slug,cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post(`wishlists/remove/${slug}`);

            if(data.success) {
                window.location.reload();
                dispatch(DeleteWishlistData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}

// Handel Get All Wishlist

const WishlistData = (payload) => ({
    type : "GET_WISHLISTS",
    payload
})

export const WishlistDataHandler = (cb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.get("wishlists");

            if(data.success) {
                dispatch(WishlistData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
        }
    }
}