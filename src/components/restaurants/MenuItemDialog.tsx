'use client';

import type { MenuItem } from '@/types/restaurant/restaurantItem';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MenuItemCustomizer from './MenuItemCustomizer';

type Props = {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MenuItemDialog({ item, open, onOpenChange }: Props) {
  if (!item) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>
        <MenuItemCustomizer
          key={item.id}
          item={item}
          variant="dialog"
          onAddToCart={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
