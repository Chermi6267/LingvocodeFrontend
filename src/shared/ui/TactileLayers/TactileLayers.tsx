import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

import type { ThemeColor } from '@/shared/config/theme';

export interface TactileLayersProps {
  readonly children?: ReactNode;
  readonly faceColor: ThemeColor;
  readonly lipColor: ThemeColor;
  readonly borderColor?: ThemeColor;
  readonly borderWidth: number;
  readonly radius: number;
  readonly lipHeight: number;
  readonly showLip: boolean;
  readonly faceStyle?: StyleProp<ViewStyle>;
  readonly animatedFaceStyle?: StyleProp<AnimatedStyle<ViewStyle>>;
}

/**
 * The single implementation of the Tactile 2.5D surface.
 *
 * Structure:
 * - the lip is absolutely positioned `lipHeight` below the face and extends
 *   `lipHeight` past the layout box, exactly like a hard `0 4px 0` box-shadow;
 * - the face is the only element in the layout flow;
 * - pressing translates the face down, covering the lip.
 *
 * Nothing here changes layout metrics, so neighbours never move and the
 * element cannot cause a layout shift. Consumers must render this inside a
 * positioned container (`position: 'relative'`, the RN default).
 */
export function TactileLayers({
  children,
  faceColor,
  lipColor,
  borderColor,
  borderWidth,
  radius,
  lipHeight,
  showLip,
  faceStyle,
  animatedFaceStyle,
}: TactileLayersProps) {
  const lipStyle: ViewStyle = {
    position: 'absolute',
    top: lipHeight,
    right: 0,
    bottom: -lipHeight,
    left: 0,
    backgroundColor: lipColor,
    borderRadius: radius,
  };

  const faceBaseStyle: ViewStyle = {
    backgroundColor: faceColor,
    borderRadius: radius,
    overflow: 'hidden',
  };

  const borderStyle: ViewStyle | undefined =
    borderWidth > 0
      ? {
          borderWidth,
          borderColor: borderColor ?? faceColor,
        }
      : undefined;

  return (
    <>
      {showLip ? (
        <View
          pointerEvents="none"
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={lipStyle}
        />
      ) : null}
      <Animated.View style={[faceBaseStyle, borderStyle, faceStyle, animatedFaceStyle]}>
        {children}
      </Animated.View>
    </>
  );
}
