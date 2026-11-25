import { createStyles } from '@/shared/lib/styles';

export const useAlertStyles = createStyles((tokens) => ({
  root: {
    width: '100%',
  },
  face: {
    padding: tokens.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
  },
  iconWrap: {
    width: tokens.iconSizes.lg,
    height: tokens.iconSizes.lg,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.bgElevated,
  },
  body: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
  action: {
    marginTop: tokens.spacing.sm,
  },
  close: {
    marginTop: -tokens.spacing.xs,
    marginRight: -tokens.spacing.xs,
  },
  closeGlyph: {
    lineHeight: tokens.typography.variants.body.lineHeight,
  },
}));
