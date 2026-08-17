
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ProductSlider = ({ image, photos, discountPercentage }) => {
  const mainImage = photos?.[0] || image;
  const [selectedPhoto, setSelectedPhoto] = useState(mainImage);

  useEffect(() => {
    setSelectedPhoto(mainImage);
  }, [mainImage]);

  const thumbnails = (photos || []).filter((p) => p !== mainImage);

  return (
    <div className="product-slider relative bg-white border border-gray-100 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[340px] w-full">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#FFF0F0] text-[#E53935] text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full z-10">
          {Math.round(discountPercentage)}%
        </span>
      )}

      {/* Main Image Container */}
      <div className="relative w-full h-[200px] sm:h-[260px] flex items-center justify-center">
        {selectedPhoto && (
          <Image
            src={selectedPhoto}
            alt="Product Image"
            width={220}
            height={260}
            className="object-contain max-w-full max-h-full"
            priority
          />
        )}
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="flex justify-center w-full gap-2 py-1 mt-3 overflow-x-auto slider-photos sm:mt-4">
          {thumbnails.map((photo, idx) => (
            <Thumbnail
              key={idx}
              src={photo}
              onClick={() => setSelectedPhoto(photo)}
              isSelected={selectedPhoto === photo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Thumbnail = ({ src, onClick, isSelected }) => (
  <div
    className={`photo w-10 h-10 sm:w-12 sm:h-12 rounded-lg border overflow-hidden cursor-pointer flex-shrink-0 transition-all ${
      isSelected ? "border-[#004225] border-2" : "border-gray-200"
    }`}
    onClick={onClick}
  >
    <Image
      src={src}
      alt="thumbnail"
      width={48}
      height={48}
      className="object-cover w-full h-full"
    />
  </div>
);

export default ProductSlider;