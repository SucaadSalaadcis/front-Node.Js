import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { RemoveCartDataHandler, UpdateCartDataHandler } from "@/redux/actions/CartApi";
import { useTranslation } from "next-i18next";

const CartProductBox = ({ data, CartUpdate }) => {
    const { t } = useTranslation('cart');
    const dispatch = useDispatch();

    const [deleteCart, setDeleteCart] = useState('');
    const [loader, setLoader] = useState(false);
    const [updatQTY, setUpdatQTY] = useState({
        product_id: data.product_id,
        quantity: data.quantity,
    });
    const [test, setTest] = useState(0);

    const step = data.product_type === "unit" ? 1 : data.product_min_weight;
    const maxQty = data.upper_limit;
    const minQty = data.product_type === "unit" ? 1 : step;

    // Round helper for weight products
    const roundQty = (qty) => {
        return data.product_type === "unit" ? qty : Number(qty.toFixed(3));
    };

    useEffect(() => {
        setUpdatQTY({
            product_id: data.product_id,
            quantity: data.quantity,
        });
    }, [data.product_id]);

    useEffect(() => {
        if (!loader) return;

        dispatch(UpdateCartDataHandler(
            updatQTY,
            () => {
                setTest(updatQTY.quantity + data.product_id);
                setLoader(false);
            },
            (err) => {
                console.warn("Stock limit reached for product:", data.product_name, err.message);
                setLoader(false);
            }
        ));
    }, [updatQTY]);

    useEffect(() => {
        CartUpdate(deleteCart, loader, test);
    }, [deleteCart, loader, test]);

    // Calculate final price
    const finalPrice = data.product_type === "unit"
        ? data.price * updatQTY.quantity
        : (data.price / 1000) * updatQTY.quantity;

    // Increase/decrease handlers with rounding
    const handleIncrease = () => {
        let nextQty = roundQty(updatQTY.quantity + step);
        if (nextQty > maxQty) nextQty = maxQty;
        if (nextQty === updatQTY.quantity) return;
        setLoader(true);
        setUpdatQTY(old => ({ ...old, quantity: nextQty }));
    };

    const handleDecrease = () => {
        if (updatQTY.quantity > minQty) {
            let nextQty = roundQty(updatQTY.quantity - step);
            if (nextQty < minQty) nextQty = minQty;
            setLoader(true);
            setUpdatQTY(old => ({ ...old, quantity: nextQty }));
        }
    };

    return (
        <div className="cart-product-box flex gap-4 border p-3 rounded-lg">

            {/* IMAGE */}
            <div className="product-img">
                <Link href={`/${data?.product_slug}`}>
                    <Image
                        src={data?.product_thumbnail_image}
                        alt={data?.product_name}
                        width={112}
                        height={112}
                    />
                </Link>
            </div>

            {/* CONTENT */}
            <div className="product-content flex-1">
                <h4 className="pro-name font-semibold">
                    <Link href={`/${data?.product_slug}`}>
                        {data?.product_name}
                    </Link>
                </h4>

                {/* QUANTITY */}
                <div className="qty-wrapper">

                    <button
                        className="qty-btn px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        onClick={handleDecrease}
                        disabled={loader}
                    >
                        −
                    </button>

                    <span className="qty-value font-semibold">
                        {data.product_type === "unit"
                            ? updatQTY.quantity
                            : `${roundQty(updatQTY.quantity)} g`}
                    </span>

                    <button
                        className={`qty-btn px-3 py-1 bg-gray-200 rounded disabled:opacity-50 ${updatQTY.quantity >= maxQty ? 'disabled-btn' : ''}`}
                        onClick={handleIncrease}
                    >
                        +
                    </button>

                </div>
            </div>

            {/* SIDE */}
            <div className="cart-feats flex flex-col justify-between items-end">

                {/* REMOVE */}
                <div
                    className="remove-product text-red-500"
                    onClick={() => {
                        setLoader(true);
                        dispatch(RemoveCartDataHandler(data?.product_id, () => {
                            setDeleteCart(data?.product_id);
                        }));
                    }}
                >
                    <i className="fi fi-rr-trash"></i>
                </div>

                {/* PRICE */}
                <div className="price font-bold">
                    {Number(finalPrice.toFixed(3))} {t('egp')}
                </div>

            </div>
        </div>
    );
};

export default CartProductBox;