import { View, type ViewStyle } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { resolveCardPalette, useCardStyles } from './Card.styles';
import type { CardProps } from './Card.types';

/**
 * Tactile card surface with two modes:
 *
 * - `info` (default without `onPress`) — static informational card;
 * - `choice` — interactive answer tile with hover/press, selected, correct and
 *   wrong states.
 *
 * The 2px border and the 4px bottom edge are always present, and state changes
 * only swap colours, so neighbours never move. An optional 28×28 badge can show
 * an answer number or a hotkey.
 */
export function Card({
  children,
  variant,
  selected = false,
  status,
  badge,
  radius,
  disabled = false,
  onPress,
  style,
  accessibilityState,
  ...rest
}: CardProps) {
  const { tokens } = useTheme();
  const styles = useCardStyles();

  const interactive = (variant ?? (typeof onPress === 'function' ? 'choice' : 'info')) === 'choice';
  const palette = resolveCardPalette(tokens, {
    selected,
    status,
    disabled,
    interactive,
  });
  const resolvedRadius = radius ?? tokens.radii.lg;

  const badgeStyle: ViewStyle = {
    backgroundColor: palette.badgeBackground,
    borderColor: palette.badgeBorder,
  };

  const content = (
    <View style={styles.content}>
      {badge !== undefined ? (
        <View style={[styles.badge, badgeStyle]} pointerEvents="none">
          <Text variant="badge" color={palette.content}>
            {badge}
          </Text>
        </View>
      ) : null}
      <View style={styles.body}>{children}</View>
    </View>
  );

  if (!interactive) {
    return (
      <TactileSurface
        {...rest}
        faceColor={palette.face}
        lipColor={palette.lip}
        borderColor={palette.border}
        borderWidth={tokens.borderWidths.default}
        radius={resolvedRadius}
        showLip={palette.showLip}
        faceStyle={styles.face}
        style={[styles.root, style]}
        accessibilityState={{ ...accessibilityState, selected, disabled }}>
        {content}
      </TactileSurface>
    );
  }

  return (
    <Pressable3D
      {...rest}
      onPress={onPress}
      disabled={disabled}
      faceColor={palette.face}
      lipColor={palette.lip}
      borderColor={palette.border}
      borderWidth={tokens.borderWidths.default}
      hoverFaceColor={palette.hoverFace}
      radius={resolvedRadius}
      showLip={palette.showLip}
      faceStyle={styles.face}
      style={[styles.root, style]}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, selected, disabled }}>
      {content}
    </Pressable3D>
  );
}
