

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllCategoriesDataHandler } from "@/redux/actions/CategoriesApi";
// ponytail: replaced react-icons with inline SVG

const CategoriesDropdown = () => {
  const { t } = useTranslation("menu");
  const dispatch = useDispatch();
  const { AllCatsData = [] } = useSelector((state) => state.categoriesData || {});

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const dropdownRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    dispatch(AllCategoriesDataHandler());
  }, [dispatch]);

  // Set first category as active
  useEffect(() => {
    if (AllCatsData.length) setActiveCategory(AllCatsData[0]);
  }, [AllCatsData]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="categories-menu" ref={dropdownRef}>
      {/* Categories Button */}
      <div
        className="categories-dropdown-button"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="fi-rs-apps"></span>
        <span className="custom-label">{t("all_categories")}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={`dropdown-icon ${showDropdown ? "active" : ""}`}><path d="M7 10l5 5 5-5z"/></svg>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="all-cats-dropdown">
          <div className="categories-container">
            {/* Left: Categories */}
            <ul className="cat-list">
              {AllCatsData.map((cat) => (
                <li
                  key={cat.id}
                  className={activeCategory?.id === cat.id ? "active" : ""}
                  onMouseEnter={() => setActiveCategory(cat)}
                >
                  <Link
                    href={`/categories/${cat.slug}`}
                    onClick={() => setShowDropdown(false)}
                  >
                    {cat.icon && <Image src={cat.icon} alt={cat.name} width={24} height={24} />}
                    <span>{cat.name}</span>
                    <svg className="cat-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: Subcategories */}
            {activeCategory && (
              <div className="cat-details">
                <div className="subcategories">
                  <h4>{t("shop_by_subcategory")}</h4>
                  <ul>
                    {activeCategory.sub_category?.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`/categories/${sub.slug}`}
                          onClick={() => setShowDropdown(false)}
                        >
                          {sub.icon && <Image src={sub.icon} alt={sub.name} width={20} height={20} />}
                          <span>{sub.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
