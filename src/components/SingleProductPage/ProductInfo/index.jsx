import { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import CustomerReviews from "./CustomerReviews";
import { useTranslation } from 'next-i18next';
import DOMPurify from "dompurify";

const ProductInfo = ({data}) => {

    const { t } = useTranslation('product');

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return(
        <div className="product-info">
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1');  }}>{t('overview')}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3');  }}>{t('customer_reviews')}</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="product-long-description text-[#1D3E73] font-bold" dangerouslySetInnerHTML={{__html : DOMPurify.sanitize(data?.long_description || '')}}></div>
                </TabPane>
                <TabPane tabId="3">
                    <CustomerReviews UserReviews={data.reviews} />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default ProductInfo;