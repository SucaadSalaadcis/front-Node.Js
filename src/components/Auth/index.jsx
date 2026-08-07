import { useEffect } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { LocalKeys } from "@/helpers/Config";
import { useRouter } from "next/router";

const Auth = ({page}) => {

    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem(LocalKeys.TOKEN)) {

            router.push('/overview');
        }
    },[])

    return(
        <section className="auth">
            <div className="container">
                {
                    page === "login" && <LoginForm />
                }
                {
                    page === "sign-up" && <SignUpForm />
                }
                {
                    page === "forget" && <ForgotPasswordForm />
                }
            </div>
        </section>
    )
}

export default Auth;