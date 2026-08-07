import { axiosApi, LocalKeys } from "@/helpers/Config";
import { ShowTostHandler } from "@/helpers/Helpers";

// Handel Sign Up

const SignUpData = (payload) => ({
    type : "USER_SIGNUP",
    payload
})

export const SignUpDataHandler = (formData,cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("register", formData);

            if(data.success) {

                dispatch(SignUpData(data.data));
                localStorage.setItem(LocalKeys.TOKEN, data.data.token);
                localStorage.setItem(LocalKeys.USER_ID, data.data.user.id);
                if(localStorage.getItem(LocalKeys.PRDUCTS)) {
                    localStorage.removeItem(LocalKeys.PRDUCTS);
                }
                cb && cb();
            }

        }catch(error) {

            console.log(error.response);

            errorCb && errorCb(error.response?.data);

            if(error.response.data.message.mobile) {
                
                if(localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("رقم الهاتف تم استخدامه من قبل", "error");
                }else {
                    ShowTostHandler("The Phone Number Has Already Been Taken", "error");
                }
            }
            if(error.response.data.message.email) {

                if(localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("هذا البريد الالكتروني تم استخدامه من قبل", "error");
                }else {
                    ShowTostHandler("The Email Has Already Been Taken", "error");
                }
            }
        }
    }
}

// Handel Resend Activation OTP

export const ResendOtpDataHandler = (mobile, cb, errorCb) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosApi.post("send-otp", { mobile });
            if(data.success) {
                cb && cb(data);
            }
        } catch(error) {
            console.log(error.response);
            errorCb && errorCb(error.response?.data);
        }
    }
}

// Handel Verification Otp

const VerificationOtpData = (payload) => ({
    type : "VERIFICATION_OTP",
    payload
})

export const VerificationOtpDataHandler = (formData,cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("verification-otp", formData);

            if(data.success) {
                dispatch(VerificationOtpData(data.data));
                localStorage.setItem(LocalKeys.TOKEN, data.data.token);
                localStorage.setItem(LocalKeys.USER_ID, data.data.user.id);
                if(localStorage.getItem(LocalKeys.PRDUCTS)) {
                    localStorage.removeItem(LocalKeys.PRDUCTS);
                }
                cb && cb();
            }

        }catch(error) {

            console.log(error.response);

            errorCb && errorCb(error.response?.data);

            if(error.response.data.message.mobile) {
                
                if(localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("يرجي إدخال رقم هاتف صحيح", "error");
                }else {
                    ShowTostHandler("Please Provide a Valid Phone Number", "error");
                }
            }
        }
    }
}

// Handel Forget Password

const ForgetPasswordData = (payload) => ({
    type : "FORGET_PASSWORD",
    payload
})

export const ForgetPasswordDataHandler = (formData,cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("forgot-password", formData);

            if(data.success) {
                dispatch(ForgetPasswordData(data.data));
                cb && cb();
            }

        }catch(error) {

            console.log(error.response);

            errorCb && errorCb(error.response?.data);
        }
    }
}

// Handel Reset Password

const ResetPasswordData = (payload) => ({
    type : "FORGET_PASSWORD",
    payload
})

export const ResetPasswordDataHandler = (formData,cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("reset-password", formData);

            if(data.success) {
                dispatch(ResetPasswordData(data.data));
                cb && cb();
            }

        }catch(error) {

            console.log(error.response);

            errorCb && errorCb(error.response?.data);
        }
    }
}

// Handel Login

const LoginData = (payload) => ({
    type : "USER_LOGIN",
    payload
})

export const LoginDataHandler = (formData,cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("login", formData);

            if(data.success) {
                dispatch(LoginData(data.data));
                localStorage.setItem(LocalKeys.TOKEN, data.data.token);
                localStorage.setItem(LocalKeys.USER_ID, data.data.user.id);
                if(localStorage.getItem(LocalKeys.PRDUCTS)) {
                    localStorage.removeItem(LocalKeys.PRDUCTS);
                }
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
            errorCb && errorCb(error.response?.data);
            if(error.response.data.message.mobile) {
                
                if(localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("يرجي إدخال رقم هاتف صحيح", "error");
                }else {
                    ShowTostHandler("Please Provide a Valid Phone Number", "error");
                }
            }
            if(error.response.data.message === "api.Password_mismatch") {

                if(localStorage.getItem(LocalKeys.LANG) === "ar") {
                    ShowTostHandler("كلمة المرور غير صحيحة ، يرجى التحقق منها مرة أخرى", "error");
                }else {
                    ShowTostHandler("Password are incorrect, kindly check them again", "error");
                }
            }
        }
    }
}

// Handel Get User Data

const UserData = (payload) => ({
    type : "USER_DATA",
    payload
})

export const UserDataHandler = (cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("profile");

            if(data.success) {
                dispatch(UserData(data.data));
                cb && cb();
            }

        }catch(error) {
            console.log(error.response);
            errorCb && errorCb();
        }
    }
}

// Handel Update User Data

const UpdateUserData = (payload) => ({
    type : "UPDATE_USER_DATA",
    payload
})

export const UpdateUserDataHandler = (formData,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("profile/update-profile", formData);

            if(data.success) {
                dispatch(UpdateUserData(data.data));
                window.location.reload();
            }

        }catch(error) {
            console.log(error.response);
            errorCb && errorCb();
            if(error.response.data.message.mobile) {
                ShowTostHandler("The Phone Number Has Already been Taken", "error");
            }
            if(error.response.data.message.email) {
                ShowTostHandler("The Email Has Already been Taken", "error");
            }
        }
    }
}

// Handel Update User Passwords

const UpdatePasswordData = (payload) => ({
    type : "UPDATE_USER_PASSWORD",
    payload
})

export const UpdatePasswordDataHandler = (formData,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("profile/change-password", formData);

            if(data.success) {
                dispatch(UpdatePasswordData(data.data));
                window.location.reload();
            }

        }catch(error) {
            console.log(error.response);
            errorCb && errorCb();
            if(error.response.data.message === "Current Password does not match") {
                ShowTostHandler("Current Password are incorrect, kindly check them again", "error");
            }
        }
    }
}

// Handle Logout

const LogoutData = (payload) => ({
    type: "LOGOUT",
    payload: payload,
});

export const LogoutDataHandler = (cb,errorCb) => {

    return async (dispatch) => {

        try {

            const { data } = await axiosApi.post("logout");

            if(data.success){
                dispatch(LogoutData(data.data));
                localStorage.removeItem(LocalKeys.TOKEN);
                localStorage.removeItem(LocalKeys.USER_ID);
                cb && cb();
            }

        } catch (error) {
            console.log(error.response);
            errorCb && errorCb();
        }
    };
};