import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "../../../../public/images/general/logo.png";
import SearchBar from "./SearchBar";
import HeaderIcons from "./HeaderIcons";

const MainHeader = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <header className="sticky top-0 z-40 hidden bg-white border-b border-gray-100 shadow-sm md:block">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 min-w-[280px]">
            <div className="flex items-center justify-center w-24 h-24 transition duration-300 bg-white border border-black shadow-md rounded-3xl border-1 hover:scale-105">
              <Image
                src={Logo}
                alt="ElFergany"
                width={88}
                height={88}
                priority
                className="object-contain"
              />
            </div>

            <div>
              <h2 className="text-[34px] font-extrabold leading-none text-[#21407A]">
                {isAr ? "الفرجاني" : "ElFergany"}
              </h2>
            </div>
          </Link>

          {/* Search */}
          <div className="flex justify-center flex-1 px-10">
            <div className="w-full max-w-[560px]">
              <div className="">
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex justify-end min-w-[260px]">
            <div className="flex items-center justify-center px-5 py-3 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <HeaderIcons />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
