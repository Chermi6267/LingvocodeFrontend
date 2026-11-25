import { StyleSheet } from 'react-native';

import { createStyles } from '@/shared/lib/styles';

export const useBottomSheetStyles = createStyles((tokens) => ({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: tokens.colors.backdrop,
  },
  sheet: {
    width: '100%',
  },
  surfaceFace: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
  },
  handleArea: {
    alignItems: 'center',
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.xs,
  },
  handle: {
    width: tokens.components.control.hitTarget,
    height: tokens.effects.lipHeight,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.colors.borderDefault,
  },
  content: {
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.sm,
    gap: tokens.spacing.md,
  },
  feedbackContent: {
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing.xl,
    gap: tokens.spacing.lg,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.md,
  },
  feedbackIcon: {
    width: tokens.components.overlay.feedbackIconSize,
    height: tokens.components.overlay.feedbackIconSize,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.bgElevated,
  },
  feedbackText: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
}));
