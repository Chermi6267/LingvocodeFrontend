import { View } from 'react-native';

import { resolveStatusPalette, type ThemeColor } from '@/shared/config/theme';
import { useTheme } from '@/shared/lib/theme';

import { IconButton } from '../IconButton';
import { TactileSurface } from '../TactileSurface';
import { Text } from '../Text';
import { useAlertStyles } from './Alert.styles';
import type { AlertProps } from './Alert.types';

function CloseGlyph({ color }: { readonly color: ThemeColor }) {
  const styles = useAlertStyles();

  return (
    <Text variant="body" color={color} style={styles.closeGlyph}>
      ×
    </Text>
  );
}

/**
 * Inline semantic message for warnings, errors, and accent states.
 */
export function Alert({
  variant = 'info',
  title,
  message,
  icon,
  closable = false,
  onClose,
  action,
  testID,
  style,
  accessibilityLabel,
}: AlertProps) {
  const { tokens } = useTheme();
  const styles = useAlertStyles();
  const palette = resolveStatusPalette(tokens, variant);

  const iconNode =
    icon === null
      ? null
      : (icon ?? (
          <View style={styles.iconWrap}>
            <Text variant="title" color={palette.icon}>
              {palette.glyph}
            </Text>
          </View>
        ));

  const messageNode =
    typeof message === 'string' ? (
      <Text variant="bodySmall" tone="primary">
        {message}
      </Text>
    ) : (
      message
    );

  return (
    <TactileSurface
      faceColor={palette.background}
      lipColor={palette.lip}
      borderColor={palette.border}
      borderWidth={tokens.borderWidths.default}
      radius={tokens.radii.md}
      showLip={false}
      faceStyle={styles.face}
      style={[styles.root, style]}
      testID={testID}
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel ?? (typeof title === 'string' ? title : undefined)}>
      <View style={styles.row}>
        {iconNode}
        <View style={styles.body}>
          {title ? (
            <Text variant="title" color={palette.heading}>
              {title}
            </Text>
          ) : null}
          {messageNode}
          {action ? <View style={styles.action}>{action}</View> : null}
        </View>
        {closable ? (
          <IconButton
            icon={({ color }) => <CloseGlyph color={color} />}
            accessibilityLabel="Закрыть сообщение"
            variant="outline"
            shape="circle"
            onPress={onClose}
            style={styles.close}
          />
        ) : null}
      </View>
    </TactileSurface>
  );
}
