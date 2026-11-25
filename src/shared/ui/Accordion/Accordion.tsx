import { useCallback, useState } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { useProgressValue } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { Text } from '../Text';
import { useAccordionStyles } from './Accordion.styles';
import type { AccordionProps } from './Accordion.types';

/**
 * Tactile accordion with an animated height.
 *
 * `useProgressValue` drives both the header chevron and the content height, so
 * opening/closing reuses the central spring token and honours reduced motion.
 * The measured height is a shared value: a nested accordion (or any dynamic
 * content) reports a new layout and the parent follows without re-mounting its
 * children.
 */
export function Accordion({
  title,
  children,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: AccordionProps) {
  const { tokens } = useTheme();
  const styles = useAccordionStyles();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;

  const progress = useProgressValue(isExpanded ? 1 : 0);
  const contentHeight = useSharedValue(0);

  const handleContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      contentHeight.set(event.nativeEvent.layout.height);
    },
    [contentHeight],
  );

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: Math.min(Math.max(progress.get(), 0), 1) * contentHeight.get(),
  }));

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.get() * 180}deg` }],
  }));

  const handlePress = useCallback(() => {
    if (disabled) {
      return;
    }

    const next = !isExpanded;

    if (!isControlled) {
      setInternalExpanded(next);
    }

    onExpandedChange?.(next);
  }, [disabled, isControlled, isExpanded, onExpandedChange]);

  const titleNode =
    typeof title === 'string' ? (
      <Text variant="body" tone={disabled ? 'disabled' : 'primary'}>
        {title}
      </Text>
    ) : (
      title
    );

  return (
    <View style={[styles.root, style]}>
      <Pressable3D
        {...rest}
        onPress={handlePress}
        disabled={disabled}
        faceColor={disabled ? tokens.colors.bgDisabled : tokens.colors.bgElevated}
        lipColor={disabled ? tokens.colors.bgDisabled : tokens.colors.borderLip}
        borderColor={disabled ? tokens.colors.bgDisabled : tokens.colors.borderDefault}
        borderWidth={tokens.borderWidths.default}
        hoverFaceColor={disabled ? tokens.colors.bgDisabled : tokens.colors.bgSurface}
        radius={tokens.radii.lg}
        faceStyle={styles.headerFace}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? (typeof title === 'string' ? title : undefined)}
        accessibilityState={{ expanded: isExpanded, disabled }}>
        <View style={styles.titleColumn}>{titleNode}</View>
        <Animated.View
          style={[styles.chevron, chevronAnimatedStyle]}
          pointerEvents="none"
          accessible={false}>
          <Text
            variant="title"
            tone={disabled ? 'disabled' : 'secondary'}
            style={styles.chevronText}>
            ▾
          </Text>
        </Animated.View>
      </Pressable3D>
      <Animated.View
        style={[styles.contentWrapper, contentAnimatedStyle]}
        pointerEvents={isExpanded ? 'auto' : 'none'}
        accessibilityElementsHidden={!isExpanded}
        importantForAccessibility={isExpanded ? 'auto' : 'no-hide-descendants'}
        tabIndex={isExpanded ? undefined : -1}
        focusable={isExpanded}>
        <View style={styles.content} onLayout={handleContentLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
