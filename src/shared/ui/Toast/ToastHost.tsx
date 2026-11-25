import { useEffect, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { resolveStatusPalette } from '@/shared/config/theme';
import { resolveEasing } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { useOptionalSafeAreaInsets } from '../measure';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { useToastStyles } from './Toast.styles';
import type { ToastRecord } from './Toast.types';

interface ToastHostProps {
  readonly toasts: readonly ToastRecord[];
  readonly onHide: (id: string) => void;
}

function ToastItem({
  toast,
  onHide,
}: {
  readonly toast: ToastRecord;
  readonly onHide: (id: string) => void;
}) {
  const { tokens } = useTheme();
  const styles = useToastStyles();
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(tokens.components.overlay.enterOffsetY);

  useEffect(() => {
    if (reduceMotion) {
      opacity.set(1);
      translateY.set(0);
      return;
    }
    opacity.set(
      withTiming(1, { duration: tokens.motion.toast.enter, easing: resolveEasing('ease') }),
    );
    translateY.set(
      withTiming(0, {
        duration: tokens.motion.toast.slideIn,
        easing: resolveEasing(tokens.motion.spring.easing),
      }),
    );
  }, [
    opacity,
    reduceMotion,
    tokens.components.overlay.enterOffsetY,
    tokens.motion.spring.easing,
    tokens.motion.toast.enter,
    tokens.motion.toast.slideIn,
    translateY,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
    transform: [{ translateY: translateY.get() }],
  }));

  const palette = resolveStatusPalette(tokens, toast.variant);

  return (
    <Animated.View style={[styles.toast, animatedStyle]}>
      <TactileSurface
        faceColor={palette.background}
        lipColor={palette.lip}
        borderColor={palette.border}
        borderWidth={tokens.borderWidths.default}
        radius={tokens.radii.md}
        showLip={false}
        faceStyle={styles.face}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite">
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Text variant="badge" color={palette.icon}>
              {palette.glyph}
            </Text>
          </View>
          <View style={styles.message}>
            {typeof toast.message === 'string' ? (
              <Text variant="bodySmall" color={palette.text}>
                {toast.message}
              </Text>
            ) : (
              toast.message
            )}
          </View>
          <View style={styles.actions}>
            {toast.action ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={toast.action.label}
                onPress={toast.action.onPress}>
                <Text variant="button" color={palette.icon} style={styles.actionText}>
                  {toast.action.label}
                </Text>
              </Pressable>
            ) : null}
            {toast.closable ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Закрыть уведомление"
                onPress={() => onHide(toast.id)}
                hitSlop={tokens.motion.toast.hitSlop}>
                <Text variant="body" color={tokens.colors.textSecondary} style={styles.closeGlyph}>
                  ×
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </TactileSurface>
    </Animated.View>
  );
}

export function ToastHost({ toasts, onHide }: ToastHostProps) {
  const insets = useOptionalSafeAreaInsets();
  const styles = useToastStyles();
  const { spacing } = useTheme().tokens;
  const hostStyle = useMemo(
    () => [styles.host, { paddingBottom: insets.bottom + spacing.lg }],
    [insets.bottom, spacing.lg, styles.host],
  );

  if (toasts.length === 0) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={hostStyle}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onHide={onHide} />
      ))}
    </View>
  );
}
