import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  View,
  type GestureResponderEvent,
  type KeyDownEvent,
  type ScrollViewInstance,
  type ViewInstance,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {
  consumeKey,
  isArrowKey,
  isKeyboardPress,
  isSpaceKey,
  useSpaceActivation,
} from '@/shared/lib/a11y';
import { usePopIn } from '@/shared/lib/motion';
import { useTheme } from '@/shared/lib/theme';

import { clamp, measureViewInWindow, useOptionalSafeAreaInsets } from '../measure';
import { Pressable3D } from '../Pressable3D';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { resolveSelectPalette, useSelectStyles } from './Select.styles';
import type { SelectOption, SelectProps } from './Select.types';

interface Placement {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly maxHeight: number;
  readonly overlayTop: number;
  readonly overlayLeft: number;
  readonly overlayWidth: number;
  readonly overlayHeight: number;
}

interface OptionRowProps<T> {
  readonly option: SelectOption<T>;
  readonly index: number;
  readonly selected: boolean;
  readonly active: boolean;
  readonly onSelect: (index: number) => void;
  readonly onNavigate: (delta: number) => void;
  readonly onEscape: () => void;
  readonly onHover: (index: number) => void;
}

function OptionRow<T>({
  option,
  index,
  selected,
  active,
  onSelect,
  onNavigate,
  onEscape,
  onHover,
}: OptionRowProps<T>) {
  const styles = useSelectStyles();
  const { tokens } = useTheme();
  const [focused, setFocused] = useState(false);
  const disabled = option.disabled === true;
  const select = useCallback(() => onSelect(index), [index, onSelect]);
  const handleSpace = useSpaceActivation(select, disabled);

  const handleKeyDown = useCallback(
    (event: KeyDownEvent) => {
      const key = event.nativeEvent.key;

      if (key === 'Escape') {
        consumeKey(event);
        onEscape();

        return;
      }

      if (isArrowKey(key)) {
        consumeKey(event);
        onNavigate(key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1);

        return;
      }

      handleSpace(event);
    },
    [handleSpace, onEscape, onNavigate],
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={select}
      onKeyDown={handleKeyDown}
      onHoverIn={() => onHover(index)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityRole="option"
      accessibilityLabel={option.accessibilityLabel ?? option.label}
      accessibilityState={{ selected, disabled }}
      style={[
        styles.optionPressable,
        focused && styles.optionFocused,
        active && styles.optionActive,
        selected && styles.optionSelected,
        disabled && styles.optionDisabled,
      ]}>
      <View style={styles.optionRow} pointerEvents="none">
        <Text variant="bodySmall" tone={disabled ? 'disabled' : 'primary'}>
          {option.label}
        </Text>
        {selected ? (
          <Text variant="bodySmall" color={tokens.colors.choiceCardSelected.text}>
            ✓
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * Themed single-value dropdown.
 *
 * - controlled (`value`) or uncontrolled (`defaultValue`);
 * - trigger keeps focus while the list is open, so Arrow/Home/End/Enter/Space
 *   and Escape work on web without moving DOM focus between elements;
 * - the list is measured on open, flipped above the trigger when the viewport
 *   is tight, clamped to safe-area insets and capped with a scrollable height;
 * - an invisible full-screen layer dismisses the list on outside taps.
 */
export function Select<T>({
  options,
  value,
  defaultValue = null,
  onValueChange,
  onOpenChange,
  label,
  placeholder = 'Выберите значение',
  accessibilityLabel,
  accessibilityHint = 'Откройте список и выберите значение',
  maxVisibleOptions = 5,
  fullWidth = true,
  disabled = false,
  accessibilityState,
  onKeyDown,
  style,
  ...rest
}: SelectProps<T>) {
  const { tokens } = useTheme();
  const styles = useSelectStyles();
  const insets = useOptionalSafeAreaInsets();

  const rootRef = useRef<ViewInstance>(null);
  const triggerRef = useRef<ViewInstance>(null);
  const scrollRef = useRef<ScrollViewInstance>(null);

  const [internalValue, setInternalValue] = useState<T | null>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placement, setPlacement] = useState<Placement | null>(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedIndex = options.findIndex((option) => option.value === selectedValue);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const changeOpen = useCallback(
    (next: boolean) => {
      setIsOpen(next);

      if (!next) {
        setActiveIndex(-1);
      }

      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const closeMenu = useCallback(() => changeOpen(false), [changeOpen]);

  const firstEnabledIndex = useCallback(() => {
    if (selectedIndex >= 0 && options[selectedIndex]?.disabled !== true) {
      return selectedIndex;
    }

    return options.findIndex((option) => option.disabled !== true);
  }, [options, selectedIndex]);

  const openMenu = useCallback(
    (index?: number) => {
      changeOpen(true);
      setActiveIndex(index ?? firstEnabledIndex());
    },
    [changeOpen, firstEnabledIndex],
  );

  const commitIndex = useCallback(
    (index: number) => {
      const option = options[index];

      if (!option || option.disabled) {
        return;
      }

      if (!isControlled) {
        setInternalValue(option.value);
      }

      onValueChange?.(option.value, index);
      closeMenu();
      triggerRef.current?.focus();
    },
    [closeMenu, isControlled, onValueChange, options],
  );

  const moveActive = useCallback(
    (delta: number) => {
      const enabled = options
        .map((option, index) => (option.disabled ? -1 : index))
        .filter((index) => index >= 0);

      if (enabled.length === 0) {
        return;
      }

      const current = enabled.indexOf(activeIndex);
      const next =
        current < 0
          ? (delta > 0 ? enabled[0] : enabled[enabled.length - 1])!
          : enabled[(current + delta + enabled.length) % enabled.length]!;

      setActiveIndex(next);
    },
    [activeIndex, options],
  );

  const updatePlacement = useCallback(async () => {
    const [anchor, root] = await Promise.all([
      measureViewInWindow(triggerRef),
      measureViewInWindow(rootRef),
    ]);

    if (!anchor || !root) {
      return;
    }

    const screen = Dimensions.get('window');
    const margin = tokens.spacing.sm;
    const gap = tokens.spacing.xs;
    const minLeft = insets.left + margin;
    const maxRight = screen.width - insets.right - margin;
    const width = Math.min(anchor.width, Math.max(maxRight - minLeft, 0));
    const left = clamp(anchor.x - root.x, minLeft - root.x, maxRight - width - root.x);

    const optionHeight = tokens.components.control.optionHeight;
    const visibleCount = Math.max(1, Math.min(options.length, maxVisibleOptions));
    const desiredHeight = optionHeight * visibleCount;
    const spaceBelow = screen.height - insets.bottom - margin - (anchor.y + anchor.height + gap);
    const spaceAbove = anchor.y - insets.top - margin - gap;
    const placeBelow =
      spaceBelow >= Math.min(desiredHeight, optionHeight * 2) || spaceBelow >= spaceAbove;
    const available = Math.max(placeBelow ? spaceBelow : spaceAbove, optionHeight);
    const maxHeight = Math.min(desiredHeight, available);
    const top = placeBelow
      ? anchor.y + anchor.height + gap - root.y
      : anchor.y - gap - maxHeight - root.y;

    setPlacement({
      top,
      left,
      width,
      maxHeight,
      overlayTop: -root.y,
      overlayLeft: -root.x,
      overlayWidth: screen.width,
      overlayHeight: screen.height,
    });
  }, [
    insets.bottom,
    insets.left,
    insets.right,
    insets.top,
    maxVisibleOptions,
    options.length,
    tokens,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let active = true;
    void updatePlacement();

    const subscription = Dimensions.addEventListener('change', () => {
      if (active) {
        void updatePlacement();
      }
    });

    return () => {
      active = false;
      subscription.remove();
    };
  }, [isOpen, updatePlacement]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      scrollRef.current?.scrollTo({
        y: activeIndex * tokens.components.control.optionHeight,
        animated: true,
      });
    }
  }, [activeIndex, isOpen, tokens]);

  const handleTriggerPress = useCallback(
    (event: GestureResponderEvent) => {
      if (isOpen) {
        if (isKeyboardPress(event) && activeIndex >= 0) {
          commitIndex(activeIndex);
        } else {
          closeMenu();
        }

        return;
      }

      openMenu();
    },
    [activeIndex, closeMenu, commitIndex, isOpen, openMenu],
  );

  const handleTriggerKeyDown = useCallback(
    (event: KeyDownEvent) => {
      if (disabled) {
        return;
      }

      const key = event.nativeEvent.key;

      if (isSpaceKey(key)) {
        consumeKey(event);

        if (isOpen) {
          commitIndex(activeIndex);
        } else {
          openMenu();
        }
      } else if (key === 'Escape' && isOpen) {
        consumeKey(event);
        closeMenu();
      } else if (isArrowKey(key)) {
        consumeKey(event);

        if (isOpen) {
          moveActive(key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1);
        } else {
          openMenu();
        }
      } else if ((key === 'Home' || key === 'End') && isOpen) {
        consumeKey(event);
        const enabled = options
          .map((option, index) => (option.disabled ? -1 : index))
          .filter((index) => index >= 0);

        if (enabled.length > 0) {
          setActiveIndex(key === 'Home' ? enabled[0]! : enabled[enabled.length - 1]!);
        }
      }

      onKeyDown?.(event);
    },
    [
      activeIndex,
      closeMenu,
      commitIndex,
      disabled,
      isOpen,
      moveActive,
      onKeyDown,
      openMenu,
      options,
    ],
  );

  const palette = resolveSelectPalette(tokens, disabled, isOpen);
  const resolvedLabel = accessibilityLabel ?? label ?? placeholder;
  const rootStyle = fullWidth ? styles.root : [styles.root, styles.rootCompact];

  const overlayStyle = useMemo<ViewStyle | null>(
    () =>
      placement
        ? {
            zIndex: 1,
            top: placement.overlayTop,
            left: placement.overlayLeft,
            width: placement.overlayWidth,
            height: placement.overlayHeight,
          }
        : null,
    [placement],
  );

  const menuStyle = useMemo<ViewStyle | null>(
    () =>
      placement
        ? {
            top: placement.top,
            left: placement.left,
            width: placement.width,
          }
        : null,
    [placement],
  );

  const scrollStyle = useMemo<ViewStyle | null>(
    () => (placement ? { maxHeight: placement.maxHeight } : null),
    [placement],
  );

  const { animatedStyle: menuAnimation } = usePopIn({ autoPlay: isOpen, disabled });

  return (
    <View ref={rootRef} style={[rootStyle, style]}>
      {label !== undefined ? (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View ref={triggerRef} style={styles.triggerHost}>
        <Pressable3D
          {...rest}
          disabled={disabled}
          faceColor={palette.face}
          lipColor={palette.lip}
          borderColor={palette.border}
          borderWidth={palette.borderWidth}
          hoverFaceColor={palette.hoverFace}
          radius={tokens.radii.md}
          faceStyle={styles.triggerFace}
          onPress={handleTriggerPress}
          onKeyDown={handleTriggerKeyDown}
          accessibilityRole="combobox"
          accessibilityLabel={resolvedLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={{
            ...accessibilityState,
            disabled,
            expanded: isOpen,
          }}
          accessibilityValue={{ text: selectedOption?.label }}>
          <View style={styles.triggerValueRow} pointerEvents="none">
            <Text variant="body" color={palette.value} style={styles.value}>
              {selectedOption?.label ?? placeholder}
            </Text>
          </View>
          <View style={[styles.chevron, isOpen && styles.chevronOpen]} pointerEvents="none" />
        </Pressable3D>
      </View>
      {isOpen && placement && overlayStyle ? (
        <Pressable
          onPress={closeMenu}
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[styles.overlay, overlayStyle]}
        />
      ) : null}
      {isOpen && placement && menuStyle && scrollStyle ? (
        <TactileSurface
          faceColor={tokens.colors.bgElevated}
          lipColor={tokens.colors.borderLip}
          borderColor={tokens.colors.borderDefault}
          borderWidth={tokens.borderWidths.default}
          radius={tokens.radii.md}
          style={[styles.menu, menuStyle]}>
          <Animated.View style={menuAnimation}>
            <ScrollView
              ref={scrollRef}
              style={[styles.menuScroll, scrollStyle]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator>
              {options.map((option, index) => (
                <OptionRow
                  key={index}
                  option={option}
                  index={index}
                  selected={option.value === selectedValue}
                  active={index === activeIndex}
                  onSelect={commitIndex}
                  onNavigate={moveActive}
                  onEscape={closeMenu}
                  onHover={setActiveIndex}
                />
              ))}
            </ScrollView>
          </Animated.View>
        </TactileSurface>
      ) : null}
    </View>
  );
}
