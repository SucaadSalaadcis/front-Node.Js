// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetCartDataHandler, AddToCartDataHandler } from '@/redux/actions/CartApi';
// import { AddWishlistDataHandler, DeleteWishlistDataHandler } from '@/redux/actions/WishlistApi';
// import { useTranslation } from 'next-i18next';
// import { LocalKeys } from '@/helpers/Config';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import FullStarRating from '@/utils/ProductBoxTwo/FullStarRating';
// import ShareProduct from './ShareProduct';
// import ProductQuantity from './ProductQuantity';
// import { toast } from 'react-toastify';

// const ProductContent = ({ content }) => {
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const { t, i18n } = useTranslation('product');
//     const { CartData } = useSelector(state => state.cartsData);
//     const weightUnit = router.locale === 'ar' ? 'جم' : 'g';

//     const [state, setState] = useState({
//         product_id: content.id,
//         quantity: content.prod_type === 'weight' ? content.min_weight : 1,
//     });

//     useEffect(() => {
//         setState({
//             product_id: content.id,
//             quantity: content.prod_type === 'weight' ? content.min_weight : 1,
//         });
//     }, [content.id]);

//     const [loader, setLoader] = useState(false);
//     const [isFav, setIsFav] = useState(false);
//     const [favLoader, setFavLoader] = useState(false);
//     const [showCartModel, setShowCartModel] = useState(false);

//     let PriceFormat = new Intl.NumberFormat();

//     const discountPercentage =
//         content?.discount > 0 && content?.unit_price > content?.discount
//             ? (((content.unit_price - content.discount) / content.unit_price) * 100).toFixed(2)
//             : 0;

//     useEffect(() => {
//         if (router.isReady && localStorage.getItem(LocalKeys.TOKEN)) {
//             setIsFav(!!content.hasFavorite);
//         }
//     }, [router, content.hasFavorite]);

//     const HandelChangeQTY = (QTY) => {
//         setState((old) => ({ ...old, quantity: QTY }));
//     }

//     // apply discount for weight products
//     const getDisplayPrice = () => {
//         if (content.prod_type === 'weight') {
//             const pricePerKg =
//                 content.discount > 0 ? content.discount : content.unit_price;

//             return ((pricePerKg / 1000) * state.quantity).toFixed(2);
//         }

//         return content.discount > 0
//             ? content.discount.toFixed(2)
//             : content.unit_price.toFixed(2);
//     }

//     return (
//         <div className="product-content">
//             <h1 className="product-title">{content?.name}</h1>

//             <div className="product-rate">
//                 <div className="rate-wrapper">
//                     <FullStarRating
//                         rate={content.reviewsCount === 0 ? 5 : content?.rating}
//                         size={20}
//                     />
//                     <span className='rating-label'>{content?.reviewsCount} {t('ratings')}</span>
//                 </div>
//                 <ShareProduct seoTitle={content?.meta_seo.title} />
//             </div>

//             <div className="product-price">
//                 {content?.prod_type === 'weight' ? (
//                     <>
//                         <span className="price">
//                             {t('egp')} {PriceFormat.format(getDisplayPrice())} / {state.quantity} {weightUnit}
//                         </span>

//                         {content.discount > 0 && (
//                             <>
//                                 <span className="after-sale">
//                                     {t('egp')} {PriceFormat.format(((content.unit_price / 1000) * state.quantity).toFixed(2))}
//                                 </span>

//                                 {discountPercentage > 0 && (
//                                     <span className='price-label'>
//                                         {discountPercentage}%
//                                     </span>
//                                 )}
//                             </>
//                         )}
//                     </>
//                 ) : (
//                     <>
//                         <span className="price">
//                             {PriceFormat.format(content?.discount > 0 ? content?.discount : content?.unit_price)} {t('egp')}
//                         </span>
//                         {content?.discount > 0 && (
//                             <span className="after-sale">
//                                 {PriceFormat.format(content?.unit_price)} {t('egp')}
//                             </span>
//                         )}
//                         {discountPercentage > 0 && (
//                             <span className='price-label'>
//                                 {discountPercentage}%
//                             </span>
//                         )}
//                     </>
//                 )}
//             </div>

//             <div className="product-code">
//                 <span className='code-label'>{t('model_number')} : </span> {content?.sku}
//             </div>

//             <div className="product-feats">
//                 <span className='feats-label'>{t('more')}</span>
//                 <Link href={`/categories/${content?.category.slug}`} className='feats-link'>{content?.category.name}</Link>
//             </div>

//             <div className="product-short-description">{content?.short_description}</div>

//                         {content.stock !== undefined && content.stock !== null && Number(content.stock) === 0 ?
//                 <div className="product-btns">
//                     <div className='out-of-stock'>{t('out_of_stock')}</div>
//                 </div>
//                 :
//                 <>
//                     <div className="product-btns">
//                         <ProductQuantity
//                             type={content.prod_type}
//                             stock={content.stock}
//                             minStock={content.min_weight}
//                             initialQuantity={state.quantity}
//                             HandelChange={HandelChangeQTY}
//                         />

//                         {loader ?
//                             <div className="submit-loader">
//                                 <i className="fi fi-rr-shopping-cart"></i> {t('add_to_cart')} <span className="loader"></span>
//                             </div>
//                             :
//                             <div className="add-to-cart" onClick={() => {
//                                 setLoader(true);
//                                 if (!localStorage.getItem(LocalKeys.TOKEN)) {
//                                     router.push('/login');
//                                     setLoader(false);
//                                 } else {
//                                     dispatch(
//                                         AddToCartDataHandler(
//                                             state,
//                                             () => {
//                                                 dispatch(GetCartDataHandler(() => {
//                                                     setShowCartModel(true);
//                                                     setLoader(false);
//                                                     toast.success('Added to cart');
//                                                 }));
//                                             },
//                                             (error) => {
//                                                 setLoader(false);
//                                                 if (error?.response?.status === 422) {
//                                                     toast(t('already_in_cart'), {
//                                                         style: { color: '#007bff' },
//                                                         icon: 'ℹ️'
//                                                     });
//                                                 } else {
//                                                     toast.error('Something went wrong');
//                                                 }
//                                             }
//                                         )
//                                     )
//                                 }
//                             }}>
//                                 <i className="fi fi-rr-shopping-cart"></i> {t('add_to_cart')}
//                             </div>
//                         }

//                         {favLoader ?
//                             <div className="add-to-fav">
//                                 <span className='fav-loader'></span>
//                             </div>
//                             :
//                             <div className="add-to-fav" onClick={() => {
//                                 if (!localStorage.getItem(LocalKeys.TOKEN)) {
//                                     router.push('/login')
//                                 } else {
//                                     setFavLoader(true);
//                                     isFav ?
//                                         dispatch(DeleteWishlistDataHandler(content.slug, () => {
//                                             setFavLoader(false);
//                                             setIsFav(false);
//                                         }))
//                                         :
//                                         dispatch(AddWishlistDataHandler(content.slug, () => {
//                                             setFavLoader(false);
//                                             setIsFav(true);
//                                         }))
//                                 }
//                             }}>
//                                 {isFav ? <i className="fi fi-sr-heart"></i> : <i className="fi fi-rs-heart"></i>}
//                             </div>
//                         }
//                     </div>

//                     <div className="product-btns-mobile">
//             {content.stock !== undefined && content.stock !== null && Number(content.stock) === 0 ?
//                             <div className='out-of-stock'>{t('out_of_stock')}</div>
//                             :
//                             <>
//                                 <ProductQuantity
//                                     type={content.prod_type}
//                                     stock={content.stock}
//                                     minStock={content.min_weight}
//                                     initialQuantity={state.quantity}
//                                     HandelChange={HandelChangeQTY}
//                                 />

//                                 {loader ?
//                                     <div className="submit-loader">
//                                         <i className="fi fi-rr-shopping-cart"></i> {t('add_to_cart')} <span className="loader"></span>
//                                     </div>
//                                     :
//                                     <div className="add-to-cart" onClick={() => {
//                                         setLoader(true);
//                                         if (!localStorage.getItem(LocalKeys.TOKEN)) {
//                                             router.push('/login');
//                                             setLoader(false);
//                                         } else {
//                                             dispatch(
//                                                 AddToCartDataHandler(
//                                                     state,
//                                                     () => {
//                                                         dispatch(GetCartDataHandler(() => {
//                                                             setShowCartModel(true);
//                                                             setLoader(false);
//                                                             toast.success(i18n.language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart');
//                                                         }));
//                                                     },
//                                                     (error) => {
//                                                         setLoader(false);
//                                                         if (error?.response?.status === 422) {
//                                                             toast(t('already_in_cart'), {
//                                                                 style: { color: '#007bff' },
//                                                                 icon: 'ℹ️'
//                                                             });
//                                                         } else {
//                                                             toast.error(i18n.language === 'ar' ? 'حدث خطأ ما' : 'Something went wrong');
//                                                         }
//                                                     }
//                                                 )
//                                             )
//                                         }
//                                     }}>
//                                         <i className="fi fi-rr-shopping-cart"></i> {t('add_to_cart')}
//                                     </div>
//                                 }
//                             </>
//                         }
//                     </div>
//                 </>
//             }
//         </div>
//     )
// }

// export default ProductContent;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartDataHandler, AddToCartDataHandler } from '@/redux/actions/CartApi';
import { AddWishlistDataHandler, DeleteWishlistDataHandler } from '@/redux/actions/WishlistApi';
import { useTranslation } from 'next-i18next';
import { LocalKeys } from '@/helpers/Config';
import { useRouter } from 'next/router';
import ShareProduct from './ShareProduct';
import ProductQuantity from './ProductQuantity';
import { toast } from 'react-toastify';

const ProductContent = ({ content }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('product');
    const { CartData } = useSelector(state => state.cartsData);
    const weightUnit = router.locale === 'ar' ? 'جم' : 'g';

    const [state, setState] = useState({
        product_id: content?.id,
        quantity: content?.prod_type === 'weight' ? content?.min_weight : 1,
    });

    useEffect(() => {
        if (content?.id) {
            setState({
                product_id: content.id,
                quantity: content.prod_type === 'weight' ? content.min_weight : 1,
            });
        }
    }, [content?.id]);

    const [loader, setLoader] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [favLoader, setFavLoader] = useState(false);

    let PriceFormat = new Intl.NumberFormat();

    useEffect(() => {
        if (router.isReady && localStorage.getItem(LocalKeys.TOKEN)) {
            setIsFav(!!content?.hasFavorite);
        }
    }, [router, content?.hasFavorite]);

    const HandelChangeQTY = (QTY) => {
        setState((old) => ({ ...old, quantity: QTY }));
    }

    const getDisplayPrice = () => {
        if (content?.prod_type === 'weight') {
            const pricePerKg = content.discount > 0 ? content.discount : content.unit_price;
            return ((pricePerKg / 1000) * state.quantity).toFixed(2);
        }

        return content?.discount > 0
            ? content.discount.toFixed(2)
            : content?.unit_price?.toFixed(2);
    }

    return (
        <div className="product-content flex flex-col font-sans text-gray-800 w-full">
            {/* Top Brand & Header Actions */}
            <div className="flex justify-between items-center mb-1 sm:mb-2">
                <Link 
                    href={`/categories/${content?.category?.slug}`} 
                    className="text-[#1D3E73] font-semibold text-xs sm:text-sm hover:underline"
                >
                    {content?.category?.name || content?.brand}
                </Link>

                <div className="flex items-center gap-3 text-gray-400">
                    <ShareProduct seoTitle={content?.meta_seo?.title} />
                    
                    <button 
                        onClick={() => {
                            if (!localStorage.getItem(LocalKeys.TOKEN)) {
                                router.push('/login');
                            } else {
                                setFavLoader(true);
                                isFav ?
                                    dispatch(DeleteWishlistDataHandler(content.slug, () => {
                                        setFavLoader(false);
                                        setIsFav(false);
                                    }))
                                    :
                                    dispatch(AddWishlistDataHandler(content.slug, () => {
                                        setFavLoader(false);
                                        setIsFav(true);
                                    }))
                            }
                        }}
                        className="hover:text-[#1D3E73] transition-colors"
                        disabled={favLoader}
                    >
                        {isFav ? (
                            <i className="fi fi-sr-heart text-red-500 text-base sm:text-lg"></i>
                        ) : (
                            <i className="fi fi-rs-heart text-base sm:text-lg"></i>
                        )}
                    </button>
                </div>
            </div>

            {/* Product Title */}
            <h1 className="text-base sm:text-lg font-bold uppercase tracking-tight text-gray-900 mb-2 sm:mb-3 leading-snug">
                {content?.name}
            </h1>

            {/* Price Line */}
            <div className="flex items-baseline gap-2 mb-4 sm:mb-6">
                <span className="text-[#1D3E73] font-bold text-base sm:text-lg">
                    {content?.prod_type === 'weight' ? (
                        <>{PriceFormat.format(getDisplayPrice())} {t('egp')} / {state.quantity} {weightUnit}</>
                    ) : (
                        <>{PriceFormat.format(content?.discount > 0 ? content?.discount : content?.unit_price)} {t('egp')}</>
                    )}
                </span>

                {content?.discount > 0 && (
                    <span className="text-gray-400 line-through text-xs sm:text-sm">
                        {content?.prod_type === 'weight'
                            ? PriceFormat.format(((content.unit_price / 1000) * state.quantity).toFixed(2))
                            : PriceFormat.format(content?.unit_price)
                        } {t('egp')}
                    </span>
                )}
            </div>

            {/* Quantity Controls & Add to Cart */}
            {content?.stock !== undefined && content?.stock !== null && Number(content?.stock) === 0 ? (
                <div className="bg-red-50 text-red-600 font-medium py-2.5 w-[200px] rounded-full text-center text-xs sm:text-sm mb-4 sm:mb-6">
                    {t('out_of_stock')}
                </div>
               
            ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 w-full">
                    <div className="w-full sm:w-auto flex justify-center sm:block flex-shrink-0">
                        <ProductQuantity
                            type={content?.prod_type}
                            stock={content?.stock}
                            minStock={content?.min_weight}
                            initialQuantity={state.quantity}
                            HandelChange={HandelChangeQTY}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setLoader(true);
                            if (!localStorage.getItem(LocalKeys.TOKEN)) {
                                router.push('/login');
                                setLoader(false);
                            } else {
                                dispatch(
                                    AddToCartDataHandler(
                                        state,
                                        () => {
                                            dispatch(GetCartDataHandler(() => {
                                                setLoader(false);
                                                toast.success(i18n.language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart');
                                            }));
                                        },
                                        (error) => {
                                            setLoader(false);
                                            if (error?.response?.status === 422) {
                                                toast(t('already_in_cart'), {
                                                    style: { color: '#007bff' },
                                                    icon: 'ℹ️'
                                                });
                                            } else {
                                                toast.error(i18n.language === 'ar' ? 'حدث خطأ ما' : 'Something went wrong');
                                            }
                                        }
                                    )
                                );
                            }
                        }}
                        disabled={loader}
                        className="w-full sm:flex-1 bg-[#1D3E73] hover:bg-[#34619E] text-white font-medium py-2.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm h-[40px] sm:h-[42px]"
                    >
                        {loader ? (
                            <>
                                <span>{t('add_to_cart')}</span>
                                <span className="loader border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                            </>
                        ) : (
                            t('add_to_cart')
                        )}
                    </button>
                </div>
            )}

            {/* Note Container */}
            {/* <div className="bg-[#EEF2F1] rounded-xl p-3 sm:p-3.5 mb-4 sm:mb-6 text-[11px] sm:text-xs leading-relaxed text-gray-700">
                <span className="font-bold text-gray-900">Please Note:</span> Weights for scalable items may vary slightly. Packaging may change based on availability.
            </div> */}

            {/* Specifications Section */}
            <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-900">
                    <span>Specifications</span>
                    <span className="text-gray-400 font-normal">—</span>
                </div>

                <div className="text-[11px] sm:text-xs text-gray-600 space-y-1.5 sm:space-y-2 mt-1">
                    {content?.category?.name && (
                        <div className="flex justify-between py-1 sm:py-1.5 border-b border-gray-50">
                            <span className="text-gray-400">Brand</span>
                            <span className="font-medium text-gray-800">{content?.category?.name}</span>
                        </div>
                    )}
                    {content?.sku && (
                        <div className="flex justify-between py-1 sm:py-1.5 bg-[#F9FAFB] px-2.5 sm:px-3 rounded">
                            <span className="text-gray-400">SKU</span>
                            <span className="font-medium text-gray-800">{content?.sku}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductContent;