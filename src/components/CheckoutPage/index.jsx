import CheckoutWizzard from "./CheckoutWizzard";
import { LocalKeys } from "@/helpers/Config";
import ShippingAddress from "./ShippingAddress";
import CheckoutPayment from "./CheckoutPayment";

const CheckoutPage = ({ steps, setSteps }) => {

    const HandelPaymentStep = (payment) => {
        setSteps(payment);
    }

    return(
        <div className="checkout-page">
            <CheckoutWizzard handelSteps={steps} />
            <div className="checkout-page-wrapper">
                <div className="checkout-info">
                    {
                        steps === 0 && <ShippingAddress paymentStep={HandelPaymentStep} setSteps={setSteps} />
                    }
                    {
                        steps === 1 && <CheckoutPayment  />
                    }
                    </div>
            </div>
        </div>
    )
}

export default CheckoutPage