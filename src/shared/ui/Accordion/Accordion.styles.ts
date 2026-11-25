import { createStyles } from '@/shared/lib/styles';

export const useAccordionStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'stretch',
  },
  headerFace: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    minHeight: tokens.components.control.optionHeight,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  titleColumn: {
    flex: 1,
  },
  chevron: {
    width: tokens.iconSizes.sm,
    height: tokens.iconSizes.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    textAlign: 'center',
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
}));
