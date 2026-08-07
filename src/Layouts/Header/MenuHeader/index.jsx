import CategoriesDropdown from "./CategoriesDropdown";
import MainMenu from "./MainMenu";
import SupportIcon from '../../../../public/images/icons/icon-headphone.svg';
import { useTranslation } from 'next-i18next';
import Image from "next/image";
import Link from "next/link";

const MenuHeader = () => {

    const { t } = useTranslation();

    return(
        <div className="menu-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <CategoriesDropdown />
                    </div>
                    <div className="col-md-8">
                        <MainMenu />
                    </div>
                    <div className="col-md-2">
                        <div className="support">
                            <Image src={SupportIcon} alt="Support" width={36} height={36} />
                            <div className="support-label">
                                <h4 className="title">
                                    <Link href="tel:19631">19631</Link>
                                </h4>
                                {/* <p className="text">{t('support_center')}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuHeader;