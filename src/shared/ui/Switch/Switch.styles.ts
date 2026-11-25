import type { ThemeColor, ThemeTokens } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';

export interface SwitchPalette {
  readonly trackFace: ThemeColor;
  readonly trackLip: ThemeColor;
  readonly knobFace: ThemeColor;
  readonly knobLip: ThemeColor;
}

export function resolveSwitchPalette(
  tokens: ThemeTokens,
  checked: boolean,
  disabled: boolean,
): SwitchPalette {
  if (disabled) {
    return {
      trackFace: tokens.colors.bgDisabled,
      trackLip: tokens.colors.bgDisabled,
      knobFace: tokens.colors.textDisabled,
      knobLip: tokens.colors.bgDisabled,
    };
  }

  if (checked) {
    return {
      trackFace: tokens.colors.primary.base,
      trackLip: tokens.colors.primary.lip,
      knobFace: tokens.colors.textOnAccent,
      knobLip: tokens.colors.primary.lip,
    };
  }

  return {
    trackFace: tokens.colors.bgDisabled,
    trackLip: tokens.colors.borderLip,
    knobFace: tokens.colors.bgCanvas,
    knobLip: tokens.colors.borderLip,
  };
}

export const useSwitchStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'flex-start',
  },
  face: {
    minHeight: tokens.components.control.hitTarget,
    minWidth: tokens.components.control.hitTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.xs,
  },
  track: {
    width: tokens.components.control.switchWidth,
    height: tokens.components.control.switchHeight,
    borderRadius: tokens.radii.pill,
    paddingHorizontal:
      (tokens.components.control.switchHeight - tokens.components.control.switchThumb) / 2,
    justifyContent: 'center',
  },
  knobWrapper: {
    position: 'relative',
    width: tokens.components.control.switchThumb,
    height: tokens.components.control.switchThumb,
    borderRadius: tokens.radii.pill,
  },
  label: {
    flexShrink: 1,
  },
}));
