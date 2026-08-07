// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// // ponytail: replaced lucide-react with inline SVGs

// const ProductSlider = ({ image, photos }) => {
//   const mainImage = photos?.[0] || image;
//   const [selectedPhoto, setSelectedPhoto] = useState(mainImage);

//   useEffect(() => {
//     setSelectedPhoto(mainImage);
//   }, [mainImage]);

//   // Filter out the main image from thumbnails
//   const thumbnails = (photos || []).filter((p) => p !== mainImage);

//   return (
//     <div className="product-slider">
//       <ImageZoom src={selectedPhoto} alt="Product Image" />

//       {/* Thumbnails only if there are other photos */}
//       {thumbnails.length > 0 && (
//         <div className="slider-photos flex gap-2 overflow-x-auto mt-4">
//           {thumbnails.map((photo, idx) => (
//             <Thumbnail
//               key={idx}
//               src={photo}
//               onClick={() => setSelectedPhoto(photo)}
//               isSelected={selectedPhoto === photo}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Thumbnail component
// const Thumbnail = ({ src, onClick, isSelected }) => (
//   <div
//     className={`photo w-20 h-20 rounded-xl border overflow-hidden cursor-pointer flex-shrink-0 ${
//       isSelected ? "border-blue-500" : "border-gray-200"
//     }`}
//     onClick={onClick}
//   >
//     <Image
//       src={src}
//       alt="thumbnail"
//       width={80}
//       height={80}
//       className="w-full h-full object-cover"
//     />
//   </div>
// );

// const ImageZoom = ({ src, alt }) => {
//   return (
//     <div className="flex justify-center">
//       <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-6">
//         <Image
//           src={src}
//           alt={alt}
//           width={420}
//           height={420}
//           className="object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;


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
            className="object-contain max-h-full max-w-full"
            priority
          />
        )}
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="slider-photos flex gap-2 overflow-x-auto mt-3 sm:mt-4 w-full justify-center py-1">
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
      className="w-full h-full object-cover"
    />
  </div>
);

export default ProductSlider;