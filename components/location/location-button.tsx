'use client';

import { useEffect, useState } from 'react';
import { MapPinIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { LOCATION_STORAGE_KEY } from './constants';
import { LocationDialog } from './location-dialog';
import type { SavedLocation } from './types';

export function LocationButton() {
  const [location, setLocation] = useState<SavedLocation | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCATION_STORAGE_KEY);

    if (!saved) return;

    setLocation(JSON.parse(saved));
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="min-w-0 gap-2 px-2 sm:px-3">
        <MapPinIcon className="size-4 shrink-0" />

        <span className="hidden sm:block truncate max-w-[120px] md:max-w-[180px] lg:max-w-[240px]">
          {location?.area ?? 'Choose a location'}
        </span>
      </Button>

      <LocationDialog
        open={open}
        onOpenChange={setOpen}
        value={location}
        onLocationSelected={setLocation}
      />
    </>
  );
}
