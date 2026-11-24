import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  View,
  type TextInputInstance,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useShake } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Text } from '../Text';
import { useTextInputStyles } from './TextInput.styles';
import type { TextInputProps } from './TextInput.types';

/**
 * Sunken 2px field driven by theme tokens.
 *
 * State precedence: disabled → error → focused → default.
 * - `bgSurface` face, `bgDisabled` when disabled, `danger.tint` on error;
 * - border `borderDefault`, `secondary.base` on focus, `danger.base` on error;
 * - placeholder is always readable (`textSecondary` / `textDisabled`);
 * - optional Reanimated shake, skipped when the OS asks for reduced motion.
 */
export const TextInput = forwardRef<TextInputInstance, TextInputProps>(function TextInput(
  {
    error,
    shakeOnError = false,
    shakeKey,
    showPasswordToggle = false,
    containerStyle,
    inputStyle,
    disabled = false,
    accessibilityState,
    accessibilityHint,
    onFocus,
    onBlur,
    secureTextEntry,
    ...rest
  },
  ref,
) {
  const { tokens } = useTheme();
  const styles = useTextInputStyles();
  const { animatedStyle, shake } = useShake();

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const lastShakeTrigger = useRef<string | null>(null);

  const hasError = Boolean(error);

  useEffect(() => {
    if (!hasError || !shakeOnError) {
      lastShakeTrigger.current = null;

      return;
    }

    const trigger = `${error}\u0000${String(shakeKey ?? '')}`;
    if (lastShakeTrigger.current === trigger) {
      return;
    }

    lastShakeTrigger.current = trigger;
    shake();
  }, [error, hasError, shake, shakeKey, shakeOnError]);

  const handleFocus = useCallback(
    (event: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((visible) => !visible);
  }, []);

  const fieldStateStyle: ViewStyle & TextStyle = disabled
    ? {
        backgroundColor: tokens.colors.bgDisabled,
        borderColor: tokens.colors.borderDefault,
        color: tokens.colors.textDisabled,
      }
    : hasError
      ? {
          backgroundColor: tokens.colors.danger.tint,
          borderColor: tokens.colors.danger.base,
          color: tokens.colors.textPrimary,
        }
      : {
          backgroundColor: tokens.colors.bgSurface,
          borderColor: isFocused ? tokens.colors.secondary.base : tokens.colors.borderDefault,
          color: tokens.colors.textPrimary,
        };

  const placeholderTextColor = disabled ? tokens.colors.textDisabled : tokens.colors.textSecondary;

  return (
    <Animated.View style={[styles.container, containerStyle, animatedStyle]}>
      <RNTextInput
        {...rest}
        ref={ref}
        editable={!disabled}
        secureTextEntry={Boolean(secureTextEntry) && !isPasswordVisible}
        placeholderTextColor={placeholderTextColor}
        accessibilityHint={error ?? accessibilityHint}
        accessibilityState={{ ...accessibilityState, disabled }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.field,
          fieldStateStyle,
          showPasswordToggle && styles.fieldWithToggle,
          inputStyle,
        ]}
      />

      {showPasswordToggle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={togglePasswordVisibility}
          style={styles.toggle}>
          <Text variant="bodySmall" tone="secondary" style={styles.toggleLabel}>
            {isPasswordVisible ? 'Скрыть' : 'Показать'}
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.messageSlot}>
        {hasError ? (
          <Text
            variant="bodySmall"
            color={tokens.colors.danger.base}
            accessibilityLiveRegion="polite">
            {error}
          </Text>
        ) : null}
      </View>
    </Animated.View>
  );
});
