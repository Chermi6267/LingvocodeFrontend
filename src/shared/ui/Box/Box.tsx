import { View } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { resolveBoxStyle } from './Box.styles';
import type { BoxProps } from './Box.types';

/** Base container: sizes, token spacing/radii, semantic background and border. */
export function Box({
  children,
  style,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  flex,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  radius,
  background,
  borderWidth,
  borderColor,
  ...viewProps
}: BoxProps) {
  const { tokens } = useTheme();
  const resolvedStyle = resolveBoxStyle(tokens, {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    flex,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    radius,
    background,
    borderWidth,
    borderColor,
  });

  return (
    <View {...viewProps} style={[resolvedStyle, style]}>
      {children}
    </View>
  );
}
