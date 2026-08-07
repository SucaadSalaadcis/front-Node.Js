import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import MenuHeader from "@/Layouts/Header/MenuHeader";
import MainHeaderMobile from "@/Layouts/Header/MainHeaderMobile";
import TopHeaderMobile from "@/Layouts/Header/TopHeaderMobile";

const Header = () => {
  return (
    <header className="header">
      <TopBar />
      <TopHeaderMobile />
      <MainHeader />
      <MainHeaderMobile />
      <MenuHeader />
    </header>
  );
};

export default Header;
