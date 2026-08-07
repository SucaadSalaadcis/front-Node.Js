import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const ProductsSummary = ({data}) => {

    const { t } = useTranslation('common');

    const linePrice = (item, price) => item.product?.prod_type === 'weight' ? ((price / 1000) * item.quantity).toFixed(2) : price;

    return(
        <section className="products-summary">
            <h3 className="title">{t('products_summary')}</h3> 
            <div className="order-products">
                {
                    data?.map(item => (
                        <div className="product-order-box" key={item.id}>
                            <div className="product-img">
                                <Image src={item.product.thumbnail_img} alt={item.product.name} width={112} height={112} />
                            </div>
                            <div className="product-content">
                                <h6 className="title">
                                    <Link href={`/${item.product.slug}`}>{item.product.name}</Link>
                                </h6>
                                <div className="qty">{item.product?.prod_type === 'weight' ? `${t('weight')}: ${item.quantity} ${t('gm')}` : `${t('qty')}: ${item.quantity}`}</div>
                                <div className="price">
                                    <span>{linePrice(item, item.product.price_after_discount)} {t('egp')}</span>
                                    {
                                        item.product.price_after_discount !== item.product.unit_price && <span className="sale">{linePrice(item, item.product.unit_price)} EGP</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    
    )
}

export default ProductsSummary;