import { StyleSheet } from 'react-native';

import { createStyles } from '@/shared/lib/styles';

export const useModalStyles = createStyles((tokens) => ({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.xl,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: tokens.colors.backdrop,
  },
  dialog: {
    width: '100%',
    maxWidth: tokens.components.overlay.maxWidth,
  },
  face: {
    padding: tokens.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    marginTop: -tokens.spacing.xs,
    marginRight: -tokens.spacing.xs,
  },
  closeGlyph: {
    lineHeight: tokens.typography.variants.title.lineHeight,
  },
  content: {
    gap: tokens.spacing.md,
  },
}));
