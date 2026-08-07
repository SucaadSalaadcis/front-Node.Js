import { useState, useEffect } from "react";
import Link from "next/link";
import DeliveryIcon from '../../../../public/images/icons/fast-delivery.png';
import { SwitchLanghandler } from "@/helpers/Helpers";
import { useTranslation } from 'next-i18next';
import Image from "next/image";
import RegionsBox from "../RegionsBox";
import { LocalKeys } from "@/helpers/Config";

const TopHeaderMobile = () => {

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
        <div className="top-header-mobile">
            <div className="container">
                <ul className="lang">
                    <li>
                        <Link href="#" className="location" onClick={
                            (e) => {
                                e.preventDefault();
                                setShow(true);
                            }
                        }><span className="label"> <Image src={DeliveryIcon} alt="Fast Delivery" width={20} height={20} /> التوصيل من</span> 
                        {
                            state.city && state.region ? (
                                state.branch ? `${state.city} - ${state.region} (${state.branch})` : `${state.city} - ${state.region} (${t('header:branch_not_specified')})`
                            ) : (
                                t('header:city_region')
                            )
                        }
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="lang-text" onClick={SwitchLanghandler}>عربي</Link>
                    </li>
                </ul>
            </div>
            {
                show && 
                <RegionsBox 
                    onClose={() => setShow(false)} 
                    hasSaved={!!(state.city && state.region)} 
                />
            }
        </div>
    )
}

export default TopHeaderMobile;