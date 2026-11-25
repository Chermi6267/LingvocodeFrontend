import { StyleSheet } from 'react-native';

import { createStyles } from '@/shared/lib/styles';

export const useSliderStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'stretch',
    gap: tokens.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.sm,
  },
  valueText: {
    minWidth: tokens.components.control.indicator,
    textAlign: 'right',
  },
  trackArea: {
    position: 'relative',
    height: tokens.components.control.hitTarget,
    justifyContent: 'center',
  },
  track: {
    height: tokens.components.control.sliderTrackHeight,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.colors.bgDisabled,
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.colors.primary.base,
  },
  fillDisabled: {
    backgroundColor: tokens.colors.textDisabled,
  },
  highlight: {
    position: 'absolute',
    top: tokens.components.progressBar.highlightInsetTop,
    left: tokens.components.progressBar.highlightInsetHorizontal,
    right: tokens.components.progressBar.highlightInsetHorizontal,
    height: tokens.components.progressBar.highlightHeight,
    borderRadius: tokens.radii.pill,
    backgroundColor: tokens.colors.progressHighlight,
  },
  thumbPosition: {
    position: 'absolute',
    left: 0,
    top: (tokens.components.control.hitTarget - tokens.components.control.sliderThumb) / 2,
    width: tokens.components.control.sliderThumb,
    height: tokens.components.control.sliderThumb,
  },
  thumbShell: {
    position: 'relative',
    width: tokens.components.control.sliderThumb,
    height: tokens.components.control.sliderThumb,
    borderRadius: tokens.radii.pill,
  },
  hitArea: {
    ...StyleSheet.absoluteFill,
    borderRadius: tokens.radii.pill,
  },
  hitAreaFocused: {
    outlineWidth: tokens.borderWidths.default,
    outlineStyle: 'solid',
    outlineColor: tokens.colors.textPrimary,
    outlineOffset: tokens.borderWidths.default,
  },
}));
