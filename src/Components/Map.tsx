// Map.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 50.8503,
  lng: 4.3517,
};

interface Props {
  onMapClick: (latLng: google.maps.LatLngLiteral) => void;
  userPosition: google.maps.LatLngLiteral | null;
  cityPosition: google.maps.LatLngLiteral | null;
}

const Map: React.FC<Props> = ({ onMapClick, userPosition, cityPosition }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDxfMQjtjxrhfKfbCMiZ1kC7T6XWNTWDq0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={(e) => {
          if (e.latLng) {
            onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          }
        }}
      >
        {userPosition && <Marker position={userPosition} />}
        {cityPosition && <Marker position={cityPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
