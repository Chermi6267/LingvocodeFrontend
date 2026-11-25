import type { ViewProps } from 'react-native';

export interface SliderProps extends Omit<ViewProps, 'accessibilityValue' | 'onLayout'> {
  /** Controlled numeric value. */
  readonly value?: number;
  readonly defaultValue?: number;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly onValueChange?: (value: number) => void;
  /** Called once when a drag or keyboard adjustment finishes. */
  readonly onSlidingComplete?: (value: number) => void;
  /** Visible heading; a string also becomes the accessible name. */
  readonly label?: string;
  readonly accessibilityLabel?: string;
  /** Custom text for screen readers and the optional value badge. */
  readonly formatValue?: (value: number) => string;
  readonly showValue?: boolean;
  readonly disabled?: boolean;
}
