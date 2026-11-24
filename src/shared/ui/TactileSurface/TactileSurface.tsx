import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import type { ThemeColor } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/theme';

import { TactileLayers } from '../TactileLayers';

export interface TactileSurfaceProps extends Omit<ViewProps, 'children' | 'style'> {
  readonly children?: ReactNode;
  readonly faceColor: ThemeColor;
  readonly lipColor: ThemeColor;
  readonly borderColor?: ThemeColor;
  /** Defaults to 2 when a border colour is provided, otherwise 0. */
  readonly borderWidth?: number;
  /** Defaults to `tokens.radii.md`. */
  readonly radius?: number;
  /** Defaults to `tokens.effects.lipHeight` (4px). */
  readonly lipHeight?: number;
  /** Set to `false` for flat/disabled surfaces. */
  readonly showLip?: boolean;
  readonly faceStyle?: StyleProp<ViewStyle>;
  readonly style?: StyleProp<ViewStyle>;
}

/**
 * Non-interactive Tactile 2.5D surface.
 *
 * Useful for static cards, decorative tiles and skeletons that should keep the
 * visual language without becoming focusable or pressable.
 */
export function TactileSurface({
  children,
  faceColor,
  lipColor,
  borderColor,
  borderWidth,
  radius,
  lipHeight,
  showLip = true,
  faceStyle,
  style,
  ...rest
}: TactileSurfaceProps) {
  const { tokens } = useTheme();

  const resolvedRadius = radius ?? tokens.radii.md;
  const resolvedLipHeight = lipHeight ?? tokens.effects.lipHeight;
  const resolvedBorderWidth =
    borderWidth ?? (borderColor ? tokens.borderWidths.default : tokens.borderWidths.none);

  const rootStyle: ViewStyle = { position: 'relative' };

  return (
    <View {...rest} style={[rootStyle, style]}>
      <TactileLayers
        faceColor={faceColor}
        lipColor={lipColor}
        borderColor={borderColor}
        borderWidth={resolvedBorderWidth}
        radius={resolvedRadius}
        lipHeight={resolvedLipHeight}
        showLip={showLip}
        faceStyle={faceStyle}>
        {children}
      </TactileLayers>
    </View>
  );
}
