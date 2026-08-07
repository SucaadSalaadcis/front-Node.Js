import Image from "next/image";
import Link from "next/link";
import Logo from '../../../../public/images/general/logo.png';
import AuthHeader from "../MainHeader/AuthHeader";
import SearchHeader from "../MainHeader/SearchHeader";
import MenuIcon from '../../../../public/images/icons/menus.png';
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
import { useTranslation } from 'next-i18next';

const MainHeaderMobile = () => {
    const { t, i18n } = useTranslation('menu');
    const dispatch = useDispatch();
    const { AllCatsData = [] } = useSelector(state => state.categoriesData || {});
    const [showMenu, setShowMenu] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        dispatch(AllCategoriesDataHandler());
    }, [dispatch]);

    const filteredCats = useMemo(() => {
        if (!searchTerm) return AllCatsData;
        const term = searchTerm.toLowerCase();
        return AllCatsData.filter(cat =>
            cat.name.toLowerCase().includes(term) ||
            cat.sub_category?.some(sub => sub.name.toLowerCase().includes(term))
        );
    }, [AllCatsData, searchTerm]);

    const toggleCategory = (catId) => {
        setOpenCategory(openCategory === catId ? null : catId);
    };

    const closeMenu = () => {
        setShowMenu(false);
        setOpenCategory(null);
        setSearchTerm('');
    };

    return (
        <div className="main-header-mobile">
            <div className="container">
                <div className="row align-items-center">
                    {isRTL ? (
                        <>
                            <div className="col-4 d-flex justify-content-start">
                                <div className="mobile-buger-menu" onClick={() => setShowMenu(true)}>
                                    <span className="mobile-cats-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                                        {t('all_categories')}
                                    </span>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                <Link href="/">
                                    <Image src={Logo} alt="Elfergany" width={55} height={55} priority style={{ width: 'auto', height: 'auto' }} />
                                </Link>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <AuthHeader />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-4 d-flex">
                                <AuthHeader />
                            </div>
                            <div className="text-center col-4 d-flex justify-content-center">
                                <Link href="/">
                                    <Image src={Logo} alt="Elfergany" width={55} height={55} priority style={{ width: 'auto', height: 'auto' }} />
                                </Link>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <div className="mobile-buger-menu" onClick={() => setShowMenu(true)}>
                                    <span className="mobile-cats-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                                        {t('all_categories')}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <SearchHeader />
            </div>

            <div className={`mobile-sheet-overlay ${showMenu ? 'open' : ''}`} onClick={closeMenu} />

            <div className={`mobile-sheet-panel ${showMenu ? 'open' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="mobile-sheet-header">
                    <div className="mobile-sheet-handle" />
                    <div className="mobile-sheet-title-row">
                        <h3>{t('all_categories')}</h3>
                        <button className="mobile-sheet-close" onClick={closeMenu}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>

                <div className="mobile-sheet-search">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input
                        type="text"
                        placeholder={isRTL ? 'بحث عن قسم...' : 'Search categories...'}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => setSearchTerm('')}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    )}
                </div>

                <div className="mobile-sheet-quick-links">
                    <Link href="/elfergany-magazine" className="mobile-sheet-quick-link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        <span>{isRTL ? 'مجلة الفرجاني' : 'El Fergany Magazine'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="quick-link-arrow">{isRTL ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}</svg>
                    </Link>
                    <Link href="/hot-offers" className="mobile-sheet-quick-link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        <span>{isRTL ? 'أقوي العروض' : 'Hot Offers'}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="quick-link-arrow">{isRTL ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}</svg>
                    </Link>
                </div>

                <div className="mobile-sheet-body">
                    {filteredCats.length === 0 ? (
                        <div className="sheet-no-results">{isRTL ? 'لا توجد نتائج' : 'No categories found'}</div>
                    ) : (
                        <ul className="mobile-sheet-cats">
                            {filteredCats.map(cat => (
                                <li key={cat.id}>
                                    <div className="sheet-cat-card">
                                        <div
                                            className={`sheet-cat-header ${openCategory === cat.id ? 'active' : ''}`}
                                            onClick={() => toggleCategory(cat.id)}
                                        >
                                            <Link href={`/categories/${cat.slug}`} onClick={closeMenu} className="sheet-cat-link">
                                                {cat.icon && <Image src={cat.icon} alt={cat.name} width={24} height={24} />}
                                                <span className="sheet-cat-name">{cat.name}</span>
                                            </Link>
                                            {cat.sub_category?.length > 0 && (
                                                <span className={`sheet-cat-toggle ${openCategory === cat.id ? 'open' : ''}`}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                                </span>
                                            )}
                                        </div>

                                        {cat.sub_category?.length > 0 && (
                                            <div className={`sheet-subcat-wrap ${openCategory === cat.id ? 'open' : ''}`}>
                                                <ul className="sheet-subcat-list">
                                                    {cat.sub_category.map(sub => (
                                                        <li key={sub.id}>
                                                            <Link href={`/categories/${sub.slug}`} onClick={closeMenu}>
                                                                {sub.icon && <Image src={sub.icon} alt={sub.name} width={20} height={20} />}
                                                                <span>{sub.name}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainHeaderMobile;