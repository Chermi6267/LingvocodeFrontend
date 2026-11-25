import { View } from 'react-native';
import type { Edges } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/lib/theme';

import { Icon } from '../Icon';
import { IconButton, type IconButtonProps } from '../IconButton';
import { SafeAreaWrapper } from '../SafeAreaWrapper';
import { Text } from '../Text';
import { resolveAppBarAlignment, resolveAppBarBorder, useAppBarStyles } from './AppBar.styles';
import type { AppBarProps } from './AppBar.types';

const defaultEdges: Edges = ['top', 'left', 'right'];

const defaultBackIcon: IconButtonProps['icon'] = ({ color }) => (
  <Icon
    name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
    size="sm"
    color={color}
  />
);

/**
 * Reusable top navigation bar: centred title, themed back button and a
 * trailing action slot. Navigation is supplied by typed callbacks only.
 *
 * The bar owns its safe-area insets by default. Inside a screen that already
 * uses `SafeAreaWrapper`, pass `safeArea={false}` to avoid double padding.
 */
export function AppBar({
  title,
  titleVariant = 'title',
  titleColor,
  numberOfLines = 1,
  onBackPress,
  backIcon = defaultBackIcon,
  backAccessibilityLabel = 'Назад',
  actions,
  align = 'center',
  background = 'bgCanvas',
  borderColor = 'borderDefault',
  showBorder = true,
  safeArea = true,
  edges = defaultEdges,
  accessibilityRole = 'header',
  style,
  ...rest
}: AppBarProps) {
  const styles = useAppBarStyles();
  const { tokens } = useTheme();
  const alignment = resolveAppBarAlignment(styles, align);
  const borderStyle = resolveAppBarBorder(tokens, showBorder, borderColor);
  const resolvedEdges: Edges = safeArea ? edges : [];

  return (
    <SafeAreaWrapper
      {...rest}
      edges={resolvedEdges}
      background={background}
      statusBar={false}
      accessibilityRole={accessibilityRole}
      style={[styles.root, borderStyle, style]}>
      <View style={styles.row}>
        <View style={[styles.side, styles.left, alignment.side]}>
          {onBackPress ? (
            <IconButton
              icon={backIcon}
              variant="outline"
              shape="circle"
              accessibilityLabel={backAccessibilityLabel}
              onPress={onBackPress}
            />
          ) : null}
        </View>
        <View style={[styles.titleSlot, alignment.slot]}>
          <Text
            variant={titleVariant}
            tone="primary"
            color={titleColor}
            numberOfLines={numberOfLines}
            style={[styles.title, alignment.title]}>
            {title}
          </Text>
        </View>
        <View style={[styles.side, styles.right, alignment.side]}>{actions}</View>
      </View>
    </SafeAreaWrapper>
  );
}
