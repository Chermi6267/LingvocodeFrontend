import type { ReactNode } from 'react';

import type { ThemeColor } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';
import { useTheme } from '@/shared/lib/theme';

import { resolveActionPalette, type ActionAccent, type ActionVariant } from '../actionPalette';
import { Pressable3D, type Pressable3DProps } from '../Pressable3D';

export type IconButtonVariant = ActionVariant;
export type IconButtonAccent = ActionAccent;
export type IconButtonShape = 'circle' | 'square';

export interface IconButtonIconState {
  readonly color: ThemeColor;
  readonly disabled: boolean;
}

export interface IconButtonProps extends Omit<
  Pressable3DProps,
  | 'children'
  | 'faceColor'
  | 'lipColor'
  | 'borderColor'
  | 'borderWidth'
  | 'hoverFaceColor'
  | 'hoverBorderColor'
  | 'faceStyle'
  | 'radius'
> {
  /**
   * Pass a render function to tint the icon automatically, or a ready node
   * when the icon owns its colours.
   */
  readonly icon: ReactNode | ((state: IconButtonIconState) => ReactNode);
  /** Required: icon-only controls have no visible text. */
  readonly accessibilityLabel: string;
  readonly variant?: IconButtonVariant;
  readonly accent?: IconButtonAccent;
  readonly shape?: IconButtonShape;
}

const useStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'flex-start',
  },
  face: {
    width: tokens.components.iconButton.size,
    height: tokens.components.iconButton.size,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

/**
 * Square/circular icon-only action built on Pressable3D.
 *
 * Keep `accessibilityLabel` mandatory: there is no text fallback.
 */
export function IconButton({
  icon,
  accessibilityLabel,
  variant = 'outline',
  accent = 'primary',
  shape = 'circle',
  disabled = false,
  style,
  accessibilityState,
  ...rest
}: IconButtonProps) {
  const { tokens } = useTheme();
  const styles = useStyles();

  const palette = resolveActionPalette(tokens, variant, accent, disabled);
  const radius = shape === 'circle' ? tokens.radii.pill : tokens.radii.md;

  const renderedIcon =
    typeof icon === 'function' ? icon({ color: palette.content, disabled }) : icon;

  return (
    <Pressable3D
      {...rest}
      disabled={disabled}
      faceColor={palette.face}
      lipColor={palette.lip}
      borderColor={palette.border}
      borderWidth={palette.borderWidth}
      hoverFaceColor={palette.hoverFace}
      radius={radius}
      faceStyle={styles.face}
      style={[styles.root, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ ...accessibilityState, disabled }}>
      {renderedIcon}
    </Pressable3D>
  );
}
