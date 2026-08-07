import { useEffect, useState } from "react";
import Link from "next/link";
// ponytail: replaced lucide-react with inline SVG arrow
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PromoBannerDataHandler } from "@/redux/actions/PromoBannerApi";

const PromoBanner = () => {
  const { i18n, t } = useTranslation("common");
  const ArrowIcon = i18n.language === "ar" ? "left" : "right";

  const dispatch = useDispatch();
  const promoBannerData = useSelector(
    (state) => state.promoBanner?.PromoBannerData || []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      PromoBannerDataHandler(() => setLoading(false), () => setLoading(false))
    );
  }, [dispatch]);

  const Skeleton = () => (
    <section className="container mx-auto px-4 mt-10">
      <div className="grid md:grid-cols-2 gap-8 animate-pulse">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="group relative h-72 min-h-[18rem] rounded-3xl overflow-hidden shadow-lg bg-gray-200"
          />
        ))}
      </div>
    </section>
  );

  const Content = () => (
    <section className="container mx-auto px-4 mt-16">
      <div className="grid md:grid-cols-2 gap-8">
        {promoBannerData.slice(0, 2).map((banner) => (
          <Link
            key={banner.id}
            href={banner.category_url}
            className="group relative h-72 min-h-[18rem] rounded-3xl overflow-hidden shadow-lg block"
          >
            <img
              src={banner.image || "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="#f0f0f0" width="600" height="400"/><text fill="#999" font-size="20" x="50%" y="50%" text-anchor="middle" dominant-baseline="central">No Image</text></svg>')}
              alt={banner.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white font-bold tracking-wider text-sm mb-2 block uppercase">
                  {banner.tag}
                </span>
                <h3 className="text-3xl font-black text-white mb-2 leading-none">
                  {banner.title}
                </h3>
                <p className="text-gray-200 mb-4 font-medium max-w-xs">
                  {banner.desc}
                </p>
                <span className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-50 transition-colors">
                  {t("shop_now")} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d={ArrowIcon === "right" ? "M5 12h14M12 5l7 7-7 7" : "M19 12H5M12 5l-7 7 7 7"}/></svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return loading ? <Skeleton /> : <Content />;
};

export default PromoBanner;