import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const CheckoutProductsSummary = ({data}) => {

    const { t } = useTranslation('payment');

    const linePrice = (item, overridePrice) => {
        const p = overridePrice !== undefined ? Number(overridePrice) : (Number(item.price) || 0);
        return item.product_type === 'weight' ? ((p / 1000) * item.quantity).toFixed(3) : p.toFixed(3);
    };

    const formatQty = (item) => {
        return item.product_type === 'weight' ? `${item.quantity} ${t('gm')}` : item.quantity;
    };

    const hasDiscount = (item) => Number(item.product_price) !== Number(item.price);

    return(
        <div className="products-summary">
            <h3 className="title">{t('products_summary')}</h3> 
            <div className="order-products">
                {
                    data.map(item => (
                        <div className="product-order-box d-flex align-items-start gap-3 py-3 border-bottom" key={item.id}>
                            <div className="product-img flex-shrink-0">
                                <Image src={item.product_thumbnail_image} alt={item.product_name} width={80} height={80} style={{objectFit:'contain'}} />
                            </div>
                            <div className="product-content flex-grow-1" style={{minWidth:0}}>
                                <h6 className="title mb-1" style={{fontSize:'14px', fontWeight:600, lineHeight:1.3}}>
                                    <Link href={`/${item.product_slug}`} style={{color:'inherit', textDecoration:'none'}}>{item.product_name}</Link>
                                </h6>
                                <div className="qty mb-1" style={{fontSize:'13px', color:'#666'}}>
                                    {item.product_type === 'weight' ? `${t('weight')}: ${formatQty(item)}` : `${t('qty')}: ${formatQty(item)}`}
                                </div>
                                <div className="price d-flex align-items-center gap-2 flex-wrap">
                                    <span style={{fontSize:'15px', fontWeight:700, color:'#e74c3c'}}>
                                        {linePrice(item)} {t('egp')}
                                    </span>
                                    {hasDiscount(item) && (
                                        <span className="sale" style={{fontSize:'13px', color:'#999', textDecoration:'line-through'}}>
                                            {linePrice(item, item.product_price)} {t('egp')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CheckoutProductsSummary;