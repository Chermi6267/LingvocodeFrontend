import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { createStyles } from '@/shared/lib/styles';
import { useTheme } from '@/shared/lib/theme';

import { resolveActionPalette, type ActionAccent, type ActionVariant } from '../actionPalette';
import { Pressable3D, type Pressable3DProps } from '../Pressable3D';
import { Text } from '../Text';

export type ButtonVariant = ActionVariant;
export type ButtonAccent = ActionAccent;

export interface ButtonProps extends Omit<
  Pressable3DProps,
  | 'children'
  | 'faceColor'
  | 'lipColor'
  | 'borderColor'
  | 'borderWidth'
  | 'hoverFaceColor'
  | 'hoverBorderColor'
  | 'faceStyle'
> {
  readonly children: ReactNode;
  /** Filled accent surface or white/grey outlined surface. */
  readonly variant?: ButtonVariant;
  /** Accent triad used by the `solid` variant. Ignored by `outline`. */
  readonly accent?: ButtonAccent;
  readonly fullWidth?: boolean;
  readonly loading?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
}

const useStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  face: {
    minHeight: tokens.components.button.minHeight,
    paddingHorizontal: tokens.components.button.paddingHorizontal,
    paddingVertical: tokens.components.button.paddingVertical,
    justifyContent: 'center',
    userSelect: 'none',
  },
  label: {
    userSelect: 'none',
  },
  content: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
  },
  hidden: {
    opacity: 0,
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

/**
 * Primary action primitive built on Pressable3D.
 *
 * - `solid` keeps the accent triad (base face / lip edge / white label);
 * - `outline` uses the 2px border + 4px grey lip combination;
 * - disabled is always flat (no lip) with the disabled token pair;
 * - loading keeps the lip and label width, blocks input and exposes `busy`.
 */
export function Button({
  children,
  variant = 'solid',
  accent = 'primary',
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
  const styles = useStyles();

  const palette = resolveActionPalette(tokens, variant, accent, disabled);
  const isBlocked = disabled || loading;

  const rootStyle = fullWidth ? [styles.root, styles.fullWidth, style] : [styles.root, style];

  return (
    <Pressable3D
      {...rest}
      disabled={isBlocked}
      showLip={!disabled}
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
            <ActivityIndicator color={palette.content} size="small" />
          </View>
        ) : null}
      </View>
    </Pressable3D>
  );
}
