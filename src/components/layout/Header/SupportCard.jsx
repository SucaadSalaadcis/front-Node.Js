import Link from "next/link";
import { useTranslation } from 'next-i18next';

const SupportCard = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="tel:19631"
      className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-navy/20 transition-all duration-200 group"
      aria-label="Call support: 19631"
    >
      <div className="w-9 h-9 rounded-lg bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-navy/10 transition-colors duration-200">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D3E73" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-200">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-brand-navy group-hover:text-brand-navy/80 transition-colors duration-200">
          19631
        </span>
        <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          {t('support_center')}
        </span>
      </div>
    </Link>
  );
};

export default SupportCard;
