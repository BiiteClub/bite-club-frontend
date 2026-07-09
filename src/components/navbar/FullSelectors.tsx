import React from 'react';
import Selectors from './Selectors';
import { Link } from '@/i18n/navigation';
import { BellIcon, ShoppingCartIcon } from 'lucide-react';

export default function FullSelectors() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-3">
        <Link href="/notifications" className="flex items-center">
          <BellIcon className="size-5" />
        </Link>
        <Link href="/cart" className="flex items-center ">
          <ShoppingCartIcon className="size-5" />
        </Link>
      </div>
      <Selectors />
    </div>
  );
}

