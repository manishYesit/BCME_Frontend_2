import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ markers = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyAGeCU2PHRGZBV_SPN3bp7tbjYI2zXwXBo",
      version: "weekly",
    });

    loader.load().then(() => {
      if (markers.length === 0) {
        console.error("No markers provided");
        return;
      }

      const map = new google.maps.Map(mapRef.current, {
        center: markers[0], // Default to the first marker
        zoom: 8,
      });

      const bounds = new google.maps.LatLngBounds();

      // Add markers and extend map bounds
      markers.forEach((marker) => {
        const position = { lat: marker.lat, lng: marker.lng };
        new google.maps.Marker({
          map: map,
          position,
        });
        bounds.extend(position);
      });

      // Fit map to bounds if more than one marker is provided
      if (markers.length > 1) {
        map.fitBounds(bounds);
      }
    });
  }, [markers]);

  return <div style={{ height: "400px", width: "80%", left:"10%" }} ref={mapRef} />;
}

export default Map;
