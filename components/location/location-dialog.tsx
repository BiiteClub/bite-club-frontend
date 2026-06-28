'use client';

import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { GoogleMap } from './google-map';
import { reverseGeocode } from './geocoder';
import { LOCATION_STORAGE_KEY } from './constants';
import type { LatLng, SavedLocation } from './types';

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  value: SavedLocation | null;
  onLocationSelected(location: SavedLocation): void;
}

export function LocationDialog({
  open,
  onOpenChange,
  value,
  onLocationSelected,
}: Props) {
  const [location, setLocation] = useState<LatLng | null>(
    value
      ? {
          lat: value.lat,
          lng: value.lng,
        }
      : null,
  );

  const [area, setArea] = useState(value?.area ?? '');
  const [address, setAddress] = useState(value?.address ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (!value) {
      setLocation(null);
      setArea('');
      setAddress('');
      return;
    }

    setLocation({
      lat: value.lat,
      lng: value.lng,
    });

    setArea(value.area);
    setAddress(value.address);
  }, [open, value]);

  async function handleLocationChange(location: LatLng) {
    setLocation(location);
    setLoading(true);

    try {
      const result = await reverseGeocode(location.lat, location.lng);

      setArea(result.area);
      setAddress(result.address);
    } finally {
      setLoading(false);
    }
  }

  function handleConfirm() {
    if (!location) return;

    const saved: SavedLocation = {
      ...location,
      area,
      address,
    };

    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(saved));

    onLocationSelected(saved);
    onOpenChange(false);
  }

  function handleCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select your location</DialogTitle>
        </DialogHeader>

        <div className="h-[500px] overflow-hidden rounded-lg border">
          <GoogleMap value={location} onChange={handleLocationChange} />
        </div>

        <div className="min-h-12 space-y-1">
          {loading ? (
            <p className="text-sm text-muted-foreground">Finding address...</p>
          ) : location ? (
            <>
              <p className="font-medium">{area}</p>
              <p className="text-sm text-muted-foreground">{address}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click anywhere on the map to choose a location.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!location || loading}
            onClick={handleConfirm}>
            Confirm location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
