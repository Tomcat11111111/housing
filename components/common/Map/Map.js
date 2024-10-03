import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

import { slice } from 'ramda';

import TypeSwitch from '@/common/Map/TypeSwitch';

import styles from './Map.module.scss';

function Map() {
  const center = {
    lat: 25.031722,
    lng: 121.51535,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM', // 替换为你的 Google API 密钥
    libraries: ['places', 'geometry'],
  });

  const [places, setPlaces] = useState([]);
  const [selectedType, setSelectedType] = useState('bus_station');

  useEffect(() => {
    if (!isLoaded) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 15,
    });

    new google.maps.Marker({
      position: center,
      map: map,
    });

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '500',
      type: [selectedType], // 想搜索的地點類型
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // 計算距離
        const placesWithDistance = results.map((place) => {
          const placeLocation = new window.google.maps.LatLng(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );

          new google.maps.Marker({
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            map: map,
          });

          const distance =
            window.google.maps.geometry.spherical.computeDistanceBetween(
              new window.google.maps.LatLng(center.lat, center.lng),
              placeLocation
            );
          return { ...place, distance };
        });

        setPlaces(placesWithDistance);
      }
    });
  }, [isLoaded, selectedType]);

  const twoClosePlaces = slice(0, 2, places);

  return (
    <>
      {isLoaded ? (
        <div className={styles.mapContainer}>
          <div id="map" className={styles.map}></div>
          <TypeSwitch
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            places={twoClosePlaces}
          />
        </div>
      ) : (
        <div style={{ height: 464 }}></div>
      )}
    </>
  );
}

export default Map;
