import { createContext, useContext } from 'react';

import type { RadioValue } from './Radio.types';

export interface RadioGroupContextValue {
  readonly value: RadioValue | null;
  /** Last focused or arrow-targeted option, used as the origin for arrow keys. */
  readonly activeValue: RadioValue | null;
  readonly setActiveValue: (value: RadioValue) => void;
  readonly disabled: boolean;
  readonly select: (value: RadioValue) => void;
  readonly move: (from: RadioValue, delta: number) => void;
  readonly register: (value: RadioValue, disabled: boolean) => () => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}
