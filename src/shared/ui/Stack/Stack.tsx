import { View } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { resolveStackStyle } from './Stack.styles';
import type { StackProps } from './Stack.types';

/** Flex container with token gap, alignment and free-space distribution. */
export function Stack({
  children,
  style,
  direction = 'vertical',
  gap,
  align,
  justify,
  wrap,
  reverse,
  flex,
  ...viewProps
}: StackProps) {
  const { tokens } = useTheme();
  const resolvedStyle = resolveStackStyle(tokens, {
    direction,
    gap,
    align,
    justify,
    wrap,
    reverse,
    flex,
  });

  return (
    <View {...viewProps} style={[resolvedStyle, style]}>
      {children}
    </View>
  );
}
