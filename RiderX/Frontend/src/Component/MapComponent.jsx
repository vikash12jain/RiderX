import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'remixicon/fonts/remixicon.css'

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapComponent = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const currentCoords = useRef([0, 0]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: false,
        dragging: true,
        touchZoom: true,
        tap: true,
      }).setView([0, 0], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }

    // Location update logic
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            currentCoords.current = [latitude, longitude];

            // Update or add marker
            if (markerRef.current) {
              markerRef.current.setLatLng([latitude, longitude]);
            } else {
              markerRef.current = L.marker([latitude, longitude], { icon: blueIcon })
                .addTo(mapRef.current)
                .openPopup();
            }

            // Update or add circle
            if (circleRef.current) {
              circleRef.current.setLatLng([latitude, longitude]);
            } else {
              circleRef.current = L.circle([latitude, longitude], {
                radius: 280,
                color:'blue',
                fillOpacity: 0.1,
              }).addTo(mapRef.current);
            }

            if (!mapRef.current.hasCentered) {
              mapRef.current.setView([latitude, longitude], 17);
              mapRef.current.hasCentered = true;
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
          }
        );
      } else {
        console.error('Geolocation not supported.');
      }
    };

    updateLocation();
    const interval = setInterval(updateLocation, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleRecenter = () => {
    if (mapRef.current && currentCoords.current) {
      mapRef.current.setView(currentCoords.current, 17);
    }
  };

  return (
    <div style={{ position: 'relative',
      height:"100%"
     }}>
      {/* Map container */}
      <div
        id="map"
        style={{
          height: '100%',
          width: '100%',
        }}
      />

      {/* Floating "Current Location" Button */}
      <button
        onClick={handleRecenter}
        style={{
          position: 'absolute',
          top:"330px",
          right: '10px',
          padding: '2px 2px',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <i className="ri-compass-3-line text-3xl font-normal text-black "></i>
      </button>
    </div>
  );
};

export default MapComponent;
