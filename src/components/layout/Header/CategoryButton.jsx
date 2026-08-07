const CategoryButton = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
        isOpen
          ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/30'
          : 'bg-brand-navy text-white hover:shadow-lg hover:shadow-brand-navy/20 hover:scale-[1.02]'
      }`}
      aria-label="All Categories"
      aria-expanded={isOpen}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
      <span className="flex-1 text-left rtl:text-right">جميع الأقسام</span>
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      >
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
  );
};

export default CategoryButton;
