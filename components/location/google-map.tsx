'use client';

import { Map, AdvancedMarker, MapMouseEvent } from '@vis.gl/react-google-maps';

import type { LatLng } from './types';

interface GoogleMapProps {
  value: LatLng | null;
  onChange(location: LatLng): void;
}

const DEFAULT_CENTER = {
  lat: 30.0444,
  lng: 31.2357,
};

export function GoogleMap({ value, onChange }: GoogleMapProps) {
  function handleClick(event: MapMouseEvent) {
    if (!event.detail.latLng) return;

    onChange({
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    });
  }

  return (
    <Map
      defaultCenter={value ?? DEFAULT_CENTER}
      defaultZoom={13}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      style={{
        width: '100%',
        height: '100%',
      }}
      gestureHandling="greedy"
      disableDefaultUI
      onClick={handleClick}>
      {value && <AdvancedMarker position={value} />}
    </Map>
  );
}

