import { View } from 'react-native';

import { useTheme } from '@/shared/lib/theme';

import { Pressable3D } from '../Pressable3D';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { useListItemStyles } from './ListItem.styles';
import type { ListItemProps } from './ListItem.types';

/**
 * Row with a title, an optional subtitle and free-form leading/trailing slots.
 *
 * Without `onPress` it is a static tactile surface, so controls placed in
 * `leftSlot` / `rightSlot` stay independently interactive. With `onPress` the
 * whole row becomes a Pressable3D button (avoid nesting another button inside
 * its slots).
 */
export function ListItem({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  disabled = false,
  onPress,
  style,
  accessibilityLabel,
  accessibilityState,
  ...rest
}: ListItemProps) {
  const { tokens } = useTheme();
  const styles = useListItemStyles();
  const colors = tokens.colors;

  const interactive = typeof onPress === 'function';
  const faceColor = disabled ? colors.bgDisabled : colors.bgElevated;
  const lipColor = disabled ? colors.bgDisabled : colors.borderLip;
  const borderColor = disabled ? colors.bgDisabled : colors.borderDefault;
  const titleTone = disabled ? 'disabled' : 'primary';
  const subtitleTone = disabled ? 'disabled' : 'secondary';

  const titleNode =
    typeof title === 'string' ? (
      <Text variant="body" tone={titleTone}>
        {title}
      </Text>
    ) : (
      title
    );

  const subtitleNode =
    subtitle === undefined ? null : typeof subtitle === 'string' ? (
      <Text variant="bodySmall" tone={subtitleTone}>
        {subtitle}
      </Text>
    ) : (
      subtitle
    );

  const content = (
    <>
      {leftSlot === undefined ? null : (
        <View style={styles.slot} pointerEvents="box-none">
          {leftSlot}
        </View>
      )}
      <View style={styles.textColumn}>
        {titleNode}
        {subtitleNode}
      </View>
      {rightSlot === undefined ? null : (
        <View style={styles.slot} pointerEvents="box-none">
          {rightSlot}
        </View>
      )}
    </>
  );

  if (!interactive) {
    return (
      <TactileSurface
        {...rest}
        faceColor={faceColor}
        lipColor={lipColor}
        borderColor={borderColor}
        borderWidth={tokens.borderWidths.default}
        radius={tokens.radii.lg}
        showLip={!disabled}
        faceStyle={styles.face}
        style={[styles.root, style]}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ ...accessibilityState, disabled }}>
        {content}
      </TactileSurface>
    );
  }

  return (
    <Pressable3D
      {...rest}
      onPress={onPress}
      disabled={disabled}
      faceColor={faceColor}
      lipColor={lipColor}
      borderColor={borderColor}
      borderWidth={tokens.borderWidths.default}
      hoverFaceColor={disabled ? faceColor : colors.bgSurface}
      radius={tokens.radii.lg}
      faceStyle={styles.face}
      style={[styles.root, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (typeof title === 'string' ? title : undefined)}
      accessibilityState={{ ...accessibilityState, disabled }}>
      {content}
    </Pressable3D>
  );
}
