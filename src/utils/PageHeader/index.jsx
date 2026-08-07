import Link from "next/link";
import { useTranslation } from "next-i18next";

const PageHeader = ({title, subTitle }) => {

    const { t } = useTranslation('common');

    return(
        <section className="page-header">
            <h1 className="title">{title}</h1>
            <div className="breadcrumb">
                <Link href="/" className="home">
                    <i className="fi fi-ss-home"></i> {t('home')} 
                </Link>  
                <i className="fi fi-rr-angle-small-right"></i>
                <span className="no-follow">{subTitle}</span>
            </div>
        </section>
    )
}

export default PageHeader;
