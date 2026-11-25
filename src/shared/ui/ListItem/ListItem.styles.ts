import { createStyles } from '@/shared/lib/styles';

export const useListItemStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'stretch',
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    minHeight: tokens.components.control.optionHeight,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  textColumn: {
    flex: 1,
    gap: tokens.spacing.xxs,
  },
  slot: {
    flexShrink: 0,
  },
}));
