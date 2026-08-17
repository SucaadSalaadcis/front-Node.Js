import MainHeader from "./MainHeader";
import MainHeaderMobile from "./MainHeaderMobile";
import MenuHeader from "./MenuHeader";
import TopHeader from "./TopHeader";
import TopHeaderMobile from "./TopHeaderMobile";

const Header = () => {
    return(
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            <TopHeader />
            <TopHeaderMobile />
            <MainHeader />
            <MainHeaderMobile />
            <MenuHeader />
        </header>
    )
}

export default Header;
