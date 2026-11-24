import type { ReactNode } from 'react';

import type { ThemeColor, ThemeTokens } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';
import { useTheme } from '@/shared/lib/theme';

import { Pressable3D, type Pressable3DProps } from '../Pressable3D';
import { TactileSurface } from '../TactileSurface';

export interface CardProps extends Omit<
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
  | 'accessibilityRole'
> {
  readonly children: ReactNode;
  readonly selected?: boolean;
  /** Defaults to `tokens.radii.lg`. */
  readonly radius?: number;
}

interface CardPalette {
  readonly face: ThemeColor;
  readonly lip: ThemeColor;
  readonly border: ThemeColor;
  readonly hoverFace?: ThemeColor;
}

function resolveCardPalette(
  tokens: ThemeTokens,
  selected: boolean,
  disabled: boolean,
): CardPalette {
  if (disabled) {
    return {
      face: tokens.colors.bgSurface,
      lip: tokens.colors.borderLip,
      border: tokens.colors.borderDefault,
    };
  }

  if (selected) {
    return {
      face: tokens.colors.choiceCardSelected.background,
      lip: tokens.colors.choiceCardSelected.lip,
      border: tokens.colors.choiceCardSelected.border,
    };
  }

  return {
    face: tokens.colors.bgElevated,
    lip: tokens.colors.borderLip,
    border: tokens.colors.borderDefault,
    hoverFace: tokens.colors.bgSurface,
  };
}

const useStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'stretch',
  },
  face: {
    padding: tokens.components.choiceCard.padding,
  },
}));

/**
 * Tactile card surface.
 *
 * With `onPress` it becomes a button-like Pressable3D (hover, focus ring,
 * selected/disabled a11y state). Without it the card keeps the 3D edge but is
 * rendered as a static View, so it never enters the focus order.
 */
export function Card({
  children,
  selected = false,
  radius,
  disabled = false,
  onPress,
  style,
  accessibilityState,
  ...rest
}: CardProps) {
  const { tokens } = useTheme();
  const styles = useStyles();

  const palette = resolveCardPalette(tokens, selected, disabled);
  const resolvedRadius = radius ?? tokens.radii.lg;
  const interactive = typeof onPress === 'function';

  if (!interactive) {
    return (
      <TactileSurface
        faceColor={palette.face}
        lipColor={palette.lip}
        borderColor={palette.border}
        borderWidth={tokens.borderWidths.default}
        radius={resolvedRadius}
        showLip={!disabled}
        faceStyle={styles.face}
        style={[styles.root, style]}
        accessibilityState={{ selected, disabled }}>
        {children}
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
      faceStyle={styles.face}
      style={[styles.root, style]}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, selected, disabled }}>
      {children}
    </Pressable3D>
  );
}
