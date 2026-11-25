import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ModalProps {
  /** Controls visibility. */
  readonly visible: boolean;
  /** Called when the modal requests to close (backdrop, close action, system Back). */
  readonly onClose: () => void;
  /** Modal content. */
  readonly children: ReactNode;
  /** Optional heading rendered above content. */
  readonly title?: string;
  /** Hides the default close button. Defaults to `false`. */
  readonly hideCloseButton?: boolean;
  /** Prevents closing by tapping the backdrop. Defaults to `false`. */
  readonly dismissOnBackdrop?: boolean;
  /** Accessible label for the dialog. Falls back to `title`. */
  readonly accessibilityLabel?: string;
  /** Test id for the dialog container. */
  readonly testID?: string;
  /** Style applied to the dialog surface. */
  readonly style?: StyleProp<ViewStyle>;
  /** Style applied to the content wrapper inside the dialog. */
  readonly contentStyle?: StyleProp<ViewStyle>;
}
