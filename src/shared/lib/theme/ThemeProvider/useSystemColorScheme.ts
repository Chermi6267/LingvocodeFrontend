import { useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

import type { ThemeColorScheme } from '@/shared/config/theme';

function subscribe(onStoreChange: () => void): () => void {
  const subscription = Appearance.addChangeListener(onStoreChange);

  return () => {
    subscription.remove();
  };
}

function getSnapshot(): ThemeColorScheme | null {
  return Appearance.getColorScheme() ?? null;
}

/** Static rendering always starts from light and re-syncs after hydration. */
function getServerSnapshot(): ThemeColorScheme {
  return 'light';
}

export function useSystemColorScheme(): ThemeColorScheme | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
