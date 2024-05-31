import React, { useState } from 'react';
import Map from './Map';
import { cities } from '../data/cities'; // Assume cities data is exported from a file named cities.ts

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => value * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Game: React.FC = () => {
  const [score, setScore] = useState(1500);
  const [cityIndex, setCityIndex] = useState(0);
  const [userPosition, setUserPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [cityPosition, setCityPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const handleMapClick = (latLng: { lat: number, lng: number }) => {
    setUserPosition(latLng);
    const city = cities[cityIndex];
    const dist = calculateDistance(
      latLng.lat,
      latLng.lng,
      city.position.lat,
      city.position.lng
    );
    setDistance(dist);
    setScore(score - dist);
    setCityPosition({ lat: city.position.lat, lng: city.position.lng });

    if (dist <= 50) {
      setCityIndex(cityIndex + 1);
      setUserPosition(null);
      setCityPosition(null);
      setDistance(null);
    }
  };

  return (
    <div>
      <h1>City Finder Game</h1>
      <p>Score: {score}</p>
      <p>Find: {cities[cityIndex].name}</p>
      {distance !== null && <p>Distance: {distance.toFixed(2)} km</p>}
      <Map
        onMapClick={handleMapClick}
        userPosition={userPosition}
        cityPosition={cityPosition}
      />
      {score <= 0 && <p>Game Over! You found {cityIndex} cities.</p>}
    </div>
  );
};

export default Game;
