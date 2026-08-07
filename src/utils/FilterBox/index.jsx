// import React, { useState, useEffect } from "react";
// import { useTranslation } from "next-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFlashSale } from "@/redux/actions/FlashSaleApi";
// import Link from "next/link";

// const FlashSale = () => {
//   const { i18n, t } = useTranslation("common");
//   const dispatch = useDispatch();

//   const flashSaleData = useSelector(
//     (state) => state.flashSale?.FlashSaleData
//   );

//   const [loading, setLoading] = useState(true);

//   const isArabic = i18n.language?.startsWith("ar");


//   useEffect(() => {
//     dispatch(
//       fetchFlashSale(
//         () => setLoading(false),
//         () => setLoading(false),
//         i18n.language
//       )
//     );
//   }, [dispatch, i18n.language]);


//   const Skeleton = () => (
//     <div className="px-4 mt-20 sm:px-6 lg:px-8">

//       <div className="flex flex-col items-center max-w-6xl p-6 mx-auto overflow-hidden bg-gray-100 rounded-3xl animate-pulse">

//         <div className="w-24 h-6 mb-5 bg-gray-300 rounded-full" />

//         <div className="w-3/4 h-12 mb-5 bg-gray-300 rounded-lg" />

//         <div className="w-48 h-12 bg-gray-300 rounded-2xl" />

//       </div>

//     </div>
//   );


//   const Content = () => {

//     if (!flashSaleData) return null;


//     const flashSale = isArabic
//       ? flashSaleData.ar
//       : flashSaleData.en;


//     const badgeBg = isArabic
//       ? "bg-yellow-300 text-gray-900"
//       : "bg-yellow-400 text-gray-900";


//     const buttonBg = isArabic
//       ? "bg-yellow-300 hover:bg-yellow-200"
//       : "bg-yellow-400 hover:bg-yellow-300";


//     return (

//       <div className="px-4 mt-10 sm:px-6 lg:px-8">

//         <div
//           className="relative max-w-6xl mx-auto min-h-[450px] rounded-3xl overflow-hidden bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${flashSale.image})`,
//           }}
//         >

//           <div className="absolute inset-0 bg-black/40" />


//           <div className="relative z-10 min-h-[450px] p-6 md:p-14 flex flex-col items-center justify-center text-center">


//             <div className={`inline-flex items-center gap-2 font-black text-xs uppercase px-3 py-1 rounded-full mb-6 ${badgeBg}`}>

//               ⚡ {t("fergany_sale")}

//             </div>


//             <h2 className="mb-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-6xl">

//               {flashSale.title}

//             </h2>


//             <p className="max-w-xl mb-8 text-lg text-white">

//               {flashSale.desc}

//             </p>


//             <Link href="/elfergany-magazine">

//               <button
//                 className={`${buttonBg} text-black px-8 py-4 rounded-2xl font-bold active:scale-95 shadow-xl`}
//               >

//                 {isArabic
//                   ? "عرض منتجات المجلة"
//                   : "View the magazine Products"}

//               </button>

//             </Link>


//           </div>

//         </div>

//       </div>

//     );
//   };


//   return loading
//     ? <Skeleton />
//     : <Content />;

// };

// export default FlashSale;




import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
import { AllBrandsDataHandler } from "@/redux/actions/BrandsApi";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

const FilterBox = ({mobClass, FilterHide}) => {

    const router = useRouter();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { AllCatsData } = useSelector(state => state.categoriesData);

    const { AllBrands } = useSelector(state => state.brandsData);

    useEffect(() => {
        dispatch(AllCategoriesDataHandler());
        dispatch(AllBrandsDataHandler());
    },[])


    const [ showCatsSub, setShowCatsSub ] = useState('');

    const [ showCategoryMenu, setShowCategoryMenu ] = useState(true);

    const [ showBrandMenu, setShowBrandMenu ] = useState(true);

    const [ selectedBrand, setSelectedBrand ] = useState('');

    const [ priceData, setPriceData ] = useState({
        min_price : "",
        max_price : ""
    })

    const applyFilter = () => {
        delete router.query.page
        if(priceData.min_price) router.query.minPrice = priceData.min_price;
        if(priceData.max_price) router.query.maxPrice = priceData.max_price;
        if(selectedBrand) router.query.BrandId = selectedBrand;
        router.push({ pathname: router.pathname, query: router.query });
        FilterHide(false);
    }

    const resetFilter = () => {
        setPriceData({ min_price: "", max_price: "" });
        setSelectedBrand('');
        setShowCatsSub('');
        router.push({ pathname: router.pathname, query: {} });
        FilterHide(false);
    }

    const HandelSubmit = (e) => {
        e.preventDefault();
        applyFilter();
    }

    return(
        <>
        <div className={`filter-overlay ${mobClass ? "show" : ""}`} onClick={() => FilterHide(false)} />
        <section className={`filter-box ${mobClass ? "show-filter" : ""}`}>
            <div className="filter-back">
                <span className="filter-back-label">{t('common:filter')}</span>
                <span className="filter-close" onClick={() => FilterHide(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </span>
            </div>
            <div className="filter-body">
                <div className="filter-item">
                    <h3 className="item-title">
                        <span className="label">{t('product:price')}</span> 
                    </h3>
                    <div className="item-wrapper">
                        <form className="price-filter" onSubmit={HandelSubmit}>
                            <input type="number" className="form-control" placeholder={t('product:min')} value={priceData.min_price} onChange={
                                (e) => {
                                    setPriceData((old) => ({...old, min_price : e.target.value}));
                                }
                            }/>
                            <span className="form-label">{t('to')}</span>
                            <input type="number" className="form-control" placeholder={t('product:max')} value={priceData.max_price} onChange={
                                (e) => {
                                    setPriceData((old) => ({...old, max_price : e.target.value}));
                                }
                            }/>
                            <button type="submit" className="filter-price-btn">{t('product:go')}</button>
                        </form>
                    </div>
                </div>
                <div className="filter-item">
                    <h3 className={showCategoryMenu ? "item-title show" : "item-title"} onClick={
                        () => {
                            setShowCategoryMenu(!showCategoryMenu);
                        }
                    }>
                        <span className="label">{t('menu:all_categories')}</span> 
                        <i className="fi fi-rr-angle-small-right"></i>
                    </h3>
                    {
                        showCategoryMenu && 
                        <div className="item-wrapper">
                            <ul className="cats-list">
                                {
                                    AllCatsData.map(item => (
                                        <li key={item.id}>
                                            <Link href="#" onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    setShowCatsSub(item.id === showCatsSub ? '' : item.id);
                                                }
                                            }>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> {item.name}
                                            </Link>
                                            {
                                                item.number_of_children > 0 && 
                                                <>
                                                    {
                                                        showCatsSub === item.id && 

                                                        <ul className="cats-sublist">
                                                            {
                                                                item.sub_category.map(subCat => (
                                                                    <li key={subCat.id}>
                                                                        <Link href="#" onClick={
                                                                            (e) => {
                                                                                e.preventDefault();
                                                                                router.push({ pathname: router.pathname, query: { CatId: subCat.id } });
                                                                                FilterHide(false);
                                                                            }
                                                                        }>{subCat.name}</Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    }
                                                </>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </div>
                <div className="filter-item">
                    <h3 className={showBrandMenu ? "item-title show" : "item-title"} onClick={
                        () => setShowBrandMenu(!showBrandMenu)
                    }>
                        <span className="label">{t('common:top_brands')}</span> 
                        <i className="fi fi-rr-angle-small-right"></i>
                    </h3>
                    {
                        showBrandMenu && 
                        <div className="item-wrapper">
                            <div className="brands-list">
                                {
                                    AllBrands.map(item => (
                                        <span key={item.id} className={`brand-chip ${selectedBrand == item.id ? 'active' : ''}`} onClick={() => setSelectedBrand(selectedBrand == item.id ? '' : item.id)}>
                                            {item.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="filter-footer">
                <span className="filter-reset" onClick={resetFilter}>{t('common:reset')}</span>
                <span className="filter-apply" onClick={applyFilter}>{t('common:apply')}</span>
            </div>
        </section>
        </>
    )
}

export default FilterBox;