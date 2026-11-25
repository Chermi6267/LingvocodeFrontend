import { createStyles } from '@/shared/lib/styles';

export const useProgressBarStyles = createStyles((tokens) => ({
  track: {
    height: tokens.components.progressBar.height,
    borderRadius: tokens.radii.pill,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: tokens.radii.pill,
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: tokens.components.progressBar.highlightInsetTop,
    left: tokens.components.progressBar.highlightInsetHorizontal,
    right: tokens.components.progressBar.highlightInsetHorizontal,
    height: tokens.components.progressBar.highlightHeight,
    borderRadius: tokens.radii.pill,
  },
}));
