import Skeleton from 'react-loading-skeleton';

const ProductLoader = () => {

    return(
        <div className="product-loader">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <Skeleton className="product-badge" />
                </div>
                <div className="col-md-6">
                    <Skeleton className="sale"/>
                </div>
            </div>
            <div className="product-image">
                <Skeleton className="product-image-loader" />
            </div>
            <div className="product-name">
                <Skeleton className="name" />
            </div>
            <div className="product-price">
                <Skeleton className="price" />
            </div>
            <div className="product-rate">
                <Skeleton className="rate" />
            </div>
        </div>
    )
}

export default ProductLoader;