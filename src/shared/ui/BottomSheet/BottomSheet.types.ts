import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type BottomSheetVariant = 'default' | 'success' | 'error';

export interface BottomSheetProps {
  /** Controls visibility. */
  readonly visible: boolean;
  /** Called when the sheet requests to close. */
  readonly onClose: () => void;
  /** Sheet content. Ignored when feedback props render the built-in layout. */
  readonly children?: ReactNode;
  /** Visual variant. `success`/`error` render Duolingo-style feedback panels. */
  readonly variant?: BottomSheetVariant;
  /** Heading for feedback variants or optional generic title. */
  readonly heading?: string;
  /** Message for feedback variants. */
  readonly message?: string;
  /** Action button label for feedback variants. */
  readonly actionLabel?: string;
  /** Action button handler for feedback variants. */
  readonly onAction?: () => void;
  /** Shows loading state on the feedback action button. */
  readonly actionLoading?: boolean;
  /** Hides backdrop tap-to-close. Defaults to `false`. */
  readonly dismissOnBackdrop?: boolean;
  /** Enables drag-down-to-close gesture. Defaults to `true`. */
  readonly enableSwipeClose?: boolean;
  /** Fixed sheet height. If omitted, sheet sizes to content up to max height. */
  readonly height?: number;
  /** Maximum sheet height. Defaults to `motion.sheet.maxHeightRatio` of window height. */
  readonly maxHeight?: number;
  /** Accessible label for the sheet dialog. */
  readonly accessibilityLabel?: string;
  /** Test id for the sheet container. */
  readonly testID?: string;
  /** Style applied to the sheet surface. */
  readonly style?: StyleProp<ViewStyle>;
  /** Style applied to content wrapper. */
  readonly contentStyle?: StyleProp<ViewStyle>;
}
