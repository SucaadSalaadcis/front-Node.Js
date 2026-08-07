import { useState, useEffect } from "react";
import Link from "next/link";
import { SwitchLanghandler } from "@/helpers/Helpers";
import { useTranslation } from 'next-i18next';
import Image from "next/image";
import RegionsBox from "../RegionsBox";
import DeliveryIcon from '../../../../public/images/icons/fast-delivery.png';
import { LocalKeys } from "@/helpers/Config";
import { useRouter } from "next/router";

const TopHeader = () => {

    const router = useRouter();

    const { t } = useTranslation();

    const [ show, setShow ] = useState(false);

    const [ state, setState ] = useState({
        city : "",
        region : "",
        branch : "",
    });

    useEffect(() => {

        if(!localStorage.getItem(LocalKeys.CITY_NAME) && !localStorage.getItem(LocalKeys.REGION_NAME)){
            setShow(true);
        }

        setState({
            city : localStorage.getItem(LocalKeys.CITY_NAME),
            region : localStorage.getItem(LocalKeys.REGION_NAME),
            branch : localStorage.getItem(LocalKeys.BRANCH_NAME),
        })
    },[])

    return(
        // <div className="top-header">
        //     <div className="container">
        //         <div className="row align-items-center">
        //             <div className="col-md-6 col-12">
        //                 <ul className="company-menu">
        //                     <li>
        //                         <Link href="/about-us">{t('menu:about_us')}</Link>
        //                     </li>
        //                     <li>
        //                         <Link href="/contact-us">{t('menu:customer_suppourt')}</Link>
        //                     </li>
        //                 </ul>
        //             </div>
        //             <div className="col-md-6 col-12">
        //                 <ul className="lang">
        //                     <li>
        //                         <Link href="#" className="location" onClick={
        //                             (e) => {
        //                                 e.preventDefault();
        //                                 setShow(true);
        //                             }
        //                         }><span className="label"> <Image src={DeliveryIcon} alt="Fast Delivery" width={20} height={20} /> {t('header:delivery_to')}</span> 
        //                         {
        //                             state.city && state.region ? (
        //                                 state.branch ? `${state.city} - ${state.region} (${state.branch})` : `${state.city} - ${state.region} (${t('header:branch_not_specified')})`
        //                             ) : (
        //                                 t('header:city_region')
        //                             )
        //                         }
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         {
        //                             router.locale == 'ar' ?
        //                             <Link href="#" className="lang-text" onClick={SwitchLanghandler}>English</Link>
        //                             :
        //                             <Link href="#" className="lang-text" onClick={SwitchLanghandler}>عربي</Link>
        //                         }
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        //     {
        //         show && 
        //         <RegionsBox 
        //             onClose={() => setShow(false)} 
        //             hasSaved={!!(state.city && state.region)} 
        //         />
        //     }
        // </div>
        <div>Hello, World! , from topHeader </div>
    )
}

export default TopHeader;

