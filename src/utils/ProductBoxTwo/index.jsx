// import Image from "next/image";
// import Link from "next/link";
// import { useTranslation } from 'next-i18next';
// import RemoveIcon from '../../../public/images/icons/rubbish-bin.png';
// import { useDispatch } from "react-redux";
// import { DeleteWishlistDataHandler } from "@/redux/actions/WishlistApi";
// import { AddToCartDataHandler, GetCartDataHandler } from "@/redux/actions/CartApi";
// import HotOfferIcon from '../../../public/images/icons/hot-sale.png';
// // ponytail: replaced lucide-react with inline SVGs
// import FullStarRating from "./FullStarRating";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { LocalKeys } from "@/helpers/Config";
// import { toast } from "react-toastify";

// const ProductBoxTwo = ({ wrapperClass, id, name, slug, price, rate, image, discount, cat, page, hasOffer, isMagazine, stock, prodType, minWeight }) => {

//     const imgSrc = image || 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#f0f0f0" width="200" height="200"/><text fill="#999" font-size="14" x="50%" y="50%" text-anchor="middle" dominant-baseline="central">No Image</text></svg>');
//     const { t, i18n } = useTranslation();
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [cartLoader, setCartLoader] = useState(false);
//     const [showQtyModal, setShowQtyModal] = useState(false);
//     const [quantity, setQuantity] = useState(1);

//     const isWeight = prodType === 'weight';
//     const step = isWeight ? (minWeight || 100) : 1;
//     const weightUnit = i18n.language === 'ar' ? 'جم' : 'g';

//     // Round helper for weight products
//     const roundQty = (qty) => {
//         if (!isWeight) return qty;
//         return Number(qty.toFixed(3));
//     };

//     const handleOpenQtyModal = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (!localStorage.getItem(LocalKeys.TOKEN)) {
//             router.push('/login');
//             return;
//         }
//         setQuantity(Math.min(step, maxStock));
//         setShowQtyModal(true);
//     }

//     const handleConfirmAdd = () => {
//         setShowQtyModal(false);
//         setCartLoader(true);
//         dispatch(AddToCartDataHandler(
//             { product_id: id, quantity: roundQty(quantity) },
//             () => {
//                 dispatch(GetCartDataHandler(() => {
//                     setCartLoader(false);
//                     toast.success(i18n.language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to cart');
//                 }));
//             },
//             (error) => {
//                 setCartLoader(false);
//                 if (error?.response?.status === 422) {
//                     toast(t('product:already_in_cart'), { style: { color: '#007bff' }, icon: 'ℹ️' });
//                 } else {
//                     toast.error(i18n.language === 'ar' ? 'حدث خطأ ما' : 'Something went wrong');
//                 }
//             }
//         ));
//     }

//     const numStock = stock !== undefined && stock !== null ? Number(stock) : null;
//     const outOfStock = numStock === 0;

//     const maxStock = numStock ?? Infinity;

//     const lowStockPiece = !isWeight && numStock !== null && numStock > 0 && numStock <= 5;
//     const lowStockWeight = isWeight && numStock !== null && numStock > 0 && numStock <= 2000;

//     // Price display for weight products in card
//     const displayPrice = () => {
//         if (isWeight) {
//             const pricePerKg = discount > 0 ? discount : price;
//             const priceForMinWeight = ((pricePerKg / 1000) * step).toFixed(2);
//             return `${t('product:egp')} ${priceForMinWeight} / ${step} ${weightUnit}`;
//         }
//         return `${t('product:egp')} ${discount == 0 ? price : discount}`;
//     };

//     return (
//         <div className={wrapperClass}>
//             <div className={`product-box-two ${outOfStock ? 'opacity-50' : ''}`}>
//                 <Link href={`/${slug}`}>
//                     <div className="product-link">
//                         <div className="product-feats">
//                         {
//                             page === 'wishlist' &&
//                             <div className="remove-fav" onClick={
//                                 (e) => {
//                                     e.preventDefault();
//                                     dispatch(DeleteWishlistDataHandler(slug));
//                                 }
//                             }>
//                                 <Image src={RemoveIcon} alt="Remove Icon" width={20} height={20} />
//                             </div>
//                         }
//                         {
//                             hasOffer &&
//                             <div className="hot-deal">
//                                 <Image src={HotOfferIcon} alt="Remove Icon" width={50} height={50} />
//                             </div>
//                         }
//                         {isMagazine && (
//                             <div className="magazine-deal">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
//                             </div>
//                         )}
//                     </div>
//                     <div className="product-image">
//                         <Image src={imgSrc} alt={name} className="img-fluid" width={200} height={200} />
//                     </div>
//                     <div className="product-content">
//                         <span className="pro-cat">{cat}</span>
//                         <div className="product-name">{name}</div>
//                         <div className="product-price">
//                             <span className="regular-price">
//                                 {displayPrice()}
//                             </span>
//                             {
//                                 discount > 0 && !isWeight && <span className="after-sale">{t('product:egp')} {price}</span>
//                             }
//                         </div>
//                         {lowStockPiece && (
//                             <div className="low-stock-badge">
//                                 {i18n.language === 'ar' ? `متبقي ${numStock} قطع` : `${numStock} left`}
//                             </div>
//                         )}
//                         {lowStockWeight && (
//                             <div className="low-stock-badge">
//                                 {i18n.language === 'ar' ? `متبقي ${numStock / 1000} كيلو` : `${numStock / 1000} kg left`}
//                             </div>
//                         )}
//                     </div>
//                     </div>
//                 </Link>
//                 <div className="product-card-actions">
//                     {!outOfStock ? (
//                         <div className="product-card-cart" onClick={handleOpenQtyModal}>
//                             {cartLoader ?
//                                 <span className="cart-loader"></span>
//                                 :
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
//                             }
//                             <span>{t('product:add_to_cart')}</span>
//                         </div>
//                     ) : (
//                         <div className="product-card-out">
//                             <span>{i18n.language === 'ar' ? 'انتهى من المخزن' : 'Out of Stock'}</span>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {showQtyModal && (
//                 <div className="qty-modal-overlay" onClick={() => setShowQtyModal(false)}>
//                     <div className="qty-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <div className="qty-modal-header">
//                             <h3>{i18n.language === 'ar' ? 'اختر الكمية' : 'Choose Quantity'}</h3>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="qty-modal-close" onClick={() => setShowQtyModal(false)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
//                         </div>
//                         <div className="qty-modal-body">
//                             <div className="qty-modal-product">
//                                 <Image src={imgSrc} alt={name} width={80} height={80} className="qty-modal-img" />
//                                 <div className="qty-modal-info">
//                                     <span className="qty-modal-name">{name}</span>
//                                     <span className="qty-modal-price">
//                                         {isWeight ? (
//                                             <>
//                                                 {t('product:egp')} {(( (discount > 0 ? discount : price) / 1000) * quantity).toFixed(2)} / {roundQty(quantity)} {weightUnit}
//                                             </>
//                                         ) : (
//                                             `${t('product:egp')} ${discount == 0 ? price : discount}`
//                                         )}
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="qty-modal-stepper">
//                                 <button className="qty-stepper-btn" onClick={() => setQuantity(q => {
//                                     let newQty = q - step;
//                                     if (isWeight) {
//                                         newQty = Math.floor(newQty / step) * step;
//                                         if (newQty < step) newQty = step;
//                                     } else {
//                                         if (newQty < 1) newQty = 1;
//                                     }
//                                     return roundQty(newQty);
//                                 })}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
//                                 </button>
//                                 <span className="qty-stepper-value">
//                                     {isWeight ? `${roundQty(quantity)} ${weightUnit}` : quantity}
//                                 </span>
//                                 <button className="qty-stepper-btn" disabled={quantity >= maxStock} onClick={() => setQuantity(q => {
//                                     let newQty = q + step;
//                                     if (newQty > maxStock) newQty = maxStock;
//                                     return roundQty(newQty);
//                                 })}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="qty-modal-footer">
//                             <button className="qty-modal-cancel" onClick={() => setShowQtyModal(false)}>
//                                 {i18n.language === 'ar' ? 'إلغاء' : 'Cancel'}
//                             </button>
//                             <button className="qty-modal-confirm" onClick={handleConfirmAdd}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> {i18n.language === 'ar' ? 'تأكيد الإضافة' : 'Add to Cart'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
// export default ProductBoxTwo;




//
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import RemoveIcon from '../../../public/images/icons/rubbish-bin.png';
import { useDispatch, useSelector } from "react-redux";
import { DeleteWishlistDataHandler } from "@/redux/actions/WishlistApi";
import { 
    AddToCartDataHandler, 
    UpdateCartDataHandler, 
    RemoveCartDataHandler, 
    GetCartDataHandler 
} from "@/redux/actions/CartApi";
import HotOfferIcon from '../../../public/images/icons/hot-sale.png';
import FullStarRating from "./FullStarRating";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import { toast } from "react-toastify";

const ProductBoxTwo = ({ wrapperClass, id, name, slug, price, rate, image, discount, cat, page, hasOffer, isMagazine, stock, prodType, minWeight }) => {

    const imgSrc = image || 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#f0f0f0" width="200" height="200"/><text fill="#999" font-size="14" x="50%" y="50%" text-anchor="middle" dominant-baseline="central">No Image</text></svg>');
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();

    // Redux cart subscription
    const cartData = useSelector((state) => state.CartApi?.cartData || state.cart?.cartData || state.cart?.items || []);

    const [cartLoader, setCartLoader] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const isMounted = useRef(false);
    const isInCart = useRef(false);
    
    // Track the quantity value that was last synced to the backend
    const lastSyncedQty = useRef(0);

    const isWeight = prodType === 'weight';
    const step = isWeight ? (minWeight || 100) : 1;
    const weightUnit = i18n.language === 'ar' ? 'جم' : 'g';

    const numStock = stock !== undefined && stock !== null ? Number(stock) : null;
    const outOfStock = numStock === 0;
    const maxStock = numStock ?? Infinity;

    const lowStockPiece = !isWeight && numStock !== null && numStock > 0 && numStock <= 5;
    const lowStockWeight = isWeight && numStock !== null && numStock > 0 && numStock <= 2000;

    // Check if maximum available stock limit is reached
    const isMaxStockReached = numStock !== null && quantity >= numStock;

    // Round helper for weight products
    const roundQty = (qty) => {
        if (!isWeight) return qty;
        return Number(qty.toFixed(3));
    };

    // Keep stepper synchronized with Redux store state on mount/update
    useEffect(() => {
        if (Array.isArray(cartData)) {
            const existingItem = cartData.find((item) => 
                item.product_id === id || item.id === id || item.product?.id === id
            );
            if (existingItem) {
                const itemQty = Number(existingItem.quantity) || Number(existingItem.qty) || 0;
                setQuantity(itemQty);
                lastSyncedQty.current = itemQty;
                isInCart.current = true;
            } else {
                if (!isMounted.current) {
                    setQuantity(0);
                    lastSyncedQty.current = 0;
                    isInCart.current = false;
                }
            }
        }
    }, [cartData, id]);

    // Automatically sync quantity changes to backend after user stops clicking (+ / -)
    useEffect(() => {
        // Skip run on initial mount
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const syncTimer = setTimeout(() => {
            const validQty = roundQty(quantity);

            // Avoid dispatching API calls or showing toasts if quantity hasn't changed
            if (validQty === lastSyncedQty.current) {
                return;
            }

            // Lock in target quantity immediately to prevent duplicate runs on re-render
            const previousQty = lastSyncedQty.current;
            lastSyncedQty.current = validQty;

            // Case 1: Quantity dropped to 0 -> Remove item
            if (validQty <= 0) {
                if (isInCart.current) {
                    setCartLoader(true);
                    dispatch(RemoveCartDataHandler(id, () => {
                        isInCart.current = false;
                        lastSyncedQty.current = 0;
                        dispatch(GetCartDataHandler(() => setCartLoader(false)));
                    }));
                }
                return;
            }

            setCartLoader(true);

            // Case 2: Item wasn't in cart yet -> Initial Add API Call
            if (!isInCart.current) {
                dispatch(AddToCartDataHandler(
                    { product_id: id, quantity: validQty },
                    () => {
                        isInCart.current = true;
                        dispatch(GetCartDataHandler(() => setCartLoader(false)));
                    },
                    (error) => {
                        setCartLoader(false);
                        setQuantity(0);
                        lastSyncedQty.current = 0;
                        isInCart.current = false;
                        dispatch(GetCartDataHandler());
                    }
                ));
            } else {
                // Case 3: Item is already in cart -> Update API Call
                dispatch(UpdateCartDataHandler(
                    { product_id: id, quantity: validQty },
                    () => {
                        dispatch(GetCartDataHandler(() => {
                            setCartLoader(false);
                        }));
                        // Unique toastId prevents React-Toastify from duplicating toasts
                        toast.success(
                           i18n.language === 'ar' ? 'تمت إضافة المنتج إلى السلة' : 'Added to cart',
                            { toastId: `cart-update-${id}` }
                        );
                    },
                    (error) => {
                        lastSyncedQty.current = previousQty;
                        setCartLoader(false);
                        dispatch(GetCartDataHandler());
                        toast.error(
                            i18n.language === 'ar' ? 'حدث خطأ ما' : 'Something went wrong',
                            { toastId: `cart-error-${id}` }
                        );
                    }
                ));
            }
        }, 600);

        return () => clearTimeout(syncTimer);
    }, [quantity, id, dispatch, i18n.language]);

    // Fast initial add (UI updates instantly)
    const handleInitialAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!localStorage.getItem(LocalKeys.TOKEN)) {
            router.push('/login');
            return;
        }

        const initialQty = Math.min(step, maxStock);
        setQuantity(initialQty); 
    };

    const handleIncrease = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isMaxStockReached) return;

        setQuantity((prev) => {
            let newQty = prev + step;
            if (numStock !== null && newQty > numStock) {
                newQty = numStock;
            }
            return newQty;
        });
    };

    const handleDecrease = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuantity((prev) => {
            let newQty = prev - step;
            if (isWeight) {
                newQty = Math.floor(newQty / step) * step;
                if (newQty < step) newQty = 0;
            } else {
                if (newQty < 1) newQty = 0;
            }
            return newQty;
        });
    };

    // Price display for weight products in card
    const displayPrice = () => {
        if (isWeight) {
            const pricePerKg = discount > 0 ? discount : price;
            const priceForMinWeight = ((pricePerKg / 1000) * step).toFixed(2);
            return `${t('product:egp')} ${priceForMinWeight} / ${step} ${weightUnit}`;
        }
        return `${t('product:egp')} ${discount == 0 ? price : discount}`;
    };

    return (
        <div className={wrapperClass}>
            <div className={`product-box-two ${outOfStock ? 'opacity-50' : ''}`}>
                <Link href={`/${slug}`}>
                    <div className="product-link">
                        <div className="product-feats">
                            {page === 'wishlist' && (
                                <div className="remove-fav" onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(DeleteWishlistDataHandler(slug));
                                }}>
                                    <Image src={RemoveIcon} alt="Remove Icon" width={20} height={20} />
                                </div>
                            )}
                            {hasOffer && (
                                <div className="hot-deal">
                                    <Image src={HotOfferIcon} alt="Remove Icon" width={50} height={50} />
                                </div>
                            )}
                            {isMagazine && (
                                <div className="magazine-deal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                                </div>
                            )}
                        </div>
                        <div className="product-image">
                            <Image src={imgSrc} alt={name} className="img-fluid" width={200} height={200} />
                        </div>
                        <div className="product-content">
                            <span className="pro-cat">{cat}</span>
                            <div className="product-name">{name}</div>
                            <div className="product-price">
                                <span className="regular-price">
                                    {displayPrice()}
                                </span>
                                {discount > 0 && !isWeight && <span className="after-sale">{t('product:egp')} {price}</span>}
                            </div>
                            {lowStockPiece && (
                                <div className="low-stock-badge">
                                    {i18n.language === 'ar' ? `متبقي ${numStock} قطع` : `${numStock} left`}
                                </div>
                            )}
                            {lowStockWeight && (
                                <div className="low-stock-badge">
                                    {i18n.language === 'ar' ? `متبقي ${numStock / 1000} كيلو` : `${numStock / 1000} kg left`}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
                <div className="product-card-actions">
                    {!outOfStock ? (
                        quantity === 0 ? (
                            <div className="product-card-cart" onClick={handleInitialAdd}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                <span>{t('product:add_to_cart')}</span>
                            </div>
                        ) : (
                            <div className="qty-stepper-inline" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1.5px solid #1a3c8a',
                                borderRadius: '25px',
                                padding: '6px 16px',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <button className="qty-stepper-btn" onClick={handleDecrease} style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#1a3c8a',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 0
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                </button>
                                <span className="qty-stepper-value" style={{
                                    color: '#1a3c8a',
                                    fontWeight: '600',
                                    fontSize: '16px'
                                }}>
                                    {isWeight ? `${roundQty(quantity)} ${weightUnit}` : quantity}
                                </span>
                                <button 
                                    className="qty-stepper-btn" 
                                    disabled={isMaxStockReached} 
                                    onClick={handleIncrease} 
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#1a3c8a',
                                        cursor: isMaxStockReached ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 0,
                                        opacity: isMaxStockReached ? 0.3 : 1
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="product-card-out">
                            <span>{i18n.language === 'ar' ? 'انتهى من المخزن' : 'Out of Stock'}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductBoxTwo;