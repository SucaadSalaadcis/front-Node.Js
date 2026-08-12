// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { useTranslation } from 'next-i18next';
// import Image from "next/image";
// import SearchIcon from '../../../../../public/images/icons/search.svg';

// const SearchHeader = () => {

//     const router = useRouter();

//     const { t } = useTranslation('header');

//     const urlParams = new URLSearchParams(typeof window !== 'undefined' && window.location.search);
//     const myParam5 = urlParams.get('keyword');

//     const dispatch = useDispatch();


//     const [ state, setState ] = useState({
//         keyword: myParam5 ? myParam5 : "",
//         brand: "",
//         cat: "",
//         minPrice: "",
//         maxPrice: ""
//     })

//     const [ data, setData ] = useState([]);

//     const [ showSearchBox, setShowSearchBox ] = useState(false);

//     const [ showLoader, setShowLoader ] = useState(false);

//     useEffect(() => {
//         setState((old) => ({...old, keyword: myParam5 ? myParam5 : ""}))
//     },[router])

//     const HandelSubmit = (e) => {

//         e.preventDefault();

//         if(state.keyword) {
//             if(router.pathname !== "/search") {
//                 router.push(`/search?keyword=${state.keyword}`);
//             }else {
//                 delete router.query.CatId
//                 delete router.query.BrandId
//                 delete router.query.minPrice
//                 delete router.query.maxPrice
//                 delete router.query.page
//                 router.query.keyword = state.keyword;
//                 router.push(router);
//             }
//             setShowSearchBox(false);
//             setData([]);
//         }
//     }

//     return(
//         <div className="search-header">
//             <form className="search-header-form" id="SerachForm" onSubmit={HandelSubmit}>
//                 <div className="form-group">
//                     <input type="text" id="Search" className="form-control" value={state.keyword} autoComplete="off" placeholder={t('search_for_items')} 
//                         onChange={
//                             (e) => {
//                                 setState({keyword : e.target.value});
//                         }
//                     }/>
//                     <button type='submit' className='search-icon' htmlFor='Search'>
//                         <Image src={SearchIcon} alt="Search" width={20} height={20} />
//                     </button>
//                 </div>
//             </form>
//         </div>
       
//     )
// }

// export default SearchHeader;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import SearchIcon from "../../../../../public/images/icons/search.svg";

const SearchHeader = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("header");
  const isRtl = i18n?.language === "ar";

  const urlParams = new URLSearchParams(
    typeof window !== "undefined" && window.location.search
  );
  const myParam5 = urlParams.get("keyword");

  const [state, setState] = useState({
    keyword: myParam5 ? myParam5 : "",
    brand: "",
    cat: "",
    minPrice: "",
    maxPrice: "",
  });

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setState((old) => ({ ...old, keyword: myParam5 ? myParam5 : "" }));
  }, [router, myParam5]);

  const HandelSubmit = (e) => {
    e.preventDefault();

    if (state.keyword.trim()) {
      if (router.pathname !== "/search") {
        router.push(`/search?keyword=${encodeURIComponent(state.keyword.trim())}`);
      } else {
        const query = { ...router.query };
        delete query.CatId;
        delete query.BrandId;
        delete query.minPrice;
        delete query.maxPrice;
        delete query.page;

        query.keyword = state.keyword.trim();
        router.push({
          pathname: "/search",
          query,
        });
      }
      setShowSearchBox(false);
    }
  };

  const handleClear = () => {
    setState((prev) => ({ ...prev, keyword: "" }));
  };

  return (
    <div className="w-full max-w-2xl px-2 mx-auto sm:px-0">
      <form
        className="relative w-full"
        id="SerachForm"
        onSubmit={HandelSubmit}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="relative flex items-center w-full rounded-full border border-slate-200 bg-slate-50/80 focus-within:bg-white focus-within:border-[#1D3E73] focus-within:ring-4 focus-within:ring-[#1D3E73]/10 transition-all duration-200 shadow-sm">
          
          {/* Input Field */}
          <input
            type="text"
            id="Search"
            className={`w-full py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none focus:outline-none focus:ring-0 font-medium ${
              isRtl ? "pr-5 pl-12" : "pl-5 pr-12"
            }`}
            value={state.keyword}
            autoComplete="off"
            placeholder={t("search_for_items") || "Search For Items..."}
            onChange={(e) =>
              setState((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />

          {/* Quick Clear Button (Only visible when text is entered) */}
          {state.keyword && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute p-1 text-slate-400 hover:text-slate-600 transition-colors ${
                isRtl ? "left-12 sm:left-14" : "right-12 sm:right-14"
              }`}
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className={`absolute flex items-center justify-center p-2 sm:p-2.5 bg-[#1D3E73] hover:bg-[#16305a] text-white rounded-full transition-all duration-200 shadow-md active:scale-95 shrink-0 ${
              isRtl ? "left-1.5" : "right-1.5"
            }`}
            aria-label="Submit search"
          >
            <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center filter brightness-0 invert">
              <Image
                src={SearchIcon}
                alt="Search"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHeader;