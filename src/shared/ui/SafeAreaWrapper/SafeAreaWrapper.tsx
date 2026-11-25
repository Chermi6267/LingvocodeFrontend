import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resolveThemeColorValue } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';
import { useTheme } from '@/shared/lib/theme';

import type { SafeAreaWrapperProps } from './SafeAreaWrapper.types';

const useStyles = createStyles((tokens) => ({
  root: {
    flex: 1,
    backgroundColor: tokens.colors.bgCanvas,
  },
}));

/**
 * Screen edge wrapper for iOS notches/home indicator, Android status/nav bars
 * and web safe-area insets. Expo Router already mounts `SafeAreaProvider` at
 * the root; outside Expo Router the provider must wrap the app.
 */
export function SafeAreaWrapper({
  children,
  edges,
  mode = 'padding',
  background,
  statusBar = true,
  statusBarStyle = 'auto',
  statusBarHidden = false,
  statusBarAnimation,
  style,
  ...rest
}: SafeAreaWrapperProps) {
  const { tokens } = useTheme();
  const styles = useStyles();
  const backgroundStyle = background
    ? { backgroundColor: resolveThemeColorValue(tokens, background) }
    : null;

  return (
    <>
      {statusBar ? (
        <StatusBar
          style={statusBarStyle}
          hidden={statusBarHidden}
          hideTransitionAnimation={statusBarAnimation}
        />
      ) : null}
      <SafeAreaView
        {...rest}
        edges={edges}
        mode={mode}
        style={[styles.root, backgroundStyle, style]}>
        {children}
      </SafeAreaView>
    </>
  );
}
