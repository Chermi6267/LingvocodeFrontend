import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Semantic variant. Defaults to `info`. */
  readonly variant?: AlertVariant;
  /** Optional heading. */
  readonly title?: string;
  /** Main message. */
  readonly message?: ReactNode;
  /** Optional custom icon; pass `null` to hide icon. */
  readonly icon?: ReactNode | null;
  /** Shows close action. */
  readonly closable?: boolean;
  /** Called when close action is pressed. */
  readonly onClose?: () => void;
  /** Optional action area rendered below/after message. */
  readonly action?: ReactNode;
  /** Test id. */
  readonly testID?: string;
  /** Container style override. */
  readonly style?: StyleProp<ViewStyle>;
  /** Accessibility label override. */
  readonly accessibilityLabel?: string;
}
