import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import i18next from "i18next";
import { useTranslation } from "next-i18next";
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
        {i18next.t("loading_map")}
      </div>
    ),
  },
);
const defaultCenter = [30.0444, 31.2357]; // Default: Cairo [lat, lng]

const RegionsBox = ({ onClose, hasSaved }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const { CitiesData, CitiesByGovernorate, branchesData } = useSelector(
    (state) => state.countries,
  );

  const [mode, setMode] = useState("map"); // 'map' or 'manual'
  const [governmentID, setGovernmentID] = useState(0);
  const [cityID, setCityID] = useState(0);

  const [formState, setFormState] = useState({
    city: "",
    region: "",
    branch: "",
  });

  // Map state
  const [selectedCoords, setSelectedCoords] = useState(defaultCenter);
  const [mapLocationLabel, setMapLocationLabel] = useState(t("cairo_egypt"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOutOfZone, setIsOutOfZone] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const savedCity = localStorage.getItem(LocalKeys.CITY_NAME) || "";
    const savedRegion = localStorage.getItem(LocalKeys.REGION_NAME) || "";
    const savedBranch = localStorage.getItem(LocalKeys.BRANCH_NAME) || "";
    setFormState({ city: savedCity, region: savedRegion, branch: savedBranch });
  }, []);

  useEffect(() => {
    dispatch(CitiesDataHandler());
  }, [dispatch]);

  // Pre-fill government select from saved city name
  useEffect(() => {
    if (!CitiesData?.length) return;
    const savedCity = localStorage.getItem(LocalKeys.CITY_NAME);
    if (!savedCity) return;
    const match = CitiesData.find((c) => c.name === savedCity);
    if (match) setGovernmentID(match.id);
  }, [CitiesData]);

  // Pre-fill city select from saved region name
  useEffect(() => {
    if (!CitiesByGovernorate?.length) return;
    const savedRegion = localStorage.getItem(LocalKeys.REGION_NAME);
    if (!savedRegion) return;
    const match = CitiesByGovernorate.find((c) => c.name === savedRegion);
    if (match) setCityID(match.id);
  }, [CitiesByGovernorate]);

  useEffect(() => {
    if (governmentID > 0) {
      dispatch(CitiesByGovernateDataHandler(governmentID));
    }
  }, [governmentID, dispatch]);

  useEffect(() => {
    if (cityID > 0) {
      dispatch(BranchesDataHandler(cityID));
    }
  }, [cityID, dispatch]);

  // Pre-fill branch select from saved branch ID
  useEffect(() => {
    if (!branchesData?.length) return;
    const savedBranchId = localStorage.getItem(LocalKeys.BRANCH_ID);
    if (!savedBranchId) return;
    const match = branchesData.find(
      (b) => String(b.branchID) === savedBranchId,
    );
    if (match) {
      setFormState((prev) => ({ ...prev, branch: savedBranchId }));
    }
  }, [branchesData]);

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
            query,
          )}&countrycodes=eg&limit=5`,
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
      setMapLocationLabel(t("sorry_we_do_not_cover_this_area"));
      return;
    }

    setIsOutOfZone(false);
    const label = result.display_name.split(",").slice(0, 2).join(",");
    setMapLocationLabel(label);

    setFormState((prev) => ({
      ...prev,
      city: t("cairo"),
      region: label,
    }));
  };

  const handleClose = useCallback(() => {
    if (hasSaved && onClose) onClose();
  }, [hasSaved, onClose]);

  // Handle Manual Form Submission
  const HandleSubmit = (e) => {
    if (e) e.preventDefault();

    if (formState.city) {
      localStorage.setItem(LocalKeys.CITY_NAME, formState.city);
    }

    if (formState.region) {
      localStorage.setItem(LocalKeys.REGION_NAME, formState.region);
    }

    if (formState.branch) {
      localStorage.setItem(LocalKeys.BRANCH_ID, formState.branch);
      const selected = document.getElementById("Branches");
      if (selected) {
        localStorage.setItem(
          LocalKeys.BRANCH_NAME,
          selected.options[selected.selectedIndex].text,
        );
      }
    }

    if (hasSaved) {
      if (onClose) onClose();
    } else {
      if (formState.city && formState.region) {
        if (onClose) onClose();
      }
    }

    window.location.reload();
  };

  // Reverse Geocoding via Free Nominatim API
  const handleMapClick = async ({ lat, lng }) => {
    setSelectedCoords([lat, lng]);

    const isInDeliveryZone = checkDeliveryZone(lat, lng);

    if (!isInDeliveryZone) {
      setIsOutOfZone(true);
      setMapLocationLabel(t("sorry_we_do_not_cover_this_area"));
      return;
    }

    setIsOutOfZone(false);
    setIsLoadingAddress(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
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
          t("cairo");

        const formattedName = district ? `${district}, ${city}` : city;

        setMapLocationLabel(formattedName);

        setFormState((prev) => ({
          ...prev,
          city: city,
          region: formattedName,
        }));
      } else {
        setMapLocationLabel(t("selected_location"));
      }
    } catch (error) {
      setMapLocationLabel(t("selected_location"));
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleConfirmMapLocation = () => {
    if (isOutOfZone) return;

    const cityName = formState.city || "Cairo";
    const regionName = formState.region || mapLocationLabel;

    localStorage.setItem(LocalKeys.CITY_NAME, cityName);
    localStorage.setItem(LocalKeys.REGION_NAME, regionName);

    setFormState((prev) => ({
      ...prev,
      city: cityName,
      region: regionName,
    }));

    if (onClose) onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg p-6 transition-all bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {t("select_your_location")}
          </h2>
          {hasSaved && (
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
          )}
        </div>

        {/* Map View */}
        {mode === "map" ? (
          <div>
            {/* Search Input & Dropdown */}
            <div className="relative mb-3">
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-3 h-4 w-4 text-brand-navy/60"
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
                  placeholder={t("search_areas")}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full rounded-xl bg-slate-100 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-navy"
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
                  {t("loading...") || "Searching..."}
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
                  ⚠️ {t("sorry_we_do_not_cover_this_area")}
                </p>
                <a
                  href="https://linktr.ee/elfergany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 font-bold underline text-brand-navy"
                >
                  {t("view_delivery_areas")}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2 my-3 text-sm font-semibold text-slate-900">
                <svg
                  className="w-5 h-5 text-brand-navy"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  {isLoadingAddress ? t("getting_address") : mapLocationLabel}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={handleConfirmMapLocation}
                disabled={isOutOfZone || isLoadingAddress}
                className="flex-1 py-3 text-sm font-semibold text-white transition-all rounded-full bg-brand-navy hover:opacity-90 disabled:opacity-50"
              >
                {t("select_your_location")}
              </button>
              <button
                type="button"
                onClick={() => setMode("manual")}
                className="flex-1 py-3 text-sm font-semibold transition-all border-2 rounded-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
              >
                {t("enter_manually")}
              </button>
            </div>
          </div>
        ) : (
          /* Manual Dropdowns Form */
          <form className="pt-1 space-y-4" onSubmit={HandleSubmit}>
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs text-slate-500">
                {t("select_government")}، {t("select_city")}،{" "}
                {t("select_branch")}
              </span>
              <button
                type="button"
                onClick={() => setMode("map")}
                className="text-xs font-semibold text-brand-navy hover:underline"
              >
                ← {t("use_map")}
              </button>
            </div>

            {/* Government Select */}
            <div className="space-y-1">
              <label
                htmlFor="Government"
                className="text-xs font-medium text-slate-700"
              >
                {t("governments")}
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-800 outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy"
                id="Government"
                value={governmentID || ""}
                onChange={(e) => {
                  setGovernmentID(Number(e.target.value));
                  setFormState({
                    ...formState,
                    city: e.target.options[e.target.selectedIndex].text,
                  });
                }}
              >
                <option value="">{t("select_government")}</option>
                {CitiesData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div className="space-y-1">
              <label
                htmlFor="City"
                className="text-xs font-medium text-slate-700"
              >
                {t("cities")}
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-800 outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy"
                id="City"
                value={cityID || ""}
                onChange={(e) => {
                  setCityID(Number(e.target.value));
                  setFormState({
                    ...formState,
                    region: e.target.options[e.target.selectedIndex].text,
                  });
                }}
              >
                <option value="">{t("select_city")}</option>
                {CitiesByGovernorate?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Select */}
            <div className="space-y-1">
              <label
                htmlFor="Branches"
                className="text-xs font-medium text-slate-700"
              >
                {t("branches")}
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-sm text-slate-800 outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy"
                id="Branches"
                value={formState.branch || ""}
                onChange={(e) => {
                  setFormState({ ...formState, branch: e.target.value });
                }}
              >
                <option value="">{t("select_branch")}</option>
                {branchesData?.map((item) => (
                  <option key={item.id} value={item.branchID}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-1 text-xs text-center text-slate-500">
              {t("want_to_check_covered_areas")}
              <a
                href="https://linktr.ee/elfergany"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-brand-navy"
              >
                {t("view_linktree_coverage")}
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!formState.city || !formState.region}
                className="w-full py-3 text-sm font-semibold text-white transition-all rounded-full bg-brand-navy hover:opacity-90 disabled:opacity-50"
              >
                {t("save")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegionsBox;