import Image from "next/image";
import Link from "next/link";

const BrandBox = ({ image, slug }) => {
  return (
    <Link
      href={{ pathname: "/search", query: { BrandId: slug } }}
      className="flex flex-col items-center group"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white border border-gray-200 group-hover:border-gray-300 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
        <Image src={image} alt="brand" width={80} height={80} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
      </div>
    </Link>
  );
};

export default BrandBox;
