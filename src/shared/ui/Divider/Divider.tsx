import { View } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { resolveDividerStyle } from './Divider.styles';
import type { DividerProps } from './Divider.types';

/** Themed separator; horizontal by default, with an optional vertical axis. */
export function Divider({
  orientation = 'horizontal',
  thickness,
  length,
  color,
  accessibilityRole = 'separator',
  style,
  ...visual
}: DividerProps) {
  const { tokens } = useTheme();
  const resolvedStyle = resolveDividerStyle(tokens, { orientation, thickness, length, color });

  return <View {...visual} accessibilityRole={accessibilityRole} style={[resolvedStyle, style]} />;
}
