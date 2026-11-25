import { StyleSheet } from 'react-native';

import { createStyles } from '@/shared/lib/styles';

export const useToastStyles = createStyles((tokens) => ({
  host: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.sm,
  },
  toast: {
    width: '100%',
    maxWidth: tokens.components.overlay.maxWidth,
  },
  face: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  iconWrap: {
    width: tokens.components.control.indicator,
    height: tokens.components.control.indicator,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.bgSurface,
  },
  message: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  },
  actionText: {
    textDecorationLine: 'underline',
  },
  closeGlyph: {
    lineHeight: tokens.typography.variants.body.lineHeight,
  },
}));
