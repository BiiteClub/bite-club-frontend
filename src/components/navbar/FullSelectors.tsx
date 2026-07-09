'use client';
import React, { useState } from 'react';
import Selectors from './Selectors';
import { Link } from '@/i18n/navigation';
import { BellIcon, ShoppingCart, ShoppingCartIcon } from 'lucide-react';
import CartDrawer from '../cart/CartDrawer';

export default function FullSelectors() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-3">
        <Link href="/notifications" className="flex items-center">
          <BellIcon className="size-5" />
        </Link>
        <button onClick={() => setOpen((prev) => !prev)}>
          <ShoppingCart />
        </button>

        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </div>
      <Selectors />
    </div>
  );
}

