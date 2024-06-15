/* eslint-disable no-unused-vars */
import React from 'react';

import { MinusIcon } from '../Icons/MinusIcon';
import { PlusIcon } from '../Icons/PlusIcon';

interface QuantityControlProps {
  handler: (action: string) => void;
  quantity: number;
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  handler,
  quantity,
  disabled = false,
}) => (
  <div className="counter-items">
    <button
      type="button"
      aria-label="decrement"
      onClick={() => handler('decrement')}
      disabled={disabled}
    >
      <MinusIcon />
    </button>
    <span className="quantity">{quantity}</span>
    <button
      type="button"
      aria-label="increment"
      onClick={() => handler('increment')}
      disabled={disabled}
    >
      <PlusIcon />
    </button>
  </div>
);
