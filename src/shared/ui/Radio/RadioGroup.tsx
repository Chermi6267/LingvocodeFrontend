import { useCallback, useRef, useState, type ReactNode } from 'react';
import { View } from 'react-native';

import { Stack } from '../Stack';
import { Text } from '../Text';
import { useRadioStyles } from './Radio.styles';
import type { RadioGroupProps, RadioValue } from './Radio.types';
import { RadioGroupContext, type RadioGroupContextValue } from './RadioGroup.context';

interface RegisteredRadio {
  readonly value: RadioValue;
  readonly disabled: boolean;
}

/** Enforces a single selected value for every `Radio` descendant. */
export function RadioGroup({
  children,
  value,
  defaultValue = null,
  onValueChange,
  disabled = false,
  label,
  direction = 'vertical',
  gap = 'sm',
  accessibilityLabel,
  style,
  ...rest
}: RadioGroupProps) {
  const styles = useRadioStyles();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const itemsRef = useRef<readonly RegisteredRadio[]>([]);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const [activeValue, setActiveValue] = useState<RadioValue | null>(selectedValue);

  const select = useCallback(
    (next: RadioValue) => {
      if (disabled) {
        return;
      }

      setActiveValue(next);

      if (next === selectedValue) {
        return;
      }

      if (!isControlled) {
        setInternalValue(next);
      }

      onValueChange?.(next);
    },
    [disabled, isControlled, onValueChange, selectedValue],
  );

  const register = useCallback((itemValue: RadioValue, itemDisabled: boolean) => {
    itemsRef.current = [
      ...itemsRef.current.filter((item) => item.value !== itemValue),
      { value: itemValue, disabled: itemDisabled },
    ];

    return () => {
      itemsRef.current = itemsRef.current.filter((item) => item.value !== itemValue);
    };
  }, []);

  const move = useCallback(
    (from: RadioValue, delta: number) => {
      const enabled = itemsRef.current.filter((item) => !item.disabled);
      if (enabled.length === 0) {
        return;
      }

      const currentIndex = enabled.findIndex((item) => item.value === from);
      const nextIndex =
        currentIndex < 0 ? 0 : (currentIndex + delta + enabled.length) % enabled.length;

      select(enabled[nextIndex]!.value);
    },
    [select],
  );

  const context: RadioGroupContextValue = {
    value: selectedValue,
    activeValue,
    setActiveValue,
    disabled,
    select,
    move,
    register,
  };
  const resolvedLabel = accessibilityLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <RadioGroupContext.Provider value={context}>
      <View style={style} {...rest}>
        {label !== undefined ? (
          <Text variant="label" style={styles.groupLabel}>
            {label}
          </Text>
        ) : null}
        <Stack
          direction={direction}
          gap={gap}
          style={styles.group}
          accessibilityRole="radiogroup"
          accessibilityLabel={resolvedLabel}
          accessibilityState={{ disabled }}>
          {children as ReactNode}
        </Stack>
      </View>
    </RadioGroupContext.Provider>
  );
}
