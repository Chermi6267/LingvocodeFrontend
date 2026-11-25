import { useCallback } from 'react';
import type { KeyDownEvent } from 'react-native';

import { consumeKey, isSpaceKey } from './keyboard';

/**
 * Space activation for controls whose accessibility role is not `button`.
 *
 * react-native-web only synthesises `onPress` from Space for button-like
 * roles, so Checkbox / Radio / Switch / Select need this explicit handler.
 * Enter is already handled by Pressable itself.
 */
export function useSpaceActivation(onActivate: () => void, disabled = false) {
  return useCallback(
    (event: KeyDownEvent) => {
      if (disabled || !isSpaceKey(event.nativeEvent.key)) {
        return;
      }

      consumeKey(event);
      onActivate();
    },
    [disabled, onActivate],
  );
}
