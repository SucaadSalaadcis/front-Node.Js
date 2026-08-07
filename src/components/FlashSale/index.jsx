// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, Plus, Minus, X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";

// import { MagazineProductsHandler } from "@/redux/actions/ProductsApi";
// import {
//   AddToCartDataHandler,
//   GetCartDataHandler,
// } from "@/redux/actions/CartApi";

// import { LocalKeys } from "@/helpers/Config";

// const safeSlice = (val, start = 0, end = 40) => {
//   if (!val) return "";
//   return typeof val === "string"
//     ? val.slice(start, end)
//     : String(val).slice(start, end);
// };

// export default function FlashSale() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { t, i18n } = useTranslation();

//   const { MagazineProductsData } = useSelector((state) => state.productsData);

//   const [cartLoader, setCartLoader] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showQtyModal, setShowQtyModal] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     dispatch(MagazineProductsHandler(1));
//   }, [dispatch]);

//   const categoryOrder = [
//     138, 139, 140, 141, 136, 110, 131, 111, 133, 114, 106, 107, 178, 109, 180,
//     112, 116, 118, 115, 113, 143, 181, 179, 182, 183, 108, 117, 119, 122, 129,
//     121, 123, 124, 126, 127, 159, 120, 125, 132, 134, 135, 137, 130, 145, 148,
//     149, 151, 152, 153, 166, 168, 175, 174, 173, 172, 171, 170, 169, 167, 165,
//     164, 162, 160, 157, 155, 150, 161, 103, 146, 147, 142, 156, 154, 128, 163,
//     158,
//   ];

//   const groupedMap = new Map();

//   (MagazineProductsData || []).forEach((item) => {
//     const categoryId = item.category_id;

//     if (!groupedMap.has(categoryId)) {
//       groupedMap.set(categoryId, {
//         id: categoryId,
//         products: [],
//       });
//     }

//     groupedMap.get(categoryId).products.push(item);
//   });

//   groupedMap.forEach((group) => {
//     group.products.sort((a, b) => {
//       const nameA =
//         a.translations?.find((t) => t.locale === i18n.language)?.name ||
//         a.name ||
//         "";

//       const nameB =
//         b.translations?.find((t) => t.locale === i18n.language)?.name ||
//         b.name ||
//         "";

//       return nameA.localeCompare(nameB, i18n.language);
//     });
//   });

//   const orderedProducts = Array.from(groupedMap.values())
//     .sort((a, b) => {
//       const aIndex = categoryOrder.indexOf(a.id);
//       const bIndex = categoryOrder.indexOf(b.id);

//       return (
//         (aIndex === -1 ? 99999 : aIndex) - (bIndex === -1 ? 99999 : bIndex)
//       );
//     })
//     .flatMap((group) => group.products);

//   // Same order as the magazine page
//   const products = orderedProducts.slice(0, 6);

//   const isWeight = selectedProduct?.prod_type === "weight";

//   const step = isWeight ? selectedProduct?.min_weight || 100 : 1;

//   const weightUnit = i18n.language === "ar" ? "جم" : "g";

//   const maxStock =
//     selectedProduct?.stock != null ? Number(selectedProduct.stock) : Infinity;

//   const roundQty = (qty) => {
//     if (!isWeight) return qty;
//     return Number(qty.toFixed(3));
//   };

//   const handleOpenQtyModal = (e, item) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!localStorage.getItem(LocalKeys.TOKEN)) {
//       router.push("/login");
//       return;
//     }

//     setSelectedProduct(item);
//     setQuantity(
//       Math.min(
//         item.prod_type === "weight" ? item.min_weight || 100 : 1,
//         Number(item.stock) || Infinity,
//       ),
//     );

//     setShowQtyModal(true);
//   };

//   const handleConfirmAdd = () => {
//     if (!selectedProduct) return;

//     setCartLoader(true);

//     dispatch(
//       AddToCartDataHandler(
//         {
//           product_id: selectedProduct.id,
//           quantity: roundQty(quantity),
//         },
//         () => {
//           dispatch(
//             GetCartDataHandler(() => {
//               setCartLoader(false);
//               setShowQtyModal(false);

//               toast.success(
//                 i18n.language === "ar"
//                   ? "تمت الإضافة إلى السلة"
//                   : "Added to cart",
//               );
//             }),
//           );
//         },
//         (error) => {
//           setCartLoader(false);

//           if (error?.response?.status === 422) {
//             toast.info(t("product:already_in_cart"));
//           } else {
//             toast.error(
//               i18n.language === "ar" ? "حدث خطأ" : "Something went wrong",
//             );
//           }
//         },
//       ),
//     );
//   };
//   return (
//     <>
//       <section className="my-8">
//         <div className="mx-auto max-w-7xl px-4">
//           <div className="relative overflow-hidden rounded-[24px] bg-[#1D3E73] p-4 sm:p-6">
//             {/* Decorative circles */}
//             <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/5" />
//             <div className="absolute right-6 top-2 h-20 w-20 rounded-full bg-white/5" />

//             {/* Magazine Header */}
//             <div className="relative z-10 mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//               {/* Left Side */}
//               <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
//                 {/* Icon */}
//                 <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#FFD54F] to-[#FFC107] shadow-xl shadow-yellow-500/30 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-10 w-10 sm:h-12 sm:w-12 lg:h-[68px] lg:w-[68px]"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#1D3E73"
//                     strokeWidth="2.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <line x1="19" y1="5" x2="5" y2="19" />
//                     <circle cx="6.5" cy="6.5" r="2.5" />
//                     <circle cx="17.5" cy="17.5" r="2.5" />
//                   </svg>
//                 </div>

//                 {/* Text */}
//                 <div className="space-y-2">
//                   <span className="block text-[11px] font-semibold uppercase tracking-[3px] text-white/60 sm:text-xs sm:tracking-[4px]">
//                     {i18n.language === "ar" ? "قسم المجلة" : "MAGAZINE SECTION"}
//                   </span>

//                   <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
//                     {i18n.language === "ar"
//                       ? "مجلة الفرجاني"
//                       : "El Fergany Magazine"}
//                   </h2>

//                   <p className="max-w-xl text-sm leading-6 text-white/70">
//                     {i18n.language === "ar"
//                       ? "اكتشف أحدث عروض ومنتجات مجلة الفرجاني"
//                       : "Discover the latest offers from ElFergany Magazine"}
//                   </p>
//                 </div>
//               </div>

//               {/* Button */}
//               <Link
//                 href="/elfergany-magazine"
//                 className="w-full sm:w-auto lg:self-center"
//               >
//                 <button className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#2854B8] transition hover:scale-105 hover:bg-gray-100 sm:w-auto">
//                   {t("common:view_all")}
//                 </button>
//               </Link>
//             </div>

//             {/* Products */}
//             <div className="relative z-10 rounded-2xl bg-white p-3 shadow-lg">
//               <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//                 {products.map((item) => {
//                   const translation = item.translations?.find(
//                     (x) => x.locale === i18n.language,
//                   );

//                   const finalPrice =
//                     item.price_after_discount || item.unit_price;

//                   const outOfStock = Number(item.stock) === 0;

//                   return (
//                     <Link
//                       key={item.id}
//                       href={`/${item.slug}`}
//                       prefetch={false}
//                       className="group block w-[165px] min-w-[165px] flex-shrink-0 sm:w-[185px] sm:min-w-[185px] lg:w-[195px] lg:min-w-[195px]"
//                     >
//                       <div className="relative rounded-2xl border border-gray-100 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
//                         {/* Heart */}
//                         <button
//                           onClick={(e) => e.preventDefault()}
//                           className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white"
//                         >
//                           <Heart size={14} className="text-[#2854B8]" />
//                         </button>

//                         {/* Image */}
//                         <div className="relative flex h-24 items-center justify-center">
//                           <img
//                             src={item.thumbnail_img}
//                             alt={translation?.name}
//                             className="h-20 w-20 object-contain transition duration-300 group-hover:scale-105"
//                           />

//                           {!outOfStock && (
//                             <button
//                               onClick={(e) => handleOpenQtyModal(e, item)}
//                               className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2854B8] transition hover:bg-[#2854B8] hover:text-white"
//                             >
//                               <Plus size={15} />
//                             </button>
//                           )}
//                         </div>

//                         {/* Name */}
//                         <h3 className="mt-2 h-9 overflow-hidden text-[12px] font-medium leading-4 text-gray-800">
//                           {safeSlice(translation?.name || item.name)}
//                         </h3>

//                         {/* Price */}
//                         <div className="mt-2 flex items-center gap-2">
//                           <span className="text-[14px] font-bold">
//                             {t("product:egp")} {finalPrice}
//                           </span>

//                           {item.price_after_discount > 0 && (
//                             <span className="text-[10px] text-gray-400 line-through">
//                               {t("product:egp")} {item.unit_price}
//                             </span>
//                           )}
//                         </div>

//                         {/* Stock */}
//                         {outOfStock && (
//                           <div className="mt-2 rounded-md bg-red-50 py-1 text-center text-[11px] font-medium text-red-500">
//                             {i18n.language === "ar"
//                               ? "نفذت الكمية"
//                               : "Out of Stock"}
//                           </div>
//                         )}
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Quantity Modal */}
//       {showQtyModal && selectedProduct && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
//           onClick={() => setShowQtyModal(false)}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
//           >
//             {/* Header */}
//             <div className="mb-5 flex items-center justify-between">
//               <h3 className="text-lg font-bold">
//                 {i18n.language === "ar" ? "اختر الكمية" : "Choose Quantity"}
//               </h3>

//               <button
//                 onClick={() => setShowQtyModal(false)}
//                 className="rounded-full p-1 hover:bg-gray-100"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Product */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={selectedProduct.thumbnail_img}
//                 alt={selectedProduct.name}
//                 className="h-20 w-20 object-contain"
//               />

//               <div className="flex-1">
//                 <h4 className="text-sm font-semibold">
//                   {selectedProduct.translations?.find(
//                     (x) => x.locale === i18n.language,
//                   )?.name || selectedProduct.name}
//                 </h4>

//                 <p className="mt-1 text-[#2854B8] font-bold">
//                   {isWeight
//                     ? `${t("product:egp")} ${(
//                         ((selectedProduct.price_after_discount ||
//                           selectedProduct.unit_price) /
//                           1000) *
//                         quantity
//                       ).toFixed(2)}`
//                     : `${t("product:egp")} ${
//                         selectedProduct.price_after_discount ||
//                         selectedProduct.unit_price
//                       }`}
//                 </p>
//               </div>
//             </div>

//             {/* Quantity */}
//             <div className="mt-8 flex items-center justify-center gap-5">
//               <button
//                 onClick={() =>
//                   setQuantity((q) => {
//                     let newQty = q - step;

//                     if (isWeight) {
//                       newQty = Math.floor(newQty / step) * step;

//                       if (newQty < step) newQty = step;
//                     } else {
//                       if (newQty < 1) newQty = 1;
//                     }

//                     return roundQty(newQty);
//                   })
//                 }
//                 className="flex h-11 w-11 items-center justify-center rounded-full border"
//               >
//                 <Minus size={18} />
//               </button>

//               <span className="min-w-[90px] text-center text-lg font-bold">
//                 {isWeight ? `${quantity} ${weightUnit}` : quantity}
//               </span>

//               <button
//                 disabled={quantity >= maxStock}
//                 onClick={() =>
//                   setQuantity((q) => {
//                     let newQty = q + step;

//                     if (newQty > maxStock) newQty = maxStock;

//                     return roundQty(newQty);
//                   })
//                 }
//                 className="flex h-11 w-11 items-center justify-center rounded-full border"
//               >
//                 <Plus size={18} />
//               </button>
//             </div>

//             {/* Footer */}
//             <div className="mt-8 flex gap-3">
//               <button
//                 onClick={() => setShowQtyModal(false)}
//                 className="flex-1 rounded-xl border py-3 font-semibold"
//               >
//                 {i18n.language === "ar" ? "إلغاء" : "Cancel"}
//               </button>

//               <button
//                 onClick={handleConfirmAdd}
//                 disabled={cartLoader}
//                 className="flex-1 rounded-xl bg-[#2854B8] py-3 font-semibold text-white hover:bg-[#1f46a5]"
//               >
//                 {cartLoader
//                   ? i18n.language === "ar"
//                     ? "جارٍ الإضافة..."
//                     : "Adding..."
//                   : i18n.language === "ar"
//                     ? "إضافة للسلة"
//                     : "Add to Cart"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



//////
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { MagazineProductsHandler } from "@/redux/actions/ProductsApi";
import {
  AddToCartDataHandler,
  GetCartDataHandler,
} from "@/redux/actions/CartApi";

import { LocalKeys } from "@/helpers/Config";

const safeSlice = (val, start = 0, end = 40) => {
  if (val === null || val === undefined) return "";
  return typeof val === "string"
    ? val.slice(start, end)
    : String(val).slice(start, end);
};

export default function FlashSale() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { MagazineProductsData } = useSelector((state) => state.productsData);

  const [cartLoader, setCartLoader] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(MagazineProductsHandler(1));
  }, [dispatch]);

  const categoryOrder = [
    138, 139, 140, 141, 136, 110, 131, 111, 133, 114, 106, 107, 178, 109, 180,
    112, 116, 118, 115, 113, 143, 181, 179, 182, 183, 108, 117, 119, 122, 129,
    121, 123, 124, 126, 127, 159, 120, 125, 132, 134, 135, 137, 130, 145, 148,
    149, 151, 152, 153, 166, 168, 175, 174, 173, 172, 171, 170, 169, 167, 165,
    164, 162, 160, 157, 155, 150, 161, 103, 146, 147, 142, 156, 154, 128, 163,
    158,
  ];

  // Group and sort products identically to the magazine page
  const groupedMap = new Map();

  (MagazineProductsData || []).forEach((item) => {
    const categoryId = item.category_id;

    if (!groupedMap.has(categoryId)) {
      groupedMap.set(categoryId, {
        id: categoryId,
        name: item.category?.name || "N/A",
        products: [],
      });
    }

    groupedMap.get(categoryId).products.push(item);
  });

  const locale = router.locale || "ar";

  groupedMap.forEach((group) => {
    group.products.sort((a, b) => {
      const nameA =
        a.translations?.find((t) => t.locale === locale)?.name || a.name || "";

      const nameB =
        b.translations?.find((t) => t.locale === locale)?.name || b.name || "";

      return nameA.localeCompare(nameB, locale);
    });
  });

  const groupedProducts = Array.from(groupedMap.values()).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.id);
    const bIndex = categoryOrder.indexOf(b.id);

    return (aIndex === -1 ? 99999 : aIndex) - (bIndex === -1 ? 99999 : bIndex);
  });

  const flatProducts = groupedProducts.flatMap((cat) => cat.products);
  const products = flatProducts.slice(0, 6);

  // Modal logic & state calculations
  const isWeight = selectedProduct?.prod_type === "weight";
  const step = isWeight ? selectedProduct?.min_weight || 100 : 1;
  const weightUnit = i18n.language === "ar" ? "جم" : "g";

  const numStock =
    selectedProduct?.stock !== undefined && selectedProduct?.stock !== null
      ? Number(selectedProduct.stock)
      : null;
  const maxStock = numStock ?? Infinity;

  const roundQty = (qty) => {
    if (!isWeight) return qty;
    return Number(qty.toFixed(3));
  };

  const handleOpenQtyModal = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!localStorage.getItem(LocalKeys.TOKEN)) {
      router.push("/login");
      return;
    }

    const itemIsWeight = item.prod_type === "weight";
    const itemStep = itemIsWeight ? item.min_weight || 100 : 1;
    const itemStock =
      item.stock !== undefined && item.stock !== null
        ? Number(item.stock)
        : Infinity;

    setSelectedProduct(item);
    setQuantity(Math.min(itemStep, itemStock));
    setShowQtyModal(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedProduct) return;

    setShowQtyModal(false);
    setCartLoader(true);

    dispatch(
      AddToCartDataHandler(
        {
          product_id: selectedProduct.id,
          quantity: roundQty(quantity),
        },
        () => {
          dispatch(
            GetCartDataHandler(() => {
              setCartLoader(false);

              toast.success(
                i18n.language === "ar"
                  ? "تمت الإضافة إلى السلة"
                  : "Added to cart",
              );
            }),
          );
        },
        (error) => {
          setCartLoader(false);

          if (error?.response?.status === 422) {
            toast(t("product:already_in_cart"), {
              style: { color: "#007bff" },
              icon: "ℹ️",
            });
          } else {
            toast.error(
              i18n.language === "ar" ? "حدث خطأ ما" : "Something went wrong",
            );
          }
        },
      ),
    );
  };

  const selectedName =
    selectedProduct?.translations?.find((x) => x.locale === i18n.language)
      ?.name || selectedProduct?.name;

  const selectedPrice = selectedProduct?.unit_price || 0;
  const selectedDiscount = selectedProduct?.price_after_discount || 0;

  return (
    <>
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-[24px] bg-[#1D3E73] p-4 sm:p-6">
            {/* Background elements */}
            <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/5" />
            <div className="absolute right-6 top-2 h-20 w-20 rounded-full bg-white/5" />

            {/* Header */}
            <div className="relative z-10 mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 sm:h-12 sm:w-12 lg:h-[68px] lg:w-[68px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFC107" // or #FFD54F
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="5" x2="5" y2="19" />
                    <circle cx="6.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="block text-[11px] font-semibold uppercase tracking-[3px] text-white/60 sm:text-xs sm:tracking-[4px]">
                    {i18n.language === "ar" ? "قسم المجلة" : "MAGAZINE SECTION"}
                  </span>

                  <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {i18n.language === "ar"
                      ? "مجلة الفرجاني"
                      : "El Fergany Magazine"}
                  </h2>

                  <p className="max-w-xl text-sm leading-6 text-white/70">
                    {i18n.language === "ar"
                      ? "اكتشف أحدث عروض ومنتجات مجلة الفرجاني"
                      : "Discover the latest offers from ElFergany Magazine"}
                  </p>
                </div>
              </div>

              <Link
                href="/elfergany-magazine"
                className="w-full sm:w-auto lg:self-center"
              >
                <button className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#2854B8] transition hover:scale-105 hover:bg-gray-100 sm:w-auto">
                  {t("common:view_all")}
                </button>
              </Link>
            </div>

            {/* Product Slider Container */}
            <div className="relative z-10 rounded-2xl bg-white p-3 shadow-lg">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {products.map((item) => {
                  const translation = item.translations?.find(
                    (x) => x.locale === (router.locale || "ar"),
                  );

                  const isItemWeight = item.prod_type === "weight";
                  const itemMinWeight = item.min_weight || 100;
                  const itemWeightUnit = i18n.language === "ar" ? "جم" : "g";

                  // Weight price calculation (Price based on min weight unit)
                  const unitPrice = item.unit_price;
                  const discountPrice = item.price_after_discount;

                  const calculatedPrice = isItemWeight
                    ? ((discountPrice > 0 ? discountPrice : unitPrice) / 1000) *
                      itemMinWeight
                    : discountPrice > 0
                      ? discountPrice
                      : unitPrice;

                  const originalPrice = isItemWeight
                    ? (unitPrice / 1000) * itemMinWeight
                    : unitPrice;

                  const outOfStock = Number(item.stock) === 0;

                  return (
                    <Link
                      key={item.id}
                      href={`/${item.slug}`}
                      prefetch={false}
                      className="group block w-[165px] min-w-[165px] flex-shrink-0 sm:w-[185px] sm:min-w-[185px] lg:w-[195px] lg:min-w-[195px]"
                    >
                      <div className="relative rounded-2xl border border-gray-100 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white"
                        >
                          <Heart size={14} className="text-[#2854B8]" />
                        </button>

                        <div className="relative flex h-24 items-center justify-center">
                          <img
                            src={item.thumbnail_img}
                            alt={translation?.name}
                            className="h-20 w-20 object-contain transition duration-300 group-hover:scale-105"
                          />

                          {!outOfStock && (
                            <button
                              onClick={(e) => handleOpenQtyModal(e, item)}
                              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2854B8] transition hover:bg-[#2854B8] hover:text-white"
                            >
                              <Plus size={15} />
                            </button>
                          )}
                        </div>

                        <h3 className="mt-2 h-9 overflow-hidden text-[12px] font-medium leading-4 text-gray-800">
                          {safeSlice(translation?.name || item.name, 0, 50)}
                        </h3>

                        {/* Price formatted like ProductBoxTwo: EGP XX.XX / 50 g */}
                        <div className="mt-2 flex flex-wrap items-center gap-1 text-[13px] font-bold">
                          <span>
                            {t("product:egp")} {calculatedPrice.toFixed(2)}
                            {isItemWeight &&
                              ` / ${itemMinWeight} ${itemWeightUnit}`}
                          </span>

                          {discountPrice > 0 && (
                            <span className="text-[10px] text-gray-400 line-through">
                              {t("product:egp")} {originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {outOfStock && (
                          <div className="mt-2 rounded-md bg-red-50 py-1 text-center text-[11px] font-medium text-red-500">
                            {i18n.language === "ar"
                              ? "نفذت الكمية"
                              : "Out of Stock"}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantity Modal */}
      {showQtyModal && selectedProduct && (
        <div
          className="qty-modal-overlay"
          onClick={() => setShowQtyModal(false)}
        >
          <div
            className="qty-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="qty-modal-header">
              <h3>
                {i18n.language === "ar" ? "اختر الكمية" : "Choose Quantity"}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="qty-modal-close"
                onClick={() => setShowQtyModal(false)}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <div className="qty-modal-body">
              <div className="qty-modal-product">
                <Image
                  src={selectedProduct.thumbnail_img}
                  alt={selectedName}
                  width={80}
                  height={80}
                  className="qty-modal-img"
                />
                <div className="qty-modal-info">
                  <span className="qty-modal-name">{selectedName}</span>
                  <span className="qty-modal-price">
                    {isWeight ? (
                      <>
                        {t("product:egp")}{" "}
                        {(
                          ((selectedDiscount > 0
                            ? selectedDiscount
                            : selectedPrice) /
                            1000) *
                          quantity
                        ).toFixed(2)}{" "}
                        / {roundQty(quantity)} {weightUnit}
                      </>
                    ) : (
                      `${t("product:egp")} ${
                        selectedDiscount == 0 ? selectedPrice : selectedDiscount
                      }`
                    )}
                  </span>
                </div>
              </div>

              <div className="qty-modal-stepper">
                <button
                  className="qty-stepper-btn"
                  onClick={() =>
                    setQuantity((q) => {
                      let newQty = q - step;
                      if (isWeight) {
                        newQty = Math.floor(newQty / step) * step;
                        if (newQty < step) newQty = step;
                      } else {
                        if (newQty < 1) newQty = 1;
                      }
                      return roundQty(newQty);
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <span className="qty-stepper-value">
                  {isWeight ? `${roundQty(quantity)} ${weightUnit}` : quantity}
                </span>

                <button
                  className="qty-stepper-btn"
                  disabled={quantity >= maxStock}
                  onClick={() =>
                    setQuantity((q) => {
                      let newQty = q + step;
                      if (newQty > maxStock) newQty = maxStock;
                      return roundQty(newQty);
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="qty-modal-footer">
              <button
                className="qty-modal-cancel"
                onClick={() => setShowQtyModal(false)}
              >
                {i18n.language === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button className="qty-modal-confirm" onClick={handleConfirmAdd}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>{" "}
                {i18n.language === "ar" ? "تأكيد الإضافة" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
