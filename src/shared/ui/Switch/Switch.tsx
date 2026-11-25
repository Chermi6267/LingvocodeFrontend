import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useSpaceActivation } from '@/shared/lib/a11y';
import { useSpringValue } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { TactileLayers } from '../TactileLayers';
import { Text } from '../Text';
import { resolveSwitchPalette, useSwitchStyles } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

/**
 * Two-state switch with a spring-driven knob.
 *
 * The knob is translated (never laid out again), and its 2.5D lip travels with
 * it, so toggling cannot shift neighbouring views.
 */
export function Switch({
  checked,
  defaultChecked = false,
  onValueChange,
  label,
  labelPosition = 'right',
  disabled = false,
  accessibilityLabel,
  accessibilityState,
  onKeyDown,
  style,
  ...rest
}: SwitchProps) {
  const { tokens } = useTheme();
  const styles = useSwitchStyles();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    const next = !isChecked;

    if (!isControlled) {
      setInternalChecked(next);
    }

    onValueChange?.(next);
  }, [disabled, isControlled, isChecked, onValueChange]);

  const handleSpace = useSpaceActivation(toggle, disabled);
  const handleKeyDown = useCallback(
    (event: Parameters<NonNullable<SwitchProps['onKeyDown']>>[0]) => {
      handleSpace(event);
      onKeyDown?.(event);
    },
    [handleSpace, onKeyDown],
  );

  const travel = tokens.components.control.switchWidth - tokens.components.control.switchHeight;
  const knobPosition = useSpringValue(isChecked ? travel : 0, { disabled });
  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobPosition.get() }],
  }));

  const palette = resolveSwitchPalette(tokens, isChecked, disabled);
  const resolvedLabel = accessibilityLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <Pressable3D
      {...rest}
      disabled={disabled}
      faceColor={palette.trackFace}
      lipColor={palette.trackLip}
      radius={tokens.radii.pill}
      faceStyle={styles.face}
      style={[styles.root, style]}
      onPress={toggle}
      onKeyDown={handleKeyDown}
      accessibilityRole="switch"
      accessibilityLabel={resolvedLabel}
      accessibilityState={{ ...accessibilityState, checked: isChecked, disabled }}>
      {labelPosition === 'left' && label !== undefined ? (
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View style={styles.track} pointerEvents="none">
        <Animated.View style={[styles.knobWrapper, knobStyle]}>
          <TactileLayers
            faceColor={palette.knobFace}
            lipColor={palette.knobLip}
            borderWidth={tokens.borderWidths.none}
            radius={tokens.radii.pill}
            lipHeight={tokens.spacing.xs}
            showLip={!disabled}>
            <View />
          </TactileLayers>
        </Animated.View>
      </View>
      {labelPosition === 'right' && label !== undefined ? (
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </Pressable3D>
  );
}
