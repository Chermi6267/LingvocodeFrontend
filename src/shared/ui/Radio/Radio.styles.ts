import { createStyles } from '@/shared/lib/styles';

export const useRadioStyles = createStyles((tokens) => ({
  group: {
    gap: tokens.spacing.xs,
  },
  groupLabel: {
    marginBottom: tokens.spacing.xs,
  },
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
    borderRadius: tokens.radii.pill,
    borderWidth: tokens.borderWidths.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorSelected: {
    backgroundColor: tokens.colors.bgCanvas,
    borderColor: tokens.colors.choiceCardSelected.border,
  },
  indicatorIdle: {
    backgroundColor: tokens.colors.bgCanvas,
    borderColor: tokens.colors.borderDefault,
  },
  indicatorDisabled: {
    backgroundColor: tokens.colors.bgDisabled,
    borderColor: tokens.colors.bgDisabled,
  },
  dot: {
    width: tokens.spacing.md,
    height: tokens.spacing.md,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.colors.secondary.base,
  },
  dotDisabled: {
    backgroundColor: tokens.colors.textDisabled,
  },
  label: {
    flexShrink: 1,
  },
}));
