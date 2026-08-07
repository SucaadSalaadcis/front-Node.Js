
import Image from "next/image";
import Link from "next/link";
import Logo from '../../../../public/images/general/logo.png';
import AuthHeader from "../MainHeader/AuthHeader";
import SearchHeader from "../MainHeader/SearchHeader";
import MenuIcon from '../../../../public/images/icons/menus.png';
import ExtiIcon from '../../../../public/images/icons/reject.png';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
import { useTranslation } from 'next-i18next';

const MainHeaderMobile = () => {
    const { t } = useTranslation('menu');
    const dispatch = useDispatch();
    const { AllCatsData = [] } = useSelector(state => state.categoriesData || {});

    const [showMenu, setShowMenu] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    // Fetch categories
    useEffect(() => {
        dispatch(AllCategoriesDataHandler());
    }, [dispatch]);

    // Set first category as active by default
    useEffect(() => {
        if (AllCatsData.length) setActiveCategory(AllCatsData[0]);
    }, [AllCatsData]);

    return (
        <div className="main-header-mobile">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-3">
                        <div className="brand">
                            <Link href="/">
                                <Image src={Logo} alt="Elfergany" width={70} height={70} style={{ width: 'auto', height: 'auto' }} />
                            </Link>
                        </div>
                    </div>
                    <div className="col-7">
                        <AuthHeader />
                    </div>
                    <div className="col-2">
                        <div className="mobile-buger-menu" onClick={() => setShowMenu(true)}>
                            <Image src={MenuIcon} alt="Menu" width={40} height={40} />
                        </div>
                    </div>
                </div>
                <SearchHeader />
            </div>

            {showMenu && (
                <div className="mobile-menu-cats">
                    <div className="hide-menu" onClick={() => setShowMenu(false)}>
                        <Image src={ExtiIcon} alt="Exit" width={40} height={40} />
                    </div>

                    <ul className="cat-list">
                        {AllCatsData.map(cat => (
                            <li key={cat.id}>
                                <div className={`cat-item ${activeCategory?.id === cat.id ? "active" : ""}`}>
                                    {/* Main category link */}
                                    <Link href={`/categories/${cat.slug}`} onClick={() => setShowMenu(false)}>
                                        <span>{cat.name}</span>
                                    </Link>

                                    {/* Optional icon */}
                                    {cat.icon && <img src={cat.icon} alt={cat.name} />}

                                    {/* Toggle subcategories if available */}
                                    {cat.sub_category?.length > 0 && (
                                        <span
                                            className="toggle-subcat"
                                            onClick={(e) => {
                                                e.stopPropagation(); // prevent link click
                                                setActiveCategory(activeCategory?.id === cat.id ? null : cat);
                                            }}
                                        >
                                            ▼
                                        </span>
                                    )}
                                </div>

                                {/* Subcategories */}
                                {activeCategory?.id === cat.id && cat.sub_category?.length > 0 && (
                                    <ul className="subcat-list">
                                        {cat.sub_category.map(sub => (
                                            <li key={sub.id}>
                                                <Link href={`/categories/${sub.slug}`} onClick={() => setShowMenu(false)}>
                                                    {sub.icon && <img src={sub.icon} alt={sub.name} className="subcat-icon" />}
                                                    <span>{sub.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MainHeaderMobile;
