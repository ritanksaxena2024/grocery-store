'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  pincode: string;
}

const LocationPickerByPincode = ({ pincode }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
        );
        const data = await res.json();

        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
        } else {
          console.warn('No results found for this pincode.');
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    if (pincode) fetchCoordinates();
  }, [pincode]);

  return (
    <div className="h-[400px] w-full">
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={markerIcon} />
        </MapContainer>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default LocationPickerByPincode;
