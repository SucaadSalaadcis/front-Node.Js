import { useEffect, useRef } from "react";

const LeafletMap = ({ center, selectedCoords, onMapClick }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Prevent execution on server-side rendering
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    import("leaflet").then((L) => {
      // Fix for Leaflet missing default marker icons in React/Next.js
      const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      // Initialize map if it doesn't exist
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current).setView(center, 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Click event listener
        map.on("click", (e) => {
          if (onMapClick) {
            onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
          }
        });

        // Add pin marker
        const marker = L.marker(selectedCoords, { icon: customIcon }).addTo(map);

        mapInstanceRef.current = map;
        markerRef.current = marker;
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Move marker when selected position updates
  useEffect(() => {
    if (markerRef.current && selectedCoords) {
      markerRef.current.setLatLng(selectedCoords);
    }
  }, [selectedCoords]);

  return <div ref={mapContainerRef} className="z-0 w-full h-full" />;
};

export default LeafletMap;