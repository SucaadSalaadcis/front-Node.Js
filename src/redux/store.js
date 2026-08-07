import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import BrandsApi from "./reducers/BrandsApi";
import ProductsApi from "./reducers/ProductsApi";
import CategoriesApi from "./reducers/CategoriesApi";
import AuthApi from "./reducers/AuthApi";
import CountriesApi from "./reducers/CountriesApi";
import WishlistApi from "./reducers/WishlistApi";
import SingleOrderApi from "./reducers/SingleOrderApi";
import CartApi from "./reducers/CartApi";
import AddressApi from "./reducers/AddressApi";
import FilterApi from "./reducers/FilterApi";
import SliderApi from "./reducers/SliderApi";
import MegaMenuApi from "./reducers/MegaMenuApi";
import PagesApi from "./reducers/PagesApi";
import SettingsApi from "./reducers/SettingsApi";
import PromoBannerApi from "./reducers/PromoBannerApi";
import FlashSaleApi from "./reducers/FlashSaleApi";

const rootReducer = combineReducers({

    brandsData: BrandsApi,
    productsData: ProductsApi,
    categoriesData: CategoriesApi,
    userProfile: AuthApi,
    countries: CountriesApi,
    wishlistData: WishlistApi,
    orderData: SingleOrderApi,
    cartsData: CartApi,
    addressData: AddressApi,
    dataFilter: FilterApi,
    dataSlider: SliderApi,
    megaData: MegaMenuApi,
    pagesData: PagesApi,
    settingsData: SettingsApi,
    promoBanner: PromoBannerApi,
    flashSale: FlashSaleApi,
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));