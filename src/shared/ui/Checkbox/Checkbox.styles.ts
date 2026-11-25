import { createStyles } from '@/shared/lib/styles';

export const useCheckboxStyles = createStyles((tokens) => ({
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
    userSelect: 'none',
  },
  indicator: {
    width: tokens.components.control.indicator,
    height: tokens.components.control.indicator,
    borderRadius: tokens.radii.sm,
    borderWidth: tokens.borderWidths.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorChecked: {
    backgroundColor: tokens.colors.primary.base,
    borderColor: tokens.colors.primary.base,
  },
  indicatorUnchecked: {
    backgroundColor: tokens.colors.bgCanvas,
    borderColor: tokens.colors.borderDefault,
  },
  indicatorDisabled: {
    backgroundColor: tokens.colors.bgDisabled,
    borderColor: tokens.colors.bgDisabled,
  },
  label: {
    flexShrink: 1,
  },
  glyph: {
    lineHeight: tokens.components.control.indicator - tokens.spacing.xs,
  },
}));
