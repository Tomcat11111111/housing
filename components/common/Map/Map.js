import { useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

import { set, slice } from 'ramda';

import TypeSwitch from '@/common/Map/TypeSwitch';

import styles from './Map.module.scss';

function Map({ coordinates = [] }) {
  const [lat, lng] = coordinates;
  const center = {
    lat,
    lng,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCudV7XzW3pXqAE-RljZ5JdGkOE8Dd-XQM', // Google API key
    libraries: ['places', 'geometry'],
  });

  const [places, setPlaces] = useState([]);
  const [selectedType, setSelectedType] = useState('school');

  useEffect(() => {
    if (!isLoaded) return;

    const initMap = async () => {
      const { AdvancedMarkerElement } =
        await google.maps.importLibrary('marker');

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 15,
      });

      new AdvancedMarkerElement({
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
        console.log('status: ', status);
        console.log(window.google.maps.places.PlacesServiceStatus.OK);

        const placesWithDistance = results.map((place) => {
          const placeLocation = new window.google.maps.LatLng(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );

          new AdvancedMarkerElement({
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

        console.log('placesWithDistance: ', placesWithDistance);

        setPlaces(placesWithDistance);
      });
    };

    initMap();
  }, [isLoaded, selectedType]);

  const twoClosePlaces = slice(0, 2, places);
  return (
    <>
      {isLoaded ? (
        <div className={styles.mapContainer}>
          <div id="map" className={styles.dmap}></div>
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
