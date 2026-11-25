import { useContext, type RefObject } from 'react';
import type { ViewInstance } from 'react-native';
import { SafeAreaInsetsContext, type EdgeInsets } from 'react-native-safe-area-context';

export interface ScreenRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export type ViewRefObject = RefObject<ViewInstance | null>;

const zeroInsets: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };

/**
 * Safe-area insets are optional: `SafeAreaProvider` is not guaranteed to be
 * mounted by every consumer of the kit, so fall back to zeros instead of
 * throwing.
 */
export function useOptionalSafeAreaInsets(): EdgeInsets {
  return useContext(SafeAreaInsetsContext) ?? zeroInsets;
}

/**
 * Window-relative measurements for placement calculations.
 *
 * react-native-web forwards a DOM node as the View ref, while native exposes
 * `measureInWindow`. Both paths return the same rect shape.
 */
export function measureViewInWindow(ref: ViewRefObject): Promise<ScreenRect | null> {
  const instance = ref.current;

  if (!instance) {
    return Promise.resolve(null);
  }

  const element = instance as unknown as Element;
  if (typeof document !== 'undefined' && typeof element.getBoundingClientRect === 'function') {
    const rect = element.getBoundingClientRect();

    return Promise.resolve({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  }

  return new Promise((resolve) => {
    instance.measureInWindow((x, y, width, height) => resolve({ x, y, width, height }));
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
