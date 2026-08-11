import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import i18next from "i18next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  CitiesDataHandler,
  CitiesByGovernateDataHandler,
  BranchesDataHandler,
} from "@/redux/actions/CountriesApi";
import { LocalKeys } from "@/helpers/Config";

// Safely import LeafletMap with SSR disabled
const LeafletMap = dynamic(
  () => import("../../../components/layout/Header/LeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[240px] items-center justify-center bg-slate-100 text-sm text-slate-500">
        {i18next.t("loading_map", "Loading map...")}
      </div>
    ),
  }
);

const defaultCenter = [30.0444, 31.2357]; // Default: Cairo [lat, lng]

const RegionsBox = ({ onClose, hasSaved }) => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const { CitiesData, CitiesByGovernorate, branchesData } = useSelector(
    (state) => state.countries
  );

  const [mode, setMode] = useState("map"); // 'map' or 'manual'
  const [governmentID, setGovernmentID] = useState(0);
  const [cityID, setCityID] = useState(0);

  const [state, setState] = useState({
    city: "",
    region: "",
    branch: "",
  });

  // Map state
  const [selectedCoords, setSelectedCoords] = useState(defaultCenter);
  const [mapLocationLabel, setMapLocationLabel] = useState(t("cairo_egypt", "Cairo, Egypt"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOutOfZone, setIsOutOfZone] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const searchTimeoutRef = useRef(null);

  // 1. EXACT OLD LOGIC: API Handlers synced with locale
  useEffect(() => {
    dispatch(CitiesDataHandler());
  }, [dispatch, locale]);

  useEffect(() => {
    if (Number(governmentID) > 0) {
      dispatch(CitiesByGovernateDataHandler(governmentID));
    }
  }, [governmentID, dispatch, locale]);

  useEffect(() => {
    if (Number(cityID) > 0) {
      dispatch(BranchesDataHandler(cityID));
    }
  }, [cityID, dispatch, locale]);

  // Load initial saved localStorage data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setState({
        city: localStorage.getItem(LocalKeys.CITY_NAME) || "",
        region: localStorage.getItem(LocalKeys.REGION_NAME) || "",
        branch: localStorage.getItem(LocalKeys.BRANCH_ID) || "",
      });
    }
  }, []);

  // Handle Search Input Change with Debounce
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&countrycodes=eg&limit=5`
        );
        const data = await response.json();
        setSearchResults(data || []);
      } catch (error) {
        console.error("Geocoding search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  // Helper for delivery zone evaluation
  const checkDeliveryZone = (lat, lng) => {
    return lat > 29.5 && lat < 30.5 && lng > 31.0 && lng < 31.8;
  };

  // Select a location from search results dropdown
  const handleSelectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setSelectedCoords([lat, lng]);
    setSearchResults([]);
    setSearchQuery(result.display_name.split(",")[0]);

    const isInZone = checkDeliveryZone(lat, lng);

    if (!isInZone) {
      setIsOutOfZone(true);
      setMapLocationLabel(t("sorry_we_do_not_cover_this_area", "Sorry, we do not cover this area"));
      return;
    }

    setIsOutOfZone(false);
    const label = result.display_name.split(",").slice(0, 2).join(",");
    setMapLocationLabel(label);

    setState((prev) => ({
      ...prev,
      city: t("cairo", "Cairo"),
      region: label,
    }));
  };

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  // 2. EXACT OLD LOGIC: Manual Form Submission
  const HandelSubmit = (e) => {
    if (e) e.preventDefault();

    if (state.city) {
      localStorage.setItem(LocalKeys.CITY_NAME, state.city);
    }

    if (state.region) {
      localStorage.setItem(LocalKeys.REGION_NAME, state.region);
    }

    if (state.branch) {
      localStorage.setItem(LocalKeys.BRANCH_ID, state.branch);
      const branchSelect = document.getElementById("Branches");
      if (branchSelect && branchSelect.selectedIndex >= 0) {
        localStorage.setItem(
          LocalKeys.BRANCH_NAME,
          branchSelect.options[branchSelect.selectedIndex].text
        );
      }
    }

    if (onClose) onClose();
    window.location.reload();
  };

  // Reverse Geocoding via Free Nominatim API
  const handleMapClick = async ({ lat, lng }) => {
    setSelectedCoords([lat, lng]);

    const isInDeliveryZone = checkDeliveryZone(lat, lng);

    if (!isInDeliveryZone) {
      setIsOutOfZone(true);
      setMapLocationLabel(t("sorry_we_do_not_cover_this_area", "Sorry, we do not cover this area"));
      return;
    }

    setIsOutOfZone(false);
    setIsLoadingAddress(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data && data.address) {
        const district =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.quarter ||
          data.address.residential ||
          data.address.city_district ||
          "";
        const city =
          data.address.city ||
          data.address.town ||
          data.address.state ||
          t("cairo", "Cairo");

        const formattedName = district ? `${district}, ${city}` : city;

        setMapLocationLabel(formattedName);

        setState((prev) => ({
          ...prev,
          city: city,
          region: formattedName,
        }));
      } else {
        setMapLocationLabel(t("selected_location", "Selected Location"));
      }
    } catch (error) {
      setMapLocationLabel(t("selected_location", "Selected Location"));
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleConfirmMapLocation = () => {
    if (isOutOfZone) return;

    const cityName = state.city || "Cairo";
    const regionName = state.region || mapLocationLabel;

    localStorage.setItem(LocalKeys.CITY_NAME, cityName);
    localStorage.setItem(LocalKeys.REGION_NAME, regionName);

    if (onClose) onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/50 backdrop-blur-sm"
      dir={locale === "ar" ? "rtl" : "ltr"}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg p-6 transition-all bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {t("choose_your_region", locale === "ar" ? "اختر منطقتك" : "Choose Your Region")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Map View */}
        {mode === "map" ? (
          <div>
            {/* Search Input & Dropdown */}
            <div className="relative mb-3">
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-3 h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder={t("search_areas", locale === "ar" ? "ابحث عن منطقة..." : "Search areas...")}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full rounded-xl bg-slate-100 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Suggestions Dropdown */}
              {searchResults.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 overflow-hidden overflow-y-auto bg-white border shadow-lg border-slate-200 rounded-xl max-h-48">
                  {searchResults.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSearchResult(item)}
                      className="px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 cursor-pointer border-b border-slate-100 last:border-0"
                    >
                      {item.display_name}
                    </li>
                  ))}
                </ul>
              )}

              {isSearching && (
                <div className="absolute text-xs right-3 top-3 text-slate-400">
                  {t("loading...", "Searching...")}
                </div>
              )}
            </div>

            {/* Map Canvas */}
            <div className="relative h-[240px] w-full overflow-hidden rounded-xl border border-slate-200">
              <LeafletMap
                center={selectedCoords}
                selectedCoords={selectedCoords}
                onMapClick={handleMapClick}
              />
            </div>

            {/* Out Of Delivery Zone Alert */}
            {isOutOfZone ? (
              <div className="p-3 my-3 text-xs border rounded-xl border-amber-200 bg-amber-50 text-amber-800">
                <p className="font-bold text-red-600">
                  ⚠️ {t("sorry_we_do_not_cover_this_area", "Sorry, we do not cover this area")}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 my-3 text-sm font-semibold text-slate-900">
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span>
                  {isLoadingAddress
                    ? t("getting_address", "Fetching address...")
                    : mapLocationLabel}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={handleConfirmMapLocation}
                disabled={isOutOfZone || isLoadingAddress}
                className="flex-1 py-3 text-sm font-semibold text-white transition-all rounded-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50"
              >
                {t("save", locale === "ar" ? "حفظ التغييرات" : "Save Changes")}
              </button>
              <button
                type="button"
                onClick={() => setMode("manual")}
                className="flex-1 py-3 text-sm font-semibold transition-all border-2 rounded-full border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                {t("enter_manually", locale === "ar" ? "أدخل يدوياً" : "Enter Manually")}
              </button>
            </div>
          </div>
        ) : (
          /* Manual Dropdowns Form */
          <form className="pt-1 space-y-4" onSubmit={HandelSubmit}>
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs text-slate-500">
                {t("select_location_manual", "Select options below")}
              </span>
              <button
                type="button"
                onClick={() => setMode("map")}
                className="text-xs font-semibold text-slate-900 hover:underline"
              >
                ← {t("use_map", locale === "ar" ? "استخدم الخريطة" : "Use Map")}
              </button>
            </div>

            {/* Government Select */}
            <div className="space-y-1">
              <label htmlFor="Government" className="text-xs font-medium text-slate-700">
                {t("governments", locale === "ar" ? "المحافظات" : "Governorates")}
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
                id="Government"
                onChange={(e) => {
                  const selectedVal = e.target.value;
                  setGovernmentID(selectedVal);
                  setState((prev) => ({
                    ...prev,
                    city: e.target.options[e.target.selectedIndex].text,
                  }));
                }}
              >
                <option value="">
                  {t("select_government", locale === "ar" ? "اختر المحافظة" : "Select Governorate")}
                </option>
                {CitiesData &&
                  CitiesData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* City Select */}
            <div className="space-y-1">
              <label htmlFor="City" className="text-xs font-medium text-slate-700">
                {t("cities", locale === "ar" ? "المدن" : "Cities")}
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
                id="City"
                onChange={(e) => {
                  const selectedVal = e.target.value;
                  setCityID(selectedVal);
                  setState((prev) => ({
                    ...prev,
                    region: e.target.options[e.target.selectedIndex].text,
                  }));
                }}
              >
                <option value="">
                  {t("select_city", locale === "ar" ? "اختر المدينة" : "Select City")}
                </option>
                {CitiesByGovernorate &&
                  CitiesByGovernorate.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Branch Select */}
            <div className="space-y-1">
              <label htmlFor="Branches" className="text-xs font-medium text-slate-700">
                {t("branches", locale === "ar" ? "الفروع" : "Branches")}
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-800 outline-none focus:border-slate-900 focus:bg-white"
                id="Branches"
                onChange={(e) => {
                  setState((prev) => ({ ...prev, branch: e.target.value }));
                }}
              >
                <option value="">
                  {t("select_branch", locale === "ar" ? "اختر الفرع" : "Select Branch")}
                </option>
                {branchesData &&
                  branchesData.map((item) => (
                    <option key={item.id} value={item.branchID}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white transition-all rounded-full bg-slate-900 hover:bg-slate-800"
              >
                {t("save", locale === "ar" ? "حفظ التغييرات" : "Save Changes")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegionsBox;