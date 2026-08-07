import Link from "next/link";
import { useTranslation } from "next-i18next";

const BackToCart = () => {

    const { t } = useTranslation('checkout');

    return(
        <Link href="/cart" className="back-to-cart"><i className="fi fi-br-angle-left"></i> {t('back_to_cart')}</Link>
    )
}

export default BackToCart;