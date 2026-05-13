import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MAP_CENTER, mapPinIcon } from '../data/map';

export function LeafletMap() {
  return (
    <div className="leaflet-map-wrap" aria-label="Mapa lokalizacji Stodoła Jordanów">
      <MapContainer
        center={MAP_CENTER}
        zoom={9}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        doubleClickZoom={false}
        keyboard={false}
        touchZoom={false}
        className="leaflet-map"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Marker position={MAP_CENTER} icon={mapPinIcon} />
      </MapContainer>
      <span className="map-label">Stodoła Jordanów</span>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Jordan%C3%B3w%204B%2C%2095-060%20Jordan%C3%B3w"
        target="_blank"
        rel="noopener noreferrer"
      >
        Otwórz trasę w Google Maps
      </a>
    </div>
  );
}
