import { createStyles } from '@/shared/lib/styles';

export const useTextInputStyles = createStyles((tokens) => ({
  container: {
    width: '100%',
  },
  field: {
    width: '100%',
    minHeight: tokens.components.input.minHeight,
    paddingHorizontal: tokens.components.input.paddingHorizontal,
    paddingVertical: tokens.components.input.paddingVertical,
    borderWidth: tokens.borderWidths.default,
    borderRadius: tokens.radii.md,
    fontFamily: tokens.typography.variants.body.fontFamily,
    fontSize: tokens.typography.variants.body.fontSize,
    lineHeight: tokens.typography.variants.body.lineHeight,
    color: tokens.colors.textPrimary,
  },
  fieldWithToggle: {
    paddingRight: tokens.components.input.paddingHorizontal + tokens.spacing.huge,
  },
  toggle: {
    position: 'absolute',
    top: tokens.spacing.none,
    right: tokens.spacing.sm,
    height: tokens.components.input.minHeight,
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.sm,
  },
  toggleLabel: {
    userSelect: 'none',
  },
  /** Reserves the message row so showing an error never moves following fields. */
  messageSlot: {
    minHeight: tokens.typography.variants.bodySmall.lineHeight,
    marginTop: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.xs,
  },
}));
