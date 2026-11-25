import type { GestureResponderEvent, KeyDownEvent } from 'react-native';

/** Common keyboard checks shared by all interactive kit controls. */
export function isSpaceKey(key: string): boolean {
  return key === ' ' || key === 'Spacebar';
}

export function isEnterKey(key: string): boolean {
  return key === 'Enter';
}

export function isArrowKey(key: string): boolean {
  return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown';
}

/**
 * react-native-web dispatches `onPress` for Enter even on non-button roles.
 * Knowing the source lets a control separate a keyboard activation from a
 * pointer tap (for example "confirm" vs "dismiss" on an open Select).
 */
export function isKeyboardPress(event: GestureResponderEvent): boolean {
  return 'key' in event.nativeEvent;
}

/** Consumes a key so the browser does not scroll or perform a default action. */
export function consumeKey(event: KeyDownEvent): void {
  event.preventDefault();
  event.stopPropagation();
}
