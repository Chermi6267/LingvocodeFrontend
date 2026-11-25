import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { resolveStatusActionVariant, resolveStatusPalette } from '@/shared/config/theme';
import { resolveEasing } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Button } from '../Button';
import { useOptionalSafeAreaInsets } from '../measure';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { useBottomSheetStyles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

/**
 * Bottom sheet overlay with slide animation, backdrop, safe-area padding and
 * optional swipe-to-close. Supports Duolingo-style full-width feedback panels
 * for `success` and `error` variants.
 */
export function BottomSheet({
  visible,
  onClose,
  children,
  variant = 'default',
  heading,
  message,
  actionLabel,
  onAction,
  actionLoading = false,
  dismissOnBackdrop = true,
  enableSwipeClose = true,
  height,
  maxHeight,
  accessibilityLabel,
  testID,
  style,
  contentStyle,
}: BottomSheetProps) {
  const { tokens } = useTheme();
  const styles = useBottomSheetStyles();
  const reduceMotion = useReducedMotion();
  const insets = useOptionalSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const sheetMotion = tokens.motion.sheet;
  const overlayMotion = tokens.motion.overlay;

  const [mounted, setMounted] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState(0);
  const closeRequestedRef = useRef(false);
  const sheetHeightRef = useRef(0);
  const wasVisibleRef = useRef(false);

  const translateY = useSharedValue(windowHeight);
  const backdropOpacity = useSharedValue(0);
  const dragStartY = useSharedValue(0);

  const resolvedMaxHeight = maxHeight ?? Math.floor(windowHeight * sheetMotion.maxHeightRatio);
  const feedbackVariant = variant === 'default' ? null : variant;
  const feedback = feedbackVariant ? resolveStatusPalette(tokens, feedbackVariant) : null;

  const closeSheet = useCallback(() => {
    if (closeRequestedRef.current) {
      return;
    }
    closeRequestedRef.current = true;
    onClose();
  }, [onClose]);

  const animateOpen = useCallback(() => {
    closeRequestedRef.current = false;
    if (reduceMotion) {
      backdropOpacity.set(1);
      translateY.set(0);
      return;
    }
    backdropOpacity.set(
      withTiming(1, { duration: overlayMotion.backdropIn, easing: resolveEasing('ease') }),
    );
    translateY.set(withSpring(0, sheetMotion.spring));
  }, [backdropOpacity, overlayMotion.backdropIn, reduceMotion, sheetMotion.spring, translateY]);

  const animateClose = useCallback(
    (after?: () => void) => {
      const distance = Math.max(sheetHeightRef.current, windowHeight * sheetMotion.minVisibleRatio);
      if (reduceMotion) {
        backdropOpacity.set(0);
        translateY.set(distance);
        after?.();
        return;
      }
      backdropOpacity.set(
        withTiming(0, { duration: overlayMotion.backdropOut, easing: resolveEasing('ease') }),
      );
      translateY.set(
        withTiming(
          distance,
          { duration: sheetMotion.slideOut, easing: resolveEasing('ease') },
          (finished) => {
            if (finished && after) {
              runOnJS(after)();
            }
          },
        ),
      );
    },
    [
      backdropOpacity,
      overlayMotion.backdropOut,
      reduceMotion,
      sheetMotion.minVisibleRatio,
      sheetMotion.slideOut,
      translateY,
      windowHeight,
    ],
  );

  useEffect(() => {
    if (visible === wasVisibleRef.current) {
      return;
    }
    wasVisibleRef.current = visible;

    if (visible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount before open animation
      setMounted(true);
      translateY.set(Math.max(sheetHeightRef.current, windowHeight * sheetMotion.minVisibleRatio));
      requestAnimationFrame(() => {
        animateOpen();
      });
      return;
    }

    animateClose(() => setMounted(false));
  }, [animateClose, animateOpen, sheetMotion.minVisibleRatio, translateY, visible, windowHeight]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height;
    sheetHeightRef.current = nextHeight;
    setSheetHeight((prev) => (prev === nextHeight ? prev : nextHeight));
  }, []);

  const panResponder = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs -- PanResponder callbacks read shared values on gesture events, not during render
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gesture) =>
          enableSwipeClose &&
          gesture.dy > sheetMotion.dragStartThreshold &&
          Math.abs(gesture.dy) > Math.abs(gesture.dx),
        onPanResponderGrant: () => {
          dragStartY.set(translateY.get());
        },
        onPanResponderMove: (_, gesture) => {
          const next = Math.max(0, dragStartY.get() + gesture.dy);
          translateY.set(next);
          const fade =
            sheetHeight > 0
              ? 1 - Math.min(next / sheetHeight, 1) * sheetMotion.backdropFadeRatio
              : 1;
          backdropOpacity.set(fade);
        },
        onPanResponderRelease: (_, gesture) => {
          const shouldClose =
            gesture.dy >
              Math.min(
                sheetHeight * sheetMotion.closeDistanceRatio,
                sheetMotion.maxCloseDistance,
              ) || gesture.vy > sheetMotion.closeVelocityThreshold;
          if (shouldClose) {
            closeSheet();
            return;
          }
          backdropOpacity.set(
            withTiming(1, {
              duration: overlayMotion.backdropRestore,
              easing: resolveEasing('ease'),
            }),
          );
          translateY.set(withSpring(0, sheetMotion.spring));
        },
        onPanResponderTerminate: () => {
          backdropOpacity.set(
            withTiming(1, {
              duration: overlayMotion.backdropRestore,
              easing: resolveEasing('ease'),
            }),
          );
          translateY.set(withSpring(0, sheetMotion.spring));
        },
      }),
    [
      backdropOpacity,
      closeSheet,
      dragStartY,
      enableSwipeClose,
      overlayMotion.backdropRestore,
      sheetHeight,
      sheetMotion.backdropFadeRatio,
      sheetMotion.closeDistanceRatio,
      sheetMotion.closeVelocityThreshold,
      sheetMotion.dragStartThreshold,
      sheetMotion.maxCloseDistance,
      sheetMotion.spring,
      translateY,
    ],
  );

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdropOpacity.get() }));
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.get() }],
  }));

  if (!mounted) {
    return null;
  }

  const sheetHeightStyle = height ? { height } : { maxHeight: resolvedMaxHeight };
  const bottomPadding = { paddingBottom: insets.bottom + tokens.spacing.md };
  const faceColor = feedback?.background ?? tokens.colors.bgElevated;
  const lipColor = feedback ? feedback.lip : tokens.colors.borderLip;
  const borderColor = feedback ? feedback.border : tokens.colors.borderDefault;
  const dialogLabel = accessibilityLabel ?? heading;

  return (
    <RNModal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent>
      <View style={styles.root} testID={testID}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            accessibilityRole="button"
            accessibilityLabel="Закрыть панель"
            accessibilityHint="Нажмите, чтобы закрыть панель"
            onPress={dismissOnBackdrop ? closeSheet : undefined}
            disabled={!dismissOnBackdrop}
          />
        </Animated.View>

        <Animated.View style={[styles.sheet, sheetAnimatedStyle]} {...panResponder.panHandlers}>
          <TactileSurface
            faceColor={faceColor}
            lipColor={lipColor}
            borderColor={borderColor}
            borderWidth={feedback ? tokens.borderWidths.none : tokens.borderWidths.default}
            radius={tokens.radii.lg}
            showLip={false}
            faceStyle={[styles.surfaceFace, sheetHeightStyle]}
            style={style}
            accessibilityRole="dialog"
            accessibilityLabel={dialogLabel}
            accessibilityViewIsModal
            onLayout={handleLayout}>
            <View style={styles.handleArea}>
              <View style={styles.handle} />
            </View>

            {feedback && feedbackVariant ? (
              <View style={[styles.feedbackContent, bottomPadding, contentStyle]}>
                <View style={styles.feedbackRow}>
                  <View style={styles.feedbackIcon}>
                    <Text variant="heading" color={feedback.icon}>
                      {feedback.glyph}
                    </Text>
                  </View>
                  <View style={styles.feedbackText}>
                    {heading ? (
                      <Text variant="heading" color={feedback.heading}>
                        {heading}
                      </Text>
                    ) : null}
                    {message ? (
                      <Text variant="body" color={feedback.text}>
                        {message}
                      </Text>
                    ) : null}
                  </View>
                </View>
                {actionLabel ? (
                  <Button
                    variant={resolveStatusActionVariant(feedbackVariant)}
                    fullWidth
                    onPress={onAction}
                    loading={actionLoading}>
                    {actionLabel}
                  </Button>
                ) : null}
                {children}
              </View>
            ) : (
              <View style={[styles.content, bottomPadding, contentStyle]}>
                {heading ? <Text variant="h3">{heading}</Text> : null}
                {children}
              </View>
            )}
          </TactileSurface>
        </Animated.View>
      </View>
    </RNModal>
  );
}
