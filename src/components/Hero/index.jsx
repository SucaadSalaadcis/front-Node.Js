import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SliderDataHandler } from "@/redux/actions/SliderApi";

const Hero = () => {
  const { i18n } = useTranslation("common");
  const dispatch = useDispatch();
  const { SliderData } = useSelector((state) => state.dataSlider);
  const [loading, setLoading] = useState(true);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    dispatch(SliderDataHandler()).finally(() => setLoading(false));
  }, [dispatch]);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const renderSkeleton = () => (
    <div className="rounded-3xl overflow-hidden shadow-2xl animate-pulse bg-gray-200" style={{ aspectRatio: '3/1' }} />
  );

  if (loading || !SliderData || SliderData.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-6">
        {renderSkeleton()}
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 mt-6"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoHeight
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-3xl overflow-hidden shadow-2xl"
      >
        {SliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.url ? (
              <a href={slide.url} className="block cursor-pointer">
                <Image
                  src={slide.image}
                  alt={slide.title || "Banner"}
                  width={0} height={0} sizes="100vw"
                  priority
                  className="w-full h-auto"
                  unoptimized
                />
              </a>
            ) : (
              <div className="cursor-default">
                <Image
                  src={slide.image}
                  alt={slide.title || "Banner"}
                  width={0} height={0} sizes="100vw"
                  priority
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            )}
          </SwiperSlide>
        ))}

        <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-12 h-12 text-white text-xs">
          <svg
            viewBox="0 0 48 48"
            ref={progressCircle}
            className="absolute w-full h-full -rotate-90 stroke-brand-500 fill-none [stroke-dasharray:126] [stroke-dashoffset:calc(126*(1-var(--progress)))]"
            strokeWidth="4"
          >
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span ref={progressContent} />
        </div>
      </Swiper>
    </div>
  );
};

export default Hero;