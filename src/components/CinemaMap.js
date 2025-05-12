import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import allStyles from '../css/styles.module.css';

export default function CinemaMap({ cinemas, selected, setSelected }) {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 55.1694,
    lng: 23.8813
  };

  return (
    <LoadScript googleMapsApiKey="x">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7.2}
        center={defaultCenter}
      >
        {cinemas.map((cinema, idx) => (
          <Marker
            key={idx}
            position={{
              lat: parseFloat(cinema.lat.replace(',', '.')),
              lng: parseFloat(cinema.lon.replace(',', '.')),
            }}
            onClick={() => setSelected(cinema)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: parseFloat(selected.lat.replace(',', '.')),
              lng: parseFloat(selected.lon.replace(',', '.')),
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ minWidth: '200px' }}>
              <div className={allStyles.mapText} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{selected.name}</strong>
              </div>
              <div style={{ marginTop: '4px' }}>
                {selected.address}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
