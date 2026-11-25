import { View } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { resolveButtonPalette, useButtonStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

/**
 * Themed action button built on Pressable3D.
 *
 * - four semantic variants (`primary`, `secondary`, `danger`, `ghost`);
 * - press/release is an animated translate of the face over a 2.5D lip, so no
 *   layout metric ever changes and neighbours cannot shift;
 * - `disabled` is flat and non-interactive; `loading` keeps the lip and the
 *   label in place (opacity only) and overlays a themed spinner;
 * - input is blocked while busy and the a11y state exposes `disabled`/`busy`.
 */
export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  accessibilityState,
  ...rest
}: ButtonProps) {
  const { tokens } = useTheme();
  const styles = useButtonStyles();

  const palette = resolveButtonPalette(tokens, variant, disabled);
  const isBlocked = disabled || loading;

  const rootStyle = fullWidth ? [styles.root, styles.fullWidth, style] : [styles.root, style];

  return (
    <Pressable3D
      {...rest}
      disabled={isBlocked}
      showLip={palette.showLip}
      faceColor={palette.face}
      lipColor={palette.lip}
      borderColor={palette.border}
      borderWidth={palette.borderWidth}
      hoverFaceColor={palette.hoverFace}
      faceStyle={styles.face}
      style={rootStyle}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled: isBlocked, busy: loading }}>
      <View style={styles.content}>
        <View style={[styles.row, loading && styles.hidden]} pointerEvents="none">
          {leftIcon}
          <Text variant="button" color={palette.content} style={styles.label}>
            {children}
          </Text>
          {rightIcon}
        </View>
        {loading ? (
          <View style={styles.spinnerOverlay} pointerEvents="none">
            <Spinner size="sm" color={palette.content} trackColor="progressHighlight" />
          </View>
        ) : null}
      </View>
    </Pressable3D>
  );
}
