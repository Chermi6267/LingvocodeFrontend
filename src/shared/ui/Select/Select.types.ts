import type { Pressable3DProps } from '../Pressable3D';

export interface SelectOption<T> {
  readonly value: T;
  readonly label: string;
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string;
}

export interface SelectProps<T> extends Omit<
  Pressable3DProps,
  | 'children'
  | 'faceColor'
  | 'lipColor'
  | 'borderColor'
  | 'borderWidth'
  | 'faceStyle'
  | 'radius'
  | 'hoverFaceColor'
  | 'onPress'
  | 'accessibilityRole'
> {
  readonly options: readonly SelectOption<T>[];
  /** Controlled selected value; `null` means "nothing selected". */
  readonly value?: T | null;
  readonly defaultValue?: T | null;
  readonly onValueChange?: (value: T, index: number) => void;
  readonly onOpenChange?: (open: boolean) => void;
  /** Visible field heading. A string also becomes the accessible name. */
  readonly label?: string;
  readonly placeholder?: string;
  /** Overrides the accessible name derived from `label` / `placeholder`. */
  readonly accessibilityLabel?: string;
  /** Screen-reader hint for the trigger; has a Russian default. */
  readonly accessibilityHint?: string;
  /** Defaults to 5 rows before the list becomes scrollable. */
  readonly maxVisibleOptions?: number;
  /** Stretches the trigger to the container width. Defaults to `true`. */
  readonly fullWidth?: boolean;
}
