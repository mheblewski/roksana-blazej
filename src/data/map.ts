import L from 'leaflet';

export const MAP_CENTER: [number, number] = [51.76211465664362, 19.68033310659993];

export const mapPinIcon = L.divIcon({
  html: '<span class="map-pin-dot"></span>',
  className: 'map-pin-icon',
  iconSize: [22, 30],
  iconAnchor: [11, 30],
});
