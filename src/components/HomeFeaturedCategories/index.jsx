



// //////////// better 
// import { useState, useEffect, useRef } from "react";
// import SectionTitle from "@/utils/SectionTitle";
// import Image from "next/image";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { TopCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
// import { useTranslation } from "next-i18next";
// import Slider from "react-slick";

// /* Skeleton */
// const CategorySkeleton = ({ count = 8 }) => (
//   <div className="flex gap-4">
//     {Array.from({ length: count }).map((_, i) => (
//       <div key={i} className="flex flex-col items-center p-3 w-32 animate-pulse">
//         <div className="w-28 h-28 mb-2 rounded-lg bg-gray-200 border" />
//         <div className="h-6 w-28 rounded bg-gray-200" />
//       </div>
//     ))}
//   </div>
// );

// /* Helpers */
// const getSlidesCount = () => {
//   if (typeof window === "undefined") return 8;
//   if (window.innerWidth < 640) return 3;
//   if (window.innerWidth < 768) return 4;
//   if (window.innerWidth < 1024) return 5;
//   if (window.innerWidth < 1280) return 6;
//   return 8;
// };

// const chunkArray = (array, size) => {
//   const result = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// };

// const HomeFeaturedCategories = () => {
//   const { t, i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const { TopCatsData } = useSelector((state) => state.categoriesData);

//   const [loading, setLoading] = useState(true);
//   const [slidesCount, setSlidesCount] = useState(8);
//   const [currentPage, setCurrentPage] = useState(0);

//   const sliderRef = useRef(null);
//   const isRTL = i18n.language === "ar";

//   /* Load data */
//   useEffect(() => {
//     dispatch(TopCategoriesDataHandler(() => setLoading(false)));
//   }, [dispatch]);

//   /* Responsive */
//   useEffect(() => {
//     const update = () => setSlidesCount(getSlidesCount());
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   /* Split into pages */
//   const pages = TopCatsData ? chunkArray(TopCatsData, slidesCount) : [];

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     centerMode: false, // 🔥 prevents partial slides
//     beforeChange: (_, next) => setCurrentPage(next),
//   };

//   return (
//     <section className="py-8 mt-14">
//       <div className="container mx-auto" dir={isRTL ? "rtl" : "ltr"}>
//         <SectionTitle title={t("common:featured_categories")} />

//         {/* Loading */}
//         {loading && <CategorySkeleton count={slidesCount} />}

//         {/* Content */}
//         {!loading && pages.length > 0 && (
//           <>
//             <div className="relative">
              
//               {/* LEFT ARROW */}
//               <button
//                 onClick={() => sliderRef.current?.slickPrev()}
//                 disabled={currentPage === 0}
//                 className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border ${
//                   currentPage === 0
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-white hover:bg-gray-50 shadow"
//                 }`}
//               >
//                 ◀
//               </button>

//               {/* RIGHT ARROW */}
//               <button
//                 onClick={() => sliderRef.current?.slickNext()}
//                 disabled={currentPage === pages.length - 1}
//                 className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border ${
//                   currentPage === pages.length - 1
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-white hover:bg-gray-50 shadow"
//                 }`}
//               >
//                 ▶
//               </button>

//               {/* SLIDER */}
//               <div className="px-12 overflow-hidden">
//                 <Slider {...settings} ref={sliderRef}>
//                   {pages.map((page, pageIndex) => (
//                     <div key={pageIndex}>
//                       <div className="flex">
//                         {page.map((item) => (
//                           <div key={item.id} className="px-2">
//                             <div className="w-32 mx-auto">
//                               <Link
//                                 href={`/categories/${item.slug}`}
//                                 className="flex flex-col items-center p-3"
//                               >
//                                 <div className="w-28 h-28 mb-2 flex items-center justify-center rounded-lg border bg-white shadow">
//                                   <Image
//                                     src={item.icon}
//                                     alt={item.name}
//                                     width={112}
//                                     height={112}
//                                   />
//                                 </div>
//                                 <div className="h-6 w-full text-center font-medium truncate px-1">
//                                   {item.name}
//                                 </div>
//                               </Link>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             </div>

//             {/* DOTS */}
//             <div className="flex justify-center mt-4 gap-2">
//               {pages.map((_, i) => (
//                 <span
//                   key={i}
//                   onClick={() => sliderRef.current?.slickGoTo(i)}
//                   className={`w-2 h-2 rounded-full cursor-pointer ${
//                     currentPage === i ? "bg-blue-500" : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default HomeFeaturedCategories;

import { useState, useEffect, useRef } from "react";
import SectionTitle from "@/utils/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { TopCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";

/* Skeleton */
const CategorySkeleton = ({ count = 8 }) => (
  <div className="flex gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex flex-col items-center p-3 w-32 animate-pulse">
        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200" />
        <div className="h-5 w-24 rounded-full bg-gray-200" />
      </div>
    ))}
  </div>
);

/* Helpers */
const getSlidesCount = () => {
  if (typeof window === "undefined") return 8;

  // 👇 IMPORTANT: even number for clean grid
  if (window.innerWidth < 640) return 4; // 2x2 grid
  if (window.innerWidth < 768) return 4;
  if (window.innerWidth < 1024) return 5;
  if (window.innerWidth < 1280) return 6;
  return 8;
};

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const HomeFeaturedCategories = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { TopCatsData } = useSelector((state) => state.categoriesData);

  const [loading, setLoading] = useState(true);
  const [slidesCount, setSlidesCount] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);

  const gradientColors = [
    ['#fce7f3', '#fecdd3'],
    ['#dbeafe', '#93c5fd'],
    ['#d1fae5', '#6ee7b7'],
    ['#fef3c7', '#fcd34d'],
    ['#f3e8ff', '#c4b5fd'],
    ['#e0f2fe', '#7dd3fc'],
  ];

  const sliderRef = useRef(null);
  const isRTL = i18n.language === "ar";

  /* Load data */
  useEffect(() => {
    dispatch(TopCategoriesDataHandler(() => setLoading(false)));
  }, [dispatch]);

  /* Responsive */
  useEffect(() => {
    const update = () => setSlidesCount(getSlidesCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Split into pages */
  const pages = TopCatsData ? chunkArray(TopCatsData, slidesCount) : [];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    beforeChange: (_, next) => setCurrentPage(next),
  };

  return (
    <section className="py-8 mt-14">
      <div className="container mx-auto" dir={isRTL ? "rtl" : "ltr"}>
        <SectionTitle title={t("common:featured_categories")} />

        {/* Loading */}
        {loading && <CategorySkeleton count={slidesCount} />}

        {/* Content */}
        {!loading && pages.length > 0 && (
          <>
            <div className="relative">

              {/* LEFT ARROW */}
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                disabled={currentPage === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentPage === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 shadow"
                }`}
              >
                ◀
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={() => sliderRef.current?.slickNext()}
                disabled={currentPage === pages.length - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border ${
                  currentPage === pages.length - 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 shadow"
                }`}
              >
                ▶
              </button>

              {/* SLIDER */}
              <div className="px-12 overflow-hidden">
                <Slider {...settings} ref={sliderRef}>
                  {pages.map((page, pageIndex) => (
                    <div key={pageIndex}>
                      
                      {/* ✅ GRID on mobile / FLEX on desktop */}
                      <div className="grid grid-cols-2 gap-y-4 sm:flex sm:gap-y-0 sm:justify-center justify-items-center">
                        
                        {page.map((item, idx) => (
                          <div key={item.id} className="px-2 w-full sm:w-auto">
                            
                            <div className="w-full sm:w-32 mx-auto">
                              <Link
                                href={`/categories/${item.slug}`}
                                className="flex flex-col items-center p-3 group"
                              >
                                <div
                                  className="w-24 h-24 sm:w-28 sm:h-28 mb-3 overflow-hidden rounded-full shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300"
                                  style={{ background: `linear-gradient(135deg, ${gradientColors[idx % 6][0]}, ${gradientColors[idx % 6][1]})` }}
                                >
                                  <Image
                                    src={item.icon}
                                    alt={item.name}
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="w-full text-center text-sm sm:text-base font-medium leading-5 px-1 text-gray-700 group-hover:text-gray-900 transition-colors">
                                  {item.name}
                                </div>
                              </Link>
                            </div>

                          </div>
                        ))}

                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-4 gap-2">
              {pages.map((_, i) => (
                <span
                  key={i}
                  onClick={() => sliderRef.current?.slickGoTo(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    currentPage === i ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeFeaturedCategories;