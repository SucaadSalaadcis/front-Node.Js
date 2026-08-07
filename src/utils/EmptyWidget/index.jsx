import Image from "next/image";
import OrderEmptyIcon from '../../../public/images/icons/empty-order.svg';
import WishlistEmptyIcon from '../../../public/images/icons/empty-wishlist.svg';
import AddressEmptyIcon from '../../../public/images/icons/empty-address.svg';
import Link from "next/link";
import { useTranslation } from "next-i18next";

const EmptyWidget = ({link}) => {

    const { t } = useTranslation();

    return(
        <div className="empty-widget">
            {
                link === "order" && <Image src={OrderEmptyIcon} alt="Empty Widget" width={250.6} height={152.8} />
            }
            {
                link === "wishlist" && <Image src={WishlistEmptyIcon} alt="Empty Widget" width={250.6} height={152.8} />
            }
            {
                link === "address" && <Image src={AddressEmptyIcon} alt="Empty Widget" width={250.6} height={152.8} />
            }
            
            {
                link === "address" ? 
                <Link href="/my-address/add" className="label">
                    {t('address:add_new_address')} 
                </Link>
                 :
                <Link href="/search" className="label">
                    {t('overview:browse_products')} 
                </Link>
            }
        </div>
    )
}

export default EmptyWidget;