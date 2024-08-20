import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Custom hook to handle map zoom changes
const useZoom = (setZoomLevel) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      setZoomLevel(map.getZoom());
    };

    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, setZoomLevel]);
};

// Main MapComponent
const MapComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(13);

  // Call the custom hook to manage zoom events
  useZoom(setZoomLevel);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={zoomLevel} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          <strong>Target Location</strong><br />
          {zoomLevel > 15 ? "More detailed information about this location." : "Zoom in for more details."}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
