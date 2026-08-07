import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

const SearchBar = () => {
  const router = useRouter();
  const { t } = useTranslation('header');
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const kw = params.get('keyword');
    if (kw) setKeyword(kw);
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    if (router.pathname !== "/search") {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    } else {
      delete router.query.CatId;
      delete router.query.BrandId;
      delete router.query.minPrice;
      delete router.query.maxPrice;
      delete router.query.page;
      router.query.keyword = keyword;
      router.push(router);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t('search_for_items')}
          className="w-full h-[48px] px-5 pr-12 rtl:pl-12 rtl:pr-5 text-sm text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-brand-navy focus:bg-white focus:shadow-lg focus:shadow-brand-navy/10 focus:ring-4 focus:ring-brand-navy/5"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute flex items-center justify-center w-10 h-10 text-white transition-all duration-200 -translate-y-1/2 left-1 rtl:right-1 rtl:left-auto top-1/2 bg-brand-navy rounded-xl hover:bg-brand-navy/90 hover:shadow-md hover:shadow-brand-navy/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
    </form>
   
  );
};

export default SearchBar;
