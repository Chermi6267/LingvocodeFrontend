import { useCallback, useEffect } from 'react';
import { Pressable, Modal as RNModal, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { ThemeColor } from '@/shared/config/theme';
import { playPopInAnimation, resolveEasing } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { IconButton } from '../IconButton';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { useModalStyles } from './Modal.styles';
import type { ModalProps } from './Modal.types';

function CloseGlyph({ color }: { readonly color: ThemeColor }) {
  const styles = useModalStyles();

  return (
    <Text variant="title" color={color} style={styles.closeGlyph}>
      ×
    </Text>
  );
}

/**
 * Centered dialog overlay.
 *
 * Renders above the current interface in a React Native Modal, so system Back
 * is handled through `onRequestClose`. The dialog uses the tactile surface and
 * a pop-in spring/overshoot entrance.
 */
export function Modal({
  visible,
  onClose,
  children,
  title,
  hideCloseButton = false,
  dismissOnBackdrop = true,
  accessibilityLabel,
  testID,
  style,
  contentStyle,
}: ModalProps) {
  const { tokens } = useTheme();
  const styles = useModalStyles();
  const reduceMotion = useReducedMotion();

  const backdropOpacity = useSharedValue(0);
  const scale = useSharedValue(tokens.motion.popIn.fromScale);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    if (!visible) {
      backdropOpacity.set(0);
      scale.set(tokens.motion.popIn.fromScale);
      contentOpacity.set(0);
      return;
    }

    const { overlay, popIn } = tokens.motion;

    if (reduceMotion) {
      backdropOpacity.set(1);
      scale.set(popIn.toScale);
      contentOpacity.set(1);
      return;
    }

    backdropOpacity.set(
      withTiming(1, { duration: overlay.backdropIn, easing: resolveEasing('ease') }),
    );
    contentOpacity.set(
      withTiming(1, { duration: overlay.contentIn, easing: resolveEasing('ease') }),
    );
    playPopInAnimation(scale, popIn);
  }, [backdropOpacity, contentOpacity, reduceMotion, scale, tokens.motion, visible]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdropOpacity.get() }));
  const dialogAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.get(),
    transform: [{ scale: scale.get() }],
  }));

  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  const dialogLabel = accessibilityLabel ?? title;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.root} testID={testID}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            accessibilityRole="button"
            accessibilityLabel="Закрыть диалог"
            accessibilityHint="Нажмите, чтобы закрыть диалог"
            onPress={handleBackdropPress}
            disabled={!dismissOnBackdrop}
          />
        </Animated.View>

        <Animated.View style={[styles.dialog, dialogAnimatedStyle]}>
          <TactileSurface
            faceColor={tokens.colors.bgElevated}
            lipColor={tokens.colors.borderLip}
            borderColor={tokens.colors.borderDefault}
            borderWidth={tokens.borderWidths.default}
            radius={tokens.radii.lg}
            faceStyle={styles.face}
            style={style}
            accessibilityRole="dialog"
            accessibilityLabel={dialogLabel}
            accessibilityViewIsModal>
            {title || !hideCloseButton ? (
              <View style={styles.header}>
                {title ? (
                  <Text variant="h3" style={styles.title}>
                    {title}
                  </Text>
                ) : (
                  <View style={styles.title} />
                )}
                {!hideCloseButton ? (
                  <IconButton
                    icon={({ color }) => <CloseGlyph color={color} />}
                    accessibilityLabel="Закрыть"
                    variant="outline"
                    shape="circle"
                    onPress={onClose}
                    style={styles.closeButton}
                  />
                ) : null}
              </View>
            ) : null}
            <View style={[styles.content, contentStyle]}>{children}</View>
          </TactileSurface>
        </Animated.View>
      </View>
    </RNModal>
  );
}
